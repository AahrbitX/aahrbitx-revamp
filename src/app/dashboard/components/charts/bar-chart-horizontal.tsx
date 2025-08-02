"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BarChartHorizontal() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: -18,
        }}
      >
        <XAxis type="number" dataKey="desktop" hide />
        <YAxis
          dataKey="month"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          //   tickFormatter={(value: string) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
