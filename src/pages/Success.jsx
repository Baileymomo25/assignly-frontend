import { motion } from 'framer-motion'
import { CheckCircle, MessageCircle } from 'lucide-react'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'

export default function Success() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2348123456789'
  
  const handleWhatsAppClick = () => {
    const message = "Hi Assignly, I just made a request."
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your order. Your request has been received and is being processed. 
              Our team will contact you within 24 hours.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
              <ul className="text-left text-gray-600 space-y-2">
                <li>• You'll receive a confirmation email shortly</li>
                <li>• Our expert will review your requirements</li>
                <li>• We'll contact you to discuss details</li>
                <li>• Work will be delivered before your deadline</li>
              </ul>
            </div>

            <Button onClick={handleWhatsAppClick} className="w-full">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat on WhatsApp
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              Need immediate assistance? Our support team is available 24/7
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}