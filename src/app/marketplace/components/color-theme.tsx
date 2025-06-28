import { cn } from "@/lib/utils";
import { TemplateProps } from "@/types/Marketplace";
import React from "react";

type Props = {
  colors: TemplateProps["colorSchema"];
};

function ColorTheme(props: Props) {
  const { colors } = props;

  const parentWidthNegate = colors.length - 1 * 20;

  return (
    <div className="relative flex items-center  p-4">
      {colors.map((color, index) => {
        return (
          <div
            key={color.name}
            title={color.name}
            className={cn(
              "h-10 w-10 rounded-full border-2 border-black/80 dark:border-gray-500",
            )}
            style={{
              backgroundColor: color.value,
              transform: `translateX(${index * -20}px)`, // Adjust overlap spacing
              zIndex: colors.length - index, // Ensure correct stacking
            }}
          />
        );
      })}
    </div>
  );
}

export default ColorTheme;
