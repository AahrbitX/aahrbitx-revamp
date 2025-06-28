import { getContrastColor } from "@/lib/getContrast";
import { TemplateProps } from "@/types/Marketplace";
import { Contact, ShoppingCart } from "lucide-react";
import React from "react";

function ActionButtons({ template }: { template: TemplateProps }) {
  const primaryColor = template.colorSchema.find((s) => s.name === "primary");
  const secondaryColor = template.colorSchema.find(
    (s) => s.name === "secondary",
  );

  return (
    <div className="flex w-full gap-4 transition-colors duration-300 *:flex-1">
      <button
        style={{ backgroundColor: secondaryColor?.value }}
        className="flex items-center justify-center gap-2 rounded-xl py-2 hover:opacity-85"
      >
        <Contact
          className="size-5"
          style={{ color: getContrastColor(secondaryColor?.value) }}
        />
        <span style={{ color: getContrastColor(secondaryColor?.value) }}>
          Contact us
        </span>
      </button>
      <button
        style={{ backgroundColor: primaryColor?.value }}
        className="flex items-center justify-center gap-2 rounded-xl py-2 hover:opacity-85"
      >
        <ShoppingCart
          className="size-5 "
          style={{ color: getContrastColor(primaryColor?.value) }}
        />
        <span style={{ color: getContrastColor(primaryColor?.value) }}>
          Buy for {template.price}
        </span>
      </button>
    </div>
  );
}

export default ActionButtons;
