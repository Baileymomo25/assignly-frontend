import { motion } from 'framer-motion'
import { MessageCircle, Mail, Home } from 'lucide-react'

export default function FloatingActionButtons() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2348123456789'
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'support@assignly.com'
  
  const actions = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      href: `https://wa.me/${whatsappNumber}?text=Hi%20Assignly,%20I%20need%20help%20with%20my%20assignment`,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      href: `mailto:${contactEmail}`,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      href: "/",
      color: "bg-primary-600 hover:bg-primary-700"
    }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      {actions.map((action, index) => (
        <motion.a
          key={index}
          href={action.href}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${action.color} text-white p-4 rounded-full shadow-lg transition-colors flex items-center justify-center`}
          aria-label={action.label}
        >
          {action.icon}
        </motion.a>
      ))}
    </div>
  )
}