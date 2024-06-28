
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

export default function page() {
  return (
    (<div className="flex flex-col h-screen bg-background text-red-800">
      <header className="flex items-center justify-between px-4 py-3 border-b bg-card">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-bold"
          prefetch={false}>
          <WalletIcon className="w-6 h-6" />
          FinZ: Finance for GenZ
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
            prefetch={false}>
            <UserIcon className="w-6 h-6" />
            <span className="sr-only">Profile</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
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
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="flex items-center justify-between">
            <TooltipProvider>
              <CardTitle>Current Balance</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <InfoIcon className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <span>Cash Balance:</span> <br/>
                      <span>$2,450.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bank Balance:</span> <br/>
                      <span>$5,320.00</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="text-4xl font-bold">$7,770.00</CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
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
        <Card className="col-span-1 md:col-span-1 lg:col-span-1">
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
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
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
                    <TruckIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">UPS</div>
                    <div className="text-xs text-muted-foreground">Shipping</div>
                  </div>
                </div>
                <div className="text-red-500 font-medium">-$25.00</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
                    <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium">Freelance</div>
                    <div className="text-xs text-muted-foreground">Income</div>
                  </div>
                </div>
                <div className="text-green-500 font-medium">+$500.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Budget Details</CardTitle>
            <div className="text-sm text-red-500 font-medium">Over Budget</div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span>Monthly Budget</span>
              <span>$2,000.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Spent so far</span>
              <span>$2,250.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Remaining</span>
              <span className="text-red-500">-$250.00</span>
            </div>
            <Progress value={112.5} aria-label="112.5% of budget spent" />
          </CardContent>
        </Card>
      </main>
    </div>)
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
      stroke="currentColor"
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
      stroke="currentColor"
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
