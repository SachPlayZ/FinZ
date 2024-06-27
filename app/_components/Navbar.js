import Link from 'next/link'
import './Navbar.css'
const Navbar = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-[#000] text-[#ff6b6b]">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <DollarSignIcon className="h-6 w-6" />
          <span className="ms-4 bold font-mono text-xl">FinZ:</span> <span className="ms-4 font-mono text-xl">Finance for GenZ</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
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
      </header>
  )
}
function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
export default Navbar