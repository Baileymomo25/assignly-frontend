import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { CreditCard, Shield, CheckCircle } from 'lucide-react'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import { initializePayment } from '../lib/paystack'

export default function Payment() {
  const navigate = useNavigate()
  const { requestData, setPaymentData } = useApp()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!requestData) {
      navigate('/request')
    }
  }, [requestData, navigate])

  const calculateAmount = () => {
    const prices = {
      assignment: 4999, // in kobo (₦49.99)
      slides: 3999,    // in kobo (₦39.99)
      thesis: 19999,   // in kobo (₦199.99)
      report: 7999,    // in kobo (₦79.99)
      project: 14999   // in kobo (₦149.99)
    }
    
    return prices[requestData?.workType] || 4999
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    
    try {
      const paymentArgs = {
        email: requestData.email,
        amount: calculateAmount(),
        currency: 'NGN',
        ref: `TRX_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          custom_fields: [
            {
              display_name: "Full Name",
              variable_name: "full_name",
              value: requestData.fullName
            },
            {
              display_name: "Phone Number",
              variable_name: "phone_number",
              value: requestData.phone
            },
            {
              display_name: "Work Type",
              variable_name: "work_type",
              value: requestData.workType
            }
          ]
        },
        callback: (response) => {
          // Payment was successful
          const paymentResult = {
            success: true,
            transactionId: response.reference,
            amount: calculateAmount() / 100, // Convert back to naira
            timestamp: new Date().toISOString()
          }
          
          setPaymentData(paymentResult)
          navigate('/success')
        },
        onClose: () => {
          // User closed the payment modal
          setIsProcessing(false)
          alert('Payment was not completed. Please try again.')
        }
      }

      initializePayment(paymentArgs)
    } catch (error) {
      console.error('Payment error:', error)
      setIsProcessing(false)
      alert('An error occurred during payment. Please try again.')
    }
  }

  if (!requestData) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
          <p className="text-lg text-gray-600">Secure payment processed through Paystack</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Service Type:</span>
                <span className="font-medium capitalize">{requestData.workType}</span>
              </div>
              <div className="flex justify-between">
                <span>Deadline:</span>
                <span className="font-medium">{new Date(requestData.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                <span>Total:</span>
                <span className="text-primary-600">₦{(calculateAmount() / 100).toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
            
            <div className="space-y-6">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span className="text-sm text-primary-700">Secure payment with Paystack</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600">256-bit SSL encryption</span>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Payment Method</span>
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-center mb-4">
                  <p className="text-gray-600">You will be redirected to Paystack's secure payment page</p>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Supports cards, bank transfers, and mobile money
                </p>
              </div>

              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : `Pay ₦${(calculateAmount() / 100).toFixed(2)}`}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}