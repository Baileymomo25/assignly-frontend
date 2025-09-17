import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Assignly</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</a>
            <a href="/request" className="text-gray-700 hover:text-primary-600 transition-colors">Request Help</a>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}