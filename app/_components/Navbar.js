import React from 'react'

const Navbar = () => {
  return (
    <div className="bg-gray-800 py-4">
            <nav className="container mx-auto flex items-center justify-between">
                <div className="text-white font-bold text-xl">Logo</div>
                <ul className="flex space-x-4">
                    <li className="text-white">Home</li>
                    <li className="text-white">About</li>
                    <li className="text-white">Contact</li>
                </ul>
            </nav>
        </div>
  )
}

export default Navbar