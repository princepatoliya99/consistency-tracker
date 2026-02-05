import { createContext, useContext, useState, useEffect } from 'react'

const UIContext = createContext()

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within UIProvider')
  }
  return context
}

export const UIProvider = ({ children }) => {
  const [focusMode, setFocusMode] = useState(() => {
    // Load focus mode state from localStorage
    const saved = localStorage.getItem('focusMode')
    return saved ? JSON.parse(saved) : false
  })

  // Save to localStorage whenever focus mode changes
  useEffect(() => {
    localStorage.setItem('focusMode', JSON.stringify(focusMode))
  }, [focusMode])

  const toggleFocusMode = () => {
    setFocusMode(prev => !prev)
  }

  // Keyboard shortcut: Press 'f' to toggle focus mode
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only trigger if not typing in an input field
      if (e.key === 'f' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault()
        toggleFocusMode()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const value = {
    focusMode,
    toggleFocusMode
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}
