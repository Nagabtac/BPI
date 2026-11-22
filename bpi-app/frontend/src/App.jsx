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
import Dashboard from './components/Dashboard'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'login' | 'dashboard'

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('home')} />
  }

  if (view === 'login') {
    return (
      <LoginPage 
        onBack={() => setView('home')}
        onLogin={() => setView('dashboard')}
      />
    )
  }

  return (
    <>
      <Header onLoginClick={() => setView('login')} />

      {/* Hero is OUTSIDE <main> so it isn't pushed down by main's padding-top */}
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
