
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== "POST") {
      return new Response("Invalid method", { status: 405, headers: corsHeaders });
    }

    const body = await req.json();
    if (!body || !body.email) {
      return new Response("Missing email", { status: 400, headers: corsHeaders });
    }
    if (body.email !== "animeshbaral10@gmail.com") {
      return new Response("Unauthorized email", { status: 403, headers: corsHeaders });
    }

    // Admin password is hardcoded for demonstration.
    const adminPassword = "password";

    // Send the mail using Resend (requires RESEND_API_KEY to be set as a secret)
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      return new Response("Resend API key is not configured", { status: 500, headers: corsHeaders });
    }

    // Compose email
    const emailPayload = {
      from: "ZippyTrip <onboarding@resend.dev>",
      to: [body.email],
      subject: "Your ZippyTrip Admin Password",
      html: `
        <h2>Admin Password Recovery</h2>
        <p>Your password is: <b>${adminPassword}</b></p>
        <p>If you did not request this, please contact support immediately.</p>
      `,
    };

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!resendRes.ok) {
      const error = await resendRes.text();
      return new Response(`Failed to send mail: ${error}`, { status: 500, headers: corsHeaders });
    }

    return new Response(JSON.stringify({ sent: true }), { status: 200, headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
