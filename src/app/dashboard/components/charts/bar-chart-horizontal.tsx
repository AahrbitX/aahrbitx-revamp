"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Monthly Billing",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BarChartHorizontal({ data }: { data: any[] }) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{
          left: -18,
        }}
      >
        <XAxis type="number" dataKey="value" hide />
        <YAxis
          dataKey="month"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" fill="var(--color-desktop)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
