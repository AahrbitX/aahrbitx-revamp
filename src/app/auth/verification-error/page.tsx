import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function VerificationErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600">
            Verification Failed
          </CardTitle>
          <CardDescription>
            We couldn't verify your email address. This could be due to:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>• The verification link has expired</li>
            <li>• The link has already been used</li>
            <li>• There was an issue with the verification process</li>
          </ul>
          
          <div className="space-y-3 pt-4">
            <Button asChild className="w-full">
              <Link href="/signup">
                Try Signing Up Again
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <Link href="/signin">
                Go to Login
              </Link>
            </Button>
            
            <Button variant="ghost" asChild className="w-full">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center text-xs text-gray-500 pt-4">
            <p>Need help? Contact our support team</p>
            <Link href="/contact" className="text-blue-600 hover:underline">
              Get Support
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
