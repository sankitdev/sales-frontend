"use client";
import { Chart } from "./Charts";
import { ChartConfig } from "./ui/chart";
import { ExportPDF } from "./ExportPdf";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChartProps, ChartType } from "@/types/types";

// Example config for the chart
const chartConfig = {
  color: {
    theme: {
      light: "hsl(var(--chart-1))",
      dark: "hsl(var(--chart-1))",
    },
  },
} satisfies ChartConfig;

export default function StudentChart({ data }: ChartProps) {
  const [studentData, setStudentData] = useState<ChartProps["data"]>([]);

  useEffect(() => {
    setStudentData(data);
  }, [data]);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    const filteredData = studentData.map(
      ({ name, grade, score, performanceLevel }) => [
        name,
        grade,
        score,
        performanceLevel,
      ]
    );
    await ExportPDF(filteredData as string[][]);
  };
  const renderChart = (type: ChartType) => (
    <Chart type={type} data={studentData} config={chartConfig} />
  );
  return (
    <div className="max-w-7xl mx-auto my-5">
      <div className="flex justify-end">
        <Button onClick={handleExport} className="my-5">
          Export PDF
        </Button>
      </div>
      <div
        className="flex flex-wrap flex-col sm:flex-row justify-center gap-5 mt-5"
        ref={chartRef}
      >
        {renderChart("bar")}
        {renderChart("pie")}
        {renderChart("line")}
      </div>
    </div>
  );
}
