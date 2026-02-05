import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Chatbot from './Chatbot'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#60a5fa', '#818cf8', '#a78bfa', '#2563eb']

// Reward badges based on consistency
const getReward = (consistency) => {
  if (consistency >= 95) return { badge: '🏆', title: 'LEGEND', message: 'You are unstoppable! True champion mentality!', color: '#FFD700' }
  if (consistency >= 85) return { badge: '🥇', title: 'ELITE', message: 'Outstanding discipline! You\'re in the top tier!', color: '#0ea5e9' }
  if (consistency >= 70) return { badge: '🥈', title: 'WARRIOR', message: 'Great consistency! Keep pushing forward!', color: '#C0C0C0' }
  if (consistency >= 50) return { badge: '🥉', title: 'RISING STAR', message: 'Good progress! Room for improvement!', color: '#CD7F32' }
  if (consistency >= 25) return { badge: '⭐', title: 'BEGINNER', message: 'You started! Now build the momentum!', color: '#888' }
  return { badge: '🌱', title: 'SEEDLING', message: 'Every journey starts with a single step!', color: '#4CAF50' }
}

function Analysis({ tasks, theme, toggleTheme, currentUser, handleLogout }) {
  const navigate = useNavigate()
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [viewMode, setViewMode] = useState('daily') // daily, weekly, monthly
  
  // Get current month info
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const monthName = now.toLocaleString('default', { month: 'long' })
  const currentDay = now.getDate()
  
  // Get current week number in the month
  const currentWeek = Math.ceil(currentDay / 7)
  
  // Generate array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Helper function to get date string
  const getDateStr = (dayIndex) => `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayIndex + 1).padStart(2, '0')}`

  // Helper function to check if a day is completed (supports both old and new format)
  const isDayCompleted = (task, dayIndex) => {
    if (task.completedDates) {
      return task.completedDates[getDateStr(dayIndex)] || false
    }
    // Fallback for old format
    return task.completedDays && task.completedDays[dayIndex] || false
  }

  // Find the last day where ANY task was checked - all days up to that are "tracked"
  const getTrackedDays = () => {
    // Find the last day with any check
    let lastCheckedDay = -1
    for (let d = currentDay - 1; d >= 0; d--) {
      const anyTaskCompleted = tasks.some(task => isDayCompleted(task, d))
      if (anyTaskCompleted) {
        lastCheckedDay = d
        break
      }
    }
    
    // If no checks at all, return empty
    if (lastCheckedDay === -1) return []
    
    // Return all days from 0 to lastCheckedDay (inclusive)
    // This includes days with 0% completion
    return Array.from({ length: lastCheckedDay + 1 }, (_, i) => i)
  }

  const trackedDays = getTrackedDays()
  const totalTrackedDays = trackedDays.length

  // Calculate consistency based on TRACKED DAYS only
  const calculateConsistency = (task) => {
    if (totalTrackedDays === 0) return 0
    const completedOnTrackedDays = trackedDays.filter(d => isDayCompleted(task, d)).length
    return Math.round((completedOnTrackedDays / totalTrackedDays) * 100)
  }

  // Calculate total stats based on tracked days only
  const totalTasks = tasks.length
  const totalCompleted = tasks.reduce((acc, task) => 
    acc + trackedDays.filter(d => isDayCompleted(task, d)).length, 0
  )
  const totalPossible = totalTasks * totalTrackedDays
  const overallConsistency = totalPossible > 0 
    ? Math.round((totalCompleted / totalPossible) * 100) 
    : 0

  // Prepare data for charts - using tracked days basis
  const goalConsistencyData = tasks.map(task => {
    const completedOnTrackedDays = trackedDays.filter(d => isDayCompleted(task, d)).length
    return {
      name: task.name.length > 10 ? task.name.substring(0, 10) + '...' : task.name,
      fullName: task.name,
      consistency: totalTrackedDays > 0 ? Math.round((completedOnTrackedDays / totalTrackedDays) * 100) : 0,
      completed: completedOnTrackedDays,
      total: totalTrackedDays
    }
  })

  // Daily completion data (how many tasks completed each day)
  const dailyData = trackedDays.map(dayIndex => {
    const completedCount = tasks.reduce((acc, task) => 
      acc + (isDayCompleted(task, dayIndex) ? 1 : 0), 0
    )
    return {
      day: `Day ${dayIndex + 1}`,
      dayNum: dayIndex + 1,
      completed: completedCount,
      percentage: totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
    }
  })

  // Weekly breakdown - calculate each week's consistency based on tracked days
  const getWeeklyData = () => {
    const weeks = []
    const totalWeeks = Math.ceil(currentDay / 7)
    
    for (let i = 0; i < totalWeeks; i++) {
      const weekStart = i * 7
      const weekEnd = Math.min((i + 1) * 7, currentDay)
      
      // Get tracked days in this week
      const trackedInWeek = trackedDays.filter(d => d >= weekStart && d < weekEnd)
      const daysTrackedInWeek = trackedInWeek.length
      
      let weekCompleted = 0
      tasks.forEach(task => {
        trackedInWeek.forEach(d => {
          if (isDayCompleted(task, d)) weekCompleted++
        })
      })
      
      const weekTotal = daysTrackedInWeek * totalTasks
      const weekConsistency = weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0
      
      weeks.push({
        name: `Week ${i + 1}`,
        weekNum: i + 1,
        consistency: weekConsistency,
        daysTracked: daysTrackedInWeek,
        completed: weekCompleted,
        total: weekTotal,
        isCurrent: i + 1 === totalWeeks
      })
    }
    return weeks
  }

  // Get the week with most recent tracked activity
  const getActiveWeekNumber = () => {
    if (trackedDays.length === 0) return currentWeek
    const lastTrackedDay = Math.max(...trackedDays)
    return Math.ceil((lastTrackedDay + 1) / 7)
  }

  const activeWeek = getActiveWeekNumber()

  // Get stats for the active week (week with tracked data)
  const getCurrentWeekStats = () => {
    const weekStart = (activeWeek - 1) * 7
    const weekEnd = activeWeek * 7
    
    // Get tracked days in active week
    const trackedInWeek = trackedDays.filter(d => d >= weekStart && d < weekEnd)
    const daysTrackedInWeek = trackedInWeek.length
    
    let weekCompleted = 0
    tasks.forEach(task => {
      trackedInWeek.forEach(d => {
        if (isDayCompleted(task, d)) weekCompleted++
      })
    })
    
    const weekTotal = daysTrackedInWeek * totalTasks
    return {
      consistency: weekTotal > 0 ? Math.round((weekCompleted / weekTotal) * 100) : 0,
      completed: weekCompleted,
      total: weekTotal,
      days: daysTrackedInWeek
    }
  }

  // Monthly projection - if you continue at current rate
  const getMonthlyProjection = () => {
    const projectedTotal = Math.round((totalCompleted / currentDay) * daysInMonth)
    const maxPossible = totalTasks * daysInMonth
    return {
      projected: projectedTotal,
      max: maxPossible,
      projectedPercent: maxPossible > 0 ? Math.round((projectedTotal / maxPossible) * 100) : 0
    }
  }

  // Find key focus areas
  const getKeyFocusAreas = () => {
    const insights = []
    
    // Find lowest performing goal
    if (goalConsistencyData.length > 0) {
      const sorted = [...goalConsistencyData].sort((a, b) => a.consistency - b.consistency)
      const lowest = sorted[0]
      const highest = sorted[sorted.length - 1]
      
      if (lowest.consistency < 50) {
        insights.push({
          type: 'warning',
          icon: '⚠️',
          title: 'Needs Attention',
          message: `"${lowest.fullName}" has only ${lowest.consistency}% consistency. Consider breaking it into smaller daily actions.`
        })
      }
      
      if (highest.consistency >= 70) {
        insights.push({
          type: 'success',
          icon: '🌟',
          title: 'Top Performer',
          message: `"${highest.fullName}" is your strongest habit at ${highest.consistency}%! Keep it up!`
        })
      }
    }
    
    // Check for streaks
    const recentDays = dailyData.slice(-7)
    const avgRecent = recentDays.length > 0 
      ? Math.round(recentDays.reduce((a, b) => a + b.percentage, 0) / recentDays.length)
      : 0
    
    if (avgRecent < 50) {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Recent Decline',
        message: `Your last 7 days average is ${avgRecent}%. Time to refocus and get back on track!`
      })
    } else if (avgRecent >= 80) {
      insights.push({
        type: 'success',
        icon: '🔥',
        title: 'On Fire!',
        message: `Amazing! ${avgRecent}% average in the last 7 days. You're building momentum!`
      })
    }
    
    // Check consistency pattern
    if (dailyData.length >= 5) {
      const weekdayPerf = dailyData.filter((_, i) => {
        const dayOfWeek = new Date(currentYear, currentMonth, i + 1).getDay()
        return dayOfWeek !== 0 && dayOfWeek !== 6
      })
      const weekendPerf = dailyData.filter((_, i) => {
        const dayOfWeek = new Date(currentYear, currentMonth, i + 1).getDay()
        return dayOfWeek === 0 || dayOfWeek === 6
      })
      
      if (weekdayPerf.length > 0 && weekendPerf.length > 0) {
        const weekdayAvg = Math.round(weekdayPerf.reduce((a, b) => a + b.percentage, 0) / weekdayPerf.length)
        const weekendAvg = Math.round(weekendPerf.reduce((a, b) => a + b.percentage, 0) / weekendPerf.length)
        
        if (weekdayAvg - weekendAvg > 20) {
          insights.push({
            type: 'tip',
            icon: '📅',
            title: 'Weekend Slump',
            message: `You perform ${weekdayAvg - weekendAvg}% better on weekdays. Plan your weekends better!`
          })
        }
      }
    }
    
    if (insights.length === 0) {
      insights.push({
        type: 'tip',
        icon: '💡',
        title: 'Keep Going',
        message: 'Track more days to unlock personalized insights and recommendations!'
      })
    }
    
    return insights
  }

  // Get detailed improvement suggestions based on weak areas
  const getImprovementSuggestions = () => {
    const suggestions = []
    
    // Group goals by consistency level
    const criticalGoals = [] // < 30%
    const warningGoals = []  // 30-49%
    const moderateGoals = [] // 50-69%
    
    tasks.forEach((task) => {
      const completedOnTrackedDays = trackedDays.filter(d => isDayCompleted(task, d)).length
      const consistency = totalTrackedDays > 0 ? Math.round((completedOnTrackedDays / totalTrackedDays) * 100) : 0
      
      if (consistency < 30) {
        criticalGoals.push({ name: task.name, consistency })
      } else if (consistency < 50) {
        warningGoals.push({ name: task.name, consistency })
      } else if (consistency < 70) {
        moderateGoals.push({ name: task.name, consistency })
      }
    })
    
    // Add combined critical goals card
    if (criticalGoals.length > 0) {
      const avgConsistency = Math.round(criticalGoals.reduce((sum, g) => sum + g.consistency, 0) / criticalGoals.length)
      suggestions.push({
        type: 'critical',
        goals: criticalGoals,
        consistency: avgConsistency,
        title: 'Critical: Very Low Consistency',
        message: criticalGoals.length === 1 
          ? `Your "${criticalGoals[0].name}" goal is at only ${criticalGoals[0].consistency}%. This goal might be too ambitious.`
          : `${criticalGoals.length} goals need urgent attention: ${criticalGoals.map(g => `"${g.name}" (${g.consistency}%)`).join(', ')}`,
        tips: [
          'Break these goals into smaller, more achievable daily tasks',
          'Set a specific time each day dedicated to each goal',
          'Start with just 5-10 minutes daily to build the habit',
          'Consider if these goals align with your current priorities',
          'Focus on one goal at a time rather than all at once'
        ]
      })
    }
    
    // Add combined warning goals card
    if (warningGoals.length > 0) {
      const avgConsistency = Math.round(warningGoals.reduce((sum, g) => sum + g.consistency, 0) / warningGoals.length)
      suggestions.push({
        type: 'warning',
        goals: warningGoals,
        consistency: avgConsistency,
        title: 'Needs Improvement',
        message: warningGoals.length === 1
          ? `"${warningGoals[0].name}" is at ${warningGoals[0].consistency}%. You're completing it less than half the time.`
          : `${warningGoals.length} goals are below 50%: ${warningGoals.map(g => `"${g.name}" (${g.consistency}%)`).join(', ')}`,
        tips: [
          'Identify what triggers you to skip these goals',
          'Pair each habit with an existing daily routine',
          'Set reminders at optimal times during your day',
          'Track what prevents you from completing them',
          'Try habit stacking - link new habits to existing ones'
        ]
      })
    }
    
    // Add combined moderate goals card
    if (moderateGoals.length > 0) {
      const avgConsistency = Math.round(moderateGoals.reduce((sum, g) => sum + g.consistency, 0) / moderateGoals.length)
      suggestions.push({
        type: 'moderate',
        goals: moderateGoals,
        consistency: avgConsistency,
        title: 'Room for Growth',
        message: moderateGoals.length === 1
          ? `"${moderateGoals[0].name}" is at ${moderateGoals[0].consistency}%. You're on the right track but can improve.`
          : `${moderateGoals.length} goals are good but could be better: ${moderateGoals.map(g => `"${g.name}" (${g.consistency}%)`).join(', ')}`,
        tips: [
          'Focus on maintaining streaks - don\'t break the chain',
          'Prepare everything you need the night before',
          'Reward yourself for hitting weekly targets',
          'These are close to becoming solid habits - push a little more!'
        ]
      })
    }
    
    // Analyze day-of-week patterns
    const dayOfWeekStats = [0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {
      const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
      const daysOfThisType = trackedDays.filter(d => {
        const date = new Date(currentYear, currentMonth, d + 1)
        return date.getDay() === dayOfWeek
      })
      
      if (daysOfThisType.length === 0) return { dayName, dayOfWeek, avg: null, count: 0 }
      
      let completed = 0
      let total = daysOfThisType.length * tasks.length
      
      tasks.forEach(task => {
        daysOfThisType.forEach(d => {
          if (isDayCompleted(task, d)) completed++
        })
      })
      
      return {
        dayName,
        dayOfWeek,
        avg: total > 0 ? Math.round((completed / total) * 100) : 0,
        count: daysOfThisType.length
      }
    }).filter(d => d.count > 0)
    
    // Find worst performing days
    const worstDays = dayOfWeekStats.filter(d => d.avg < 50).sort((a, b) => a.avg - b.avg)
    
    if (worstDays.length > 0) {
      suggestions.push({
        type: 'pattern',
        goal: 'Day Pattern',
        consistency: worstDays[0].avg,
        title: 'Weak Days Detected',
        message: `Your worst performing day${worstDays.length > 1 ? 's are' : ' is'}: ${worstDays.map(d => `${d.dayName} (${d.avg}%)`).join(', ')}`,
        tips: [
          `Plan easier tasks for ${worstDays[0].dayName}s`,
          'Schedule your goals at different times on weak days',
          'Identify what makes these days challenging',
          'Consider reducing goal difficulty on these days'
        ]
      })
    }
    
    // Check for missed streaks
    tasks.forEach(task => {
      let maxStreak = 0
      let currentStreak = 0
      let brokenStreakCount = 0
      
      for (let i = 0; i < trackedDays.length; i++) {
        if (isDayCompleted(task, trackedDays[i])) {
          currentStreak++
          maxStreak = Math.max(maxStreak, currentStreak)
        } else {
          if (currentStreak >= 3) brokenStreakCount++
          currentStreak = 0
        }
      }
      
      if (brokenStreakCount >= 2 && maxStreak >= 3) {
        suggestions.push({
          type: 'streak',
          goal: task.name,
          consistency: null,
          title: 'Broken Streaks',
          message: `You've broken ${brokenStreakCount} streak(s) of 3+ days on "${task.name}". Your best streak was ${maxStreak} days.`,
          tips: [
            'Don\'t aim for perfection - aim for consistency',
            'If you miss one day, don\'t miss two in a row',
            'Create a "minimum viable habit" for tough days',
            'Track your streak visually to stay motivated'
          ]
        })
      }
    })
    
    // Overall consistency suggestion
    if (overallConsistency < 50) {
      suggestions.push({
        type: 'overall',
        goal: 'Overall',
        consistency: overallConsistency,
        title: 'Overall Consistency Below 50%',
        message: `Your overall consistency is ${overallConsistency}%. Focus on building a strong foundation.`,
        tips: [
          'Start with just 1-2 goals instead of many',
          'Focus on "never miss twice" instead of perfection',
          'Make your habits so easy you can\'t say no',
          'Celebrate small wins to build momentum'
        ]
      })
    }
    
    return suggestions.sort((a, b) => {
      const priority = { critical: 0, warning: 1, pattern: 2, streak: 3, moderate: 4, overall: 5 }
      return priority[a.type] - priority[b.type]
    })
  }

  const reward = getReward(overallConsistency)
  const weeklyData = getWeeklyData()
  const currentWeekStats = getCurrentWeekStats()
  const monthlyProjection = getMonthlyProjection()

  if (tasks.length === 0) {
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
        <div className="analysis-header">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Tracker
          </button>
        </div>
        
        {/* Professional Logo */}
        <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="url(#analysisGradient)"/>
              <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="2.5" fill="none"/>
              <path d="M24 16V24L29 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="36" cy="12" r="4" fill="#4ade80"/>
              <path d="M34 12L35.5 13.5L38 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="analysisGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6"/>
                  <stop offset="1" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">
            <h1>Performance <span className="highlight">Analysis</span></h1>
            <p className="tagline">Your Progress Report</p>
          </div>
        </div>
        
        <div className="no-tasks">
          <div className="no-tasks-icon">
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <path d="M16 28V24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
              <path d="M24 28V20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
              <path d="M32 28V16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <p>No data to analyze yet.</p>
          <p>Add some goals and track your progress first!</p>
        </div>
      </div>
    )
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
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Back Button */}
      <div className="analysis-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Tracker
        </button>
        <button className="compete-nav-btn" onClick={() => navigate('/compete')}>
          🏆 Compete
        </button>
        <button className="compete-nav-btn" onClick={() => navigate('/rewards')}>
          🎁 Rewards
        </button>
      </div>
      
      {/* Professional Logo */}
      <div className="logo-container">
        <div className="logo-icon">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="12" fill="url(#analysisGradient2)"/>
            <circle cx="24" cy="24" r="12" stroke="white" strokeWidth="2.5" fill="none"/>
            <path d="M24 16V24L29 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="36" cy="12" r="4" fill="#4ade80"/>
            <path d="M34 12L35.5 13.5L38 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="analysisGradient2" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6"/>
                <stop offset="1" stopColor="#6366f1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="logo-text">
          <h1>Performance <span className="highlight">Analysis</span></h1>
          <p className="tagline">Your Progress Report</p>
        </div>
      </div>
      
      <h2 className="current-period">{monthName} {currentYear} • {totalTrackedDays} Days Tracked</h2>

      <div className="analysis-section">
        {/* Reward Badge */}
        <div className="reward-card" style={{ borderColor: reward.color }}>
          <div className="reward-badge">{reward.badge}</div>
          <div className="reward-content">
            <h3 className="reward-title" style={{ color: reward.color }}>{reward.title}</h3>
            <p className="reward-message">{reward.message}</p>
            <div className="reward-score">Overall Score: {overallConsistency}% ({totalCompleted}/{totalPossible} tasks on {totalTrackedDays} tracked days)</div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="view-mode-tabs">
          <button 
            className={`view-tab ${viewMode === 'daily' ? 'active' : ''}`}
            onClick={() => setViewMode('daily')}
          >
            📅 Daily
          </button>
          <button 
            className={`view-tab ${viewMode === 'weekly' ? 'active' : ''}`}
            onClick={() => setViewMode('weekly')}
          >
            📊 Weekly
          </button>
          <button 
            className={`view-tab ${viewMode === 'monthly' ? 'active' : ''}`}
            onClick={() => setViewMode('monthly')}
          >
            📆 Monthly
          </button>
        </div>

        {/* Daily View */}
        {viewMode === 'daily' && (
          <div className="view-content">
            <div className="period-stats">
              <div className="period-stat-card highlight-card">
                <div className="period-stat-icon">📅</div>
                <div className="period-stat-info">
                  <span className="period-stat-value">{overallConsistency}%</span>
                  <span className="period-stat-label">Overall Consistency</span>
                </div>
              </div>
              <div className="period-stat-card">
                <div className="period-stat-info">
                  <span className="period-stat-value">{totalCompleted}/{totalPossible}</span>
                  <span className="period-stat-label">Tasks Done ({totalTrackedDays} days)</span>
                </div>
              </div>
              <div className="period-stat-card">
                <div className="period-stat-info">
                  <span className="period-stat-value">{dailyData.length > 0 ? dailyData[dailyData.length - 1].percentage : 0}%</span>
                  <span className="period-stat-label">Last Tracked Day</span>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <h3>📈 Daily Progress ({totalTrackedDays} Tracked Days)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="day" tick={{ fill: '#666', fontSize: 10 }} interval={0} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#666' }} />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}
                    formatter={(value) => [`${value}%`, 'Completion']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Weekly View */}
        {viewMode === 'weekly' && (
          <div className="view-content">
            <div className="period-stats">
              <div className="period-stat-card highlight-card">
                <div className="period-stat-icon">📊</div>
                <div className="period-stat-info">
                  <span className="period-stat-value">{currentWeekStats.consistency}%</span>
                  <span className="period-stat-label">Week {activeWeek} Score</span>
                </div>
              </div>
              <div className="period-stat-card">
                <div className="period-stat-info">
                  <span className="period-stat-value">{currentWeekStats.completed}/{currentWeekStats.total}</span>
                  <span className="period-stat-label">Week {activeWeek} Tasks</span>
                </div>
              </div>
              <div className="period-stat-card">
                <div className="period-stat-info">
                  <span className="period-stat-value">{currentWeekStats.days}</span>
                  <span className="period-stat-label">Days Tracked in Week {activeWeek}</span>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <h3>📊 Weekly Breakdown</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="name" tick={{ fill: '#666' }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#666' }} />
                  <Tooltip 
                    contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}
                    formatter={(value, name, props) => [
                      `${value}% (${props.payload.completed}/${props.payload.total} tasks)`,
                      'Consistency'
                    ]}
                  />
                  <Bar dataKey="consistency" radius={[8, 8, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.isCurrent ? '#3b82f6' : '#6366f1'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="weekly-details">
              {weeklyData.map((week) => (
                <div key={week.weekNum} className={`week-card ${week.isCurrent ? 'current' : ''}`}>
                  <div className="week-header">
                    <span className="week-name">{week.name} {week.isCurrent && '(Current)'}</span>
                    <span className="week-consistency" style={{ color: week.consistency >= 70 ? '#4CAF50' : week.consistency >= 50 ? '#f7931e' : '#ff5252' }}>
                      {week.consistency}%
                    </span>
                  </div>
                  <div className="week-progress">
                    <div className="week-progress-bar">
                      <div 
                        className="week-progress-fill" 
                        style={{ width: `${week.consistency}%`, background: week.consistency >= 70 ? '#4CAF50' : week.consistency >= 50 ? '#f7931e' : '#ff5252' }}
                      ></div>
                    </div>
                    <span className="week-stats">{week.completed}/{week.total} tasks • {week.daysTracked} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly View */}
        {viewMode === 'monthly' && (
          <div className="view-content">
            <div className="period-stats">
              <div className="period-stat-card highlight-card">
                <div className="period-stat-icon">📆</div>
                <div className="period-stat-info">
                  <span className="period-stat-value">{overallConsistency}%</span>
                  <span className="period-stat-label">{monthName} Score</span>
                </div>
              </div>
              <div className="period-stat-card">
                <div className="period-stat-info">
                  <span className="period-stat-value">{monthlyProjection.projectedPercent}%</span>
                  <span className="period-stat-label">Projected Month End</span>
                </div>
              </div>
              <div className="period-stat-card">
                <div className="period-stat-info">
                  <span className="period-stat-value">{daysInMonth - currentDay}</span>
                  <span className="period-stat-label">Days Remaining</span>
                </div>
              </div>
            </div>

            <div className="charts-grid">
              <div className="chart-card">
                <h3>🥧 Month Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Completed', value: totalCompleted },
                        { name: 'Missed', value: totalPossible - totalCompleted }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#4CAF50" />
                      <Cell fill="#ffcdd2" />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>🎯 Goal-wise Consistency ({totalTrackedDays} tracked days)</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={goalConsistencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" tick={{ fill: '#666', fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: '#666' }} />
                    <Tooltip 
                      contentStyle={{ background: '#fff', border: '1px solid #eee', borderRadius: '8px' }}
                      formatter={(value, name, props) => [
                        `${value}% (${props.payload.completed}/${props.payload.total} days)`,
                        'Consistency'
                      ]}
                    />
                    <Bar dataKey="consistency" radius={[8, 8, 0, 0]}>
                      {goalConsistencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="monthly-projection">
              <h3>🔮 Month-End Projection</h3>
              <p>If you continue at your current rate, by the end of {monthName} you will complete approximately <strong>{monthlyProjection.projected}</strong> out of <strong>{monthlyProjection.max}</strong> total tasks ({monthlyProjection.projectedPercent}%).</p>
            </div>
          </div>
        )}

        {/* Key Focus Areas */}
        <div className="focus-section">
          <h3>🔑 Key Focus Areas</h3>
          <div className="insights-grid">
            {getKeyFocusAreas().map((insight, index) => (
              <div key={index} className={`insight-card ${insight.type}`}>
                <div className="insight-icon">{insight.icon}</div>
                <div className="insight-content">
                  <h4>{insight.title}</h4>
                  <p>{insight.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Consistency Heatmap Calendar */}
        <div className="heatmap-section">
          <h3>📅 {currentYear} Consistency Heatmap</h3>
          <p className="heatmap-intro">Visual overview of your daily consistency across the entire year</p>
          <div className="heatmap-container">
            <div className="heatmap-grid">
              <div className="heatmap-months-label">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                  const firstDayOfMonth = new Date(currentYear, idx, 1)
                  const weekOffset = Math.floor((firstDayOfMonth - new Date(currentYear, 0, 1)) / (7 * 24 * 60 * 60 * 1000))
                  return (
                    <span 
                      key={month} 
                      style={{ 
                        gridColumn: `${weekOffset + 1} / span 4`,
                        display: weekOffset < 52 ? 'block' : 'none'
                      }}
                    >
                      {month}
                    </span>
                  )
                })}
              </div>
              <div className="heatmap-days-label">
                <span>Mon</span>
                <span></span>
                <span>Wed</span>
                <span></span>
                <span>Fri</span>
                <span></span>
                <span>Sun</span>
              </div>
              <div className="heatmap-calendar-year">
                {(() => {
                  const yearDays = []
                  const startDate = new Date(currentYear, 0, 1)
                  const endDate = new Date(currentYear, 11, 31)
                  const today = new Date(currentYear, currentMonth, currentDay)
                  const totalDaysInYear = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1
                  
                  for (let i = 0; i < totalDaysInYear; i++) {
                    const date = new Date(currentYear, 0, i + 1)
                    const month = date.getMonth()
                    const dayOfMonth = date.getDate()
                    const dayIndex = dayOfMonth - 1
                    
                    const isCurrentMonth = month === currentMonth
                    const isTracked = isCurrentMonth && trackedDays.includes(dayIndex)
                    const dayTasks = isTracked ? tasks.filter(task => isDayCompleted(task, dayIndex)).length : 0
                    const dayPercentage = isTracked && totalTasks > 0 ? Math.round((dayTasks / totalTasks) * 100) : 0
                    const isFuture = date > today
                    
                    const dayOfWeek = date.getDay()
                    const weekNumber = Math.floor((date - startDate) / (7 * 24 * 60 * 60 * 1000))
                    const dayPosition = dayOfWeek === 0 ? 6 : dayOfWeek - 1
                    
                    let cellClass = 'heatmap-cell'
                    if (isFuture) {
                      cellClass += ' future'
                    } else if (!isCurrentMonth) {
                      cellClass += ' level-0'
                    } else if (!isTracked) {
                      cellClass += ' level-0'
                    } else if (dayPercentage === 0) {
                      cellClass += ' level-0'
                    } else if (dayPercentage < 25) {
                      cellClass += ' level-1'
                    } else if (dayPercentage < 50) {
                      cellClass += ' level-2'
                    } else if (dayPercentage < 75) {
                      cellClass += ' level-3'
                    } else {
                      cellClass += ' level-4'
                    }
                    
                    yearDays.push(
                      <div
                        key={i}
                        className={cellClass}
                        style={{
                          gridColumn: weekNumber + 1,
                          gridRow: dayPosition + 1
                        }}
                        title={`${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}: ${isCurrentMonth ? `${dayPercentage}% (${dayTasks}/${totalTasks} tasks)` : isFuture ? 'Future date' : 'No data'}`}
                      >
                        <span className="heatmap-tooltip">
                          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}<br/>
                          {isCurrentMonth ? `${dayPercentage}% (${dayTasks}/${totalTasks} tasks)` : isFuture ? 'Future date' : 'No data for this month'}
                        </span>
                      </div>
                    )
                  }
                  return yearDays
                })()}
              </div>
            </div>
            <div className="heatmap-legend">
              <span className="legend-label">Less</span>
              <div className="legend-cell level-0"></div>
              <div className="legend-cell level-1"></div>
              <div className="legend-cell level-2"></div>
              <div className="legend-cell level-3"></div>
              <div className="legend-cell level-4"></div>
              <span className="legend-label">More</span>
            </div>
          </div>
        </div>

        {/* Improvement Suggestions - Minus Points */}
        {getImprovementSuggestions().length > 0 && (
          <div className="improvement-section">
            <h3>📋 Areas for Improvement</h3>
            <p className="improvement-intro">Here are specific suggestions to help boost your consistency:</p>
            <div className="suggestions-list">
              {getImprovementSuggestions().map((suggestion, index) => (
                <div key={index} className={`suggestion-card ${suggestion.type}`}>
                  <div className="suggestion-header">
                    <div className="suggestion-badge">
                      {suggestion.type === 'critical' && '🔴'}
                      {suggestion.type === 'warning' && '🟡'}
                      {suggestion.type === 'moderate' && '🟠'}
                      {suggestion.type === 'pattern' && '📊'}
                      {suggestion.type === 'streak' && '🔗'}
                      {suggestion.type === 'overall' && '📉'}
                    </div>
                    <div className="suggestion-title-area">
                      <h4>{suggestion.title}</h4>
                      {suggestion.goals && suggestion.goals.length > 0 && (
                        <div className="suggestion-goals-tags">
                          {suggestion.goals.map((g, i) => (
                            <span key={i} className="suggestion-goal-tag">
                              {g.name} <span className="goal-tag-percent">{g.consistency}%</span>
                            </span>
                          ))}
                        </div>
                      )}
                      {suggestion.goal && !suggestion.goals && (
                        <span className="suggestion-goal">{suggestion.goal}</span>
                      )}
                      {suggestion.consistency !== null && !suggestion.goals && (
                        <span className={`suggestion-percent ${suggestion.consistency < 30 ? 'critical' : suggestion.consistency < 50 ? 'warning' : 'moderate'}`}>
                          {suggestion.consistency}%
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="suggestion-message">{suggestion.message}</p>
                  <div className="suggestion-tips">
                    <span className="tips-label">💡 Tips to improve:</span>
                    <ul>
                      {suggestion.tips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Individual Goal Details */}
        <div className="goals-detail-section">
          <h3>📋 Individual Goal Analysis ({totalTrackedDays} tracked days)</h3>
          <div className="goals-detail-grid">
            {tasks.map((task, index) => {
              const completedOnTrackedDays = trackedDays.filter(d => isDayCompleted(task, d)).length
              const consistency = totalTrackedDays > 0 ? Math.round((completedOnTrackedDays / totalTrackedDays) * 100) : 0
              const goalReward = getReward(consistency)
              
              // Calculate current streak (based on tracked days)
              let currentStreak = 0
              for (let i = trackedDays.length - 1; i >= 0; i--) {
                if (isDayCompleted(task, trackedDays[i])) currentStreak++
                else break
              }
              
              // Calculate longest streak (based on tracked days)
              let longestStreak = 0
              let tempStreak = 0
              for (let i = 0; i < trackedDays.length; i++) {
                if (isDayCompleted(task, trackedDays[i])) {
                  tempStreak++
                  longestStreak = Math.max(longestStreak, tempStreak)
                } else {
                  tempStreak = 0
                }
              }
              
              return (
                <div key={task.id} className="goal-detail-card">
                  <div className="goal-detail-header" style={{ borderLeftColor: COLORS[index % COLORS.length] }}>
                    <span className="goal-detail-badge">{goalReward.badge}</span>
                    <h4>{task.name}</h4>
                  </div>
                  <div className="goal-detail-stats">
                    <div className="goal-stat">
                      <span className="goal-stat-value">{consistency}%</span>
                      <span className="goal-stat-label">Consistency</span>
                    </div>
                    <div className="goal-stat">
                      <span className="goal-stat-value">{completedOnTrackedDays}/{totalTrackedDays}</span>
                      <span className="goal-stat-label">Days Done</span>
                    </div>
                    <div className="goal-stat">
                      <span className="goal-stat-value">{currentStreak}</span>
                      <span className="goal-stat-label">Current Streak</span>
                    </div>
                    <div className="goal-stat">
                      <span className="goal-stat-value">{longestStreak}</span>
                      <span className="goal-stat-label">Best Streak</span>
                    </div>
                  </div>
                  <div className="goal-progress-bar">
                    <div 
                      className="goal-progress-fill" 
                      style={{ 
                        width: `${consistency}%`,
                        background: `linear-gradient(90deg, ${COLORS[index % COLORS.length]}, ${COLORS[(index + 1) % COLORS.length]})`
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        className="floating-chat-btn" 
        onClick={() => setIsChatbotOpen(true)}
        aria-label="Open AI Coach"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
        </svg>
        <span className="chat-badge">AI</span>
      </button>

      {/* Chatbot */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)}
        currentUser={currentUser}
      />
    </div>
  )
}

export default Analysis
