import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    console.log('Received query:', query)
    
    if (!query?.trim()) {
      console.log('Empty query, returning empty results')
      return new Response(
        JSON.stringify([]),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('LOCATIONIQ_API_KEY')
    if (!apiKey) {
      console.error('LocationIQ API key not found')
      throw new Error('LocationIQ API key not configured')
    }

    console.log('Fetching suggestions from LocationIQ')
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(
        query
      )}&format=json&limit=5`
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('LocationIQ API error:', errorText)
      throw new Error('Failed to fetch address suggestions')
    }

    const data = await response.json()
    console.log('Successfully fetched suggestions')
    
    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in geocoding function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})