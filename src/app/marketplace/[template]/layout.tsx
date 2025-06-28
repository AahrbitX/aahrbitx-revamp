import React from "react";

function TemplatePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" container min-h-screen pt-28 lg:pt-[135px]">
      {children}
    </section>
  );
}

export default TemplatePageLayout;
