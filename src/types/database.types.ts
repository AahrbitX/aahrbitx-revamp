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
      client_websites: {
        Row: {
          amount: number | null
          bing_seo_configured: boolean | null
          client_company: string | null
          client_email: string | null
          client_name: string | null
          created_at: string | null
          delivered_on: string | null
          domain_expiry_date: string | null
          domain_provider: string | null
          domain_registered_by: string | null
          google_seo_configured: boolean | null
          id: string
          is_maintenance_active: boolean | null
          maintenance_fee: number | null
          slug: string
          started_on: string | null
          tech_stack: string[] | null
          title: string
          url: string | null
        }
        Insert: {
          amount?: number | null
          bing_seo_configured?: boolean | null
          client_company?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string | null
          delivered_on?: string | null
          domain_expiry_date?: string | null
          domain_provider?: string | null
          domain_registered_by?: string | null
          google_seo_configured?: boolean | null
          id?: string
          is_maintenance_active?: boolean | null
          maintenance_fee?: number | null
          slug: string
          started_on?: string | null
          tech_stack?: string[] | null
          title: string
          url?: string | null
        }
        Update: {
          amount?: number | null
          bing_seo_configured?: boolean | null
          client_company?: string | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string | null
          delivered_on?: string | null
          domain_expiry_date?: string | null
          domain_provider?: string | null
          domain_registered_by?: string | null
          google_seo_configured?: boolean | null
          id?: string
          is_maintenance_active?: boolean | null
          maintenance_fee?: number | null
          slug?: string
          started_on?: string | null
          tech_stack?: string[] | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      template_pricings: {
        Row: {
          id: string
          item: string
          offer: string | null
          price: string
          service_type: string
          template_id: string
        }
        Insert: {
          id?: string
          item: string
          offer?: string | null
          price: string
          service_type: string
          template_id: string
        }
        Update: {
          id?: string
          item?: string
          offer?: string | null
          price?: string
          service_type?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_pricings_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          color_schema: Json | null
          coming_soon: boolean | null
          created_at: string | null
          description: string | null
          full_description: string | null
          fullpage_image: string | null
          id: string
          illustrations: Json | null
          key_aspects: string[] | null
          link: string | null
          meta_images: Json | null
          rating: number | null
          slug: string
          tags: string[] | null
          title: string
        }
        Insert: {
          color_schema?: Json | null
          coming_soon?: boolean | null
          created_at?: string | null
          description?: string | null
          full_description?: string | null
          fullpage_image?: string | null
          id?: string
          illustrations?: Json | null
          key_aspects?: string[] | null
          link?: string | null
          meta_images?: Json | null
          rating?: number | null
          slug: string
          tags?: string[] | null
          title: string
        }
        Update: {
          color_schema?: Json | null
          coming_soon?: boolean | null
          created_at?: string | null
          description?: string | null
          full_description?: string | null
          fullpage_image?: string | null
          id?: string
          illustrations?: Json | null
          key_aspects?: string[] | null
          link?: string | null
          meta_images?: Json | null
          rating?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
        }
        Relationships: []
      }
      user_management: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["role"]
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: [
          {
            foreignKeyName: "user_management_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "app_users_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      app_users_view: {
        Row: {
          app_role: Database["public"]["Enums"]["role"] | null
          aud: string | null
          banned_until: string | null
          confirmation_sent_at: string | null
          confirmation_token: string | null
          confirmed_at: string | null
          created_at: string | null
          deleted_at: string | null
          email: string | null
          email_change: string | null
          email_change_confirm_status: number | null
          email_change_sent_at: string | null
          email_change_token_current: string | null
          email_change_token_new: string | null
          email_confirmed_at: string | null
          encrypted_password: string | null
          id: string | null
          instance_id: string | null
          invited_at: string | null
          is_anonymous: boolean | null
          is_sso_user: boolean | null
          is_super_admin: boolean | null
          last_sign_in_at: string | null
          phone: string | null
          phone_change: string | null
          phone_change_sent_at: string | null
          phone_change_token: string | null
          phone_confirmed_at: string | null
          raw_app_meta_data: Json | null
          raw_user_meta_data: Json | null
          reauthentication_sent_at: string | null
          reauthentication_token: string | null
          recovery_sent_at: string | null
          recovery_token: string | null
          role: string | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "superuser" | "admin" | "user"
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
      role: ["superuser", "admin", "user"],
    },
  },
} as const
