const LOCATIONIQ_BASE_URL = 'https://us1.locationiq.com/v1';

export interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function searchAddress(query: string): Promise<GeocodingResult[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `${LOCATIONIQ_BASE_URL}/search.php?key=${import.meta.env.VITE_LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
        query
      )}&format=json&limit=5`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch address suggestions');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    return [];
  }
}