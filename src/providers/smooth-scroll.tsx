"use client"

import { ReactLenis } from "lenis/react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}