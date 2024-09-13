import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useDataContext } from "../context/DataContext";
import { cleanName, formatCountry } from "../utils";
import { Colors } from "../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CountryView = ({ countries }: { countries: string[] }) => {
  const { dataByCountry, viewMode, dates } = useDataContext();
  const relevantDataSets = Object.entries(dataByCountry).filter(([country]) =>
    countries.includes(country)
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${cleanName(viewMode)} for ${countries
          .map((country) => formatCountry(country))
          .join(", ")}`,
      },
    },
  };

  const data = {
    labels: dates,
    datasets: relevantDataSets.map(([country, countryData], i) => ({
      label: formatCountry(country),
      data: countryData.data.map((dataPoint) => dataPoint[viewMode]),
      borderColor: Colors[i],
    })),
  };

  return <Line data={data} options={options}></Line>;
};

export default CountryView;
