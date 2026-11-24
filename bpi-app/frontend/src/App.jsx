import { useState } from 'react'
import Header from './components/Header'
import HeroVideo from './components/HeroVideo'
import LeadingTheWay from './components/LeadingTheWay'
import Pillars from './components/Pillars'
import SustainabilityLinks from './components/SustainabilityLinks'
import Newsroom from './components/Newsroom'
import FinancialLeader from './components/FinancialLeader'
import Awards from './components/Awards'
import CareersBanner from './components/CareersBanner'
import ExploreSolutions from './components/ExploreSolutions'
import CustomerSupport from './components/CustomerSupport'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'

export default function App() {
  const [view, setView] = useState(() => {
    return sessionStorage.getItem('bpi_user') ? 'dashboard' : 'home'
  })
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('bpi_user')
    return saved ? JSON.parse(saved) : null
  })

  const handleLogin = (u) => {
    sessionStorage.setItem('bpi_user', JSON.stringify(u))
    setUser(u)
    setView('dashboard')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('bpi_user')
    setUser(null)
    setView('home')
  }

  if (view === 'dashboard') return <Dashboard user={user} onLogout={handleLogout} onHome={() => setView('home')} />
  if (view === 'login')     return <LoginPage onBack={() => setView('home')} onLogin={handleLogin} onRegister={() => setView('register')} />
  if (view === 'register')  return <RegisterPage onBack={() => setView('login')} onSuccess={() => setView('login')} />

  return (
    <>
      <Header onLoginClick={() => setView('login')} user={user} onDashboard={() => setView('dashboard')} />
      <HeroVideo />
      <main>
        <LeadingTheWay />
        <Pillars />
        <SustainabilityLinks />
        <Newsroom />
        <FinancialLeader />
        <Awards />
        <CareersBanner />
        <ExploreSolutions />
        <CustomerSupport />
      </main>
      <Footer />
      <button className="chat-bubble">▢ Let's Chat</button>
    </>
  )
}
