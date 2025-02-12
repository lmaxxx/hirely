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
      application: {
        Row: {
          author: string
          company: number
          created_at: string
          description: string
          id: number
          modified_at: string
          position: string
          published_at: string | null
        }
        Insert: {
          author: string
          company: number
          created_at?: string
          description?: string
          id?: number
          modified_at?: string
          position?: string
          published_at?: string | null
        }
        Update: {
          author?: string
          company?: number
          created_at?: string
          description?: string
          id?: number
          modified_at?: string
          position?: string
          published_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_company_fkey"
            columns: ["company"]
            isOneToOne: false
            referencedRelation: "company"
            referencedColumns: ["id"]
          },
        ]
      }
      company: {
        Row: {
          author: string
          created_at: string
          description: string
          id: number
          logo: string
          modified_at: string
          name: string
        }
        Insert: {
          author: string
          created_at?: string
          description?: string
          id?: number
          logo?: string
          modified_at?: string
          name?: string
        }
        Update: {
          author?: string
          created_at?: string
          description?: string
          id?: number
          logo?: string
          modified_at?: string
          name?: string
        }
        Relationships: []
      }
      field: {
        Row: {
          application: number
          created_at: string
          id: number
          label: string
          modified_at: string
          name: string
          order: number
          placeholder: string | null
          required: boolean
          type: string
        }
        Insert: {
          application: number
          created_at?: string
          id?: number
          label?: string
          modified_at?: string
          name?: string
          order?: number
          placeholder?: string | null
          required?: boolean
          type?: string
        }
        Update: {
          application?: number
          created_at?: string
          id?: number
          label?: string
          modified_at?: string
          name?: string
          order?: number
          placeholder?: string | null
          required?: boolean
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "field_application_fkey"
            columns: ["application"]
            isOneToOne: false
            referencedRelation: "application"
            referencedColumns: ["id"]
          },
        ]
      }
      submission: {
        Row: {
          application: number
          id: number
          submitted_at: string
        }
        Insert: {
          application: number
          id?: number
          submitted_at?: string
        }
        Update: {
          application?: number
          id?: number
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "Submission_application_fkey"
            columns: ["application"]
            isOneToOne: false
            referencedRelation: "application"
            referencedColumns: ["id"]
          },
        ]
      }
      submitted_field: {
        Row: {
          field: number
          id: number
          submission: number
          submitted_at: string
          value: string | null
        }
        Insert: {
          field: number
          id?: number
          submission: number
          submitted_at?: string
          value?: string | null
        }
        Update: {
          field?: number
          id?: number
          submission?: number
          submitted_at?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submitted_field_field_fkey"
            columns: ["field"]
            isOneToOne: false
            referencedRelation: "field"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submitted_field_submission_fkey"
            columns: ["submission"]
            isOneToOne: false
            referencedRelation: "submission"
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
      FType:
        | "Text"
        | "Number"
        | "Link"
        | "TextArea"
        | "List"
        | "File"
        | "Empty"
        | "Checkbox"
        | "Radio"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
