export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      error_notebook: {
        Row: {
          error_count: number
          id: string
          last_error_at: string
          question_id: string
          resolved: boolean
          topic_id: string
          user_id: string
        }
        Insert: {
          error_count?: number
          id?: string
          last_error_at?: string
          question_id: string
          resolved?: boolean
          topic_id: string
          user_id: string
        }
        Update: {
          error_count?: number
          id?: string
          last_error_at?: string
          question_id?: string
          resolved?: boolean
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "error_notebook_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "error_notebook_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      essay_corrections: {
        Row: {
          created_at: string
          errors: Json
          essay_id: string
          id: string
          improvement_plan: string | null
          rewrites: Json
          score: number | null
          strengths: Json
          user_id: string
          weaknesses: Json
        }
        Insert: {
          created_at?: string
          errors?: Json
          essay_id: string
          id?: string
          improvement_plan?: string | null
          rewrites?: Json
          score?: number | null
          strengths?: Json
          user_id: string
          weaknesses?: Json
        }
        Update: {
          created_at?: string
          errors?: Json
          essay_id?: string
          id?: string
          improvement_plan?: string | null
          rewrites?: Json
          score?: number | null
          strengths?: Json
          user_id?: string
          weaknesses?: Json
        }
        Relationships: [
          {
            foreignKeyName: "essay_corrections_essay_id_fkey"
            columns: ["essay_id"]
            isOneToOne: false
            referencedRelation: "essays"
            referencedColumns: ["id"]
          },
        ]
      }
      essay_prompts: {
        Row: {
          command: string
          id: string
          motivating_texts: Json
          theme: string
          week_number: number
        }
        Insert: {
          command: string
          id: string
          motivating_texts?: Json
          theme: string
          week_number: number
        }
        Update: {
          command?: string
          id?: string
          motivating_texts?: Json
          theme?: string
          week_number?: number
        }
        Relationships: []
      }
      essays: {
        Row: {
          body: string
          created_at: string
          id: string
          prompt_id: string
          status: string
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          prompt_id: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          prompt_id?: string
          status?: string
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "essays_prompt_id_fkey"
            columns: ["prompt_id"]
            isOneToOne: false
            referencedRelation: "essay_prompts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          exam_date: string
          goal: string
          id: string
          level: string
          onboarded: boolean
          plan_start: string
          target_course: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          exam_date?: string
          goal?: string
          id: string
          level?: string
          onboarded?: boolean
          plan_start?: string
          target_course?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          exam_date?: string
          goal?: string
          id?: string
          level?: string
          onboarded?: boolean
          plan_start?: string
          target_course?: string
          updated_at?: string
        }
        Relationships: []
      }
      question_attempts: {
        Row: {
          created_at: string
          elapsed_seconds: number
          id: string
          is_correct: boolean
          question_id: string
          selected_answer: string
          source: string
          subject_id: string
          topic_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          elapsed_seconds?: number
          id?: string
          is_correct: boolean
          question_id: string
          selected_answer: string
          source?: string
          subject_id: string
          topic_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          elapsed_seconds?: number
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_answer?: string
          source?: string
          subject_id?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_attempts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          correct_answer: string
          difficulty: number
          explanation: string
          id: string
          options: Json
          statement: string
          subject_id: string
          topic_id: string
        }
        Insert: {
          correct_answer: string
          difficulty?: number
          explanation: string
          id: string
          options: Json
          statement: string
          subject_id: string
          topic_id: string
        }
        Update: {
          correct_answer?: string
          difficulty?: number
          explanation?: string
          id?: string
          options?: Json
          statement?: string
          subject_id?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          interval_days: number
          review_type: string
          scheduled_for: string
          topic_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          interval_days: number
          review_type?: string
          scheduled_for: string
          topic_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          interval_days?: number
          review_type?: string
          scheduled_for?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_answers: {
        Row: {
          attempt_id: string
          is_correct: boolean | null
          marked_for_review: boolean
          position: number
          question_id: string
          selected_answer: string | null
          user_id: string
        }
        Insert: {
          attempt_id: string
          is_correct?: boolean | null
          marked_for_review?: boolean
          position?: number
          question_id: string
          selected_answer?: string | null
          user_id: string
        }
        Update: {
          attempt_id?: string
          is_correct?: boolean | null
          marked_for_review?: boolean
          position?: number
          question_id?: string
          selected_answer?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "simulation_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulation_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_attempts: {
        Row: {
          correct_count: number
          duration_minutes: number
          finished_at: string | null
          id: string
          mode: string
          question_ids: Json
          score: number | null
          started_at: string
          subject_id: string | null
          title: string
          topic_id: string | null
          total_count: number
          user_id: string
        }
        Insert: {
          correct_count?: number
          duration_minutes?: number
          finished_at?: string | null
          id?: string
          mode?: string
          question_ids?: Json
          score?: number | null
          started_at?: string
          subject_id?: string | null
          title: string
          topic_id?: string | null
          total_count?: number
          user_id: string
        }
        Update: {
          correct_count?: number
          duration_minutes?: number
          finished_at?: string | null
          id?: string
          mode?: string
          question_ids?: Json
          score?: number | null
          started_at?: string
          subject_id?: string | null
          title?: string
          topic_id?: string | null
          total_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "simulation_attempts_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulation_attempts_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          created_at: string
          duration_seconds: number
          id: string
          kind: string
          topic_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_seconds?: number
          id?: string
          kind?: string
          topic_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          duration_seconds?: number
          id?: string
          kind?: string
          topic_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "study_sessions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          id: string
          name: string
          position: number
        }
        Insert: {
          id: string
          name: string
          position?: number
        }
        Update: {
          id?: string
          name?: string
          position?: number
        }
        Relationships: []
      }
      task_completions: {
        Row: {
          completed_at: string
          day_number: number
          id: string
          kind: string
          task_key: string
          topic_id: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string
          day_number: number
          id?: string
          kind: string
          task_key: string
          topic_id?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string
          day_number?: number
          id?: string
          kind?: string
          task_key?: string
          topic_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_completions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          duration_min: number
          example_md: string
          id: string
          learn_md: string
          name: string
          objective: string
          position: number
          resource_label: string | null
          resource_url: string | null
          review_md: string
          subject_id: string
        }
        Insert: {
          duration_min?: number
          example_md?: string
          id: string
          learn_md?: string
          name: string
          objective?: string
          position?: number
          resource_label?: string | null
          resource_url?: string | null
          review_md?: string
          subject_id: string
        }
        Update: {
          duration_min?: number
          example_md?: string
          id?: string
          learn_md?: string
          name?: string
          objective?: string
          position?: number
          resource_label?: string | null
          resource_url?: string | null
          review_md?: string
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "topics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          last_study_date: string | null
          streak_days: number
          updated_at: string
          user_id: string
          xp: number
        }
        Insert: {
          last_study_date?: string | null
          streak_days?: number
          updated_at?: string
          user_id: string
          xp?: number
        }
        Update: {
          last_study_date?: string | null
          streak_days?: number
          updated_at?: string
          user_id?: string
          xp?: number
        }
        Relationships: []
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
    Enums: {},
  },
} as const
