"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A bar chart"

const BarChartStatistic = ({ title, desc, chartData, chartConfig, footer }) => {
    chartData = chartData || [
        { group: "January", quantity: 186 },
        { group: "February", quantity: 305 },
        { group: "March", quantity: 237 },
        { group: "April", quantity: 73 },
        { group: "May", quantity: 209 },
        { group: "June", quantity: 214 },
    ]
    
    chartConfig = chartConfig || {
        quantity: {
            label: "Groups",
            color: "var(--chart-1)",
        },
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ title }</CardTitle>
                <CardDescription>{ desc }</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="group"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 8)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="quantity" fill="var(--color-quantity)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {/* <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div> */}
                <div className="leading-none text-muted-foreground">
                    { footer }
                </div>
            </CardFooter>
        </Card>
    )
}

export default BarChartStatistic
