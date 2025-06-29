import Link from "next/link";

import { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  // other metadata
};

const SignupPage = () => {
  return (
    <>
      <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10 mt-8">
        <div className="w-full max-w-sm md:max-w-3xl">
          <SignupForm />
        </div>
      </div>
    </>
  );
};

export default SignupPage;
