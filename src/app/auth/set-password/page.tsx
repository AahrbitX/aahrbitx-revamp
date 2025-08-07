import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

function SetPasswordPage() {
  const handleSetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    // Logic to handle setting the password
    toast.success("Password set successfully!");
  };

  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Set Password</h1>
      <Input type="password" placeholder="New Password" />
      <Input type="password" placeholder="Confirm Password" className="mt-4" />
      <Button onClick={handleSetPassword}>Set Password</Button>
    </div>
  );
}

export default SetPasswordPage;
