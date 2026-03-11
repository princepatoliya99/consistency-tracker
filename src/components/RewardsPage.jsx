import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProgress } from '../context/UserProgressContext'
import './RewardsPage.css'

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

const shopTabs = [
  { key: 'themes', label: '🎨 Themes' },
  { key: 'badges', label: '🏅 Badges' },
  { key: 'streakFreeze', label: '🧊 Streak Freeze' },
  { key: 'coupons', label: '🎫 Coupons' },
]

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000)
  if (seconds < 60) return 'Just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

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
    if (achievement.type === 'xp') return progress.xp >= achievement.requirement
    if (achievement.type === 'streak') return progress.currentStreak >= achievement.requirement
    return false
  }

  const currentRewards = rewardsShopData[activeTab] || []

  return (
    <div className="rw-page">
      {/* Toast */}
      {showToast && (
        <div className={`rw-toast ${toastType}`}>
          <span>{toastType === 'success' ? '✓' : '⚠'}</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="rw-hero">
        <div className="rw-hero-inner">
          <div className="rw-hero-text">
            <h1>🎁 Rewards</h1>
            <p>Earn points and unlock rewards by staying consistent</p>
          </div>
          <div className="rw-hero-actions">
            <button className="rw-btn rw-btn-ghost" onClick={() => navigate('/compete')}>
              ← Back to Compete
            </button>
            <button
              className="rw-btn rw-btn-primary"
              onClick={() => document.getElementById('rw-shop').scrollIntoView({ behavior: 'smooth' })}
            >
              🛍️ Browse Shop
            </button>
          </div>
        </div>
      </div>

      {/* Wallet Stats Row */}
      <div className="rw-wallet-row">
        <div className="rw-wallet-tile">
          <div className="rw-wallet-icon blue">⚡</div>
          <div className="rw-wallet-info">
            <span className="rw-wallet-value">{progress.xp.toLocaleString()}</span>
            <span className="rw-wallet-label">Total XP</span>
          </div>
        </div>
        <div className="rw-wallet-tile">
          <div className="rw-wallet-icon amber">🪙</div>
          <div className="rw-wallet-info">
            <span className="rw-wallet-value">{progress.coins.toLocaleString()}</span>
            <span className="rw-wallet-label">Coins Balance</span>
          </div>
        </div>
        <div className="rw-wallet-tile">
          <div className="rw-wallet-icon purple">🎖️</div>
          <div className="rw-wallet-info">
            <span className="rw-wallet-value">Level {progress.level}</span>
            <span className="rw-wallet-label">Current Level</span>
          </div>
        </div>
        <div className="rw-wallet-tile">
          <div className="rw-wallet-icon red">🔥</div>
          <div className="rw-wallet-info">
            <span className="rw-wallet-value">{progress.currentStreak}</span>
            <span className="rw-wallet-label">Day Streak</span>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="rw-level">
        <div className="rw-level-header">
          <div>
            <h3 className="rw-level-title">Level {progress.level} Progress</h3>
            <p className="rw-level-sub">
              {progress.xp.toLocaleString()} / {progress.nextLevelXP.toLocaleString()} XP to Level {progress.level + 1}
            </p>
          </div>
          <span className="rw-level-pct">{Math.round(progress.levelProgress)}%</span>
        </div>
        <div className="rw-level-bar">
          <div className="rw-level-fill" style={{ width: `${progress.levelProgress}%` }} />
        </div>
      </div>

      {/* Rewards Shop */}
      <div className="rw-card" id="rw-shop">
        <div className="rw-card-header">
          <h2 className="rw-card-title">Rewards Shop</h2>
        </div>

        {/* Tabs */}
        <div className="rw-tabs">
          {shopTabs.map(t => (
            <button
              key={t.key}
              className={`rw-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="rw-card-body">
          <div className="rw-shop-grid">
            {currentRewards.map((reward) => {
              const isOwned = progress.hasReward(reward.id)
              const canAfford = progress.coins >= reward.cost

              return (
                <div key={reward.id} className={`rw-shop-item ${isOwned ? 'owned' : ''}`}>
                  {isOwned && <span className="rw-owned-badge">Owned</span>}
                  <div className="rw-shop-item-top">
                    <div className="rw-shop-icon">{reward.icon}</div>
                    <div className="rw-shop-info">
                      <h3 className="rw-shop-name">{reward.title}</h3>
                      <p className="rw-shop-desc">{reward.description}</p>
                    </div>
                  </div>
                  <div className="rw-shop-footer">
                    <div className="rw-cost">
                      <span className="rw-cost-icon">🪙</span>
                      <span>{reward.cost}</span>
                    </div>
                    <button
                      className={`rw-redeem-btn ${isOwned ? 'owned' : canAfford ? 'available' : 'disabled'}`}
                      onClick={() => !isOwned && canAfford && handleRedeem(reward)}
                      disabled={isOwned || !canAfford}
                    >
                      {isOwned ? '✓ Owned' : canAfford ? 'Redeem' : 'Insufficient'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Achievements + Timeline side-by-side on large screens */}
      <div className="rw-layout">
        {/* Achievements */}
        <div className="rw-card" style={{ marginBottom: 0 }}>
          <div className="rw-card-header">
            <h2 className="rw-card-title">Achievements</h2>
          </div>
          <div className="rw-card-body">
            <div className="rw-achievements-grid">
              {achievementsData.map((ach) => {
                const pct = getAchievementProgress(ach)
                const done = isAchievementUnlocked(ach)

                return (
                  <div key={ach.id} className={`rw-achievement ${done ? 'unlocked' : ''}`}>
                    <div className="rw-ach-icon-wrap">
                      <div className="rw-ach-icon">{ach.icon}</div>
                      {done && <div className="rw-ach-check">✓</div>}
                    </div>
                    <div className="rw-ach-content">
                      <h3 className="rw-ach-title">{ach.title}</h3>
                      <p className="rw-ach-desc">{ach.description}</p>
                      <div className="rw-ach-progress">
                        <div className="rw-ach-bar">
                          <div
                            className={`rw-ach-fill ${done ? 'done' : 'progress'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className={`rw-ach-pct ${done ? 'done' : ''}`}>
                          {done ? 'Done!' : `${Math.round(pct)}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="rw-card" style={{ marginBottom: 0 }}>
          <div className="rw-card-header">
            <h2 className="rw-card-title">Activity Timeline</h2>
          </div>
          <div className="rw-card-body">
            {progress.activityLog.length > 0 ? (
              <div className="rw-timeline">
                {progress.activityLog.slice(0, 10).map((activity) => {
                  const timeAgo = getTimeAgo(new Date(activity.timestamp))
                  return (
                    <div key={activity.id} className="rw-timeline-item">
                      <div className={`rw-tl-icon ${activity.type === 'xp_earned' ? 'xp' : activity.type === 'reward_redeemed' ? 'reward' : 'badge'}`}>
                        {activity.type === 'xp_earned' && '⚡'}
                        {activity.type === 'reward_redeemed' && '🎁'}
                        {activity.type === 'badge_unlocked' && '🏅'}
                      </div>
                      <div className="rw-tl-content">
                        <p className="rw-tl-desc">{activity.description}</p>
                        <span className="rw-tl-time">{timeAgo}</span>
                      </div>
                      {activity.amount && (
                        <span className={`rw-tl-amount ${activity.type === 'xp_earned' ? 'xp' : 'coins'}`}>
                          +{activity.amount} {activity.type === 'xp_earned' ? 'XP' : 'coins'}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="rw-empty">No activity yet. Start earning rewards!</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardsPage
