import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts'
import Chatbot from './Chatbot'
import FocusModeView from './FocusModeView'
import { useUI } from '../context/UIContext'
import './Home.css'

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
    <div className="hm-page">
      {/* Brand Header */}
      <div className="hm-brand">
        <div className="hm-brand-icon">
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
        <div className="hm-brand-text">
          <h1><span className="hm-highlight">Consistify</span></h1>
          <p className="hm-tagline">For the days no one sees.</p>
          <p className="hm-sub-tagline">Track • Improve • Conquer</p>
        </div>
      </div>
      
      <p className="hm-quote">{quote}</p>

      {/* Stats Row */}
      {tasks.length > 0 && (
        <div className="hm-stats-row">
          <div className="hm-stat-tile">
            <div className="hm-stat-info">
              <div className="hm-stat-num">{totalTasks}</div>
              <div className="hm-stat-lbl">Active Goals</div>
            </div>
          </div>
          <div className="hm-stat-tile">
            <div className="hm-stat-info">
              <div className="hm-stat-num">{currentDay}</div>
              <div className="hm-stat-lbl">Today's Date</div>
            </div>
          </div>
          <div className="hm-stat-tile">
            <div className="hm-stat-info">
              <div className="hm-stat-num">{daysInMonth - currentDay}</div>
              <div className="hm-stat-lbl">Days Remaining</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="hm-quick-actions">
        <button className="hm-action-card" onClick={() => navigate('/compete')}>
          <span className="hm-action-icon">🏆</span>
          <div className="hm-action-info">
            <span className="hm-action-title">Compete</span>
            <span className="hm-action-desc">Challenge others</span>
          </div>
        </button>
        <button className="hm-action-card" onClick={() => navigate('/analysis')}>
          <span className="hm-action-icon">📊</span>
          <div className="hm-action-info">
            <span className="hm-action-title">Analysis</span>
            <span className="hm-action-desc">View insights</span>
          </div>
        </button>
      </div>
      
      {/* Add Task Form */}
      <form className="hm-add-form" onSubmit={handleAddTask}>
        <input
          type="text"
          name="taskName"
          placeholder="Add your fitness goal..."
          className="hm-add-input"
        />
        <button type="submit" className="hm-add-btn">+ Add Goal</button>
      </form>

      {/* Tasks Table */}
      {tasks.length > 0 && (
        <div className="hm-tasks-card">
          <div className="hm-tasks-header">
            <h2 className="hm-period">{monthName} {currentYear}</h2>
          </div>
          <div className="hm-table-wrap">
            <table className="hm-table">
              <thead>
                <tr>
                  <th>Goal</th>
                  {days.map(day => (
                    <th key={day} className={`hm-day-hd ${isWeekend(day) ? 'weekend' : ''} ${day === currentDay ? 'today' : ''}`}>
                      <span className="hm-day-name">{getDayName(day)}</span>
                      <span className="hm-day-num">{day}</span>
                    </th>
                  ))}
                  <th className="hm-score-hd">Score</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => {
                  const getDateStr = (dayIndex) => `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`
                  
                  return (
                    <tr key={task.id}>
                      <td className="hm-task-name">{task.name}</td>
                      {days.map((day, index) => (
                        <td key={day} className={`hm-day-cell ${isWeekend(day) ? 'weekend' : ''} ${day === currentDay ? 'today' : ''}`}>
                          <input
                            type="checkbox"
                            checked={task.completedDates && task.completedDates[getDateStr(index)] || false}
                            onChange={() => toggleDay(task.id, index)}
                            className="hm-check"
                          />
                        </td>
                      ))}
                      <td className="hm-score-cell">
                        <div className="hm-score-wrap">
                          <span className="hm-score-pct">{calculateConsistency(task.completedDates)}%</span>
                          <div className="hm-score-track">
                            <div 
                              className="hm-score-fill" 
                              style={{ 
                                width: `${calculateConsistency(task.completedDates)}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="hm-del-cell">
                        <button 
                          onClick={() => deleteTask(task.id)}
                          className="hm-del-btn"
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
        </div>
      )}

      {/* Analysis CTA */}
      {tasks.length > 0 && (
        <div className="hm-cta-wrap">
          <button 
            className="hm-cta-btn"
            onClick={() => navigate('/analysis')}
          >
            <span className="hm-cta-icon">→</span>
            View Analysis
          </button>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="hm-empty">
          <div className="hm-empty-icon">
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
