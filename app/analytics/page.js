"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/authContext"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"

export default function Component() {
  const { token } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [activeTab, setActiveTab] = useState("monthly")
  const [currentPeriod, setCurrentPeriod] = useState({
    type: "month",
    value: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  useEffect(() => {
    if (token) {
        fetchTransactions();
    }
}, [token]);

const fetchTransactions = async () => {
    try {
        const response = await fetch('/api/transactions', {
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });
        const data = await response.json();
        setTransactions(data);
    } catch (error) {
        console.error("Error fetching transactions:", error);
    }
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const filterTransactionsByPeriod = (period) => {
  let filteredTransactions = transactions;

  if (period.type === "month") {
      filteredTransactions = transactions.filter(transaction => {
          const date = new Date(transaction.date);
          return (
              date.getMonth() === period.value &&
              date.getFullYear() === period.year
          );
      });
  } else if (period.type === "year") {
      filteredTransactions = transactions.filter(transaction => {
          const date = new Date(transaction.date);
          return date.getFullYear() === period.value;
      });
  } else {
      filteredTransactions = transactions.filter(transaction => {
          const date = new Date(transaction.date);
          return (
              date.getDate() === period.value &&
              date.getMonth() === period.month &&
              date.getFullYear() === period.year
          );
      });
  }

  return filteredTransactions;
};

const calculateTotals = (period) => {
  const filteredTransactions = filterTransactionsByPeriod(period);
  let totalIncome = 0;
  let totalExpense = 0;

  filteredTransactions.forEach(transaction => {
      if (transaction.type === "income") {
          totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
          totalExpense += transaction.amount;
      }
  });

  return { totalIncome, totalExpense, netIncome: totalIncome - totalExpense };
};

// Initial calculation for current period
const { totalIncome, totalExpense, netIncome } = calculateTotals(currentPeriod);

const handleTabChange = (tab) => {
  setActiveTab(tab);
  let newPeriod = {};

  if (tab === "monthly") {
      newPeriod = {
          type: "month",
          value: new Date().getMonth(),
          year: new Date().getFullYear(),
      };
  } else if (tab === "yearly") {
      newPeriod = {
          type: "year",
          value: new Date().getFullYear(),
      };
  } else {
      newPeriod = {
          type: "day",
          value: new Date().getDate(),
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
      };
  }
  setCurrentPeriod(newPeriod);
  const { totalIncome, totalExpense, netIncome } = calculateTotals(newPeriod);
};

const handlePeriodChange = (direction) => {
  if (currentPeriod.type === "month") {
      setCurrentPeriod((prev) => {
          let newMonth = prev.value + (direction === "prev" ? -1 : 1);
          let newYear = prev.year;
          if (newMonth < 0) {
              newMonth = 11;
              newYear -= 1;
          } else if (newMonth > 11) {
              newMonth = 0;
              newYear += 1;
          }
          const newPeriod = { ...prev, value: newMonth, year: newYear };
          const { totalIncome, totalExpense, netIncome } = calculateTotals(newPeriod);
          return newPeriod;
      });
  } else if (currentPeriod.type === "year") {
      setCurrentPeriod((prev) => {
          const newPeriod = { ...prev, value: prev.value + (direction === "prev" ? -1 : 1) };
          const { totalIncome, totalExpense, netIncome } = calculateTotals(newPeriod);
          return newPeriod;
      });
  } else {
      setCurrentPeriod((prev) => {
          let newDay = prev.value + (direction === "prev" ? -1 : 1);
          let newMonth = prev.month;
          let newYear = prev.year;
          if (newDay < 1) {
              newMonth -= 1;
              if (newMonth < 0) {
                  newMonth = 11;
                  newYear -= 1;
              }
              newDay = new Date(newYear, newMonth + 1, 0).getDate();
          } else {
              const daysInMonth = new Date(newYear, newMonth + 1, 0).getDate();
              if (newDay > daysInMonth) {
                  newDay = 1;
                  newMonth += 1;
                  if (newMonth > 11) {
                      newMonth = 0;
                      newYear += 1;
                  }
              }
          }
          const newPeriod = { ...prev, value: newDay, month: newMonth, year: newYear };
          const { totalIncome, totalExpense, netIncome } = calculateTotals(newPeriod);
          return newPeriod;
      });
  }
};

const formatPeriod = () => {
  if (currentPeriod.type === "month") {
      return `${monthNames[currentPeriod.value]} ${currentPeriod.year}`;
  } else if (currentPeriod.type === "year") {
      return `${currentPeriod.value}`;
  } else {
      return `${currentPeriod.value} ${monthNames[currentPeriod.month]}, ${currentPeriod.year}`;
  }
};

const getChartData = (tab) => {
  if (tab === "monthly") {
      const monthlyIncome = Array(12).fill(0);
      const monthlyExpense = Array(12).fill(0);

      transactions.forEach(transaction => {
          const date = new Date(transaction.date);
          const month = date.getMonth();

          if (transaction.type === "income") {
              monthlyIncome[month] += transaction.amount;
          } else if (transaction.type === "expense") {
              monthlyExpense[month] += transaction.amount;
          }
      });

      return [
          {
              id: "income",
              data: monthlyIncome.map((value, index) => ({
                  x: monthNames[index],
                  y: value,
              })),
          },
          {
              id: "expense",
              data: monthlyExpense.map((value, index) => ({
                  x: monthNames[index],
                  y: value,
              })),
          },
      ];
  } else if (tab === "yearly") {
      const startYear = currentPeriod.value - 4; // Show last 5 years including the current year
      const endYear = currentPeriod.value;
      const yearlyIncome = {};
      const yearlyExpense = {};

      transactions.forEach(transaction => {
          const date = new Date(transaction.date);
          const year = date.getFullYear();

          if (transaction.type === "income") {
              yearlyIncome[year] = (yearlyIncome[year] || 0) + transaction.amount;
          } else if (transaction.type === "expense") {
              yearlyExpense[year] = (yearlyExpense[year] || 0) + transaction.amount;
          }
      });

      return [
          {
              id: "income",
              data: Array.from({ length: 5 }, (_, i) => ({
                  x: (startYear + i).toString(),
                  y: yearlyIncome[startYear + i] || 0,
              })),
          },
          {
              id: "expense",
              data: Array.from({ length: 5 }, (_, i) => ({
                  x: (startYear + i).toString(),
                  y: yearlyExpense[startYear + i] || 0,
              })),
          },
      ];
  } else {
      const daysInMonth = new Date(currentPeriod.year, currentPeriod.month + 1, 0).getDate();
      const dailyIncome = Array(daysInMonth).fill(0);
      const dailyExpense = Array(daysInMonth).fill(0);

      transactions.forEach(transaction => {
          const date = new Date(transaction.date);
          const day = date.getDate() - 1;
          const month = date.getMonth();
          const year = date.getFullYear();

          if (month === currentPeriod.month && year === currentPeriod.year) {
              if (transaction.type === "income") {
                  dailyIncome[day] += transaction.amount;
              } else if (transaction.type === "expense") {
                  dailyExpense[day] += transaction.amount;
              }
          }
      });

      return [
          {
              id: "income",
              data: dailyIncome.map((value, index) => ({
                  x: (index + 1).toString(),
                  y: value,
              })),
          },
          {
              id: "expense",
              data: dailyExpense.map((value, index) => ({
                  x: (index + 1).toString(),
                  y: value,
              })),
          },
      ];
  }
};

const getPieChartData = () => {
  const filteredTransactions = filterTransactionsByPeriod(currentPeriod);
  const categories = {};

  filteredTransactions.forEach(transaction => {
      if (transaction.type === "expense") {
          categories[transaction.category] = (categories[transaction.category] || 0) + transaction.amount;
      }
  });

  return Object.entries(categories).map(([category, value]) => ({
      id: category,
      label: category,
      value,
  }));
};

  
  function LineChart(props) {
    return (
      <div {...props}>
        <ResponsiveLine
        key={activeTab}
          data={getChartData(activeTab)}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
            tickValues: "every 1 month",
            tickColor: "#ff6b6b",
            orient: "bottom"
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 16,
            tickValues: 5,
            tickColor: "#ff6b6b",
            orient: "left",
          }}
          colors={["#32CD32", "#FF0000"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#ff6b6b",
                },
              },
              legend: {
                text: {
                  fill: "#ff6b6b",
                },
              },
            },
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }
  
  function PieChart(props) {
    return (
      <div {...props}>
        <ResponsivePie
          key={activeTab}
          data={getPieChartData(activeTab)}
          sortByValue
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          cornerRadius={0}
          padAngle={0}
          borderWidth={1}
          borderColor={"#ffffff"}
          enableArcLinkLabels={false}
          arcLabel={(d) => `${d.id}`}
          arcLabelsTextColor={"#ffffff"}
          arcLabelsRadiusOffset={0.65}
          colors={["#ff0000", "#ff6b6b", "#ff8c8c", "#ffbaba", "#ffdcdc", "#fff0f0"]}
          theme={{
            labels: {
              text: {
                fontSize: "18px",
                fill: "#ff6b6b",
              },
            },
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col h-full">
      <header className="bg-black px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
          <div className="flex items-center gap-4 bg-slate-900">
            <Button className="bg-slate-900 border-orange-600 hover:bg-slate-700" variant="outline" size="icon" onClick={() => handlePeriodChange("prev")}>
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous</span>
            </Button>
            <h1 className="text-lg font-semibold md:text-xl text-[#ff6b6b]">{formatPeriod()}</h1>
            <Button className="bg-slate-900 border-orange-600 hover:bg-slate-700" variant="outline" size="icon" onClick={() => handlePeriodChange("next")}>
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button className={`bg-black hover:bg-slate-900 text-[#ff6b6b] border-0 ${activeTab === "monthly" && "bg-slate-800"}`}
              onClick={() => handleTabChange("monthly")}
            >
              Monthly
            </Button>
            <Button className={`bg-black hover:bg-slate-900 text-[#ff6b6b] border-0 ${activeTab === "yearly" && "bg-slate-800"}`} onClick={() => handleTabChange("yearly")}>
              Yearly
            </Button>
            <Button className={`bg-black hover:bg-slate-900 text-[#ff6b6b] border-0 ${activeTab === "daily" && "bg-slate-800"}`} onClick={() => handleTabChange("daily")}>
              Daily
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-900 border-green-600">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#20ff32]">₹{totalIncome}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-red-600">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Total Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-600">₹{totalExpense}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#ffffff]">₹{netIncome}</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="bg-black ">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Income vs Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
          <Card className="bg-black">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart className="aspect-[4/3]" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff6b6b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff6b6b"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}


