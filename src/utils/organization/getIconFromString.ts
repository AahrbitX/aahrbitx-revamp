import * as Icons from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

/**
 * Transforms organization navigation JSON into app-specific navigation structure.
 *
 * @param name - string identifier for the icon
 * @returns The corresponding icon component or a fallback icon.
 */

function getIconFromString(
  name: string
): ForwardRefExoticComponent<
  Omit<Icons.LucideProps, "ref"> & RefAttributes<SVGSVGElement>
> {
  return (Icons[name as keyof typeof Icons] as Icons.LucideIcon) ?? Icons.Badge;
}

export default getIconFromString;
