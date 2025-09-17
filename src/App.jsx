import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Request from './pages/Request'
import Payment from './pages/Payment'
import Success from './pages/Success'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/request" element={<Request />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App