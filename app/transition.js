"use client"

import { motion } from "framer-motion"

export default function Transition({ children }) {
    return (
        <motion.div
        initial={{ y:20, opacity: 0 }}
        animate={{ y:0, opacity: 1 }}
        exit={{ y:20, opacity: 0 }}
        transition={{ ease: "easeInOut" ,duration: 0.75 }}
        >
        {children}
        </motion.div>
    )
    }