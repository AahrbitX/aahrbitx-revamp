import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  if (!token || !type) {
    return NextResponse.json({
      error: "Missing token or type",
      usage: "Use: /api/verify/debug?token=YOUR_TOKEN&type=signup"
    });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const verifyUrl = `${supabaseUrl}/auth/v1/verify?token=${token}&type=${type}`;

    console.log("🔍 Debug: Testing verification with:", verifyUrl);

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

    // Check if it's a success
    const isSuccess = response.ok || response.status === 302 || response.status === 200 || response.status === 204;

    return NextResponse.json({
      message: "Debug verification completed",
      input: {
        token: token.substring(0, 10) + "...",
        type: type,
        supabaseUrl: supabaseUrl
      },
      request: {
        verifyUrl: verifyUrl,
        method: "GET"
      },
      response: responseData,
      body: bodyText,
      analysis: {
        isSuccess: isSuccess,
        statusCategory: response.status >= 200 && response.status < 300 ? "success" : 
                       response.status >= 400 && response.status < 500 ? "client_error" : 
                       response.status >= 500 ? "server_error" : "other",
        shouldRedirect: response.status === 302,
        isOk: response.ok
      },
      recommendations: isSuccess ? 
        "Verification should succeed - check why redirect isn't working" :
        response.status === 404 ? 
          "Endpoint not found - check Supabase URL and endpoint path" :
          response.status === 400 ? 
            "Bad request - check token format and type" :
            response.status === 401 ? 
              "Unauthorized - token might be expired or invalid" :
              "Unknown error - check Supabase logs"
    });

  } catch (err: any) {
    return NextResponse.json({
      error: "Debug failed",
      message: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}
