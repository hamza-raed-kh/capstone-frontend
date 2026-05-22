"use client"

import { TrendingUp } from "lucide-react"
import {
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
	ReferenceLine,
} from "recharts"

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

export const description = "A line chart"

const LineChartStatistic = ({ title, desc, chartData, chartConfig, footer }) => {
	
	chartData = chartData || [
		{ time: "January", value: 186 },
		{ time: "February", value: 305 },
		{ time: "March", value: 237 },
		{ time: "April", value: 73 },
		{ time: "May", value: 209 },
		{ time: "June", value: 214 },
	]
	
	chartConfig = chartConfig || {
		value: {
			label: "Quantity",
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
				<LineChart
					accessibilityLayer
					data={chartData}
					margin={{
					left: 12,
					right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="time"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					{Object.entries(chartConfig).map(([key]) => {
						return <Line
							key={key}
							dataKey={key}
							type="linear"
							stroke={`var(--color-${key})`}
							strokeWidth={2}
							dot={false}
						/>
					})}
				</LineChart>
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

export default LineChartStatistic
