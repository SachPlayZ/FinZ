"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import "./page.css"

export default function Account() {
  const [isLogin, setIsLogin] = useState(true)
  return (
    (<div
      className="text-black font-heading font-body flex h-screen w-full overflow-y-hidden items-center justify-center bg-black bg-background">
      <div
        className="relative flex h-[600px] w-full max-w-[900px] overflow-hidden rounded-2xl shadow-xl md:h-[700px]">
        <div
          className={`absolute inset-0 z-10 flex w-full items-center justify-center transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div
            className="text-black flex h-full w-full flex-col items-center justify-center gap-6 p-8 md:p-12 bg-gradient-to-r from-black via-[#7c3535] to-black">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-black">Please sign in to your account</p>
            <form className="flex w-full max-w-md flex-col gap-4">
              <Input type="email" placeholder="Email" className="w-full" />
              <Input type="password" placeholder="Password" className="w-full" />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              Dont have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="font-medium underline">
                Sign Up
              </button>
            </div>
          </div>
        </div>
        <div
          className={`absolute inset-0 z-0 flex w-full items-center justify-center transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-full" : "translate-x-0"
          }`}>
          <div
            className="flex h-full w-full flex-col bg-gradient-to-r from-black via-[#7c3535] to-black items-center justify-center gap-6 bg-secondary p-8 text-secondary-foreground md:p-12">
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <p className="text-black">Sign up to get started</p>
            <form className="flex w-full max-w-md flex-col gap-4">
              <Input type="text" placeholder="Username" className="w-full" />
              <Input type="email" placeholder="Email" className="w-full" />
              <Input type="password" placeholder="Password" className="w-full" />
              <Input type="password" placeholder="Confirm Password" className="w-full" />
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="font-medium underline">
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  );
}
