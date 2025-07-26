import { Database } from "../database.types";

export type UserOrganizationType =
  Database["public"]["Views"]["user_organizations"]["Row"];

export type OrganisationNavType = {
  title: string;
  icon: string;
  isActive: boolean;
  items: {
    title: string;
    slug: string;
  }[];
};
