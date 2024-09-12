import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export type MarketingData = {
  is_forecast: boolean;
  month: string;
  country_code: string;
  new_customers: number;
  marketing_spend: number;
};

type StructuredMarketingData = {
  [country_code: string]: MarketingData[];
};

const useMarketingData = (): {
  loading: boolean;
  structuredData: StructuredMarketingData;
} => {
  const [marketingData, setMarketingData] = useState<MarketingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<MarketingData[]>(
        "http://localhost:5001/marketing-vs-new-customer-data",
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        setMarketingData(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .then(() => setLoading(false));
  }, []);

  const structuredData: StructuredMarketingData = useMemo(() => {
    const structuredData: StructuredMarketingData = {};
    marketingData.forEach((data) => {
      const { country_code } = data;
      if (!structuredData[country_code]) structuredData[country_code] = [];
      structuredData[country_code].push(data);
    });
    Object.entries(structuredData).forEach(([country_code, dataSet]) => {
      structuredData[country_code] = dataSet.sort((a, b) =>
        new Date(a.month) < new Date(b.month) ? -1 : 1
      );
    });
    return structuredData;
  }, [marketingData]);

  return { loading, structuredData };
};

export default useMarketingData;
