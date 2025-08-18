"use client";

import { useState, useEffect } from "react";

export default function EnvCheckPage() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: string | null;
    supabaseKey: string | null;
    hasEnvFile: boolean;
  }>({
    supabaseUrl: null,
    supabaseKey: null,
    hasEnvFile: false,
  });

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    setEnvStatus({
      supabaseUrl,
      supabaseKey,
      hasEnvFile: !!(supabaseUrl && supabaseKey),
    });
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Environment Check</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Environment Variables Status</h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">SUPABASE_URL: </span>
              <span className={envStatus.supabaseUrl ? "text-green-600" : "text-red-600"}>
                {envStatus.supabaseUrl ? "✅ Set" : "❌ Missing"}
              </span>
              {envStatus.supabaseUrl && (
                <div className="text-sm text-gray-600 mt-1 break-all">
                  {envStatus.supabaseUrl}
                </div>
              )}
            </div>
            <div>
              <span className="font-medium">SUPABASE_ANON_KEY: </span>
              <span className={envStatus.supabaseKey ? "text-green-600" : "text-red-600"}>
                {envStatus.supabaseKey ? "✅ Set" : "❌ Missing"}
              </span>
              {envStatus.supabaseKey && (
                <div className="text-sm text-gray-600 mt-1 break-all">
                  {envStatus.supabaseKey.substring(0, 20)}...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold mb-2">Configuration Status</h2>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Environment File: </span>
              <span className={envStatus.hasEnvFile ? "text-green-600" : "text-red-600"}>
                {envStatus.hasEnvFile ? "✅ Properly Configured" : "❌ Missing or Incomplete"}
              </span>
            </div>
          </div>
        </div>

        {!envStatus.hasEnvFile && (
          <div className="p-4 border rounded-lg bg-red-50 border-red-200">
            <h2 className="font-semibold mb-2 text-red-800">Action Required</h2>
            <p className="text-red-700 mb-3">
              Your Supabase environment variables are not configured. This is likely causing the refresh token errors.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-red-600">1. Create a <code className="bg-red-100 px-1 rounded">.env.local</code> file in your project root</p>
              <p className="text-sm text-red-600">2. Add your Supabase credentials:</p>
              <pre className="bg-red-100 p-2 rounded text-xs text-red-800">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here`}
              </pre>
              <p className="text-sm text-red-600">3. Restart your development server</p>
            </div>
          </div>
        )}

        {envStatus.hasEnvFile && (
          <div className="p-4 border rounded-lg bg-green-50 border-green-200">
            <h2 className="font-semibold mb-2 text-green-800">Configuration OK</h2>
            <p className="text-green-700">
              Your environment variables are properly configured. If you're still getting refresh token errors, 
              try clearing your browser cookies and restarting the development server.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
