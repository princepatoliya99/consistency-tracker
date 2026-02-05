import { useState } from 'react'
import { useUI } from '../context/UIContext'

function FocusModeView({ tasks, setTasks, currentUser }) {
  const { toggleFocusMode } = useUI()
  
  // Get current date info
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const currentDay = now.getDate()
  const todayDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`
  
  const todayFormatted = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  // Get today's task status
  const getTodayStatus = (task) => {
    return task.completedDates && task.completedDates[todayDateStr] || false
  }

  // Toggle today's task
  const toggleTodayTask = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompletedDates = { ...task.completedDates }
        newCompletedDates[todayDateStr] = !newCompletedDates[todayDateStr]
        return { ...task, completedDates: newCompletedDates }
      }
      return task
    }))
  }

  // Calculate today's progress
  const completedToday = tasks.filter(task => getTodayStatus(task)).length
  const totalTasks = tasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedToday / totalTasks) * 100) : 0

  return (
    <div className="focus-mode-container">
      {/* Exit Focus Mode Button */}
      <button 
        className="exit-focus-btn"
        onClick={toggleFocusMode}
        aria-label="Exit Focus Mode"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        <span>Exit Focus Mode</span>
        <span className="keyboard-hint">Press F</span>
      </button>

      <div className="focus-mode-content">
        {/* Header */}
        <div className="focus-header">
          <div className="focus-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="focus-title">Today's Focus</h1>
          <p className="focus-date">{todayFormatted}</p>
        </div>

        {/* Progress Bar */}
        <div className="focus-progress">
          <div className="progress-info">
            <span className="progress-text">
              {completedToday} of {totalTasks} completed
            </span>
            <span className="progress-percentage">{progressPercentage}%</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="focus-tasks-container">
          {tasks.length > 0 ? (
            tasks.map(task => {
              const isCompleted = getTodayStatus(task)
              return (
                <div 
                  key={task.id} 
                  className={`focus-task-card ${isCompleted ? 'completed' : ''}`}
                >
                  <div className="focus-task-content">
                    <div className="focus-task-check">
                      {isCompleted ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <div className="unchecked-circle" />
                      )}
                    </div>
                    <h3 className="focus-task-name">{task.name}</h3>
                  </div>
                  <div className="focus-task-actions">
                    {!isCompleted ? (
                      <button
                        className="focus-btn focus-btn-done"
                        onClick={() => toggleTodayTask(task.id)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Mark Done
                      </button>
                    ) : (
                      <button
                        className="focus-btn focus-btn-undo"
                        onClick={() => toggleTodayTask(task.id)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                          <path d="M21 3v5h-5"/>
                        </svg>
                        Undo
                      </button>
                    )}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="focus-empty-state">
              <div className="empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>No tasks yet</h3>
              <p>Exit focus mode to add your first task</p>
            </div>
          )}
        </div>

        {/* Footer Message */}
        {tasks.length > 0 && (
          <div className="focus-footer">
            <p className="focus-message">
              {completedToday === totalTasks 
                ? "🎉 Amazing! You've completed all your tasks today!" 
                : "💪 Stay focused. One task at a time."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FocusModeView
