"use client"
import { useState } from 'react'
import Link from 'next/link'
import './Navbar.css'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="relative px-4 lg:px-6 h-14 flex items-center bg-[#000] text-[#ff6b6b]">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <DollarSignIcon className="h-6 w-6" />
        <span className="ms-4 bold font-mono text-[1.8rem]">FinZ</span> 
        <span className="hidden md:inline-block ms-4 font-mono text-[1.6rem]">:Finance for GenZ</span>
      </Link>
      <button className="ml-auto sm:hidden" onClick={toggleMenu}>
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>
      <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
        <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
          Features
        </Link>
        <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
          Pricing
        </Link>
        <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
          About
        </Link>
        <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
          Contact
        </Link>
      </nav>
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#000] text-[#ff6b6b] transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-4 right-4" onClick={toggleMenu}>
          <XMarkIcon className="h-6 w-6" />
        </button>
        <nav className="mt-16 flex flex-col gap-4 px-4">
          <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
            Features
          </Link>
          <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-sm font-medium underline-animation" prefetch={false}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

export default Navbar
