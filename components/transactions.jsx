"use client"

import { useState, useMemo } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export function Transactions() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState({ key: "date", order: "desc" })
  const transactions = [
    {
      id: 1,
      date: "2023-06-01",
      category: "Groceries",
      description: "Whole Foods",
      tags: ["food", "household"],
      amount: -75.23,
    },
    {
      id: 2,
      date: "2023-06-05",
      category: "Utilities",
      description: "Electricity Bill",
      tags: ["bills"],
      amount: -120.45,
    },
    {
      id: 3,
      date: "2023-06-10",
      category: "Entertainment",
      description: "Movie Tickets",
      tags: ["leisure"],
      amount: -30.0,
    },
    {
      id: 4,
      date: "2023-06-15",
      category: "Transportation",
      description: "Gas Refill",
      tags: ["auto"],
      amount: -45.67,
    },
    {
      id: 5,
      date: "2023-06-20",
      category: "Dining",
      description: "Dinner at Cafe",
      tags: ["food", "leisure"],
      amount: -65.89,
    },
    {
      id: 6,
      date: "2023-06-25",
      category: "Shopping",
      description: "Clothing Purchase",
      tags: ["fashion"],
      amount: -150.0,
    },
  ]
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const searchValue = search.toLowerCase()
        return (transaction.date.toLowerCase().includes(searchValue) ||
        transaction.category.toLowerCase().includes(searchValue) ||
        transaction.description.toLowerCase().includes(searchValue) || transaction.tags.some((tag) => tag.toLowerCase().includes(searchValue)));
      })
      .sort((a, b) => {
        if (sort.order === "asc") {
          return a[sort.key] > b[sort.key] ? 1 : -1
        } else {
          return a[sort.key] < b[sort.key] ? 1 : -1
        }
      });
  }, [search, sort])
  const totalExpense = useMemo(() => {
    return filteredTransactions.reduce((total, transaction) => {
      return total + transaction.amount
    }, 0);
  }, [filteredTransactions])
  return (
    (<div className="grid md:grid-cols-[300px_1fr] gap-8 p-4 md:p-8">
      <div className="bg-background border rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Expense Tracker</h2>
          <p className="text-muted-foreground">View your transaction history and spending insights.</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium">Total Expense</div>
              <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium">Total Spending</div>
              <div className="text-2xl font-bold">$2,500.00</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium">Average Expense</div>
              <div className="text-2xl font-bold">$75.00</div>
            </div>
            <div className="flex-1 space-y-1">
              <div className="text-sm font-medium">Remaining Budget</div>
              <div className="text-2xl font-bold">$1,200.00</div>
            </div>
          </div>
        </div>
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="font-semibold">Categories</div>
            <ChevronRightIcon className="w-4 h-4 transition-all [&[data-state=open]]:rotate-90" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="text-sm">Groceries</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <div className="text-sm">Utilities</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <div className="text-sm">Entertainment</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-card" />
                <div className="text-sm">Transportation</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                <div className="text-sm">Dining</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary-foreground" />
                <div className="text-sm">Shopping</div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="bg-background border rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "date",
                    order: sort.key === "date" ? (sort.order === "asc" ? "desc" : "asc") : "desc",
                  })
                }>
                Date
                {sort.key === "date" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead
                className="text-right cursor-pointer"
                onClick={() =>
                  setSort({
                    key: "amount",
                    order: sort.key === "amount" ? (sort.order === "asc" ? "desc" : "asc") : "desc",
                  })
                }>
                Amount
                {sort.key === "amount" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {transaction.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-muted px-2 py-1 mr-2 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>)
  );
}

function ChevronRightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>)
  );
}
