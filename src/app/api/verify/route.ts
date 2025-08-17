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

    // Enhanced logging for production debugging
    const responseInfo = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url,
      redirected: response.redirected,
      type: response.type
    };
    
    console.log("🔍 Supabase verification response:", responseInfo);
    console.log("📍 Token:", token);
    console.log("📍 Type:", type);
    console.log("📍 Supabase URL:", supabaseUrl);

    // Supabase verification can return various success statuses
    if (response.ok){
      // Success - redirect to dashboard
      console.log("✅ Verification successful, redirecting to dashboard");
      console.log("🎯 Redirect URL:", config.dashboardUrl);
      return NextResponse.redirect(config.dashboardUrl, 302);
    } else {
      // Get error details for debugging
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Could not read error response";
      }
      
      console.error("❌ Verification failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        token: token?.substring(0, 10) + "...", // Log first 10 chars for security
        type: type
      });
      
      // Log specific error types for debugging
      if (response.status === 400) {
        console.error("🚨 Bad Request - Check token format and type");
      } else if (response.status === 401) {
        console.error("🚨 Unauthorized - Token might be expired or invalid");
      } else if (response.status === 404) {
        console.error("🚨 Not Found - Check Supabase URL and endpoint");
      } else if (response.status === 500) {
        console.error("🚨 Server Error - Supabase internal error");
      }
      
      // Redirect to error page
      return NextResponse.redirect(config.verificationErrorUrl, 302);
    }
  } catch (err: any) {
    console.error("Verification error:", err);
    
    // Redirect to error page
    return NextResponse.redirect(config.verificationErrorUrl, 302);
  }
}
