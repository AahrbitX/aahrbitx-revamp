import { TemplateProps } from "@/types/Marketplace";
import React from "react";

function TemplatePoints({ template }: { template: TemplateProps }) {

  if(!template.keyAspects) {
    return;
  }

  return (
    <div className="my-4">
      <h2 className="text-center text-xl  font-semibold md:text-start">
        What you get?
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-8">
        {template.keyAspects.map((aspect) => (
          <li key={aspect} className="opacity-75">
            {aspect}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TemplatePoints;
