import { templateData, commingSoonTemplates } from "@/static/templatesData";
import React from "react";
import MarketPlaceCard from "./components/marketplace-card";

function MarketPlacePage() {
  const templates = [...templateData, ...commingSoonTemplates];

  return (
    <>
      <section className="container relative h-full min-h-screen w-full pt-28 lg:pt-[135px]">
        <h1 className="text-center font-sans text-3xl font-semibold md:text-4xl lg:text-5xl">
          Ready-to-Go Templates
        </h1>
        <p className="mt-4 text-center text-lg font-normal text-gray-500 dark:text-gray-400 md:mt-3">
          Explore our diverse range of templates to find the perfect fit for
          your project.
        </p>
        <div className="mb-10 mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((template) => {
            return <MarketPlaceCard key={template.id} {...template} />;
          })}
        </div>
      </section>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-[-1] bg-[linear-gradient(to_right,#CBCBCB2E_1px,transparent_1px),linear-gradient(to_bottom,#CBCBCB2E_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"></div>
    </>
  );
}

export default MarketPlacePage;
