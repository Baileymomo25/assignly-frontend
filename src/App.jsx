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
// Simple 404 component
function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">Go to homepage</a>
    </div>
  )
}
export default App