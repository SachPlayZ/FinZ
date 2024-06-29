"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/authContext"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { set } from "mongoose"


export default function Page() {
  const [date, setDate] = useState(null);
  const [spending, setSpending] = useState([]);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState('');
  const [description, setDescription] = useState('');
  const { token, logout } = useAuth();
  const [cashBalance, setCashBalance] = useState('');
  const [bankBalance, setBankBalance] = useState('');
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [tags, setTags] = useState([])
  const [type, setType] = useState('');
  const [totalSpending, setTotalSpending] = useState('0.00');
  const [totalIncome, setTotalIncome] = useState('0.00');
  const [income, setIncome] = useState([]);
  const addTag = (tag) => {
    if (tag.trim() !== "") {
      setTags([...tags, tag.trim()])
    }
  }
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  if (!token) {
    router.push('/account');
  }

  const getIncome = async (token) => {
    if (token) {
      try {
        const response = await fetch('/api/income', {
          method: 'POST',
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        setIncome(data);
      } catch (error) {
        console.error('Error fetching income:', error);
      }
    }
  }


  const getSpending = async (token) => {
    if (token) {
      try {
        const response = await fetch('/api/spending', {
          method: 'POST',
          headers: {
            'Authorization': token
          }
        });
        const data = await response.json();
        setSpending(data);
      } catch (error) {
        console.error('Error fetching spending:', error);
      }
    }
  };


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
        setCashBalance(cBalance);
        setBankBalance(bBalance);
        setUsername(name);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };
  
  const handleTransaction = async () => {
    const txn = JSON.stringify({
      token: token,
      date: date,
      type: type,
      amount: amount,
      category: category,
      mode: mode,
      description: description,
      tags: tags
    });
  
    try {
      const response = await fetch('/api/txn', {
        method: 'POST',
        headers: {
          'Authorization': token
        },
        body: txn
      });
      const data = await response.json();
      console.log(data);
      await getBalance(token); 
      await getSpending(token);
      await getIncome(token);
    } catch (error) {
      console.error('Error handling transaction:', error);
    }
  };
  useEffect(() => {
    const total = spending.reduce((acc, item) => {
      const amount = parseFloat(item.total);
      if (!isNaN(amount)) {
        return acc + amount;
      }
      return acc;
    }, 0).toFixed(2);

    setTotalSpending(total);
  }, [spending]);

  useEffect(() => {
    const total = income.reduce((acc, item) => {
      const amount = parseFloat(item.total);
      if (!isNaN(amount)) {
        return acc + amount;
      }
      return acc;
    }, 0).toFixed(2);

    setTotalIncome(total);
  }, [income]);

  
  useEffect(() => {
    getSpending(token);
    getBalance(token);
    getIncome(token);
  
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

  return (
    <div className="flex flex-col h-screen bg-black text-[#ff6b6b]">
      <header className="flex items-center bg-black justify-between px-4 py-3">
        <Link
          href="/"
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
          <Button
            className="text-muted-foreground hover:text-foreground bg-black hover:bg-slate-800 rounded-full p-4"
          >
            <BarChartIcon className="w-6 h-6" />
            <span className="sr-only">Analysis</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground bg-black hover:bg-slate-800 rounded-full">
                <PlusIcon className="w-6 h-6" />
                <span className="sr-only">Add Transaction</span>
              </Button>
            </DialogTrigger>
            <div className="bg-black/50" />
            <DialogContent className="bg-black text-[#ff6b6b] border-[#ff6b6b] h-auto sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle className="">Add Transaction</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2 py-2">
                <ToggleGroup variant="outline" type="single" onValueChange={setType} className="w-full">
                  <div className="flex w-full gap-2">
                    <ToggleGroupItem
                      className={`flex-1 text-center ${type === 'income' ? 'bg-slate-900 text-[#ff6b6b]' : 'bg-black text-[#ff6b6b]'} border border-[#ff6b6b]`}
                      value="income"
                      aria-label="Toggle income"
                    >
                      Income
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      className={`flex-1 text-center ${type === 'expense' ? 'bg-slate-900 text-[#ff6b6b]' : 'bg-black text-[#ff6b6b]'} border border-[#ff6b6b]`}
                      value="expense"
                      aria-label="Toggle expense"
                    >
                      Expense
                    </ToggleGroupItem>
                  </div>
                </ToggleGroup>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="pt-2 flex items-center">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start font-normal bg-primary",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarDaysIcon className="mr-2 h-5 w-5" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-black text-[#ff6b6b] focus:text-[#722f2f] focus:bg-white active:bg-white active:text-[#722f2f]"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="pt-2 flex items-center">
                      <DollarSignIcon className="mr-2 h-5 w-5" />
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-primary"
                      onBlur={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="pt-2 flex items-center">
                      <ListIcon className="mr-2 h-5 w-5" />
                      Category
                    </Label>
                    <Select onValueChange={setCategory}>
                      <SelectTrigger id="category" className="bg-primary">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-[#ff6b6b]">
                        <SelectItem value="groceries" className="flex items-center w-full">
                          <ShoppingBagIcon className="mr-2 h-5 w-5 inline-block" />
                          <span className="inline-block">Groceries</span>
                        </SelectItem>
                        <SelectItem value="utilities" className="flex items-center w-full">
                          <PowerIcon className="mr-2 h-5 w-5 inline-block" />
                          <span className="inline-block">Utilities</span>
                        </SelectItem>
                        <SelectItem value="entertainment" className="flex items-center w-full">
                          <PopcornIcon className="mr-2 h-5 w-5 inline-block" />
                          <span className="inline-block">Entertainment</span>
                        </SelectItem>
                        <SelectItem value="transportation" className="flex items-center w-full">
                          <CarIcon className="mr-2 h-5 w-5 inline-block" />
                          <span className="inline-block">Transportation</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-mode" className="pt-2 flex items-center">
                      <CreditCardIcon className="mr-2 h-5 w-5" />
                      Payment Mode
                    </Label>
                    <Select onValueChange={setMode}>
                      <SelectTrigger id="payment-mode" className="bg-primary">
                        <SelectValue placeholder="Select payment mode" />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-[#ff6b6b]">
                        <SelectItem value="cash" className="flex items-center w-full">
                          <DollarSignIcon className="mr-2 h-5 w-5 inline-block" />
                          <span className="inline-block">Cash</span>
                        </SelectItem>
                        <SelectItem value="bank" className="flex items-center w-full">
                          <CreditCardIcon className="mr-2 h-5 w-5 inline-block" />
                          <span className="inline-block">Bank</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="pt-2 flex items-center">
                    <InfoIcon className="mr-2 h-5 w-5" />
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Enter a description"
                    className="bg-primary"
                    onBlur={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="pt-2 flex items-center">
                    <TagIcon className="mr-2 h-5 w-5" />
                    Tags
                  </Label>

                  <Input
                    type="text"
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTag(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                    className="rounded-md border border-input bg-slate-900 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center rounded-md bg-gray-600 ps-3 text-xs font-medium">
                        <span className="flex-grow">{tag}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:bg-muted/50 flex-shrink-0"
                          onClick={() => removeTag(tag)}>
                          <XIcon className="h-4 w-4" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </div>
                    ))}</div>
                  <div className="bg-primary" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                <Button
                  type="submit"
                  variant="solid"
                  className="bg-primary"
                  onClick={handleTransaction}
                >
                  Save Transaction
                </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>
      </header>
      <main
        className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto">
        <Card className="border-[#ff6b6b] col-span-1 md:col-span-2 lg:col-span-1 bg-slate-950 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Current Balance
            </CardTitle>
            <div className="text-4xl font-bold">₹{bankBalance + cashBalance}</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Cash Balance</span>
              <span>₹{cashBalance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Bank Balance</span>
              <span>₹{bankBalance}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:border-[#ff6b6b] border-transparent col-span-1 md:col-span-1 lg:col-span-1 bg-slate-950 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>This Months Spending</CardTitle>
            <div className="text-sm text-muted-foreground">₹{totalSpending}</div>
          </CardHeader>
          <CardContent>
          {spending?
          spending.map((item) => (
        <div key={item.category} className="flex items-center justify-between">
          <span>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
          <span>₹{item.total}</span>
        </div>
      )):
      <div>No transactions found...</div>
    }
            
          </CardContent>
        </Card>
        <Card className="border-[#ff6b6b] col-span-1 md:col-span-1 lg:col-span-1 bg-slate-950 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>This Months Income</CardTitle>
            <div className="text-sm text-muted-foreground">₹{totalIncome}</div>
          </CardHeader>
          <CardContent>
          {income.map((item) => (
        <div key={item.category} className="flex items-center justify-between">
          <span>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
          <span>₹{item.total}</span>
        </div>
      ))}
          </CardContent>
        </Card>
        <Card className="md:border-[#ff6b6b] border-transparent col-span-1 md:col-span-2 lg:col-span-2 bg-slate-950 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}>
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                    <ShoppingCartIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Amazon</div>
                    <div className="text-xs text-muted-foreground">Groceries</div>
                  </div>
                </div>
                <div className="text-red-500 font-medium">-$45.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Salary</div>
                    <div className="text-xs text-muted-foreground">Income</div>
                  </div>
                </div>
                <div className="text-green-500 font-medium">+$3,000.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                    <CreditCardIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Visa</div>
                    <div className="text-xs text-muted-foreground">Payment</div>
                  </div>
                </div>
                <div className="text-red-500 font-medium">-$100.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#ff6b6b] col-span-1 md:col-span-2 lg:col-span-1 bg-slate-950 text-white">
          <CardHeader>
            <CardTitle>Spending vs. Income</CardTitle>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="grid gap-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span>Income</span>
                    <span>$3,500.00</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Progress value={70} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>70%</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span>Spending</span>
                    <span>$1,250.00</span>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Progress value={30} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>30%</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </main>
    </div>
  )
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


function BriefcaseIcon(props) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>)
  );
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>)
  );
}


function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path
        d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
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


function BanknoteIcon(props) {
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
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>)
  );
}


function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>)
  );
}


function CalendarIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>)
  );
}


function CarIcon(props) {
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
      <path
        d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>)
  );
}


function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>)
  );
}


function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>)
  );
}


function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>)
  );
}


function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>)
  );
}


function PopcornIcon(props) {
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
      <path
        d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
      <path d="M10 22 9 8" />
      <path d="m14 22 1-14" />
      <path
        d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
    </svg>)
  );
}


function PowerIcon(props) {
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
      <path d="M12 2v10" />
      <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
    </svg>)
  );
}


function ShoppingBagIcon(props) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>)
  );
}


function TagIcon(props) {
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
      <path
        d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
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
function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>)
  );
}