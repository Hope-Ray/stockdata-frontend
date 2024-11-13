import { useQuery } from "@tanstack/react-query";
import { fetchStocksChart } from "../endpoints/stocks";

export const useFetchStocks = (
  dateRange: { startDate: string; endDate: string },
  chartType: string,
  topN: string
) => {
  return useQuery({
    queryKey: ["stocks", dateRange, chartType, topN], // Add query params to queryKey for caching
    queryFn: async () => {
      const data = await fetchStocksChart(dateRange, chartType, topN); // Pass the params to the API call
      console.log("custom hook", data);
      return data;
    },
  });
};
