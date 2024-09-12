import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Colors,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import useMarketingData, { MarketingData } from "../hooks/useMarketingData";
import { useState } from "react";

export const LineChartExample = () => {
  const { loading, structuredData } = useMarketingData();
  const [yAxis, setYAxis] = useState<keyof MarketingData | "efficiency">(
    "new_customers"
  );
  const [onlyHistoric, setOnlyHistoric] = useState(false);

  const noData = !Object.values(structuredData).find((data) => data.length > 0);
  const options = {
    colors: {
      enabled: false,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Marketing data line chart",
      },
    },
  };
  if (loading) return "Loading";
  if (noData) return "No data found";

  const data = {
    datasets: Object.entries(structuredData).map(([country_code, data]) => ({
      label: country_code,
      data: data
        .filter((dataPoint) => (onlyHistoric ? !dataPoint.is_forecast : true))
        .map((dataPoint) => {
          const dataValue =
            yAxis === "efficiency"
              ? dataPoint.new_customers / dataPoint.marketing_spend
              : dataPoint[yAxis];
          return {
            y: dataValue,
            x: dataPoint.month,
          };
        }),
    })),
  };

  ChartJS.register(
    Colors,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div style={{ width: "80vw", display: "flex", flexDirection: "column" }}>
      <div>
        <button onClick={() => setYAxis("marketing_spend")}>
          Marketing Spend
        </button>
        <button onClick={() => setYAxis("new_customers")}>New Customers</button>
        <button onClick={() => setYAxis("efficiency")}>Efficiency</button>
      </div>
      <div>
        <button
          onClick={() => setOnlyHistoric((onlyHistoric) => !onlyHistoric)}
        >{`${onlyHistoric ? "Show" : "Hide"} Projected Values`}</button>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};
