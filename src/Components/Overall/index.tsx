import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { NumericData, useDataContext } from "../../context/DataContext";
import { useMemo } from "react";
import { countryColors } from "../../constants";
import { cleanName, formatCountry } from "../../utils";
import "./Overall.css";

ChartJS.defaults.color = "white";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OverallGraph = ({ valueToShow }: { valueToShow: NumericData }) => {
  const { countries, dataByCountry, dates } = useDataContext();

  const refinedData = useMemo(() => {
    const datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[] = [];

    countries.forEach((country, i) => {
      datasets.push({
        label: formatCountry(country),
        data: dataByCountry[country].data.map(
          (dataPoint) => dataPoint[valueToShow]
        ),
        backgroundColor: countryColors[country],
      });
    });
    return datasets;
  }, [countries, dataByCountry]);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: `${cleanName(valueToShow)} by date, grouped by country`,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <Bar
        data={{ labels: dates, datasets: refinedData }}
        options={chartOptions}
      ></Bar>
    </div>
  );
};

export default function Overall() {
  return (
    <div className="overall-wrapper">
      <OverallGraph valueToShow="marketing_spend" />
      <OverallGraph valueToShow="new_customers" />
    </div>
  );
}
