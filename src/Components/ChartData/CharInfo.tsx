"use client";
import { Bar, BarChart, LabelList,CartesianGrid, } from "recharts";
import { ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent, } from "../ui/chart";



const chartConfig = {
  desktop: {
    label: "احصائيات",
    color: "#F27B7D",
  },
} satisfies ChartConfig;

export function CharInfo({chartData,text}) {
  return (
    <div className="w-3/4 mx-auto flex flex-col justify-center bg-white shadow-lg p-3 mb-16">
    <h2 className="text-fontColor text-2xl font-semibold">{text}</h2>
      <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
        <BarChart data={chartData} accessibilityLayer  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
        <CartesianGrid vertical={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" barSize={50}>
            <LabelList dataKey="label" className="text-fontColor font-semibold" position="bottom" offset={5} />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
