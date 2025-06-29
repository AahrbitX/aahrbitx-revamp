import Link from "next/link";

import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign In",
  // other metadata
};

const SigninPage = () => {
  return (
    <>
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-6 md:p-10 mt-8">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
    </>
  );
};

export default SigninPage;
