"use client";

import { useState } from "react";
import { TemplateProps } from "@/types/Marketplace";
import { cn } from "@/lib/utils";

type Props = {
  template: TemplateProps;
};

export default function PriceBreakdown({ template }: Props) {
  const [mode, setMode] = useState<"selfService" | "ourService">("selfService");

  const priceData = template.priceBreakdown[mode];

  return (
    <section className="mt-24 grid w-full gap-6 lg:grid-cols-2">
      <div className="flex flex-col">
        <h2 className=" text-center text-3xl font-semibold text-primary lg:text-start">
          Price Breakdown and Add-ons
        </h2>

        <div className="mb-3 mt-6 flex w-full items-center justify-center gap-4 lg:justify-start">
          <button
            onClick={() => setMode("selfService")}
            className={`rounded-xl px-4 py-2 text-lg font-medium ${
              mode === "selfService"
                ? "bg-primary text-black"
                : "bg-muted text-foreground"
            }`}
          >
            Self Service
          </button>
          <button
            onClick={() => setMode("ourService")}
            className={`rounded-xl px-4 py-2 text-lg font-medium ${
              mode === "ourService"
                ? "bg-primary text-black"
                : "bg-muted text-foreground"
            }`}
          >
            Our Service
          </button>
        </div>
        <section aria-labelledby="price-info">
          <h3 id="price-info" className="sr-only">
            Template License and Purchase Terms
          </h3>
          <p className="text-muted-foreground mt-2 text-sm lg:mt-4">
            <strong>License Notice:</strong> This template is licensed for
            individual or business use upon purchase. Redistribution, resale, or
            unauthorized sharing is strictly prohibited.
            <strong> All sales are final</strong> — no refunds will be issued
            once the template is delivered. Buyers are responsible for content
            integration unless opting for our service. By purchasing, you agree
            to these terms.
          </p>
        </section>
      </div>

      <table className="mx-auto my-6 w-full max-w-md table-auto border-separate border-spacing-y-2 text-sm">
        <thead>
          <tr className="text-left text-gray-600 dark:text-gray-300">
            <th className="pb-2">Item</th>
            <th className="pb-2">
              Price <span className="text-xs opacity-60">(INR)</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {priceData.map((item) => {
            const hasOffer = typeof item.offer === "number";
            return (
              <tr
                key={item.item}
                className="rounded-md bg-gray-50 dark:bg-neutral-900"
              >
                <td className="px-3 py-2 font-medium text-gray-800 dark:text-white">
                  {item.item}
                </td>
                <td className="px-3 py-2 text-gray-800 dark:text-white">
                  <span
                    className={cn(hasOffer && "line-through opacity-60")}
                  >
                    {typeof item.price === "number"
                      ? item.price.toLocaleString("en-IN")
                      : item.price}
                  </span>
                  {hasOffer && (
                    <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                      {item.offer}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="px-3 pt-4 text-base font-semibold text-gray-900 dark:text-white">
              Total
            </td>
            <td className="px-3 pt-4 text-base font-semibold text-gray-900 dark:text-white">
              <span className="mr-2 line-through opacity-60">
                {priceData.reduce((acc, item) => {
                  const price = typeof item.price === "number" ? item.price : 0;
                  return acc + price;
                }, 0)}
              </span>
              <span className="text-green-600 dark:text-green-400">
                {priceData.reduce((acc, item) => {
                  const offer =
                    typeof item.offer === "number" ? item.offer : null;
                  const price = typeof item.price === "number" ? item.price : 0;
                  return acc + (offer ?? price);
                }, 0)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
