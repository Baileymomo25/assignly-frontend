import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'
import FloatingActionButtons from './FloatingActionButtons'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow"
      >
        {children}
      </motion.main>
      <Footer />
      <FloatingActionButtons />
    </div>
  )
}