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
      admin_notifications: {
        Row: {
          content: Json
          created_at: string
          id: string
          is_read: boolean | null
          type: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          is_read?: boolean | null
          type: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          is_read?: boolean | null
          type?: string
        }
        Relationships: []
      }
      drivers: {
        Row: {
          average_rating: number | null
          created_at: string
          current_location: unknown | null
          full_name: string
          id: string
          is_active: boolean | null
          phone_number: string
          updated_at: string
          user_id: string
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["ride_type"]
        }
        Insert: {
          average_rating?: number | null
          created_at?: string
          current_location?: unknown | null
          full_name: string
          id?: string
          is_active?: boolean | null
          phone_number: string
          updated_at?: string
          user_id: string
          vehicle_number: string
          vehicle_type: Database["public"]["Enums"]["ride_type"]
        }
        Update: {
          average_rating?: number | null
          created_at?: string
          current_location?: unknown | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone_number?: string
          updated_at?: string
          user_id?: string
          vehicle_number?: string
          vehicle_type?: Database["public"]["Enums"]["ride_type"]
        }
        Relationships: []
      }
      parcel_deliveries: {
        Row: {
          created_at: string
          delivery_instructions: string | null
          dropoff_address: string
          estimated_delivery_time: string | null
          id: string
          package_details: string
          pickup_address: string
          priority: string | null
          recipient_name: string
          recipient_phone: string
          sender_name: string
          sender_phone: string
          status: Database["public"]["Enums"]["parcel_status"] | null
          updated_at: string
          user_id: string
          weight_category: string | null
        }
        Insert: {
          created_at?: string
          delivery_instructions?: string | null
          dropoff_address: string
          estimated_delivery_time?: string | null
          id?: string
          package_details: string
          pickup_address: string
          priority?: string | null
          recipient_name: string
          recipient_phone: string
          sender_name?: string
          sender_phone?: string
          status?: Database["public"]["Enums"]["parcel_status"] | null
          updated_at?: string
          user_id: string
          weight_category?: string | null
        }
        Update: {
          created_at?: string
          delivery_instructions?: string | null
          dropoff_address?: string
          estimated_delivery_time?: string | null
          id?: string
          package_details?: string
          pickup_address?: string
          priority?: string | null
          recipient_name?: string
          recipient_phone?: string
          sender_name?: string
          sender_phone?: string
          status?: Database["public"]["Enums"]["parcel_status"] | null
          updated_at?: string
          user_id?: string
          weight_category?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ride_requests: {
        Row: {
          created_at: string
          driver_id: string | null
          dropoff_address: string
          dropoff_location: unknown
          fare_amount: number | null
          id: string
          pickup_address: string
          pickup_location: unknown
          ride_type: Database["public"]["Enums"]["ride_type"]
          status: Database["public"]["Enums"]["ride_status"] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          driver_id?: string | null
          dropoff_address: string
          dropoff_location: unknown
          fare_amount?: number | null
          id?: string
          pickup_address: string
          pickup_location: unknown
          ride_type: Database["public"]["Enums"]["ride_type"]
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          driver_id?: string | null
          dropoff_address?: string
          dropoff_location?: unknown
          fare_amount?: number | null
          id?: string
          pickup_address?: string
          pickup_location?: unknown
          ride_type?: Database["public"]["Enums"]["ride_type"]
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ride_requests_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_rentals: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          pickup_location: string
          start_date: string
          status: Database["public"]["Enums"]["rental_status"] | null
          total_amount: number
          updated_at: string | null
          user_id: string
          vehicle_model: string
          vehicle_type: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          pickup_location: string
          start_date: string
          status?: Database["public"]["Enums"]["rental_status"] | null
          total_amount: number
          updated_at?: string | null
          user_id: string
          vehicle_model: string
          vehicle_type: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          pickup_location?: string
          start_date?: string
          status?: Database["public"]["Enums"]["rental_status"] | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string
          vehicle_model?: string
          vehicle_type?: string
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
      parcel_status: "pending" | "in_transit" | "delivered" | "cancelled"
      rental_status: "pending" | "confirmed" | "completed" | "cancelled"
      ride_status:
        | "pending"
        | "accepted"
        | "in_progress"
        | "completed"
        | "cancelled"
      ride_type: "car" | "bike" | "auto"
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
