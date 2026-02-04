import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup({ setIsAuthenticated, setCurrentUser, theme, toggleTheme }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
      setError('Email already registered')
      return
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    }

    // Save user
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    
    // Set authentication
    setCurrentUser(newUser)
    setIsAuthenticated(true)
    navigate('/')
  }

  return (
    <div className="app">
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        <div className="toggle-icons">
          <svg className="toggle-icon sun-icon" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg className="toggle-icon moon-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </div>
      </button>

      <div className="auth-container">
        <div className="auth-card">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="12" fill="url(#signupGradient)"/>
                <path d="M12 32V28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M18 32V24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M24 32V20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 32V16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M36 32V22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="signupGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6"/>
                    <stop offset="1" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1>Create Account</h1>
            <p className="tagline">Start your consistency journey</p>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>
            {error && <div className="auth-error">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Sign Up
            </button>

            <p className="auth-switch">
              Already have an account? <button type="button" onClick={() => navigate('/login')} className="auth-link">Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
