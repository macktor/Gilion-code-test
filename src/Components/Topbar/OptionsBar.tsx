import "./topbar.css";
import MenuButton from "../MenuButton";
import { useDataContext } from "../../context/DataContext";
import { useEffect, useState } from "react";
import { formatCountry, formatDate } from "../../utils";
import Backdrop from "../Backdrop";

const OptionsBar = ({
  page,
  optionsOpen,
  setOptionsOpen,
}: {
  page: string;
  optionsOpen: boolean;
  setOptionsOpen: (openMenu: boolean) => void;
}) => {
  const [countrySelect, setCountrySelect] = useState(false);
  useEffect(() => {
    if (page !== "countryView" && countrySelect) {
      setCountrySelect(false);
    }
  }, [page]);
  return (
    <>
      <Backdrop open={optionsOpen} onClick={() => setOptionsOpen(false)} />
      <div
        className={`topbar${optionsOpen ? " open" : ""}`}
        style={{ zIndex: 5 }}
      >
        <ul className="topbar-content" style={{ zIndex: 2 }}>
          {page !== "overview" && (
            <li>
              <ToggleViewMode />
            </li>
          )}
          {page !== "monthlyView" && (
            <li>
              <HideProjected />
            </li>
          )}
          {page === "countryView" && (
            <li>
              <MenuButton
                className={countrySelect ? "active" : ""}
                onClick={() =>
                  setCountrySelect((countrySelect) => !countrySelect)
                }
              >
                Select Countries
              </MenuButton>
            </li>
          )}
          {page === "monthlyView" && (
            <li>
              <MonthSelector />
            </li>
          )}
        </ul>

        {countrySelect && (
          <div className={`topbar inner${optionsOpen ? " open" : ""}`}>
            <ul className="topbar-content">
              <CountrySelector />
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

const ToggleViewMode = () => {
  const { viewMode, setViewMode } = useDataContext();
  const toggleViewMode = () => {
    if (viewMode === "marketing_spend") {
      setViewMode("new_customers");
    } else if (viewMode === "new_customers") {
      setViewMode("marketing_spend");
    }
  };
  return (
    <MenuButton onClick={toggleViewMode}>
      {viewMode === "new_customers"
        ? "Show Marketing Spend"
        : "Show New Customers"}
    </MenuButton>
  );
};

const HideProjected = () => {
  const { toggleProjected, hideProjected } = useDataContext();
  return (
    <MenuButton onClick={toggleProjected}>{`${
      hideProjected ? "Show" : "Hide"
    } Forecast Data`}</MenuButton>
  );
};

export const CountrySelector = () => {
  const { monthlyCountries, setMonthlyCountries, countries } = useDataContext();
  const toggleCountry = (country: string, active: boolean) => {
    if (active) {
      setMonthlyCountries(
        monthlyCountries.filter((monthlyCountry) => monthlyCountry !== country)
      );
    } else {
      setMonthlyCountries([...monthlyCountries, country]);
    }
  };
  return countries.map((country) => {
    const active = monthlyCountries.includes(country);
    return (
      <li>
        <MenuButton
          key={country}
          className={active ? "active" : ""}
          onClick={() => toggleCountry(country, active)}
        >
          {formatCountry(country)}
        </MenuButton>
      </li>
    );
  });
};

export const MonthSelector = () => {
  const { dates, monthToView, setMonthToView } = useDataContext();
  return (
    <select
      value={monthToView}
      onChange={(e) => setMonthToView(e.target.value)}
    >
      {dates.map((date) => (
        <option key={date} value={date}>
          {formatDate(date)}
        </option>
      ))}
    </select>
  );
};

export default OptionsBar;
