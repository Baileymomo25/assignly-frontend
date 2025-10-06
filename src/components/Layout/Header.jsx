import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Header() {
  // Logo path - you can change this to any image in your public folder
  const logoPath = "/logo.png"; // or "/logo.svg", "/images/logo.png", etc.

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white shadow-sm border-b"
    >
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              {/* Logo from public folder */}
              <img 
                src={logoPath} 
                alt="Assignly Logo" 
                className="h-14 w-auto"
                onError={(e) => {
                  // Fallback if the logo file doesn't exist
                  console.error('Logo not found:', logoPath);
                  e.target.style.display = 'none';
                  
                  // Show text fallback
                  const fallbackElement = e.target.nextElementSibling;
                  if (fallbackElement) {
                    fallbackElement.style.display = 'block';
                  }
                }}
              />
              {/* Text fallback logo - hidden by default */}
              <span 
                 className="text-4xl md:text-3xl font-bold text-primary-600" Made Simple
                style={{ display: 'block' }}
              >
                Assignly
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/request" className="text-gray-700 hover:text-primary-600 transition-colors">Request Help</Link>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}