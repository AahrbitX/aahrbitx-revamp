import { AppUserNavType } from "@/app/dashboard/components/app-sidebar";
import getIconFromString from "./getIconFromString";
import { Json } from "@/types/database.types";

/**
 * Transforms organization navigation JSON into app-specific navigation structure.
 *
 * @param navData - The JSON navigation data fetched from Supabase.
 * @param subscribed_product - The product slug used to build URLs.
 * @returns Array of navigation items formatted for the app.
 */

type NavItem = {
  title: string;
  slug: string;
};

type NavBlock = {
  title: string;
  icon: string;
  isActive: boolean;
  items: NavItem[];
};

export const transformOrgNavToAppNav = (
  navData: Json,
  subscribed_product: string
): AppUserNavType => {
  const safeData = navData as NavBlock;

  return {
    title: safeData.title,
    icon: getIconFromString(safeData.icon),
    isActive: safeData.isActive,
    items: safeData.items.map((item) => ({
      title: item.title,
      url: `/dashboard/products/${subscribed_product}/${item.slug}`,
    })),
  };
};
