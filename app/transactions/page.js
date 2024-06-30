"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useAuth } from "../contexts/authContext"
import { format } from 'date-fns';
import Link from "next/link"
import { Button } from "@/components/ui/button"



export default function Transactions() {
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState({ key: "date", order: "desc" })
    const { token } = useAuth();
    const [transactions, setTransactions] = useState([])
    const formatDate = (isoString) => {
        return format(new Date(isoString), 'dd/MM/yyyy');
    };
    const [username, setUsername] = useState("")

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const { logout } = useAuth()

    const getBalance = async (token) => {
        if (token) {
            try {
                const response = await fetch('/api/balance', {
                    method: 'POST',
                    headers: {
                        'Authorization': token
                    }
                });
                const data = await response.json();
                const { cBalance, bBalance, name } = data;
                setUsername(name);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        }
    };


    const fetchTransactions = async (token) => {
        if (!token) {
            console.error('Token is required to fetch transactions.');
            return [];
        }

        try {
            const response = await fetch("/api/transactions", {
                headers: {
                    Authorization: token,
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching transactions: ${response.statusText}`);
            }

            const data = await response.json();
            return data.map((transaction) => ({
                ...transaction,
                amount: transaction.type === "expense" ? -transaction.amount : transaction.amount,
                date: formatDate(transaction.date),
            }));
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return [];
        }
    };

    useEffect(() => {
        getBalance(token);
        fetchTransactions(token).then((data) => setTransactions(data));
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [token]);


    const handleUserIconClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        router.push('/account');
    };

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
    }, [search, sort, transactions])
    const totalExpense = useMemo(() => {
        return filteredTransactions.reduce((total, transaction) => {
            return total + transaction.amount
        }, 0);
    }, [filteredTransactions])

    const calculateTotalExpense = useMemo(() => {
        return filteredTransactions
            .filter(transaction => transaction.amount < 0)
            .reduce((total, transaction) => total + transaction.amount, 0);
    }, [filteredTransactions]);

    const calculateTotalIncome = useMemo(() => {
        return filteredTransactions
            .filter(transaction => transaction.amount > 0)
            .reduce((total, transaction) => total + transaction.amount, 0);
    }, [filteredTransactions]);

    const calculateAverageExpense = useMemo(() => {
        const expenseTransactions = filteredTransactions.filter(transaction => transaction.amount < 0);
        const totalExpense = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        return expenseTransactions.length ? (totalExpense / expenseTransactions.length) : 0;
    }, [filteredTransactions]);

    return (<div className="flex flex-col h-full">
        <header className="flex items-center bg-black justify-between px-4 py-3 text-[#ff6b6b]">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-bold "
                prefetch={false}>
                <WalletIcon className="w-6 h-6" />
                FinZ<span className="hidden md:inline">:Finance for GenZ</span>
            </Link>
            <nav className="relative flex items-center gap-4">
                <div className="relative">
                    <Button
                        onClick={handleUserIconClick}
                        className="hover:text-foreground bg-black hover:bg-slate-800 rounded-full"
                    >
                        <UserIcon className="w-6 h-6" />
                        <span className="sr-only">Profile</span>
                    </Button>
                    {isDropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-md shadow-lg py-2">
                            <div className="px-4 py-2 text-sm text-[#ff6b6b]">
                                {username}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-[#ff6b6b] hover:bg-slate-900"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <Link href="/analytics"
                    className="text-muted-foreground hover:text-foreground bg-black hover:bg-slate-800 rounded-full p-4"
                >
                    <BarChartIcon className="w-6 h-6" />
                    <span className="sr-only">Analysis</span>
                </Link>
            </nav>
        </header>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto bg-slate-950 text-[#ff6b6b]">
            
            <div className="bg-slate-900 rounded-lg p-6 space-y-6 border border-[#ff6b6b] col-span-1 md:col-span-2 lg:col-span-1">
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold">Transaction Insights</h2>
                    <p className="text-muted-foreground">Get a comprehensive overview of your spending habits and financial health.</p>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                            <div className="text-sm font-medium">Total Expense</div>
                            <div className="text-2xl font-bold">₹{Math.abs(calculateTotalExpense.toFixed(2))}</div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="text-sm font-medium">Total Spending</div>
                            <div className="text-2xl font-bold">₹{calculateTotalIncome.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                            <div className="text-sm font-medium">Average Expense</div>
                            <div className="text-2xl font-bold">₹{Math.abs(calculateAverageExpense.toFixed(2))}</div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="text-sm font-medium">Total Difference</div>
                            <div className="text-2xl font-bold">₹{totalExpense.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-slate-900 rounded-lg p-6 space-y-6 border border-[#ff6b6b] col-span-1 md:col-span-2 lg:col-span-2">
                <div className="flex items-center justify-between ">
                    <h2 className="text-lg font-semibold">Transactions</h2>
                    <Input
                        placeholder="Search transactions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="ms-5 sm:w-32 md:w-80 lg:w-96 bg-black border-[#ff6b6b]" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className="text-[#ff6b6b] cursor-pointer"
                                onClick={() =>
                                    setSort({
                                        key: "date",
                                        order: sort.key === "date" ? (sort.order === "asc" ? "desc" : "asc") : "desc",
                                    })
                                }>
                                Date
                                {sort.key === "date" && <span className="ml-1">{sort.order === "asc" ? "\u2191" : "\u2193"}</span>}
                            </TableHead>
                            <TableHead className="text-[#ff6b6b]">Category</TableHead>
                            <TableHead className="text-[#ff6b6b]">Description</TableHead>
                            <TableHead className="text-[#ff6b6b]">Tags</TableHead>
                            <TableHead
                                className="text-right text-[#ff6b6b] cursor-pointer"
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
                    <TableBody className="text-white">
                        {filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell>
                                    {transaction.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-slate-600 px-2 py-1 mr-2 rounded-full text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div
                                        className={`font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                                        ₹{Math.abs(transaction.amount).toFixed(2)}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
        </div>
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



function WalletIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path
                d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
        </svg>)
    );
}


function BarChartIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="12" x2="12" y1="20" y2="10" />
            <line x1="18" x2="18" y1="20" y2="4" />
            <line x1="6" x2="6" y1="20" y2="16" />
        </svg>)
    );
}

function UserIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff6b6b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>)
    );
}


