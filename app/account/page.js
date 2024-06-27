
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Component() {
  const [activeTab, setActiveTab] = useState("login")
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#000] px-4">
      <div className="w-full max-w-md rounded-lg border border-[#ff6b00] bg-[#000] p-6 shadow-lg">
        <div className="flex items-center justify-center pb-6">
          <MountainIcon className="h-8 w-8 text-[#ff6b00]" />
          <span className="ml-2 text-2xl font-bold text-[#ff6b00]">FinZ</span>
        </div>
        <div className="mb-6 flex justify-center">
          <Button
            variant={activeTab === "login" ? "primary" : "ghost"}
            onClick={() => setActiveTab("login")}
            className="rounded-l-lg text-orange-600 transition-all duration-300 ease-in-out hover:bg-[#ff6b00] hover:text-[#000]"
          >
            Login
          </Button>
          <Button
            variant={activeTab === "signup" ? "primary" : "ghost"}
            onClick={() => setActiveTab("signup")}
            className="rounded-r-lg text-orange-600 transition-all duration-300 ease-in-out hover:bg-[#ff6b00] hover:text-[#000]"
          >
            Signup
          </Button>
        </div>
        {activeTab === "login" && (
          <form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" className="bg-[#111] text-[#ff6b00]" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" className="bg-[#111] text-[#ff6b00]" />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ff6b00] text-[#000] hover:bg-[#ff8533] transition-all duration-300 ease-in-out"
            >
              Login
            </Button>
            <div className="text-center text-sm text-[#ff6b00]">
              <Link href="#" className="underline" prefetch={false}>
                Forgot password?
              </Link>
            </div>
          </form>
        )}
        {activeTab === "signup" && (
          <form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" className="bg-[#111] text-[#ff6b00]" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" className="bg-[#111] text-[#ff6b00]" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" className="bg-[#111] text-[#ff6b00]" />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ff6b00] text-[#000] hover:bg-[#ff8533] transition-all duration-300 ease-in-out"
            >
              Signup
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}