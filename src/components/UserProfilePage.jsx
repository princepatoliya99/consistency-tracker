import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserProgress } from '../context/UserProgressContext'
import { useUI } from '../context/UIContext'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import EditProfileModal from './EditProfileModal'

// Mock data for achievements
const mockAchievements = [
  { id: 1, icon: '🏆', name: 'First Week', description: 'Complete 7 days in a row', earned: true, unlockedDate: '2026-01-15' },
  { id: 2, icon: '🔥', name: 'Fire Starter', description: 'Reach a 30-day streak', earned: true, unlockedDate: '2026-01-28' },
  { id: 3, icon: '⚡', name: 'Lightning Fast', description: 'Complete all tasks in under 2 hours', earned: true, unlockedDate: '2026-02-01' },
  { id: 4, icon: '💎', name: 'Diamond Level', description: 'Reach level 5', earned: false, unlockedDate: null },
  { id: 5, icon: '🎯', name: 'Perfect Week', description: '100% completion for 7 days', earned: false, unlockedDate: null },
  { id: 6, icon: '👑', name: 'Champion', description: 'Reach #1 on leaderboard', earned: false, unlockedDate: null },
  { id: 7, icon: '🌟', name: 'Consistency King', description: '90 day streak achieved', earned: false, unlockedDate: null },
  { id: 8, icon: '🚀', name: 'Sky Rocket', description: 'Earn 10,000 XP', earned: false, unlockedDate: null },
]

// Mock recent activity
const mockActivity = [
  { id: 1, type: 'task_completed', description: 'Completed Morning Workout', timestamp: '2 hours ago', icon: '✓' },
  { id: 2, type: 'xp_earned', description: 'Earned 50 XP', timestamp: '3 hours ago', icon: '⚡' },
  { id: 3, type: 'challenge_joined', description: 'Joined 7-Day Challenge', timestamp: '1 day ago', icon: '🏆' },
  { id: 4, type: 'badge_unlocked', description: 'Unlocked Fire Badge', timestamp: '2 days ago', icon: '🔥' },
  { id: 5, type: 'reward_redeemed', description: 'Redeemed Premium Theme', timestamp: '3 days ago', icon: '🎁' },
  { id: 6, type: 'streak_milestone', description: 'Reached 35 day streak', timestamp: '4 days ago', icon: '📈' },
]

// Mock weekly consistency data
const mockWeeklyData = [
  { day: 'Mon', completion: 85 },
  { day: 'Tue', completion: 92 },
  { day: 'Wed', completion: 78 },
  { day: 'Thu', completion: 95 },
  { day: 'Fri', completion: 88 },
  { day: 'Sat', completion: 100 },
  { day: 'Sun', completion: 90 },
]

function UserProfilePage({ theme, toggleTheme, currentUser, handleLogout, tasks }) {
  const navigate = useNavigate()
  const userProgress = useUserProgress()
  const { toggleFocusMode } = useUI()
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [bio, setBio] = useState('Building consistency one day at a time 💪')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  
  // Mock personal profile data
  const [profileData, setProfileData] = useState({
    fullName: currentUser?.name || 'John Doe',
    email: currentUser?.email || 'john.doe@example.com',
    mobile: '+1 (555) 123-4567',
    age: '28',
    gender: 'male',
    country: 'United States',
    city: 'New York',
    joinDate: 'January 15, 2025',
    bio: bio
  })

  const handleSaveProfile = (updatedData) => {
    setProfileData(updatedData)
    if (updatedData.bio) {
      setBio(updatedData.bio)
    }
  }

  // Calculate stats from tasks
  const totalHabits = tasks?.length || 0
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const todayDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  
  // Calculate completion rate
  const completedToday = tasks?.filter(task => task.completedDates && task.completedDates[todayDateStr]).length || 0
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0
  
  // Mock some stats
  const totalTasksCompleted = 847
  const longestStreak = 42

  const earnedAchievements = mockAchievements.filter(a => a.earned)
  const lockedAchievements = mockAchievements.filter(a => !a.earned)

  return (
    <div className="profile-page">
      {/* Top Navigation Bar */}
      <div className="profile-top-nav">
        <button className="back-btn" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </button>
      </div>

      <div className="profile-container">
        {/* Profile Header Section */}
        <div className="profile-header-card">
          <div className="profile-cover-gradient"></div>
          <div className="profile-main-info">
            <div className="profile-avatar-large">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="profile-details">
              <h1 className="profile-username">{currentUser?.name || 'User'}</h1>
              <div className="profile-bio">
                {isEditingBio ? (
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    onBlur={() => setIsEditingBio(false)}
                    className="bio-input"
                    autoFocus
                  />
                ) : (
                  <p onClick={() => setIsEditingBio(true)}>{bio}</p>
                )}
              </div>
              <button className="edit-profile-btn" onClick={() => setIsEditingBio(true)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
              <button className="logout-profile-btn" onClick={handleLogout}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="quick-stats-row">
            <div className="quick-stat-item">
              <div className="quick-stat-icon streak">🔥</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">{userProgress.currentStreak}</div>
                <div className="quick-stat-label">Day Streak</div>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon xp">⚡</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">{userProgress.xp.toLocaleString()}</div>
                <div className="quick-stat-label">Total XP</div>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon coins">💰</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">{userProgress.coins}</div>
                <div className="quick-stat-label">Coins</div>
              </div>
            </div>
            <div className="quick-stat-item">
              <div className="quick-stat-icon rank">🏆</div>
              <div className="quick-stat-content">
                <div className="quick-stat-value">#{userProgress.globalRank}</div>
                <div className="quick-stat-label">Global Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Personal Info (Left) + Progress (Right) */}
        <div className="profile-two-column-layout">
          {/* LEFT COLUMN: Personal Information */}
          <div className="profile-left-column">
            {/* Personal Information Card */}
            <div className="personal-info-card">
              <div className="card-header">
                <h3 className="card-title">Personal Information</h3>
                <button className="edit-info-btn" onClick={() => setIsEditModalOpen(true)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Information
                </button>
              </div>
              <div className="personal-info-content">
                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{profileData.fullName}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <span className="info-label">Email Address</span>
                    <span className="info-value">{profileData.email}</span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <span className="info-label">Mobile Number</span>
                    <span className="info-value">{profileData.mobile || 'Not provided'}</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-item half">
                    <div className="info-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div className="info-content">
                      <span className="info-label">Age</span>
                      <span className="info-value">{profileData.age || 'Not provided'}</span>
                    </div>
                  </div>

                  <div className="info-item half">
                    <div className="info-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="info-content">
                      <span className="info-label">Gender</span>
                      <span className="info-value">{profileData.gender ? profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1) : 'Not provided'}</span>
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <span className="info-label">Location</span>
                    <span className="info-value">
                      {profileData.city && profileData.country 
                        ? `${profileData.city}, ${profileData.country}`
                        : profileData.country || profileData.city || 'Not provided'}
                    </span>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div className="info-content">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">{profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Progress & Achievements */}
          <div className="profile-right-column">
            {/* Progress Overview Section */}
            <div className="section-header">
              <h2 className="section-title">Progress Overview</h2>
              <p className="section-subtitle">Your consistency metrics at a glance</p>
            </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-icon">📊</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{totalHabits}</div>
              <div className="stat-card-label">Total Habits</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">✓</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{completionRate}%</div>
              <div className="stat-card-label">Today's Rate</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">🔥</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{longestStreak}</div>
              <div className="stat-card-label">Longest Streak</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon">🎯</div>
            <div className="stat-card-content">
              <div className="stat-card-value">{totalTasksCompleted}</div>
              <div className="stat-card-label">Tasks Completed</div>
            </div>
          </div>
        </div>

        {/* Weekly Consistency Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Weekly Consistency</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockWeeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.3} />
              <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} />
              <YAxis stroke="var(--text-muted)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="completion" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Achievements & Badges Section */}
        <div className="section-header">
          <h2 className="section-title">Achievements & Badges</h2>
          <p className="section-subtitle">{earnedAchievements.length} of {mockAchievements.length} unlocked</p>
        </div>

        <div className="achievements-grid">
          {mockAchievements.map(achievement => (
            <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <h4 className="achievement-name">{achievement.name}</h4>
                <p className="achievement-description">{achievement.description}</p>
                {achievement.earned && achievement.unlockedDate && (
                  <span className="achievement-date">Unlocked {achievement.unlockedDate}</span>
                )}
                {!achievement.earned && (
                  <span className="achievement-locked">🔒 Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rewards & Inventory Section */}
        <div className="section-header">
          <h2 className="section-title">Your Rewards</h2>
          <p className="section-subtitle">Items you've unlocked and redeemed</p>
        </div>

        <div className="rewards-grid">
          {userProgress.ownedRewards && userProgress.ownedRewards.length > 0 ? (
            userProgress.ownedRewards.map(reward => (
              <div key={reward.id} className="reward-item-card">
                <div className="reward-icon">{reward.icon}</div>
                <div className="reward-info">
                  <h4 className="reward-title">{reward.title}</h4>
                  <p className="reward-description">{reward.description}</p>
                  <span className="reward-status">✓ Owned</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-rewards">
              <div className="empty-icon">🎁</div>
              <p>No rewards yet. Visit the Rewards page to unlock items!</p>
              <button className="visit-rewards-btn" onClick={() => navigate('/rewards')}>
                Browse Rewards
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity Timeline */}
        <div className="section-header">
          <h2 className="section-title">Recent Activity</h2>
          <p className="section-subtitle">Your latest achievements and actions</p>
        </div>

        <div className="activity-timeline">
          {mockActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon-wrapper">
                <div className="activity-icon">{activity.icon}</div>
              </div>
              <div className="activity-content">
                <p className="activity-description">{activity.description}</p>
                <span className="activity-timestamp">{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
          </div>
        </div>
        {/* End Two Column Layout */}

        {/* Navigation Actions */}
        <div className="profile-actions">
          <button className="action-btn primary" onClick={() => navigate('/compete')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
            </svg>
            View Compete Page
          </button>
          <button className="action-btn secondary" onClick={() => navigate('/rewards')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 12v10H4V12"/>
              <path d="M22 7H2v5h20V7z"/>
              <path d="M12 22V7"/>
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
            View Rewards
          </button>
          <button className="action-btn tertiary" onClick={toggleFocusMode}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
            </svg>
            Enter Focus Mode
          </button>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profileData={profileData}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  )
}

export default UserProfilePage
