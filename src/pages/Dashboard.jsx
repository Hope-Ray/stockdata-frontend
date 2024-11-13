import { useState, useEffect } from "react";
import { useFetchStocks } from "../api/hooks/useFetchData";
import { Line, Bar, Pie } from "react-chartjs-2"; // Import Pie chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Navbar from "../components/Navbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartType, setChartType] = useState("line");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [topN, setTopN] = useState(5);
  const [error, setError] = useState(null);

  // Initialize default date range to the past 30 days
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setDateRange({
      start: thirtyDaysAgo.toISOString().split("T")[0], // Set start date as 30 days ago
      end: today.toISOString().split("T")[0], // Set end date as today
    });
  }, []);

  // Fetch stock data using the parameters
  const {
    data: stocks,
    isLoading,
    error: fetchError,
  } = useFetchStocks(dateRange, chartType, topN);

  useEffect(() => {
    console.log("stock", stocks);
  }, [stocks]);

  // Handle fetch errors
  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message); // Set the error message if there's an error
    }
  }, [fetchError]);

  // Handler for chart type change
  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  // Handler for date change
  const handleDateChange = (startOrEnd, date) => {
    setDateRange((prev) => ({ ...prev, [startOrEnd]: date }));
  };

  // Handler for Top N change
  const handleTopNChange = (event) => {
    setTopN(Number(event.target.value));
  };

  // Function to handle the fetch and validation
  const handleFetchData = () => {
    if (!dateRange.start || !dateRange.end) {
      setError("Both start and end dates are required");
      return; // Prevent fetch if dates are missing
    }
    setError(null); // Reset error if dates are valid
  };

  // Trigger the fetch when the user changes the filters
  useEffect(() => {
    handleFetchData(); // Validate the date range
  }, [dateRange, topN, chartType]); // Re-run validation whenever filters change

  // Process stock data to be used in the chart
  const processChartData = (stocks) => {
    const role = localStorage.getItem("role");

    const colorPalette = [
      "rgba(75, 192, 192, 1)", // teal
      "rgba(153, 102, 255, 1)", // purple
      "rgba(255, 159, 64, 1)", // orange
      "rgba(54, 162, 235, 1)", // blue
      "rgba(255, 99, 132, 1)", // red
      "rgba(255, 206, 86, 1)", // yellow
      "rgba(201, 203, 207, 1)", // grey
    ];

    if (!stocks || Object.keys(stocks).length === 0) {
      // Return an empty chart configuration if stocks data is undefined or empty
      return {
        labels: [],
        datasets: [],
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "No Data Available",
            },
          },
        },
      };
    }

    if (role === "user1") {
      const allDates = Array.from(
        new Set(
          Object.values(stocks)
            .flat()
            .map((item) => item.DATE)
        )
      ).sort((a, b) => new Date(a) - new Date(b));

      const datasets = Object.keys(stocks).map((symbol, index) => {
        const stockData = stocks[symbol];
        const dateToClosePrice = stockData.reduce((acc, dataPoint) => {
          acc[dataPoint.DATE] = dataPoint.CLOSE_PRICE;
          return acc;
        }, {});

        const data = allDates.map((date) => dateToClosePrice[date] || null);

        return {
          label: symbol,
          data: data,
          fill: false,
          borderColor: colorPalette[index % colorPalette.length],
          tension: 0.1,
        };
      });

      return {
        labels: allDates.map((date) => new Date(date).toLocaleDateString()),
        datasets: datasets,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Stock Closing Prices Over Time",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                  size: 14,
                  weight: "bold",
                },
                color: "#333",
              },
            },
            y: {
              title: {
                display: true,
                text: "Close Price (USD)",
                font: {
                  size: 14,
                  weight: "bold",
                },
                color: "#333",
              },
            },
          },
        },
      };
    } else if (role === "user2") {
      const allDates = Array.from(
        new Set(
          Object.values(stocks)
            .flat()
            .map((item) => item.DATE)
        )
      ).sort((a, b) => new Date(a) - new Date(b));

      const datasets = Object.keys(stocks).map((symbol, index) => {
        const stockData = stocks[symbol];
        const dateToClosePrice = stockData.reduce((acc, dataPoint) => {
          acc[dataPoint.DATE] = dataPoint.CLOSE_PRICE;
          return acc;
        }, {});

        const data = allDates.map((date) => dateToClosePrice[date] || null);

        return {
          label: symbol,
          data: data,
          backgroundColor: colorPalette[index % colorPalette.length],
        };
      });

      return {
        labels: allDates.map((date) => new Date(date).toLocaleDateString()),
        datasets: datasets,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Stock Close Prices Over Time",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Close Price (USD)",
              },
            },
          },
        },
      };
    } else if (role === "user3") {
      const filteredData = stocks.data
        .map((value, index) =>
          value !== null ? { value, label: stocks.labels[index] } : null
        )
        .filter((item) => item !== null);

      const validLabels = filteredData.map((item) => item.label);
      const validData = filteredData.map((item) => item.value);

      return {
        labels: validLabels,
        datasets: [
          {
            data: validData,
            backgroundColor: colorPalette.slice(0, validData.length),
            hoverBackgroundColor: colorPalette
              .slice(0, validData.length)
              .map((color) => color.replace("1)", "0.8)")),
          },
        ],
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Market Data Breakdown",
            },
          },
        },
      };
    }
  };

  const pieOptions = {
    responsive: true, // Disable responsive to use custom width and height
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Market Data Breakdown",
      },
    },
  };

  const lineOptions = {
    responsive: true, // Disable responsive to use custom width and height
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Stocks Price Over Time",
      },
    },
  };

  const chartData = processChartData(stocks);

  // Function to export data as CSV
  const exportDataAsCSV = () => {
    if (!chartData || chartData.labels.length === 0) {
      setError("No data to export.");
      return;
    }

    const rows = [
      chartData.labels,
      ...chartData.datasets.map((dataset) => dataset.data),
    ];

    console.log("rows", rows);
    const csvContent = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `chart_data_${chartType}_${new Date().toISOString()}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Stock Data Visualization
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="card p-4 shadow-lg bg-white rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Chart Type:
            </label>
            <select
              value={chartType}
              onChange={handleChartTypeChange}
              className="select select-bordered w-full mt-2"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>

          <div className="card p-4 shadow-lg bg-white rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Date Range:
            </label>
            <div className="flex space-x-4 mt-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="input input-bordered w-1/2"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateChange("end", e.target.value)}
                className="input input-bordered w-1/2"
              />
            </div>
          </div>

          <div className="card p-4 shadow-lg bg-white rounded-lg">
            <label className="block text-sm font-medium text-gray-700">
              Top N Stocks:
            </label>
            <input
              type="number"
              min={1}
              value={topN}
              onChange={handleTopNChange}
              className="input input-bordered w-full mt-2"
            />
          </div>

          <div className="extra-options flex justify-between items-center">
            <button className="btn btn-primary" onClick={exportDataAsCSV}>
              Export Data
            </button>
          </div>
        </div>

        <div className="chart-container mb-6">
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <>
              <div className="w-full max-w-4xl mx-auto">
                {chartType === "line" && (
                  <Line data={chartData} options={lineOptions}></Line>
                )}
                {chartType === "bar" && <Bar data={chartData} />}
                {chartType === "pie" && (
                  <Pie
                    data={chartData}
                    // options={{ responsive: true }}
                    options={pieOptions}
                    width={500}
                    height={500}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
