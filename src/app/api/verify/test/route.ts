import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  if (!token || !type) {
    return NextResponse.json({
      error: "Missing token or type",
      message: "Use: /api/verify/test?token=YOUR_TOKEN&type=signup"
    });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const verifyUrl = `${supabaseUrl}/auth/v1/verify?token=${token}&type=${type}`;

    console.log("Testing verification with:", verifyUrl);

    const response = await fetch(verifyUrl, { 
      method: "GET", 
      redirect: "manual" 
    });

    // Get response details
    const responseData = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url,
      redirected: response.redirected,
      type: response.type
    };

    let bodyText = "";
    try {
      bodyText = await response.text();
    } catch (e) {
      bodyText = "Could not read response body";
    }

    return NextResponse.json({
      message: "Verification test completed",
      supabaseUrl: verifyUrl,
      response: responseData,
      body: bodyText,
      isSuccess: response.status === 302 || response.status === 200 || response.status === 204
    });

  } catch (err: any) {
    return NextResponse.json({
      error: "Test failed",
      message: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}
