import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  if (!token || !type) {
    return NextResponse.json(
      { error: "Missing token or type" },
      { status: 400 }
    );
  }

  try {
    // Call Supabase verify endpoint
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const verifyUrl = `${supabaseUrl}/auth/v1/verify?token=${token}&type=${type}`;

    console.log("Calling Supabase verification:", verifyUrl);

    const response = await fetch(verifyUrl, { 
      method: "GET", 
      redirect: "manual" 
    });

    // Log the response for debugging
    console.log("Supabase verification response:", {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    });

    // Supabase verification can return various success statuses
    if (response.status === 302 || response.status === 200 || response.status === 204) {
      // Success - redirect to dashboard
      console.log("Verification successful, redirecting to dashboard");
      return NextResponse.redirect(config.dashboardUrl, 302);
    } else {
      // Get error details for debugging
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Could not read error response";
      }
      
      console.error("Verification failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      
      // Redirect to error page
      return NextResponse.redirect(config.verificationErrorUrl, 302);
    }
  } catch (err: any) {
    console.error("Verification error:", err);
    
    // Redirect to error page
    return NextResponse.redirect(config.verificationErrorUrl, 302);
  }
}
