import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProgress } from '../context/UserProgressContext'

// Mock Rewards Shop Data
const rewardsShopData = {
  themes: [
    { id: 'theme_1', title: 'Ocean Blue Theme', icon: '🌊', description: 'Calming ocean-inspired color palette', cost: 50, category: 'themes' },
    { id: 'theme_2', title: 'Sunset Orange Theme', icon: '🌅', description: 'Warm sunset gradient theme', cost: 50, category: 'themes' },
    { id: 'theme_3', title: 'Forest Green Theme', icon: '🌲', description: 'Nature-inspired green theme', cost: 50, category: 'themes' },
    { id: 'theme_4', title: 'Midnight Dark Theme', icon: '🌙', description: 'Premium dark mode theme', cost: 75, category: 'themes' },
  ],
  badges: [
    { id: 'badge_1', title: 'Diamond Badge', icon: '💎', description: 'Elite consistency badge', cost: 100, category: 'badges' },
    { id: 'badge_2', title: 'Crown Badge', icon: '👑', description: 'Royal achievement badge', cost: 150, category: 'badges' },
    { id: 'badge_3', title: 'Star Badge', icon: '⭐', description: 'Shining star performer', cost: 80, category: 'badges' },
    { id: 'badge_4', title: 'Lightning Badge', icon: '⚡', description: 'Speed demon badge', cost: 120, category: 'badges' },
  ],
  streakFreeze: [
    { id: 'freeze_1', title: '1-Day Streak Freeze', icon: '🧊', description: 'Protect your streak for 1 day', cost: 30, category: 'streakFreeze' },
    { id: 'freeze_2', title: '3-Day Streak Freeze', icon: '❄️', description: 'Protect your streak for 3 days', cost: 75, category: 'streakFreeze' },
    { id: 'freeze_3', title: '7-Day Streak Freeze', icon: '🧊', description: 'Protect your streak for 7 days', cost: 150, category: 'streakFreeze' },
    { id: 'freeze_4', title: 'Ultimate Protection', icon: '🛡️', description: '30-day streak protection', cost: 500, category: 'streakFreeze' },
  ],
  coupons: [
    { id: 'coupon_1', title: '10% Off Premium', icon: '🎫', description: 'Get 10% off premium features', cost: 200, category: 'coupons' },
    { id: 'coupon_2', title: 'Free Month Premium', icon: '🎁', description: '1 month premium subscription', cost: 500, category: 'coupons' },
    { id: 'coupon_3', title: 'Double XP Boost', icon: '🚀', description: '2x XP for 7 days', cost: 150, category: 'coupons' },
    { id: 'coupon_4', title: 'Exclusive Avatar', icon: '🎨', description: 'Unlock special avatar frames', cost: 100, category: 'coupons' },
  ]
}

// Mock Achievements
const achievementsData = [
  { id: 'ach_1', title: 'First Steps', icon: '👣', description: 'Earn your first 100 XP', requirement: 100, type: 'xp' },
  { id: 'ach_2', title: 'Getting Started', icon: '🌟', description: 'Reach 1000 XP', requirement: 1000, type: 'xp' },
  { id: 'ach_3', title: 'Rising Star', icon: '✨', description: 'Reach 2500 XP', requirement: 2500, type: 'xp' },
  { id: 'ach_4', title: 'Expert', icon: '💪', description: 'Reach 5000 XP', requirement: 5000, type: 'xp' },
  { id: 'ach_5', title: 'Master', icon: '🏆', description: 'Reach 10000 XP', requirement: 10000, type: 'xp' },
  { id: 'ach_6', title: 'Week Warrior', icon: '🔥', description: 'Maintain 7-day streak', requirement: 7, type: 'streak' },
  { id: 'ach_7', title: 'Month Master', icon: '🎯', description: 'Maintain 30-day streak', requirement: 30, type: 'streak' },
  { id: 'ach_8', title: 'Unstoppable', icon: '⚡', description: 'Maintain 100-day streak', requirement: 100, type: 'streak' },
]

function RewardsPage({ theme, toggleTheme, currentUser, handleLogout }) {
  const navigate = useNavigate()
  const progress = useUserProgress()
  const [activeTab, setActiveTab] = useState('themes')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  const showNotification = (message, type = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const handleRedeem = (reward) => {
    const result = progress.redeemReward(reward)
    if (result.success) {
      showNotification(result.message, 'success')
    } else {
      showNotification(result.message, 'error')
    }
  }

  const getAchievementProgress = (achievement) => {
    if (achievement.type === 'xp') {
      return Math.min((progress.xp / achievement.requirement) * 100, 100)
    } else if (achievement.type === 'streak') {
      return Math.min((progress.currentStreak / achievement.requirement) * 100, 100)
    }
    return 0
  }

  const isAchievementUnlocked = (achievement) => {
    if (achievement.type === 'xp') {
      return progress.xp >= achievement.requirement
    } else if (achievement.type === 'streak') {
      return progress.currentStreak >= achievement.requirement
    }
    return false
  }

  const currentRewards = rewardsShopData[activeTab] || []

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

      {/* Toast Notification */}
      {showToast && (
        <div className={`toast-notification ${toastType}`}>
          <div className="toast-icon">
            {toastType === 'success' ? '✓' : '⚠'}
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="rewards-header">
        <div className="rewards-header-content">
          <div className="rewards-title-section">
            <h1 className="rewards-title">
              <span className="rewards-icon">🎁</span>
              Rewards
            </h1>
            <p className="rewards-subtitle">Earn points and unlock rewards by staying consistent</p>
          </div>
          <div className="rewards-actions">
            <button className="rewards-action-btn secondary" onClick={() => navigate('/compete')}>
              ← Back to Compete
            </button>
            <button className="rewards-action-btn primary" onClick={() => document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' })}>
              🛍️ Browse Shop
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Summary Cards */}
      <div className="wallet-summary">
        <div className="wallet-card primary">
          <div className="wallet-icon">⚡</div>
          <div className="wallet-content">
            <span className="wallet-label">Total XP</span>
            <span className="wallet-value">{progress.xp.toLocaleString()}</span>
          </div>
        </div>

        <div className="wallet-card">
          <div className="wallet-icon">🪙</div>
          <div className="wallet-content">
            <span className="wallet-label">Coins Balance</span>
            <span className="wallet-value">{progress.coins.toLocaleString()}</span>
          </div>
        </div>

        <div className="wallet-card">
          <div className="wallet-icon">🎖️</div>
          <div className="wallet-content">
            <span className="wallet-label">Current Level</span>
            <span className="wallet-value">Level {progress.level}</span>
          </div>
        </div>

        <div className="wallet-card">
          <div className="wallet-icon">🔥</div>
          <div className="wallet-content">
            <span className="wallet-label">Streak</span>
            <span className="wallet-value">{progress.currentStreak} days</span>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="level-progress-section">
        <div className="level-progress-header">
          <div>
            <h3 className="level-progress-title">Level {progress.level} Progress</h3>
            <p className="level-progress-subtitle">
              {progress.xp.toLocaleString()} / {progress.nextLevelXP.toLocaleString()} XP to Level {progress.level + 1}
            </p>
          </div>
          <span className="level-progress-percent">{Math.round(progress.levelProgress)}%</span>
        </div>
        <div className="level-progress-bar">
          <div className="level-progress-fill" style={{ width: `${progress.levelProgress}%` }}></div>
        </div>
      </div>

      {/* Rewards Shop */}
      <div className="rewards-shop-section" id="shop-section">
        <h2 className="section-title">Rewards Shop</h2>
        
        {/* Shop Tabs */}
        <div className="shop-tabs">
          <button 
            className={`shop-tab ${activeTab === 'themes' ? 'active' : ''}`}
            onClick={() => setActiveTab('themes')}
          >
            🎨 Themes
          </button>
          <button 
            className={`shop-tab ${activeTab === 'badges' ? 'active' : ''}`}
            onClick={() => setActiveTab('badges')}
          >
            🏅 Badges
          </button>
          <button 
            className={`shop-tab ${activeTab === 'streakFreeze' ? 'active' : ''}`}
            onClick={() => setActiveTab('streakFreeze')}
          >
            🧊 Streak Freeze
          </button>
          <button 
            className={`shop-tab ${activeTab === 'coupons' ? 'active' : ''}`}
            onClick={() => setActiveTab('coupons')}
          >
            🎫 Coupons
          </button>
        </div>

        {/* Shop Items Grid */}
        <div className="shop-items-grid">
          {currentRewards.map((reward) => {
            const isOwned = progress.hasReward(reward.id)
            const canAfford = progress.coins >= reward.cost

            return (
              <div key={reward.id} className={`shop-item-card ${isOwned ? 'owned' : ''}`}>
                <div className="shop-item-icon">{reward.icon}</div>
                <h3 className="shop-item-title">{reward.title}</h3>
                <p className="shop-item-description">{reward.description}</p>
                <div className="shop-item-footer">
                  <div className="shop-item-cost">
                    <span className="cost-icon">🪙</span>
                    <span className="cost-value">{reward.cost}</span>
                  </div>
                  <button 
                    className={`shop-item-btn ${isOwned ? 'owned' : canAfford ? 'available' : 'disabled'}`}
                    onClick={() => !isOwned && canAfford && handleRedeem(reward)}
                    disabled={isOwned || !canAfford}
                  >
                    {isOwned ? 'Owned ✓' : canAfford ? 'Redeem' : 'Insufficient'}
                  </button>
                </div>
                {isOwned && <div className="owned-badge">✓ Owned</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h2 className="section-title">Achievements</h2>
        <div className="achievements-grid">
          {achievementsData.map((achievement) => {
            const progressPercent = getAchievementProgress(achievement)
            const isUnlocked = isAchievementUnlocked(achievement)

            return (
              <div key={achievement.id} className={`achievement-card ${isUnlocked ? 'unlocked' : ''}`}>
                <div className="achievement-icon-container">
                  <span className="achievement-icon">{achievement.icon}</span>
                  {isUnlocked && <div className="achievement-check">✓</div>}
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                  <div className="achievement-progress">
                    <div className="achievement-progress-bar">
                      <div 
                        className="achievement-progress-fill" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="achievement-progress-text">
                      {isUnlocked ? 'Completed!' : `${Math.round(progressPercent)}%`}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="activity-timeline-section">
        <h2 className="section-title">Activity Timeline</h2>
        <div className="timeline-container">
          {progress.activityLog.slice(0, 10).map((activity) => {
            const date = new Date(activity.timestamp)
            const timeAgo = getTimeAgo(date)

            return (
              <div key={activity.id} className="timeline-item">
                <div className={`timeline-icon ${activity.type}`}>
                  {activity.type === 'xp_earned' && '⚡'}
                  {activity.type === 'reward_redeemed' && '🎁'}
                  {activity.type === 'badge_unlocked' && '🏅'}
                </div>
                <div className="timeline-content">
                  <p className="timeline-description">{activity.description}</p>
                  <span className="timeline-time">{timeAgo}</span>
                </div>
                {activity.amount && (
                  <div className="timeline-amount">
                    +{activity.amount} {activity.type === 'xp_earned' ? 'XP' : 'coins'}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export default RewardsPage
