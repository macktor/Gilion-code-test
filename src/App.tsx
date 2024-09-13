import "./App.css";
import CountryView from "./Components/CountryOverview";
import HideProjected from "./Components/HideProjected";
import { LineChartExample } from "./Components/LineChartExample";
import MonthChart from "./Components/MonthOverview";
import Overall from "./Components/Overall";
import ToggleViewMode from "./Components/ToggleViewMode";
import { DataContextProvider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <DataContextProvider>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#020202",
            borderBottom: "1px solid #666",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            padding: "12px",
          }}
        >
          <HideProjected />
          <ToggleViewMode />
        </div>
        <Overall />

        <MonthChart date="2022-11-01" />
        <MonthChart date="2022-11-01" />
        <MonthChart date="2022-12-01" />

        <CountryView countries={["SE", "NO"]} />

        <CountryView countries={["GB", "DE", "AT"]} />
      </DataContextProvider>
    </div>
  );
}

export default App;
