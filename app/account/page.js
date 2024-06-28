"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
        <div className="mb-6 flex gap-4 justify-center">
          <Button
            onClick={() => setActiveTab("login")}
            className={`rounded-l-lg transition-all duration-300 ease-in-out ${
              activeTab === "login" 
                ? "bg-[#ff6b00] text-[#000]"
                : "bg-transparent text-orange-600 hover:bg-[#ff6b00] hover:text-[#000]"
            }`}
          >
            Login
          </Button>
          <Button
            onClick={() => setActiveTab("signup")}
            className={`rounded-r-lg transition-all duration-300 ease-in-out ${
              activeTab === "signup" 
                ? "bg-[#ff6b00] text-[#000]"
                : "bg-transparent text-orange-600 hover:bg-[#ff6b00] hover:text-[#000]"
            }`}
          >
            Sign Up
          </Button>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <form className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="bg-[#111] text-[#ff6b00] focus:ring-[#ff6b00] focus:border-[#ff6b00] border-[#ff6b00]"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-[#111] text-[#ff6b00] focus:ring-[#ff6b00] focus:border-[#ff6b00] border-[#ff6b00]"
                  />
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
            </motion.div>
          )}
          {activeTab === "signup" && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <form className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#111] text-[#ff6b00] focus:ring-[#ff6b00] focus:border-[#ff6b00] border-[#ff6b00]"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="bg-[#111] text-[#ff6b00] focus:ring-[#ff6b00] focus:border-[#ff6b00] border-[#ff6b00]"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-[#111] text-[#ff6b00] focus:ring-[#ff6b00] focus:border-[#ff6b00] border-[#ff6b00]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#ff6b00] text-[#000] hover:bg-[#ff8533] transition-all duration-300 ease-in-out"
                >
                  Sign Up
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
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
