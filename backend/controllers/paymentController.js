const axios = require('axios');

const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.body;
    
    if (!reference) {
      return res.status(400).json({ error: 'Reference is required' });
    }

    // Verify payment with Paystack API directly
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    });
    
    if (response.data.status && response.data.data.status === 'success') {
      const paymentData = {
        transactionId: reference,
        amount: response.data.data.amount / 100, // Convert from kobo to naira
        status: 'completed'
      };
      
      // Update request payment status in database
      // Note: You might need to adjust this based on how you associate payments with requests
      // await updateRequestPayment(response.data.data.metadata.requestId, paymentData);
      
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        data: response.data.data
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed',
        data: response.data.data
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  verifyPayment
};