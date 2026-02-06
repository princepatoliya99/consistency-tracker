import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProgressProvider } from './context/UserProgressContext'
import { UIProvider } from './context/UIContext'
import Layout from './components/Layout'
import Home from './components/Home'
import Analysis from './components/Analysis'
import CompetePage from './components/CompetePage'
import RewardsPage from './components/RewardsPage'
import UserProfilePage from './components/UserProfilePage'
import About from './components/About'
import HelpCenter from './components/HelpCenter'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css'
import './styles/rewards.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // Check if user is logged in on mount
  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    setIsAuthenticated(false)
  }

  return (
    <UIProvider>
      <UserProgressProvider currentUser={currentUser}>
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/" /> : 
                <Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} theme={theme} toggleTheme={toggleTheme} />
              } 
            />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? <Navigate to="/" /> : 
              <Signup setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} theme={theme} toggleTheme={toggleTheme} />
            } 
          />
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <Home tasks={tasks} setTasks={setTasks} theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/analysis" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <Analysis tasks={tasks} theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/compete" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <CompetePage theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <UserProfilePage tasks={tasks} theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/rewards" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <RewardsPage theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/about" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <About theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <About theme={theme} toggleTheme={toggleTheme} currentUser={null} handleLogout={() => {}} />
            } 
          />
          <Route 
            path="/help" 
            element={
              isAuthenticated ? 
              <Layout theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout}>
                <HelpCenter theme={theme} toggleTheme={toggleTheme} currentUser={currentUser} handleLogout={handleLogout} />
              </Layout> :
              <HelpCenter theme={theme} toggleTheme={toggleTheme} currentUser={null} handleLogout={() => {}} />
            } 
          />
        </Routes>
      </Router>
    </UserProgressProvider>
    </UIProvider>
  )
}

export default App
