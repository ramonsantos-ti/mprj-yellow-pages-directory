export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      audit_alerts: {
        Row: {
          acknowledged_at: string | null
          acknowledged_by: string | null
          alert_type: string
          audit_log_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          severity: string
        }
        Insert: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type: string
          audit_log_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          severity: string
        }
        Update: {
          acknowledged_at?: string | null
          acknowledged_by?: string | null
          alert_type?: string
          audit_log_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_alerts_audit_log_id_fkey"
            columns: ["audit_log_id"]
            isOneToOne: false
            referencedRelation: "audit_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          notify_admins: boolean | null
          severity_level: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          notify_admins?: boolean | null
          severity_level: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          notify_admins?: boolean | null
          severity_level?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          affected_fields: string[] | null
          changes_summary: Json | null
          created_at: string | null
          details: string
          entity_id: string | null
          entity_type: string
          error_message: string | null
          id: string
          ip_address: unknown | null
          module: string | null
          new_value: string | null
          operation_type: string | null
          previous_value: string | null
          session_id: string | null
          severity_level: string | null
          success: boolean | null
          user_agent: string | null
          user_matricula: string | null
          user_name: string
        }
        Insert: {
          action: string
          affected_fields?: string[] | null
          changes_summary?: Json | null
          created_at?: string | null
          details: string
          entity_id?: string | null
          entity_type: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          module?: string | null
          new_value?: string | null
          operation_type?: string | null
          previous_value?: string | null
          session_id?: string | null
          severity_level?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_matricula?: string | null
          user_name: string
        }
        Update: {
          action?: string
          affected_fields?: string[] | null
          changes_summary?: Json | null
          created_at?: string | null
          details?: string
          entity_id?: string | null
          entity_type?: string
          error_message?: string | null
          id?: string
          ip_address?: unknown | null
          module?: string | null
          new_value?: string | null
          operation_type?: string | null
          previous_value?: string | null
          session_id?: string | null
          severity_level?: string | null
          success?: boolean | null
          user_agent?: string | null
          user_matricula?: string | null
          user_name?: string
        }
        Relationships: []
      }
      audit_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
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
          atividades: string | null
          cargo_funcao: string | null
          created_at: string | null
          data_fim: string | null
          data_inicio: string | null
          empresa_instituicao: string | null
          id: string
          profile_id: string | null
        }
        Insert: {
          atividades?: string | null
          cargo_funcao?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          empresa_instituicao?: string | null
          id?: string
          profile_id?: string | null
        }
        Update: {
          atividades?: string | null
          cargo_funcao?: string | null
          created_at?: string | null
          data_fim?: string | null
          data_inicio?: string | null
          empresa_instituicao?: string | null
          id?: string
          profile_id?: string | null
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
          biografia: string | null
          cargo: string[] | null
          certificacoes: string[] | null
          created_at: string | null
          email: string
          foto_url: string | null
          funcao: string[] | null
          id: string
          idiomas: string[] | null
          informacoes_complementares: string | null
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
          biografia?: string | null
          cargo?: string[] | null
          certificacoes?: string[] | null
          created_at?: string | null
          email: string
          foto_url?: string | null
          funcao?: string[] | null
          id?: string
          idiomas?: string[] | null
          informacoes_complementares?: string | null
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
          biografia?: string | null
          cargo?: string[] | null
          certificacoes?: string[] | null
          created_at?: string | null
          email?: string
          foto_url?: string | null
          funcao?: string[] | null
          id?: string
          idiomas?: string[] | null
          informacoes_complementares?: string | null
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
      create_audit_log: {
        Args: {
          p_action: string
          p_entity_type: string
          p_entity_id?: string
          p_user_name?: string
          p_user_matricula?: string
          p_details?: string
          p_previous_value?: string
          p_new_value?: string
          p_severity_level?: string
          p_operation_type?: string
          p_module?: string
          p_changes_summary?: Json
          p_affected_fields?: string[]
          p_success?: boolean
          p_error_message?: string
        }
        Returns: string
      }
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
      collaboration_type:
        | "consultoria"
        | "parecer"
        | "capacitacao"
        | "projeto"
        | "mentoria"
        | "coaching"
        | "grupo_trabalho"
        | "comissao"
        | "grupo_atuacao"
      contact_preference: "email" | "telefone" | "teams" | "presencial"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      collaboration_type: [
        "consultoria",
        "parecer",
        "capacitacao",
        "projeto",
        "mentoria",
        "coaching",
        "grupo_trabalho",
        "comissao",
        "grupo_atuacao",
      ],
      contact_preference: ["email", "telefone", "teams", "presencial"],
    },
  },
} as const
