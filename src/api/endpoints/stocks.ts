import axiosInstance from "../axiosInstance";

export const fetchStocksChart = async (dateRange, chartType, topN) => {
  const { start, end } = dateRange;

  try {
    const { data } = await axiosInstance.get(`/api/${chartType}-chart`, {
      params: {
        startDate: start,
        endDate: end,
        topN,
      },
    });

    console.log("Fetched data:", data); // Log the response data for debugging
    return data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      const message = error.response.data?.message || "Access denied.";
      throw new Error(message); // Throw the error message from the response
    }
    throw error; // Rethrow other errors
  }
};
