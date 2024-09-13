import axios from "axios";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { createContext } from "react";

export type NumericData = "new_customers" | "marketing_spend";

export type MarketingData = {
  is_forecast: boolean;
  month: string;
  country_code: string;
  new_customers: number;
  marketing_spend: number;
};

type DataByCountry = {
  [country_code: string]: {
    data: MarketingData[];
    totalNewCustomers: number;
    totalMarketingSpend: number;
  };
};

type DataByDate = {
  [date: string]: {
    data: MarketingData[];
    totalNewCustomers: number;
    totalMarketingSpend: number;
  };
};

type DataContextType = {
  data: MarketingData[];
  countries: string[];
  dates: string[];
  dataByCountry: DataByCountry;
  dataByDate: DataByDate;
  toggleProjected: () => void;
  hideProjected: boolean;
  viewMode: NumericData;
  setViewMode: (viewMode: NumericData) => void;
};

const initialValues: DataContextType = {
  data: [],
  countries: [],
  dates: [],
  dataByCountry: {},
  dataByDate: {},
  toggleProjected: () => {},
  hideProjected: false,
  viewMode: "new_customers",
  setViewMode: (viewMode) => {},
};

const DataContext = createContext(initialValues);

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<MarketingData[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [dataByCountry, setDataByCountry] = useState<DataByCountry>({});
  const [dataByDate, setDataByDate] = useState<DataByDate>({});
  const [hideProjected, setHideProjected] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<NumericData>("new_customers");

  useEffect(() => {
    axios
      .get<MarketingData[]>(
        "http://localhost:5001/marketing-vs-new-customer-data",
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const dates: string[] = [];
    const countries: string[] = [];
    const dataByCountry: DataByCountry = {};
    const dataByDate: DataByDate = {};

    data.forEach((dataPoint) => {
      if (dataPoint.is_forecast && hideProjected) {
        return;
      }
      const { country_code, month } = dataPoint;
      countries.push(country_code);
      dates.push(month);
      if (!dataByCountry[country_code]) {
        dataByCountry[country_code] = {
          data: [],
          totalMarketingSpend: 0,
          totalNewCustomers: 0,
        };
      }
      dataByCountry[country_code].data.push(dataPoint);
      dataByCountry[country_code].totalMarketingSpend +=
        dataPoint.marketing_spend;
      dataByCountry[country_code].totalNewCustomers += dataPoint.new_customers;

      if (!dataByDate[month]) {
        dataByDate[month] = {
          data: [],
          totalMarketingSpend: 0,
          totalNewCustomers: 0,
        };
      }
      dataByDate[month].data.push(dataPoint);
      dataByDate[month].totalMarketingSpend += dataPoint.marketing_spend;
      dataByDate[month].totalNewCustomers += dataPoint.new_customers;
    });
    setDates(Array.from(new Set(dates)));
    setCountries(Array.from(new Set(countries)));
    setDataByCountry(dataByCountry);
    setDataByDate(dataByDate);
  }, [data, hideProjected]);

  const toggleProjected = () =>
    setHideProjected((hideProjected) => !hideProjected);

  return (
    <DataContext.Provider
      value={{
        viewMode,
        setViewMode,
        hideProjected,
        data,
        countries,
        dates,
        dataByCountry,
        dataByDate,
        toggleProjected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
