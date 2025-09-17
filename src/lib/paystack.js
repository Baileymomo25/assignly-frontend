export const initializePayment = (paystackArgs) => {
  return window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    ...paystackArgs,
  });
};

export const verifyPayment = async (reference) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reference }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};