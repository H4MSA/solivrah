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
      ai_logs: {
        Row: {
          error: string | null
          id: string
          prompt: string
          response: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          error?: string | null
          id?: string
          prompt: string
          response: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          error?: string | null
          id?: string
          prompt?: string
          response?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_history: {
        Row: {
          id: string
          message: string
          response: string
          theme: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          message: string
          response: string
          theme: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          message?: string
          response?: string
          theme?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          completed_tasks: number | null
          created_at: string | null
          id: string
          streak: number | null
          theme: string
          updated_at: string | null
          username: string
          xp: number | null
        }
        Insert: {
          completed_tasks?: number | null
          created_at?: string | null
          id: string
          streak?: number | null
          theme?: string
          updated_at?: string | null
          username: string
          xp?: number | null
        }
        Update: {
          completed_tasks?: number | null
          created_at?: string | null
          id?: string
          streak?: number | null
          theme?: string
          updated_at?: string | null
          username?: string
          xp?: number | null
        }
        Relationships: []
      }
      quests: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          day: number
          description: string
          difficulty: string
          id: string
          requires_photo: boolean | null
          theme: string
          title: string
          user_id: string | null
          verification_photo_url: string | null
          verification_status: string | null
          xp: number
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          day: number
          description: string
          difficulty: string
          id?: string
          requires_photo?: boolean | null
          theme: string
          title: string
          user_id?: string | null
          verification_photo_url?: string | null
          verification_status?: string | null
          xp: number
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          day?: number
          description?: string
          difficulty?: string
          id?: string
          requires_photo?: boolean | null
          theme?: string
          title?: string
          user_id?: string | null
          verification_photo_url?: string | null
          verification_status?: string | null
          xp?: number
        }
        Relationships: [
          {
            foreignKeyName: "quests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          biggest_struggle: string
          created_at: string | null
          daily_commitment: number
          goal: string
          id: string
          theme: string
          user_id: string | null
        }
        Insert: {
          biggest_struggle: string
          created_at?: string | null
          daily_commitment: number
          goal: string
          id?: string
          theme: string
          user_id?: string | null
        }
        Update: {
          biggest_struggle?: string
          created_at?: string | null
          daily_commitment?: number
          goal?: string
          id?: string
          theme?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_user_id_fkey"
            columns: ["user_id"]
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
