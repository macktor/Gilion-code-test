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
import { useDataContext } from "../../context/DataContext";
import { cleanName, formatCountry } from "../../utils";
import { countryColors } from "../../constants";
import { CountrySelector } from "../Topbar/OptionsBar";
import "./CountryOverview.css";
ChartJS.defaults.color = "white";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CountryView = () => {
  const { dataByCountry, viewMode, dates, monthlyCountries } = useDataContext();

  if (monthlyCountries.length === 0) {
    return (
      <>
        <h2>No country is currently selected</h2>
        <ul className="selector-wrapper">
          <CountrySelector />
        </ul>
      </>
    );
  }

  const relevantDataSets = Object.entries(dataByCountry).filter(([country]) =>
    monthlyCountries.includes(country)
  );

  const data = {
    labels: dates,
    datasets: relevantDataSets.map(([country, countryData], i) => ({
      label: formatCountry(country),
      data: countryData.data.map((dataPoint) => dataPoint[viewMode]),
      borderColor: countryColors[country],
    })),
  };

  return (
    <div className="chart-wrapper">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: `${cleanName(viewMode)} for ${monthlyCountries
                .map((country) => formatCountry(country))
                .join(", ")}`,
            },
          },
        }}
      ></Line>
    </div>
  );
};

export default CountryView;
