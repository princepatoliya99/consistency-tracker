import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Analysis from './components/Analysis'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home tasks={tasks} setTasks={setTasks} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/analysis" element={<Analysis tasks={tasks} theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  )
}

export default App
