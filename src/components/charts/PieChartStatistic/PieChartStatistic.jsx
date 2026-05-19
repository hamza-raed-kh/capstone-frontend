"use client"

import { TrendingUp } from "lucide-react"
import { ResponsiveContainer, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const PieChartStatistic = ({title, desc, chartData, chartConfig, footer}) => {
  title = title || "Pie Chart - Label";
  desc = desc || "January - June 2024";
  chartData = chartData || [
    { category: "chrome", count: 275, fill: "var(--color-chrome)" },
    { category: "safari", count: 200, fill: "var(--color-safari)" },
    { category: "firefox", count: 187, fill: "var(--color-firefox)" },
    { category: "edge", count: 173, fill: "var(--color-edge)" },
    { category: "other", count: 90, fill: "var(--color-other)" },
  ]
  chartConfig = chartConfig || {
    count: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
    firefox: {
      label: "Firefox",
      color: "var(--chart-3)",
    },
    edge: {
      label: "Edge",
      color: "var(--chart-4)",
    },
    other: {
      label: "Other",
      color: "var(--chart-5)",
    },
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="category"
                label
                cx="50%"
                cy="50%"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          {footer}
        </div>
      </CardFooter>
    </Card>
  )
}

export default PieChartStatistic
