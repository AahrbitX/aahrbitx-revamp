"use client";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function ClientSettingsButton({ channelName }: { channelName: string }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={`Settings for ${channelName}`}
      onClick={() => window.location.href = `./${channelName.toLowerCase()}`}
    >
      <Settings className="w-5 h-5 text-slate-400 hover:text-white" />
    </Button>
  );
}
