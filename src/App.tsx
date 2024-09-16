import { useState } from "react";
import "./App.css";
import CountryView from "./Components/CountryOverview";
import MonthChart from "./Components/MonthOverview";
import Overall from "./Components/Overall";

import { DataContextProvider } from "./context/DataContext";
import Topbar from "./Components/Topbar";
import OptionsBar from "./Components/Topbar/OptionsBar";

function App() {
  const [page, setPage] = useState<"overview" | "countryView" | "monthlyView">(
    "overview"
  );
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

  const renderPage = () => {
    switch (page) {
      case "overview":
        return <Overall />;
      case "countryView":
        return <CountryView />;
      case "monthlyView":
        return <MonthChart />;
    }
  };

  return (
    <div className="App">
      <DataContextProvider>
        <Topbar
          setOptionsOpen={setOptionsOpen}
          setOpenMenu={setOpenMenu}
          setPage={setPage}
          page={page}
          openMenu={openMenu}
        />
        <OptionsBar
          setOptionsOpen={setOptionsOpen}
          page={page}
          optionsOpen={optionsOpen}
        />
        <main className="main">{renderPage()}</main>
      </DataContextProvider>
    </div>
  );
}

export default App;
