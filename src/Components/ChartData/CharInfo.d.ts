import { FC } from "react";
interface ChartData {
    desktop: number;
    label: string;
}
interface CharInfoProps {
    chartData: ChartData[];
    text: string;
}
export declare const CharInfo: FC<CharInfoProps>;
export {};
