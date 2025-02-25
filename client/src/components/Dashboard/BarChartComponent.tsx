

import { Pie, PieChart, Label } from "recharts"
import type { LabelProps } from "recharts"
import { ChartPie } from 'lucide-react';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { useEffect, useState,useMemo } from "react"

import { useAuthContext } from "../../hooks/useAuth";


interface ChartDataItem {
  topic: string
  visitors: number
  fill: string
}

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface CustomViewBox {
  cx: number
  cy: number
}

const colorPalette = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export default function BarChartComponent() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([])
  const [chartConfig, setChartConfig] = useState<ChartConfig>({})
  
  const {activity}=useAuthContext()
  useEffect(() => {
    const fetchActivityData = () => {
      // activity
      if (activity) {
        // const useractivity: Activity = activity

        const topicCounts: { [key: string]: number } = {}
        activity.genre.forEach((topic) => {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1
        })

        const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])

        const top3Topics = sortedTopics.slice(0, 4)
        const otherCount = sortedTopics.slice(4).reduce((sum, [, count]) => sum + count, 0)

        const newChartData: ChartDataItem[] = [
          ...top3Topics.map(([topic, count], index) => ({
            topic,
            visitors: count,
          fill: colorPalette[index],
          })),
          {
            topic: "Other",
            visitors: otherCount,
            fill: `var(--color-other)`,
          },
        ]

        const newChartConfig: ChartConfig = {
          ...Object.fromEntries(
            top3Topics.map(([topic], index) => [
              topic,
              {
                label: topic,
                color: colorPalette[index],
              },
            ]),
          ),
          Other: {
            label: "Other",
            color: colorPalette[3],
          },
        }

        setChartData(newChartData)
        setChartConfig(newChartConfig)
      }
    }

    fetchActivityData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  if (chartData.length === 0) {
    return <div>No activity data available</div>
  }

  return (
    <Card className=" w-full max-sm:w-3/2     mx-auto  flex-col border-none justify-center items-center mb-24 py-6 ">
      <CardHeader className="items-center pb-0 ">
        <CardTitle className="dark:text-white md:text-3xl text-xl"> Asked Topics</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 lg:mt-20 md:mt-15 mt-12">
     { !activity?.genre[0] ? <div className="flex flex-row justify-center items-center gap-8"><ChartPie className="h-28 w-32 dark:text-white"/>
     <div className="flex flex-col">
     <p className="dark:text-white lg:text-xl md:text-lg ">Analysis of your interested topics will show up here as soon as </p>
     <p className="dark:text-white lg:text-xl md:text-lg "> you create some summaries on <b className="font-bold">Notework</b>.</p>
     </div>
     </div>  : <ChartContainer config={chartConfig} className="w-full max-sm:overflow-scroll aspect-square sm:h-[600px] h-[500px] ">
        <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="topic"  innerRadius={90} 
               strokeWidth={5}>
                <Label
                  content={(props: LabelProps) => {
                    const { viewBox } = props as {viewBox:CustomViewBox}
                    const centerX = "cx" in viewBox ? viewBox.cx : 0
                    const centerY = "cy" in viewBox ? viewBox.cy : 0
                    return (
                      <g>
                        <text
                          x={centerX}
                          y={centerY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground dark:fill-white font-bold"
                          fontSize="clamp(16px, 4vw, 24px)"
                        >
                          {totalVisitors.toLocaleString()}
                        </text>
                        <text
                          x={centerX}
            y={centerY + 25}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-muted-foreground dark:fill-white sm:text-2xl font-bold"
                          fontSize="clamp(12px, 3vw, 18px)"
                        >
                          Prompts
                        </text>
                      </g>
                    )
                  }}
                />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="topic" />}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 dark:text-white max-md:text-base md:text-lg 2xl:text-3xl"
            />
          </PieChart>
        </ChartContainer>}
      </CardContent>
      <CardFooter />
    </Card>
  )
}

