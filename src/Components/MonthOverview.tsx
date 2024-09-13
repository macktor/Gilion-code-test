import { NumericData, useDataContext } from "../context/DataContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { cleanName, formatCountry, formatDate } from "../utils";
import { Colors } from "../constants";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthChart = ({ date }: { date: string }) => {
  const { dates, dataByDate, countries, viewMode } = useDataContext();
  if (!dates.includes(date)) return `No data found for given date: ${date}`;
  const data = {
    labels: countries.map((countryCode) => formatCountry(countryCode)),
    datasets: [
      {
        label: `${cleanName(viewMode)} for ${formatDate(date)}`,
        data: dataByDate[date].data.map((dataPoint) => dataPoint[viewMode]),
        backgroundColor: Colors,
        borderColor: Colors.map((color) => `${color}55`),
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default MonthChart;
