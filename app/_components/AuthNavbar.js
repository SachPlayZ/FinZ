// import React from 'react'

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { useState, useEffect, useRef } from "react"
// import { useAuth } from "../contexts/authContext"
// import { useRouter } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { format } from "date-fns"
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogClose
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { Input } from "@/components/ui/input"
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "@/components/ui/toggle-group"

// import { BarChartIcon, CalendarDaysIcon, CalendarIcon, CreditCardIcon, DollarSignIcon, InfoIcon, ListIcon, PlusIcon, ShoppingBagIcon, TagIcon, UserIcon, XIcon } from "@/app/dashboard/page"
// import { CarIcon, PopcornIcon, PowerIcon, WalletIcon } from "@/app/dashboard/page"

// const [date, setDate] = useState(null);
//   const [amount, setAmount] = useState(0);
//   const [category, setCategory] = useState('');
//   const [mode, setMode] = useState('');
//   const [description, setDescription] = useState('');
//   const { token, logout } = useAuth();
//   const [username, setUsername] = useState('');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const router = useRouter();
//   const [tags, setTags] = useState([])
//   const [type, setType] = useState('');
//   const addTag = (tag) => {
//     if (tag.trim() !== "") {
//       setTags([...tags, tag.trim()])
//     }
//   }
//   const removeTag = (tagToRemove) => {
//     setTags(tags.filter((tag) => tag !== tagToRemove))
//   }

//   const getBalance = async (token) => {
//     if (token) {
//       try {
//         const response = await fetch('/api/balance', {
//           method: 'POST',
//           headers: {
//             'Authorization': token
//           }
//         });
//         const data = await response.json();
//         const { name } = data;
//         setUsername(name);
//       } catch (error) {
//         console.error('Error fetching balance:', error);
//       }
//     }
//   };

//   const handleTransaction = async () => {
//     const txn = JSON.stringify({
//       token: token,
//       date: date,
//       type: type,
//       amount: amount,
//       category: category,
//       mode: mode,
//       description: description,
//       tags: tags
//     });

//     try {
//       const response = await fetch('/api/txn', {
//         method: 'POST',
//         headers: {
//           'Authorization': token
//         },
//         body: txn
//       });
//       const data = await response.json();
//       console.log(data);
//       await getBalance(token);
//       await getSpending(token);
//       await getIncome(token);
//     } catch (error) {
//       console.error('Error handling transaction:', error);
//     }
//   };
//   useEffect(() => {
//     const total = spending.reduce((acc, item) => {
//       const amount = parseFloat(item.total);
//       if (!isNaN(amount)) {
//         return acc + amount;
//       }
//       return acc;
//     }, 0).toFixed(2);

//     setTotalSpending(total);
//   }, [spending]);

//   useEffect(() => {
//     const total = income.reduce((acc, item) => {
//       const amount = parseFloat(item.total);
//       if (!isNaN(amount)) {
//         return acc + amount;
//       }
//       return acc;
//     }, 0).toFixed(2);

//     setTotalIncome(total);
//   }, [income]);


//   useEffect(() => {

//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);


//   const handleUserIconClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogout = () => {
//     logout();
//     router.push('/account');
//   };
// const AuthNavbar = () => {
//   return (
//     <header className="flex items-center bg-black justify-between px-4 py-3">
//         <Link
//           href="/analytics"
//           className="flex items-center gap-2 text-lg font-bold "
//           prefetch={false}>
//           <WalletIcon className="w-6 h-6" />
//           FinZ<span className="hidden md:inline">:Finance for GenZ</span>
//         </Link>
//         <nav className="relative flex items-center gap-4">
//           <div className="relative">
//             <Button
//               onClick={handleUserIconClick}
//               className="hover:text-foreground bg-black hover:bg-slate-800 rounded-full"
//             >
//               <UserIcon className="w-6 h-6" />
//               <span className="sr-only">Profile</span>
//             </Button>
//             {isDropdownOpen && (
//               <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-slate-950 rounded-md shadow-lg py-2">
//                 <div className="px-4 py-2 text-sm text-[#ff6b6b]">
//                   {username}
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="w-full text-left px-4 py-2 text-sm text-[#ff6b6b] hover:bg-slate-900"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//           <Link href="/analytics"
//             className="text-muted-foreground hover:text-foreground bg-black hover:bg-slate-800 rounded-full p-4"
//           >
//             <BarChartIcon className="w-6 h-6" />
//             <span className="sr-only">Analysis</span>
//           </Link>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground bg-black hover:bg-slate-800 rounded-full">
//                 <PlusIcon className="w-6 h-6" />
//                 <span className="sr-only">Add Transaction</span>
//               </Button>
//             </DialogTrigger>
//             <div className="bg-black/50" />
//             <DialogContent className="bg-black text-[#ff6b6b] border-[#ff6b6b] rounded-md h-auto w-5/6 sm:max-w-[550px]">
//               <DialogHeader>
//                 <DialogTitle className="">Add Transaction</DialogTitle>
//               </DialogHeader>
//               <div className="grid gap-2 py-2">
//                 <ToggleGroup variant="outline" type="single" onValueChange={setType} className="w-full">
//                   <div className="flex w-full gap-2">
//                     <ToggleGroupItem
//                       className={`flex-1 text-center ${type === 'income' ? 'bg-slate-900 text-[#ff6b6b]' : 'bg-black text-[#ff6b6b]'} border border-[#ff6b6b]`}
//                       value="income"
//                       aria-label="Toggle income"
//                     >
//                       Income
//                     </ToggleGroupItem>
//                     <ToggleGroupItem
//                       className={`flex-1 text-center ${type === 'expense' ? 'bg-slate-900 text-[#ff6b6b]' : 'bg-black text-[#ff6b6b]'} border border-[#ff6b6b]`}
//                       value="expense"
//                       aria-label="Toggle expense"
//                     >
//                       Expense
//                     </ToggleGroupItem>
//                   </div>
//                 </ToggleGroup>

//                 <div className="grid grid-cols-2 gap-2">
//                   <div className="space-y-2">
//                     <Label htmlFor="date" className="pt-2 flex items-center">
//                       <CalendarIcon className="mr-2 h-5 w-5" />
//                       Date
//                     </Label>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant={"outline"}
//                           className={cn(
//                             "w-full justify-start font-normal bg-primary",
//                             !date && "text-muted-foreground"
//                           )}
//                         >
//                           <CalendarDaysIcon className="mr-2 h-5 w-5" />
//                           {date ? format(date, "PPP") : <span>Pick a date</span>}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={date}
//                           onSelect={setDate}
//                           initialFocus
//                           className="bg-black text-[#ff6b6b] focus:text-[#722f2f] focus:bg-white active:bg-white active:text-[#722f2f]"
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="amount" className="pt-2 flex items-center">
//                       <DollarSignIcon className="mr-2 h-5 w-5" />
//                       Amount
//                     </Label>
//                     <Input
//                       id="amount"
//                       type="number"
//                       placeholder="0.00"
//                       className="bg-primary"
//                       onBlur={(e) => setAmount(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="category" className="pt-2 flex items-center">
//                       <ListIcon className="mr-2 h-5 w-5" />
//                       Category
//                     </Label>
//                     <Select onValueChange={setCategory}>
//                       <SelectTrigger id="category" className="bg-primary">
//                         <SelectValue placeholder="Select category" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-black text-[#ff6b6b]">
//                         <SelectItem value="groceries" className="flex items-center w-full">
//                           <ShoppingBagIcon className="mr-2 h-5 w-5 inline-block" />
//                           <span className="inline-block">Groceries</span>
//                         </SelectItem>
//                         <SelectItem value="utilities" className="flex items-center w-full">
//                           <PowerIcon className="mr-2 h-5 w-5 inline-block" />
//                           <span className="inline-block">Utilities</span>
//                         </SelectItem>
//                         <SelectItem value="entertainment" className="flex items-center w-full">
//                           <PopcornIcon className="mr-2 h-5 w-5 inline-block" />
//                           <span className="inline-block">Entertainment</span>
//                         </SelectItem>
//                         <SelectItem value="transportation" className="flex items-center w-full">
//                           <CarIcon className="mr-2 h-5 w-5 inline-block" />
//                           <span className="inline-block">Transportation</span>
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="payment-mode" className="pt-2 flex items-center">
//                       <CreditCardIcon className="mr-2 h-5 w-5" />
//                       Payment Mode
//                     </Label>
//                     <Select onValueChange={setMode}>
//                       <SelectTrigger id="payment-mode" className="bg-primary">
//                         <SelectValue placeholder="Select payment mode" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-black text-[#ff6b6b]">
//                         <SelectItem value="cash" className="flex items-center w-full">
//                           <DollarSignIcon className="mr-2 h-5 w-5 inline-block" />
//                           <span className="inline-block">Cash</span>
//                         </SelectItem>
//                         <SelectItem value="bank" className="flex items-center w-full">
//                           <CreditCardIcon className="mr-2 h-5 w-5 inline-block" />
//                           <span className="inline-block">Bank</span>
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="description" className="pt-2 flex items-center">
//                     <InfoIcon className="mr-2 h-5 w-5" />
//                     Description
//                   </Label>
//                   <Input
//                     id="description"
//                     placeholder="Enter a description"
//                     className="bg-primary"
//                     onBlur={(e) => setDescription(e.target.value)}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="tags" className="pt-2 flex items-center">
//                     <TagIcon className="mr-2 h-5 w-5" />
//                     Tags
//                   </Label>

//                   <Input
//                     type="text"
//                     placeholder="Add a tag"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         addTag(e.currentTarget.value)
//                         e.currentTarget.value = ""
//                       }
//                     }}
//                     className="rounded-md border border-input bg-slate-900 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring" />
//                   <div className="flex flex-wrap items-center gap-2">
//                     {tags.map((tag) => (
//                       <div
//                         key={tag}
//                         className="flex items-center rounded-md bg-gray-600 ps-3 text-xs font-medium">
//                         <span className="flex-grow">{tag}</span>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-muted-foreground hover:bg-muted/50 flex-shrink-0"
//                           onClick={() => removeTag(tag)}>
//                           <XIcon className="h-4 w-4" />
//                           <span className="sr-only">Remove {tag}</span>
//                         </Button>
//                       </div>
//                     ))}</div>
//                   <div className="bg-primary" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button
//                     type="submit"
//                     variant="solid"
//                     className="bg-primary"
//                     onClick={handleTransaction}
//                   >
//                     Save Transaction
//                   </Button>
//                 </DialogClose>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </nav>
//       </header>
//   )
// }

// export default AuthNavbar