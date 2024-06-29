"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import "./page.css"
import { useAuth } from '../contexts/authContext';


export default function Account() {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const { token, login } = useAuth();
  if(token) {
    router.push('/dashboard')
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    console.log(JSON.stringify(data))

    // Send data to the backend
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const res = await response.json()
      console.log("Great Success!");
      login(res.token)
      router.push('/dashboard')
    } else {
      console.log(await response.json());
      console.log(":'(");
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    console.log(data)
    if (data.password === data.confirmPassword) {
      delete data.confirmPassword
    }
    else {
      console.log("Passwords do not match")
      return
    }
    console.log(data)
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const res = await response.json()
      login(res.token)
      console.log("Great Success!");
      router.push('/dashboard')
    } else {
      console.log(await response.json());
      console.log(":'(");
    }
  }

  return (
    <div className="text-black font-heading font-body flex h-screen w-full overflow-y-hidden items-center justify-center bg-black bg-background">
      <div className="relative flex h-full w-full overflow-hidden rounded-2xl shadow-xl">
        <div
          className={`absolute inset-0 z-10 flex w-full items-center justify-center transition-transform duration-500 ease-in-out ${
            isLogin ? "translate-x-0" : "-translate-x-full"
          }`}>
          <div className="text-[#ff6b00] flex h-full w-full flex-col items-center justify-center gap-6 p-8 md:p-12 bg-black">
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-[#ff6b00">Please sign in to your account</p>
            <form onSubmit={handleLogin} className="flex w-full max-w-md flex-col gap-4">
              <Input name="email" type="email" placeholder="Email" className="w-full" />
              <Input name="password" type="password" placeholder="Password" className="w-full" />
              <Button type="submit" className="w-full bg-[#ff6b00]">
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
          <div className="flex h-full w-full flex-col bg-black items-center justify-center gap-6 p-8 text-secondary-foreground md:p-12">
            <h2 className="text-3xl font-bold text-[#ff6b00]">Create an Account</h2>
            <p className="text-[#ff6b00]">Sign up to get started</p>
            <form onSubmit={handleSignUp} className="flex w-full max-w-md flex-col gap-4">
              <Input name="username" type="text" placeholder="Username" className="w-full" />
              <Input name="email" type="email" placeholder="Email" className="w-full" />
              <Input name="password" type="password" placeholder="Password" className="w-full" />
              <Input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full" />
              <Button type="submit" className="w-full bg-[#ff6b00]">
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
    </div>
  );
}