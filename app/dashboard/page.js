"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../contexts/authContext"
import { useRouter } from "next/navigation"

export default function Page() {
  const { token, logout } = useAuth();
  const [userId, setUserId] = useState('');
  const [cashBalance, setCashBalance] = useState('');
  const [bankBalance, setBankBalance] = useState('');
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  if (!token) {
    router.push('/account');
  }

  useEffect(() => {
    const getId = async (token) => {
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
          console.error('Error fetching user ID:', error);
        }
      }
    };

    getId(token);

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
    <div className="flex flex-col h-screen bg-black text-orange-600">
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
                <div className="px-4 py-2 text-sm text-orange-600">
                  {username}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-orange-600 hover:bg-slate-900"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground bg-black hover:bg-slate-800 rounded-full"
            prefetch={false}>
            <BarChartIcon className="w-6 h-6" />
            <span className="sr-only">Analysis</span>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="w-6 h-6" />
            <span className="sr-only">Add Transaction</span>
          </Button>
        </nav>
      </header>
      <main
        className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 overflow-auto">
        <Card className="border-orange-600 col-span-1 md:col-span-2 lg:col-span-1 bg-slate-950 text-white">
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
        <Card className="md:border-orange-600 border-transparent col-span-1 md:col-span-1 lg:col-span-1 bg-slate-950 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>This Months Spending</CardTitle>
            <div className="text-sm text-muted-foreground">$1,250.00</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Groceries</span>
              <span>$450.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Utilities</span>
              <span>$200.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Transportation</span>
              <span>$150.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Entertainment</span>
              <span>$350.00</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-orange-600 col-span-1 md:col-span-1 lg:col-span-1 bg-slate-950 text-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>This Months Income</CardTitle>
            <div className="text-sm text-muted-foreground">$3,500.00</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Salary</span>
              <span>$3,000.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Freelance</span>
              <span>$500.00</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:border-orange-600 border-transparent col-span-1 md:col-span-2 lg:col-span-2 bg-slate-950 text-white">
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
        <Card className="border-orange-600 col-span-1 md:col-span-2 lg:col-span-1 bg-slate-950 text-white">
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
      stroke="#ea580c"
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


function PlusIcon(props) {
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


function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path
        d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
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
      stroke="#ea580c"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
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
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>)
  );
}


function CreditCardIcon (props) {
  return(
  <svg
  {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path
      fillRule="evenodd"
      d="M4 3h16a3 3 0 013 3v12a3 3 0 01-3 3H4a3 3 0 01-3-3V6a3 3 0 013-3zm16 2H4a1 1 0 00-1 1v2h18V6a1 1 0 00-1-1zM3 11v8a1 1 0 001 1h16a1 1 0 001-1v-8H3zm2 4h2a1 1 0 010 2H5a1 1 0 010-2zm4 0h6a1 1 0 010 2H9a1 1 0 010-2z"
      clipRule="evenodd"
    />
  </svg>
  );
}