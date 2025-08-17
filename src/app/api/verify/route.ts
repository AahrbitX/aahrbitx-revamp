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

    const response = await fetch(verifyUrl, { 
      method: "GET", 
      redirect: "manual" 
    });

    // Supabase verification can return various success statuses
    // 303 = See Other (successful redirect), 302 = Found (successful redirect)
    const isSuccess = response.status === 303 || response.status === 302 || response.status === 200 || response.status === 204;
    
    if (isSuccess){
      // Success - redirect to dashboard
      return NextResponse.redirect(config.dashboardUrl, 302);
    } else {
      // Get error details for debugging
      let errorText = "";
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = "Could not read error response";
      }
      
      // Return debug info instead of redirecting to error page
      return NextResponse.json({
        error: "Verification failed",
        debug: {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          token: token?.substring(0, 10) + "...",
          type: type,
          supabaseUrl: supabaseUrl,
          verifyUrl: verifyUrl
        }
      }, { status: response.status });
    }
  } catch (err: any) {
    // Redirect to error page on unexpected errors
    return NextResponse.redirect(config.verificationErrorUrl, 302);
  }
}
