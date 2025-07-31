import React from "react";

import { Trio } from "ldrs/react";
import "ldrs/react/Trio.css";

function DashboardLoadingPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Trio size="45" speed="1.3" color="grey" />
    </div>
  );
}

export default DashboardLoadingPage;
