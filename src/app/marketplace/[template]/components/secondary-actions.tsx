"use client";

import { TemplateProps } from "@/types/Marketplace";
import { Globe, LucideIcon, Newspaper } from "lucide-react";
import React from "react";

function SecondaryActions({ template }: { template: TemplateProps }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-start gap-4">
      <SecondaryActionButton Icon={Globe} text="Website" link={template.link} />
      {/* todo : show license */}
      <SecondaryActionButton
        Icon={Newspaper}
        text="License"
        // link={template.link}
      />
    </div>
  );
}

const SecondaryActionButton = ({
  Icon,
  text,
  action,
  link,
}: {
  text: string;
  link?: string;
  action?: () => void;
  Icon: LucideIcon;
}) => {
  const handleClick = () => {
    if (action) return action();
    if (link) window.open(link, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 transition-all hover:bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
    >
      <Icon className="size-4" />
      <span>{text}</span>
    </button>
  );
};

export default SecondaryActions;
