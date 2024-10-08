import { useDataContext } from "../../context/DataContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { cleanName, formatCountry, formatDate } from "../../utils";
import { countryColors } from "../../constants";
import { MonthSelector } from "../Topbar/OptionsBar";
import "./MonthlyOverview.css";
ChartJS.defaults.color = "white";
ChartJS.register(ArcElement, Tooltip, Legend);

const MonthChart = () => {
  const { dates, dataByDate, countries, viewMode, monthToView } =
    useDataContext();

  if (!monthToView) {
    return (
      <>
        <h2>No month is currently selected</h2>
        <MonthSelector />
      </>
    );
  }

  if (!dates.includes(monthToView))
    return `No data found for given date: ${monthToView}`;
  const colors = countries.map((country) => countryColors[country]);
  const data = {
    labels: countries.map((countryCode) => formatCountry(countryCode)),
    datasets: [
      {
        label: `${cleanName(viewMode)} for ${formatDate(monthToView)}`,
        data: dataByDate[monthToView].data.map(
          (dataPoint) => dataPoint[viewMode]
        ),
        backgroundColor: colors,
        borderColor: colors.map((color) => `${color}55`),
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="pie-wrapper chart-wrapper">
      <Pie
        data={data}
        options={{
          plugins: {
            legend: { position: "top" as const },
            title: {
              display: true,
              text: `Monthly overview of ${cleanName(
                viewMode
              )} for ${formatDate(monthToView)}`,
            },
          },
        }}
      />
    </div>
  );
};

export default MonthChart;
