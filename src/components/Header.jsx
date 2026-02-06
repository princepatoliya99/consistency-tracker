import { useNavigate, useLocation } from 'react-router-dom'
import { useUI } from '../context/UIContext'

function Header({ theme, toggleTheme, currentUser, handleLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { focusMode, toggleFocusMode } = useUI()

  const isActive = (path) => location.pathname === path

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo and Brand */}
        <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="brand-logo">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="3" fill="none"/>
              <path d="M15 24l6 6 12-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="brand-name">Consistify</span>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <button 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Home</span>
          </button>
          <button 
            className={`nav-link ${isActive('/analysis') ? 'active' : ''}`}
            onClick={() => navigate('/analysis')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="20" x2="12" y2="10"/>
              <line x1="18" y1="20" x2="18" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
            <span>Analysis</span>
          </button>
          <button 
            className={`nav-link ${isActive('/compete') ? 'active' : ''}`}
            onClick={() => navigate('/compete')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
            <span>Compete</span>
          </button>
          <button 
            className={`nav-link ${isActive('/rewards') ? 'active' : ''}`}
            onClick={() => navigate('/rewards')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="7"/>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
            </svg>
            <span>Rewards</span>
          </button>
        </nav>

        {/* User Actions */}
        <div className="header-actions">
          {/* Focus Mode Toggle */}
          {location.pathname === '/' && !focusMode && (
            <button 
              className="focus-mode-toggle-header" 
              onClick={toggleFocusMode} 
              title="Enter Focus Mode (Press F)"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <circle cx="12" cy="12" r="6"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
              <span>Focus</span>
            </button>
          )}

          <button 
            className="theme-toggle-header" 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <span className="theme-text">Dark</span>
              </>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="theme-text">Light</span>
              </>
            )}
          </button>
          
          <div 
            className="user-profile-header" 
            onClick={() => navigate('/profile')} 
            title="View Profile"
          >
            <div className="user-avatar-small">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="user-name-small">{currentUser?.name}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
