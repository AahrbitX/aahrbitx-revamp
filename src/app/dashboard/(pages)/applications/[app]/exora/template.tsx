"use client";

import React from "react";
import { ExoraProvider } from "./context";

function ExoraTemplatePage({ children }: { children: React.ReactNode }) {
  return <ExoraProvider>{children}</ExoraProvider>;
}

export default ExoraTemplatePage;
