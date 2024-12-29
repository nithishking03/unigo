import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RentalNotification {
  rental_id: string;
  vehicle_type: string;
  vehicle_model: string;
  pickup_location: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  admin_email: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Function invoked: send-rental-notification");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rentalData: RentalNotification = await req.json();
    console.log("Rental notification data:", rentalData);

    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const emailHtml = `
      <h2>New Vehicle Rental Request</h2>
      <p>A new rental request has been submitted:</p>
      <ul>
        <li><strong>Rental ID:</strong> ${rentalData.rental_id}</li>
        <li><strong>Vehicle:</strong> ${rentalData.vehicle_model} (${rentalData.vehicle_type})</li>
        <li><strong>Pickup Location:</strong> ${rentalData.pickup_location}</li>
        <li><strong>Start Date:</strong> ${new Date(rentalData.start_date).toLocaleDateString()}</li>
        <li><strong>End Date:</strong> ${new Date(rentalData.end_date).toLocaleDateString()}</li>
        <li><strong>Total Amount:</strong> ₹${rentalData.total_amount}</li>
      </ul>
      <p>Please review this request in your admin dashboard.</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rentals <onboarding@resend.dev>",
        to: [rentalData.admin_email],
        subject: `New Rental Request - ${rentalData.vehicle_model}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-rental-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);