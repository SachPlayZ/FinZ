"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"

export default function Component() {
  const [activeTab, setActiveTab] = useState("monthly")
  const [currentPeriod, setCurrentPeriod] = useState({
    type: "month",
    value: new Date().getMonth(),
    year: new Date().getFullYear(),
  })
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === "monthly") {
      setCurrentPeriod({
        type: "month",
        value: new Date().getMonth(),
        year: new Date().getFullYear(),
      })
    } else if (tab === "yearly") {
      setCurrentPeriod({
        type: "year",
        value: new Date().getFullYear(),
      })
    } else {
      setCurrentPeriod({
        type: "day",
        value: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      })
    }
  }
  const handlePeriodChange = (direction) => {
    if (currentPeriod.type === "month") {
      setCurrentPeriod((prev) => {
        let newMonth = prev.value + (direction === "prev" ? -1 : 1)
        let newYear = prev.year
        if (newMonth < 0) {
          newMonth = 11
          newYear -= 1
        } else if (newMonth > 11) {
          newMonth = 0
          newYear += 1
        }
        return { ...prev, value: newMonth, year: newYear }
      })
    } else if (currentPeriod.type === "year") {
      setCurrentPeriod((prev) => ({
        ...prev,
        value: prev.value + (direction === "prev" ? -1 : 1),
      }))
    } else {
      setCurrentPeriod((prev) => {
        let newDay = prev.value + (direction === "prev" ? -1 : 1)
        let newMonth = prev.month
        let newYear = prev.year
        if (newDay < 1) {
          newMonth -= 1
          if (newMonth < 0) {
            newMonth = 11
            newYear -= 1
          }
          newDay = new Date(newYear, newMonth + 1, 0).getDate()
        } else {
          const daysInMonth = new Date(newYear, newMonth + 1, 0).getDate()
          if (newDay > daysInMonth) {
            newDay = 1
            newMonth += 1
            if (newMonth > 11) {
              newMonth = 0
              newYear += 1
            }
          }
        }
        return { ...prev, value: newDay, month: newMonth, year: newYear }
      })
    }
  }
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
  const formatPeriod = () => {
    if (currentPeriod.type === "month") {
      return `${monthNames[currentPeriod.value]} ${currentPeriod.year}`
    } else if (currentPeriod.type === "year") {
      return `${currentPeriod.value}`
    } else {
      return `${currentPeriod.value} ${monthNames[currentPeriod.month]}, ${currentPeriod.year}`
    }
  }
  const data = {
    monthly: {
      income: [
        { label: "Jan", value: 5000 },
        { label: "Feb", value: 6000 },
        { label: "Mar", value: 7500 },
        { label: "Apr", value: 6800 },
        { label: "May", value: 7200 },
        { label: "Jun", value: 8000 },
        { label: "Jul", value: 7800 },
        { label: "Aug", value: 7500 },
        { label: "Sep", value: 8200 },
        { label: "Oct", value: 8000 },
        { label: "Nov", value: 8500 },
        { label: "Dec", value: 9000 },
      ],
      expense: [
        { label: "Jan", value: 3500 },
        { label: "Feb", value: 4000 },
        { label: "Mar", value: 4800 },
        { label: "Apr", value: 4500 },
        { label: "May", value: 5000 },
        { label: "Jun", value: 5200 },
        { label: "Jul", value: 5000 },
        { label: "Aug", value: 5500 },
        { label: "Sep", value: 6000 },
        { label: "Oct", value: 5800 },
        { label: "Nov", value: 6200 },
        { label: "Dec", value: 6500 },
      ],
    },
    yearly: {
      income: [
        { label: "2020", value: 80000 },
        { label: "2021", value: 90000 },
        { label: "2022", value: 100000 },
        { label: "2023", value: 110000 },
        { label: "2024", value: 120000 },
      ],
      expense: [
        { label: "2020", value: 60000 },
        { label: "2021", value: 65000 },
        { label: "2022", value: 70000 },
        { label: "2023", value: 75000 },
        { label: "2024", value: 80000 },
      ],
    },
    daily: {
      income: [
        { label: "1", value: 300 },
        { label: "2", value: 400 },
        { label: "3", value: 500 },
        { label: "4", value: 450 },
        { label: "5", value: 550 },
        { label: "6", value: 600 },
        { label: "7", value: 550 },
        { label: "8", value: 500 },
        { label: "9", value: 600 },
        { label: "10", value: 550 },
        { label: "11", value: 600 },
        { label: "12", value: 650 },
        { label: "13", value: 600 },
        { label: "14", value: 550 },
        { label: "15", value: 600 },
        { label: "16", value: 650 },
        { label: "17", value: 700 },
        { label: "18", value: 650 },
        { label: "19", value: 600 },
        { label: "20", value: 650 },
        { label: "21", value: 700 },
        { label: "22", value: 750 },
        { label: "23", value: 700 },
        { label: "24", value: 650 },
        { label: "25", value: 700 },
        { label: "26", value: 750 },
        { label: "27", value: 800 },
        { label: "28", value: 750 },
        { label: "29", value: 700 },
        { label: "30", value: 750 },
        { label: "31", value: 800 },
      ],
      expense: [
        { label: "1", value: 200 },
        { label: "2", value: 250 },
        { label: "3", value: 300 },
        { label: "4", value: 280 },
        { label: "5", value: 320 },
        { label: "6", value: 350 },
        { label: "7", value: 320 },
        { label: "8", value: 300 },
        { label: "9", value: 350 },
        { label: "10", value: 320 },
        { label: "11", value: 350 },
        { label: "12", value: 380 },
        { label: "13", value: 350 },
        { label: "14", value: 320 },
        { label: "15", value: 350 },
        { label: "16", value: 380 },
        { label: "17", value: 400 },
        { label: "18", value: 380 },
        { label: "19", value: 350 },
        { label: "20", value: 380 },
        { label: "21", value: 400 },
        { label: "22", value: 420 },
        { label: "23", value: 400 },
        { label: "24", value: 380 },
        { label: "25", value: 400 },
        { label: "26", value: 420 },
        { label: "27", value: 450 },
        { label: "28", value: 420 },
        { label: "29", value: 400 },
        { label: "30", value: 420 },
        { label: "31", value: 450 },
      ],
    },
  }
  const getChartData = () => {
    if (activeTab === "monthly") {
      return {
        income: data.monthly.income,
        expense: data.monthly.expense,
      }
    } else if (activeTab === "yearly") {
      return {
        income: data.yearly.income,
        expense: data.yearly.expense,
      }
    } else {
      return {
        income: data.daily.income,
        expense: data.daily.expense,
      }
    }
  }
  const chartData = getChartData()
  const totalIncome = chartData.income.reduce((acc, curr) => acc + curr.value, 0)
  const totalExpense = chartData.expense.reduce((acc, curr) => acc + curr.value, 0)
  const netIncome = totalIncome - totalExpense
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
              <div className="text-4xl font-bold text-[#20ff32]">${totalIncome.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-red-600">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Total Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-600">${totalExpense.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900">
            <CardHeader>
              <CardTitle className="text-[#ff6b6b]">Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-[#ffffff]">${netIncome.toLocaleString()}</div>
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


function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Income",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Expense",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          tickValues: "every 1 month",
          tickColor: "#ff6b6b",
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 16,
          tickValues: 5,
          tickColor: "#ff6b6b",
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
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
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
