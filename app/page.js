"use client"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#000] text-[#ff6b6b]">
      <main className="flex-1">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-10 w-full py-12 md:py-24 lg:py-32 xl:py-48"
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Take Control of Your Expenses
                  </h1>
                  <p className="max-w-[600px] text-[#ccc] md:text-xl">
                    Our Expenses Management app helps you track, categorize, and manage your expenses with ease. Stay on
                    top of your finances and make smarter decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/account"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#ff6b6b] px-8 text-sm font-medium text-[#000] shadow transition-colors hover:bg-[#ff6b6b]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={true}
                  >
                    Sign Up
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                viewport={{ once: true }}
              >
                <Image
                  src="/finhero.png"
                  width={550}
                  height={310}
                  alt="Hero"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="px-10 w-full py-12 md:py-24 lg:py-32"
          viewport={{ once: true }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-[#ff6b6b] px-3 py-1 mb-4 text-sm text-[#000]">Key Features</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Manage Your Expenses with Ease</h2>
                  <p className="max-w-[600px] text-[#ccc] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our Expenses Management app offers a range of features to help you stay on top of your finances.
                    From automatic categorization to custom budgeting, weve got you covered.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    Automatic expense categorization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    Custom budgeting and goal-setting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    Real-time expense tracking and reporting
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4" />
                    Seamless integration with bank accounts
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/account"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#ff6b6b] px-8 text-sm font-medium text-[#000] shadow transition-colors hover:bg-[#ff6b6b]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={true}
                  >
                    Sign Up
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                viewport={{ once: true }}
              >
                <Image
                  src="/finhero2.png"
                  width={550}
                  height={310}
                  alt="Features"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full py-12 md:py-24 lg:py-32 bg-[#ff6b6b] text-[#000]"
          viewport={{ once: true }}
        >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-3"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Take Control of Your Finances</h2>
              <p className="mx-auto max-w-[600px] text-[#333] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up for our Newsletter and get fresh news straight into your inbox. Its free to get
                started!
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mx-auto w-full max-w-sm space-y-2"
              viewport={{ once: true }}
            >
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1 bg-[#000] text-[#ff6b6b]"
                />
                <Button type="submit" className="bg-[#000] text-[#ff6b6b]">
                  Sign Up
                </Button>
              </form>
              <p className="text-xs text-[#333]">
                Sign up to get started. No credit card required.{" "}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms &amp; Conditions
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t"
        viewport={{ once: true }}
      >
        <p className="text-xs text-[#ccc]">&copy; 2024 Expense Manager. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </motion.footer>
    </div>
  )
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
