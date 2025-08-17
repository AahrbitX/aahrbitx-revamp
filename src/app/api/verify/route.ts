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

    if (response.status === 302 || response.status === 200) {
      // Redirect user to your branded app after verification
      return NextResponse.redirect(config.dashboardUrl, 302);
    } else {
      const errorText = await response.text();
      console.error("Verification failed:", errorText);
      
      // Redirect to error page
      return NextResponse.redirect(config.verificationErrorUrl, 302);
    }
  } catch (err: any) {
    console.error("Verification error:", err);
    
    // Redirect to error page
    return NextResponse.redirect(config.verificationErrorUrl, 302);
  }
}
