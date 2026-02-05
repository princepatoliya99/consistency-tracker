import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import Chatbot from './Chatbot'
import FocusModeView from './FocusModeView'
import { useUI } from '../context/UIContext'

const motivationalQuotes = [
  "💪 Every rep counts. Every day matters.",
  "🔥 Discipline is choosing between what you want now and what you want most.",
  "⚡ The only bad workout is the one that didn't happen.",
  "🏆 Champions are made when no one is watching.",
  "💯 Consistency beats intensity. Show up every day.",
  "🎯 Small daily improvements lead to stunning results.",
  "🚀 Your body can do it. It's your mind you need to convince.",
]

function Home({ tasks, setTasks, theme, toggleTheme, currentUser, handleLogout }) {
  const navigate = useNavigate()
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const { focusMode, toggleFocusMode } = useUI()
  
  // If in focus mode, render FocusModeView instead
  if (focusMode) {
    return (
      <div className="focus-mode-wrapper">
        <FocusModeView 
          tasks={tasks} 
          setTasks={setTasks}
          currentUser={currentUser}
        />
      </div>
    )
  }
  
  // Get current month info
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const monthName = now.toLocaleString('default', { month: 'long' })
  const currentDay = now.getDate()
  
  // Generate array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  
  // Get day name for a specific date
  const getDayName = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    return date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2)
  }
  
  // Check if a day is weekend
  const isWeekend = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  // Random motivational quote
  const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]

  const addTask = (taskName) => {
    if (taskName.trim() === '') return
    
    const newTask = {
      id: Date.now(),
      name: taskName.trim(),
      completedDates: {} // Store as { 'YYYY-MM-DD': true/false }
    }
    
    setTasks([...tasks, newTask])
  }

  const toggleDay = (taskId, dayIndex) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`
        const newCompletedDates = { ...task.completedDates }
        newCompletedDates[dateStr] = !newCompletedDates[dateStr]
        return { ...task, completedDates: newCompletedDates }
      }
      return task
    }))
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const calculateConsistency = (completedDates) => {
    let completed = 0
    for (let i = 0; i < daysInMonth; i++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`
      if (completedDates && completedDates[dateStr]) {
        completed++
      }
    }
    return Math.round((completed / daysInMonth) * 100)
  }

  // Calculate total stats
  const totalTasks = tasks.length

  const handleAddTask = (e) => {
    e.preventDefault()
    const input = e.target.elements.taskName
    addTask(input.value)
    input.value = ''
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

      {/* User Profile Section */}
      <div className="user-profile">
        <div className="user-info" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }} title="View Profile">
          <div className="user-avatar">{currentUser?.name?.charAt(0).toUpperCase()}</div>
          <span className="user-name">{currentUser?.name}</span>
        </div>
        <div className="header-actions">
          <button className="focus-mode-toggle" onClick={toggleFocusMode} title="Enter Focus Mode (Press F)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
            <span>Focus Mode</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      
      {/* Professional Logo */}
      <div className="logo-container">
        <div className="logo-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="url(#logoGradient)"/>
            <path d="M12 32V28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M18 32V24" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M24 32V20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M30 32V16" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M36 32V22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="36" cy="14" r="3" fill="#4ade80"/>
            <path d="M12 28L18 24L24 20L30 16L36 14" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
            <defs>
              <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6"/>
                <stop offset="1" stopColor="#6366f1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="logo-text">
          <h1>Consistency <span className="highlight">Calculator</span></h1>
          <p className="tagline">Track • Improve • Conquer</p>
        </div>
      </div>
      
      <p className="motivation-quote">{quote}</p>

      {/* Stats Bar */}
      {tasks.length > 0 && (
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-number">{totalTasks}</div>
            <div className="stat-label">Active Goals</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{currentDay}</div>
            <div className="stat-label">Today's Date</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{daysInMonth - currentDay}</div>
            <div className="stat-label">Days Remaining</div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-action-links">
        <button className="action-link-btn" onClick={() => navigate('/compete')}>
          <span className="action-icon">🏆</span>
          <div className="action-content">
            <span className="action-title">Compete</span>
            <span className="action-desc">Challenge others</span>
          </div>
        </button>
        <button className="action-link-btn" onClick={() => navigate('/analysis')}>
          <span className="action-icon">📊</span>
          <div className="action-content">
            <span className="action-title">Analysis</span>
            <span className="action-desc">View insights</span>
          </div>
        </button>
      </div>
      
      {/* Add Task Section */}
      <form className="add-task-section" onSubmit={handleAddTask}>
        <input
          type="text"
          name="taskName"
          placeholder="Add your fitness goal..."
          className="task-input"
        />
        <button type="submit" className="add-btn">+ Add Goal</button>
      </form>

      {/* Tasks Table */}
      {tasks.length > 0 && (
        <div className="tasks-container">
          <h2 className="current-period">{monthName} {currentYear}</h2>
          <table className="tasks-table">
            <thead>
              <tr>
                <th className="task-name-header">Goal</th>
                {days.map(day => (
                  <th key={day} className={`day-header ${isWeekend(day) ? 'weekend' : ''} ${day === currentDay ? 'today' : ''}`}>
                    <span className="day-name">{getDayName(day)}</span>
                    <span className="day-number">{day}</span>
                  </th>
                ))}
                <th className="consistency-header">Score</th>
                <th className="action-header"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => {
                const getDateStr = (dayIndex) => `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`
                
                return (
                  <tr key={task.id}>
                    <td className="task-name">{task.name}</td>
                    {days.map((day, index) => (
                      <td key={day} className={`day-cell ${isWeekend(day) ? 'weekend' : ''} ${day === currentDay ? 'today' : ''}`}>
                        <input
                          type="checkbox"
                          checked={task.completedDates && task.completedDates[getDateStr(index)] || false}
                          onChange={() => toggleDay(task.id, index)}
                          className="day-checkbox"
                        />
                      </td>
                    ))}
                    <td className="consistency-cell">
                      <div className="consistency-wrapper">
                        <span className="consistency-percentage">{calculateConsistency(task.completedDates)}%</span>
                        <div className="consistency-bar-track">
                          <div 
                            className="consistency-bar" 
                            style={{ 
                              width: `${calculateConsistency(task.completedDates)}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="action-cell">
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="delete-btn"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Analysis Button */}
      {tasks.length > 0 && (
        <div className="analysis-btn-container">
          <button 
            className="analysis-btn"
            onClick={() => navigate('/analysis')}
          >
            <span className="btn-icon">→</span>
            View Analysis
          </button>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="no-tasks">
          <div className="no-tasks-icon">
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
              <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.7"/>
              <path d="M24 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
              <path d="M24 40V44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
              <path d="M4 24H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
              <path d="M40 24H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <p>No goals added yet.</p>
          <p>Start by adding your daily fitness goals above!</p>
        </div>
      )}
    </div>
  )
}

export default Home
