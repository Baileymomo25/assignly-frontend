import { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

const initialState = {
  requestData: null,
  paymentData: null,
  isLoading: false,
  error: null,
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_REQUEST_DATA':
      return { ...state, requestData: action.payload, error: null }
    case 'SET_PAYMENT_DATA':
      return { ...state, paymentData: action.payload, error: null }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }

  const setRequestData = (data) => {
    dispatch({ type: 'SET_REQUEST_DATA', payload: data })
  }

  const setPaymentData = (data) => {
    dispatch({ type: 'SET_PAYMENT_DATA', payload: data })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  const value = {
    ...state,
    setLoading,
    setError,
    setRequestData,
    setPaymentData,
    reset,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}