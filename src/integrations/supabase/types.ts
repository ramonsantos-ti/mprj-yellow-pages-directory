export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      academic_formations: {
        Row: {
          ano: number
          created_at: string | null
          curso: string
          id: string
          instituicao: string
          nivel: string
          profile_id: string | null
        }
        Insert: {
          ano: number
          created_at?: string | null
          curso: string
          id?: string
          instituicao: string
          nivel: string
          profile_id?: string | null
        }
        Update: {
          ano?: number
          created_at?: string | null
          curso?: string
          id?: string
          instituicao?: string
          nivel?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "academic_formations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: string
          entity_id: string | null
          entity_type: string
          id: string
          new_value: string | null
          previous_value: string | null
          user_matricula: string | null
          user_name: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details: string
          entity_id?: string | null
          entity_type: string
          id?: string
          new_value?: string | null
          previous_value?: string | null
          user_matricula?: string | null
          user_name: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: string
          entity_id?: string | null
          entity_type?: string
          id?: string
          new_value?: string | null
          previous_value?: string | null
          user_matricula?: string | null
          user_name?: string
        }
        Relationships: []
      }
      availability: {
        Row: {
          created_at: string | null
          disponibilidade_estimada: string | null
          forma_contato:
            | Database["public"]["Enums"]["contact_preference"]
            | null
          horario_preferencial: string | null
          id: string
          profile_id: string | null
          tipo_colaboracao:
            | Database["public"]["Enums"]["collaboration_type"][]
            | null
        }
        Insert: {
          created_at?: string | null
          disponibilidade_estimada?: string | null
          forma_contato?:
            | Database["public"]["Enums"]["contact_preference"]
            | null
          horario_preferencial?: string | null
          id?: string
          profile_id?: string | null
          tipo_colaboracao?:
            | Database["public"]["Enums"]["collaboration_type"][]
            | null
        }
        Update: {
          created_at?: string | null
          disponibilidade_estimada?: string | null
          forma_contato?:
            | Database["public"]["Enums"]["contact_preference"]
            | null
          horario_preferencial?: string | null
          id?: string
          profile_id?: string | null
          tipo_colaboracao?:
            | Database["public"]["Enums"]["collaboration_type"][]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "availability_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      professional_experiences: {
        Row: {
          created_at: string | null
          experiencia_anterior: string | null
          id: string
          profile_id: string | null
          projetos_internos: string | null
          publicacoes: string | null
          tempo_mprj: string | null
        }
        Insert: {
          created_at?: string | null
          experiencia_anterior?: string | null
          id?: string
          profile_id?: string | null
          projetos_internos?: string | null
          publicacoes?: string | null
          tempo_mprj?: string | null
        }
        Update: {
          created_at?: string | null
          experiencia_anterior?: string | null
          id?: string
          profile_id?: string | null
          projetos_internos?: string | null
          publicacoes?: string | null
          tempo_mprj?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "professional_experiences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          aceite_termos: boolean | null
          areas_conhecimento: string[] | null
          biografia: string | null
          cargo: string[] | null
          certificacoes: string[] | null
          created_at: string | null
          email: string
          especializacoes: string | null
          foto_url: string | null
          funcao: string[] | null
          id: string
          idiomas: string[] | null
          is_active: boolean | null
          link_curriculo: string | null
          matricula: string
          name: string
          publicacoes: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          telefone: string | null
          temas_interesse: string[] | null
          unidade: string[] | null
          updated_at: string | null
          updated_by_admin: boolean | null
          user_id: string | null
        }
        Insert: {
          aceite_termos?: boolean | null
          areas_conhecimento?: string[] | null
          biografia?: string | null
          cargo?: string[] | null
          certificacoes?: string[] | null
          created_at?: string | null
          email: string
          especializacoes?: string | null
          foto_url?: string | null
          funcao?: string[] | null
          id?: string
          idiomas?: string[] | null
          is_active?: boolean | null
          link_curriculo?: string | null
          matricula: string
          name: string
          publicacoes?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          telefone?: string | null
          temas_interesse?: string[] | null
          unidade?: string[] | null
          updated_at?: string | null
          updated_by_admin?: boolean | null
          user_id?: string | null
        }
        Update: {
          aceite_termos?: boolean | null
          areas_conhecimento?: string[] | null
          biografia?: string | null
          cargo?: string[] | null
          certificacoes?: string[] | null
          created_at?: string | null
          email?: string
          especializacoes?: string | null
          foto_url?: string | null
          funcao?: string[] | null
          id?: string
          idiomas?: string[] | null
          is_active?: boolean | null
          link_curriculo?: string | null
          matricula?: string
          name?: string
          publicacoes?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          telefone?: string | null
          temas_interesse?: string[] | null
          unidade?: string[] | null
          updated_at?: string | null
          updated_by_admin?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          data_fim: string | null
          data_inicio: string
          id: string
          nome: string
          observacoes: string | null
          profile_id: string | null
        }
        Insert: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio: string
          id?: string
          nome: string
          observacoes?: string | null
          profile_id?: string | null
        }
        Update: {
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string
          id?: string
          nome?: string
          observacoes?: string | null
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_uuid: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      is_admin: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      collaboration_type: "consultoria" | "parecer" | "capacitacao" | "projeto"
      contact_preference: "email" | "telefone" | "teams" | "presencial"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      collaboration_type: ["consultoria", "parecer", "capacitacao", "projeto"],
      contact_preference: ["email", "telefone", "teams", "presencial"],
    },
  },
} as const
