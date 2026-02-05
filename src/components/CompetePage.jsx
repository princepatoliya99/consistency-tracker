import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { useUserProgress } from '../context/UserProgressContext'

// Mock Data
const mockLeaderboardData = {
  daily: [
    { id: 1, rank: 1, username: 'FitKing23', avatar: 'FK', streak: 42, xp: 3450, consistency: 98, badge: '🔥 Top Performer', isCurrentUser: false },
    { id: 2, rank: 2, username: 'GymRat99', avatar: 'GR', streak: 38, xp: 3200, consistency: 96, badge: '⚡ Fast Climber', isCurrentUser: false },
    { id: 3, rank: 3, username: 'You', avatar: 'YU', streak: 35, xp: 2980, consistency: 94, badge: '🏆 Champion', isCurrentUser: true },
    { id: 4, rank: 4, username: 'HealthHero', avatar: 'HH', streak: 32, xp: 2750, consistency: 92, badge: '💪 Strong', isCurrentUser: false },
    { id: 5, rank: 5, username: 'WorkoutWizard', avatar: 'WW', streak: 30, xp: 2650, consistency: 90, badge: '✨ Consistent', isCurrentUser: false },
    { id: 6, rank: 6, username: 'FitnessFreak', avatar: 'FF', streak: 28, xp: 2500, consistency: 88, badge: '🎯 Focused', isCurrentUser: false },
    { id: 7, rank: 7, username: 'IronWill', avatar: 'IW', streak: 25, xp: 2350, consistency: 85, badge: '⭐ Rising', isCurrentUser: false },
    { id: 8, rank: 8, username: 'DisciplineDude', avatar: 'DD', streak: 23, xp: 2200, consistency: 83, badge: '🔥 Hot', isCurrentUser: false },
  ],
  weekly: [
    { id: 1, rank: 1, username: 'WorkoutWizard', avatar: 'WW', streak: 52, xp: 8900, consistency: 99, badge: '🔥 Top Performer', isCurrentUser: false },
    { id: 2, rank: 2, username: 'You', avatar: 'YU', streak: 48, xp: 8200, consistency: 96, badge: '🏆 Champion', isCurrentUser: true },
    { id: 3, rank: 3, username: 'FitKing23', avatar: 'FK', streak: 45, xp: 7800, consistency: 94, badge: '⚡ Fast Climber', isCurrentUser: false },
  ],
  monthly: [
    { id: 1, rank: 1, username: 'You', avatar: 'YU', streak: 65, xp: 15600, consistency: 97, badge: '🔥 Top Performer', isCurrentUser: true },
    { id: 2, rank: 2, username: 'GymRat99', avatar: 'GR', streak: 62, xp: 14800, consistency: 95, badge: '⚡ Fast Climber', isCurrentUser: false },
    { id: 3, rank: 3, username: 'HealthHero', avatar: 'HH', streak: 58, xp: 13900, consistency: 93, badge: '💪 Strong', isCurrentUser: false },
  ],
  alltime: [
    { id: 1, rank: 1, username: 'FitKing23', avatar: 'FK', streak: 180, xp: 45000, consistency: 99, badge: '🔥 Legend', isCurrentUser: false },
    { id: 2, rank: 2, username: 'GymRat99', avatar: 'GR', streak: 165, xp: 42000, consistency: 98, badge: '👑 Elite', isCurrentUser: false },
    { id: 3, rank: 3, username: 'WorkoutWizard', avatar: 'WW', streak: 150, xp: 38500, consistency: 97, badge: '🏆 Master', isCurrentUser: false },
    { id: 4, rank: 4, username: 'You', avatar: 'YU', streak: 142, xp: 36200, consistency: 96, badge: '⚡ Expert', isCurrentUser: true },
  ]
}

const mockChallenges = [
  {
    id: 1,
    title: '7-Day No Miss Challenge',
    description: 'Complete all tasks for 7 consecutive days',
    participants: ['FK', 'GR', 'WW', 'HH', 'DD'],
    participantCount: 124,
    progress: 71,
    startDate: '2026-02-01',
    endDate: '2026-02-07',
    status: 'joined',
    tags: ['Trending', 'Easy'],
    reward: '500 XP'
  },
  {
    id: 2,
    title: '30-Day Consistency Master',
    description: 'Maintain 90%+ consistency for 30 days',
    participants: ['FK', 'GR', 'IW'],
    participantCount: 87,
    progress: 23,
    startDate: '2026-02-01',
    endDate: '2026-03-02',
    status: 'available',
    tags: ['Hard', 'Trending'],
    reward: '2000 XP'
  },
  {
    id: 3,
    title: 'Weekend Warrior',
    description: 'Complete all tasks on weekends',
    participants: ['WW', 'HH', 'FF', 'DD'],
    participantCount: 156,
    progress: 50,
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    status: 'joined',
    tags: ['Medium', 'Popular'],
    reward: '800 XP'
  },
  {
    id: 4,
    title: 'Early Bird Special',
    description: 'Complete tasks before 8 AM daily',
    participants: ['FK', 'IW'],
    participantCount: 64,
    progress: 0,
    startDate: '2026-02-10',
    endDate: '2026-02-16',
    status: 'available',
    tags: ['Beginner', 'New'],
    reward: '350 XP'
  },
  {
    id: 5,
    title: 'Perfect Week',
    description: '100% consistency for one week',
    participants: ['GR', 'WW', 'HH', 'FF'],
    participantCount: 203,
    progress: 85,
    startDate: '2026-01-29',
    endDate: '2026-02-04',
    status: 'joined',
    tags: ['Trending', 'Medium'],
    reward: '600 XP'
  },
  {
    id: 6,
    title: 'Fitness Fanatic',
    description: 'Complete 50 fitness tasks',
    participants: ['FK', 'GR', 'IW', 'DD'],
    participantCount: 98,
    progress: 32,
    startDate: '2026-02-01',
    endDate: '2026-03-31',
    status: 'available',
    tags: ['Hard', 'Fitness'],
    reward: '1500 XP'
  }
]

const weeklyProgressData = [
  { day: 'Mon', progress: 85 },
  { day: 'Tue', progress: 92 },
  { day: 'Wed', progress: 78 },
  { day: 'Thu', progress: 95 },
  { day: 'Fri', progress: 88 },
  { day: 'Sat', progress: 91 },
  { day: 'Sun', progress: 94 }
]

function CompetePage({ theme, toggleTheme, currentUser, handleLogout }) {
  const navigate = useNavigate()
  const progress = useUserProgress()
  const [activeTab, setActiveTab] = useState('daily')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterScope, setFilterScope] = useState('global')
  const [searchQuery, setSearchQuery] = useState('')
  const [showClaimToast, setShowClaimToast] = useState(false)
  const [claimAmount, setClaimAmount] = useState(0)

  const handleClaimXP = () => {
    const amount = progress.claimXP()
    setClaimAmount(amount)
    setShowClaimToast(true)
    setTimeout(() => setShowClaimToast(false), 3000)
  }

  const leaderboardData = mockLeaderboardData[activeTab] || mockLeaderboardData.daily

  // Filter leaderboard based on search
  const filteredLeaderboard = leaderboardData.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <button className="compete-nav-btn" onClick={() => navigate('/rewards')}>
          🎁 Rewards
        </button>
      </div>

      {/* Claim XP Toast */}
      {showClaimToast && (
        <div className="toast-notification success claim-toast">
          <div className="toast-icon">✓</div>
          <span>Claimed +{claimAmount} XP!</span>
        </div>
      )}

      {/* Page Header */}
      <div className="compete-header">
        <div className="compete-header-content">
          <div className="compete-title-section">
            <h1 className="compete-title">
              <span className="compete-icon">🏆</span>
              Compete
            </h1>
            <p className="compete-subtitle">Track your consistency and compete with others</p>
          </div>
          <div className="compete-actions">
            <button className="compete-action-btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create Challenge
            </button>
            <button className="compete-action-btn secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <path d="M20 8v6M23 11h-6"/>
              </svg>
              Invite Friends
            </button>
          </div>
        </div>
      </div>

      <div className="compete-content">
        {/* Main Content Area */}
        <div className="compete-main">
          {/* Leaderboard Section */}
          <div className="compete-section">
            <div className="section-header">
              <h2 className="section-title">Leaderboard</h2>
              
              {/* Tabs */}
              <div className="compete-tabs">
                <button 
                  className={`compete-tab ${activeTab === 'daily' ? 'active' : ''}`}
                  onClick={() => setActiveTab('daily')}
                >
                  Daily
                </button>
                <button 
                  className={`compete-tab ${activeTab === 'weekly' ? 'active' : ''}`}
                  onClick={() => setActiveTab('weekly')}
                >
                  Weekly
                </button>
                <button 
                  className={`compete-tab ${activeTab === 'monthly' ? 'active' : ''}`}
                  onClick={() => setActiveTab('monthly')}
                >
                  Monthly
                </button>
                <button 
                  className={`compete-tab ${activeTab === 'alltime' ? 'active' : ''}`}
                  onClick={() => setActiveTab('alltime')}
                >
                  All Time
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="compete-filters">
              <div className="filter-chips">
                <button 
                  className={`filter-chip ${filterScope === 'global' ? 'active' : ''}`}
                  onClick={() => setFilterScope('global')}
                >
                  🌍 Global
                </button>
                <button 
                  className={`filter-chip ${filterScope === 'friends' ? 'active' : ''}`}
                  onClick={() => setFilterScope('friends')}
                >
                  👥 Friends
                </button>
                <select 
                  className="filter-select"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="study">📚 Study</option>
                  <option value="fitness">💪 Fitness</option>
                  <option value="work">💼 Work</option>
                </select>
              </div>
              
              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search username..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="leaderboard-container">
              <div className="leaderboard-table">
                <div className="leaderboard-header">
                  <div className="leaderboard-cell rank-cell">Rank</div>
                  <div className="leaderboard-cell user-cell">User</div>
                  <div className="leaderboard-cell">Streak</div>
                  <div className="leaderboard-cell">XP</div>
                  <div className="leaderboard-cell">Consistency</div>
                  <div className="leaderboard-cell badge-cell">Badge</div>
                </div>
                
                {filteredLeaderboard.map((user) => (
                  <div 
                    key={user.id} 
                    className={`leaderboard-row ${user.isCurrentUser ? 'current-user' : ''}`}
                  >
                    <div className="leaderboard-cell rank-cell">
                      <div className={`rank-badge ${user.rank <= 3 ? `rank-${user.rank}` : ''}`}>
                        {user.rank <= 3 ? (
                          <>
                            {user.rank === 1 && '🥇'}
                            {user.rank === 2 && '🥈'}
                            {user.rank === 3 && '🥉'}
                          </>
                        ) : (
                          user.rank
                        )}
                      </div>
                    </div>
                    
                    <div className="leaderboard-cell user-cell">
                      <div className="user-avatar-small">{user.avatar}</div>
                      <span className="username">{user.username}</span>
                      {user.isCurrentUser && <span className="you-badge">You</span>}
                    </div>
                    
                    <div className="leaderboard-cell">
                      <span className="streak-text">
                        🔥 {user.streak} days
                      </span>
                    </div>
                    
                    <div className="leaderboard-cell">
                      <span className="xp-text">{user.xp.toLocaleString()} XP</span>
                    </div>
                    
                    <div className="leaderboard-cell">
                      <div className="consistency-indicator">
                        <div className="consistency-bar-mini">
                          <div 
                            className="consistency-fill-mini" 
                            style={{ width: `${user.consistency}%` }}
                          ></div>
                        </div>
                        <span className="consistency-text">{user.consistency}%</span>
                      </div>
                    </div>
                    
                    <div className="leaderboard-cell badge-cell">
                      <span className="badge-label">{user.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenges Section */}
          <div className="compete-section">
            <div className="section-header">
              <h2 className="section-title">Active Challenges</h2>
              <button className="view-all-btn">View All →</button>
            </div>

            <div className="challenges-grid">
              {mockChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-header">
                    <h3 className="challenge-title">{challenge.title}</h3>
                    <div className="challenge-tags">
                      {challenge.tags.map((tag, index) => (
                        <span key={index} className={`challenge-tag ${tag.toLowerCase()}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="challenge-description">{challenge.description}</p>
                  
                  <div className="challenge-participants">
                    <div className="participants-avatars">
                      {challenge.participants.map((avatar, index) => (
                        <div key={index} className="participant-avatar">
                          {avatar}
                        </div>
                      ))}
                      {challenge.participantCount > challenge.participants.length && (
                        <div className="participant-avatar more">
                          +{challenge.participantCount - challenge.participants.length}
                        </div>
                      )}
                    </div>
                    <span className="participants-count">
                      {challenge.participantCount} participants
                    </span>
                  </div>
                  
                  {challenge.status === 'joined' && (
                    <div className="challenge-progress">
                      <div className="progress-info">
                        <span className="progress-label">Progress</span>
                        <span className="progress-value">{challenge.progress}%</span>
                      </div>
                      <div className="progress-bar-challenge">
                        <div 
                          className="progress-fill-challenge" 
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="challenge-footer">
                    <div className="challenge-dates">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <path d="M16 2v4M8 2v4M3 10h18"/>
                      </svg>
                      <span>{challenge.startDate} - {challenge.endDate}</span>
                    </div>
                    <button 
                      className={`challenge-action-btn ${challenge.status}`}
                    >
                      {challenge.status === 'joined' ? 'Joined ✓' : 'Join Challenge'}
                    </button>
                  </div>
                  
                  <div className="challenge-reward">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>{challenge.reward}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Stats Panel */}
        <div className="compete-sidebar">
          <div className="stats-panel">
            <h3 className="stats-panel-title">Your Stats</h3>
            
            <div className="stat-card highlight">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <span className="stat-label">Global Rank</span>
                <span className="stat-value">#{progress.globalRank}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-content">
                <span className="stat-label">Current Streak</span>
                <span className="stat-value">{progress.currentStreak} days</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⚡</div>
              <div className="stat-content">
                <span className="stat-label">Total XP</span>
                <span className="stat-value">{progress.xp.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <span className="stat-label">Consistency</span>
                <span className="stat-value">94%</span>
              </div>
            </div>

            {/* Claim XP Button */}
            <button className="claim-xp-btn" onClick={handleClaimXP}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Claim XP Bonus
            </button>

            <div className="weekly-progress-chart">
              <h4 className="chart-title">Weekly Progress</h4>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={weeklyProgressData}>
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="chart-labels">
                {weeklyProgressData.map((data, index) => (
                  <span key={index} className="chart-label">{data.day}</span>
                ))}
              </div>
            </div>

            <div className="achievements-preview">
              <h4 className="achievements-title">Recent Achievements</h4>
              <div className="achievement-badges">
                <div className="achievement-badge gold">🏆</div>
                <div className="achievement-badge silver">🥈</div>
                <div className="achievement-badge bronze">🥉</div>
                <div className="achievement-badge">⭐</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetePage
