import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ setIsAuthenticated, setCurrentUser, theme, toggleTheme }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      // Set authentication
      localStorage.setItem('currentUser', JSON.stringify(user))
      setCurrentUser(user)
      setIsAuthenticated(true)
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
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
                <rect width="48" height="48" rx="12" fill="url(#loginGradient)"/>
                <path d="M12 32V28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M18 32V24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M24 32V20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M30 32V16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M36 32V22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="loginGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#3b82f6"/>
                    <stop offset="1" stopColor="#6366f1"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1>Welcome Back</h1>
            <p className="tagline">Login to track your consistency</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            {error && <div className="auth-error">{error}</div>}
            
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              Login
            </button>

            <p className="auth-switch">
              Don't have an account? <button type="button" onClick={() => navigate('/signup')} className="auth-link">Sign Up</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
