import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Profile {
  id: string;
  email: string;
  matricula: string;
  name: string;
  user_id: string | null;
  role: string | null;
}

interface CreationResult {
  profile_id: string;
  email: string;
  matricula: string;
  name: string;
  status: 'created' | 'skipped' | 'error';
  new_user_id?: string;
  error?: string;
  temporary_password?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    console.log('[create-users-for-profiles] Starting user creation process...');

    // Get the real owner user_id (the one that should keep their user_id)
    // This is the user_id that appears in auth.users and has a valid session
    const { data: authUsers, error: authError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (authError) {
      throw new Error(`Failed to list auth users: ${authError.message}`);
    }

    console.log(`[create-users-for-profiles] Found ${authUsers.users.length} users in auth.users`);
    
    // Create a set of valid user_ids from auth.users
    const validUserIds = new Set(authUsers.users.map(u => u.id));

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, matricula, name, user_id, role')
      .order('created_at', { ascending: true });

    if (profilesError) {
      throw new Error(`Failed to fetch profiles: ${profilesError.message}`);
    }

    console.log(`[create-users-for-profiles] Found ${profiles?.length || 0} profiles`);

    const results: CreationResult[] = [];
    const processedEmails = new Set<string>();

    // Group profiles by user_id to identify duplicates
    const profilesByUserId = new Map<string, Profile[]>();
    const orphanProfiles: Profile[] = [];

    for (const profile of profiles || []) {
      if (!profile.user_id) {
        orphanProfiles.push(profile);
      } else {
        const existing = profilesByUserId.get(profile.user_id) || [];
        existing.push(profile);
        profilesByUserId.set(profile.user_id, existing);
      }
    }

    console.log(`[create-users-for-profiles] Orphan profiles: ${orphanProfiles.length}`);
    console.log(`[create-users-for-profiles] User IDs with profiles: ${profilesByUserId.size}`);

    // Process profiles that share user_ids (keep first, create new for rest)
    for (const [userId, profileList] of profilesByUserId) {
      // Check if this is a valid user_id from auth.users
      const isValidUserId = validUserIds.has(userId);
      
      if (isValidUserId && profileList.length === 1) {
        // Single profile with valid user_id - skip
        results.push({
          profile_id: profileList[0].id,
          email: profileList[0].email,
          matricula: profileList[0].matricula,
          name: profileList[0].name,
          status: 'skipped',
        });
        processedEmails.add(profileList[0].email.toLowerCase());
        continue;
      }

      // For profiles sharing a user_id, keep the first one, create new users for the rest
      for (let i = 0; i < profileList.length; i++) {
        const profile = profileList[i];
        
        // Skip if we already processed this email
        if (processedEmails.has(profile.email.toLowerCase())) {
          results.push({
            profile_id: profile.id,
            email: profile.email,
            matricula: profile.matricula,
            name: profile.name,
            status: 'skipped',
            error: 'Email already processed'
          });
          continue;
        }

        if (i === 0 && isValidUserId) {
          // First profile keeps the original user_id
          results.push({
            profile_id: profile.id,
            email: profile.email,
            matricula: profile.matricula,
            name: profile.name,
            status: 'skipped',
          });
          processedEmails.add(profile.email.toLowerCase());
        } else {
          // Create new user for this profile
          const result = await createUserForProfile(supabaseAdmin, profile, processedEmails);
          results.push(result);
          if (result.status === 'created') {
            processedEmails.add(profile.email.toLowerCase());
          }
        }
      }
    }

    // Process orphan profiles (no user_id)
    for (const profile of orphanProfiles) {
      if (processedEmails.has(profile.email.toLowerCase())) {
        results.push({
          profile_id: profile.id,
          email: profile.email,
          matricula: profile.matricula,
          name: profile.name,
          status: 'skipped',
          error: 'Email already processed'
        });
        continue;
      }

      const result = await createUserForProfile(supabaseAdmin, profile, processedEmails);
      results.push(result);
      if (result.status === 'created') {
        processedEmails.add(profile.email.toLowerCase());
      }
    }

    const summary = {
      total_profiles: profiles?.length || 0,
      created: results.filter(r => r.status === 'created').length,
      skipped: results.filter(r => r.status === 'skipped').length,
      errors: results.filter(r => r.status === 'error').length,
      results
    };

    console.log(`[create-users-for-profiles] Complete. Created: ${summary.created}, Skipped: ${summary.skipped}, Errors: ${summary.errors}`);

    return new Response(JSON.stringify(summary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[create-users-for-profiles] Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function createUserForProfile(
  supabaseAdmin: any, 
  profile: Profile,
  processedEmails: Set<string>
): Promise<CreationResult> {
  const temporaryPassword = `Mprj@${profile.matricula}!`;
  
  try {
    // Check if email already exists in auth.users
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u: any) => u.email?.toLowerCase() === profile.email.toLowerCase()
    );

    if (existingUser) {
      // User already exists, just update the profile with this user_id
      const { error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ user_id: existingUser.id })
        .eq('id', profile.id);

      if (updateError) {
        return {
          profile_id: profile.id,
          email: profile.email,
          matricula: profile.matricula,
          name: profile.name,
          status: 'error',
          error: `Failed to update profile: ${updateError.message}`
        };
      }

      // Also ensure role is in user_roles table
      if (profile.role) {
        await supabaseAdmin
          .from('user_roles')
          .upsert({ user_id: existingUser.id, role: profile.role }, { onConflict: 'user_id,role' });
      }

      return {
        profile_id: profile.id,
        email: profile.email,
        matricula: profile.matricula,
        name: profile.name,
        status: 'skipped',
        new_user_id: existingUser.id,
        error: 'User already exists in auth, linked profile'
      };
    }

    // Create new user
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: profile.email,
      password: temporaryPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: profile.name,
        matricula: profile.matricula
      }
    });

    if (createError) {
      return {
        profile_id: profile.id,
        email: profile.email,
        matricula: profile.matricula,
        name: profile.name,
        status: 'error',
        error: `Failed to create user: ${createError.message}`
      };
    }

    // Update profile with new user_id
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ user_id: newUser.user.id })
      .eq('id', profile.id);

    if (updateError) {
      return {
        profile_id: profile.id,
        email: profile.email,
        matricula: profile.matricula,
        name: profile.name,
        status: 'error',
        error: `User created but failed to update profile: ${updateError.message}`
      };
    }

    // Add role to user_roles table
    if (profile.role) {
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .upsert({ user_id: newUser.user.id, role: profile.role }, { onConflict: 'user_id,role' });
      
      if (roleError) {
        console.warn(`[create-users-for-profiles] Failed to add role for ${profile.email}: ${roleError.message}`);
      }
    }

    console.log(`[create-users-for-profiles] Created user for ${profile.email} (${profile.name})`);

    return {
      profile_id: profile.id,
      email: profile.email,
      matricula: profile.matricula,
      name: profile.name,
      status: 'created',
      new_user_id: newUser.user.id,
      temporary_password: temporaryPassword
    };

  } catch (error) {
    return {
      profile_id: profile.id,
      email: profile.email,
      matricula: profile.matricula,
      name: profile.name,
      status: 'error',
      error: error.message
    };
  }
}
