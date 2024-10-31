"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart, LabelList, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, } from "../ui/chart";
// Define the structure of chartConfig to match ChartConfig
const chartConfig = {
    desktop: {
        label: "احصائيات",
        color: "#F27B7D",
    },
};
export const CharInfo = ({ chartData, text }) => {
    return (_jsxs("div", { className: "w-3/4 mx-auto flex flex-col justify-center bg-white shadow-lg p-3 mb-16", children: [_jsx("h2", { className: "text-fontColor text-2xl font-semibold", children: text }), _jsx(ChartContainer, { config: chartConfig, className: "max-h-[400px] w-full", children: _jsxs(BarChart, { data: chartData, accessibilityLayer: true, margin: { top: 20, right: 30, left: 20, bottom: 40 }, children: [_jsx(CartesianGrid, { vertical: false }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, {}) }), _jsx(Bar, { dataKey: "desktop", fill: "var(--color-desktop)", barSize: 50, children: _jsx(LabelList, { dataKey: "label", className: "text-fontColor font-semibold", position: "bottom", offset: 5 }) })] }) })] }));
};
