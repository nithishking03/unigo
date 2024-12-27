import { supabase } from "@/integrations/supabase/client";

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function searchAddress(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];
  
  try {
    const { data, error } = await supabase.functions.invoke('geocoding', {
      body: { query }
    });

    if (error) {
      console.error('Error fetching address suggestions:', error);
      throw new Error('Failed to fetch address suggestions');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    return [];
  }
}