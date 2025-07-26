import { SquareTerminal } from "lucide-react";

export const defaultNavigations = [
  {
    title: "Products",
    icon: SquareTerminal,
    isActive: false,
    items: [
      {
        title: "All Products",
        url: "/dashboard/products",
      },
      {
        title: "Templates",
        url: "/dashboard/products/templates",
      },
    ],
  },
];
