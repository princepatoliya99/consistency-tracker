import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { useUserProgress } from '../context/UserProgressContext'
import './CompetePage.css'

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

const rankClass = (rank) => {
  if (rank === 1) return 'gold'
  if (rank === 2) return 'silver'
  if (rank === 3) return 'bronze'
  return ''
}

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

  const filteredLeaderboard = leaderboardData.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const tabs = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'alltime', label: 'All Time' },
  ]

  return (
    <div className="cp-page">
      {/* Toast */}
      {showClaimToast && (
        <div className="cp-toast">
          <span>✓</span>
          <span>Claimed +{claimAmount} XP!</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="cp-hero">
        <div className="cp-hero-inner">
          <div className="cp-hero-text">
            <h1>🏆 Compete</h1>
            <p>Track your consistency and compete with others</p>
          </div>
          <div className="cp-hero-actions">
            <button className="cp-btn cp-btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Create Challenge
            </button>
            <button className="cp-btn cp-btn-ghost">
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

      {/* Stats Row */}
      <div className="cp-stats-row">
        <div className="cp-stat-tile">
          <div className="cp-stat-icon purple">🏆</div>
          <div className="cp-stat-info">
            <span className="cp-stat-value">#{progress.globalRank}</span>
            <span className="cp-stat-label">Global Rank</span>
          </div>
        </div>
        <div className="cp-stat-tile">
          <div className="cp-stat-icon amber">🔥</div>
          <div className="cp-stat-info">
            <span className="cp-stat-value">{progress.currentStreak}</span>
            <span className="cp-stat-label">Day Streak</span>
          </div>
        </div>
        <div className="cp-stat-tile">
          <div className="cp-stat-icon blue">⚡</div>
          <div className="cp-stat-info">
            <span className="cp-stat-value">{progress.xp.toLocaleString()}</span>
            <span className="cp-stat-label">Total XP</span>
          </div>
        </div>
        <div className="cp-stat-tile">
          <div className="cp-stat-icon green">📊</div>
          <div className="cp-stat-info">
            <span className="cp-stat-value">94%</span>
            <span className="cp-stat-label">Consistency</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="cp-layout">
        <div className="cp-main">
          {/* Leaderboard */}
          <div className="cp-card">
            <div className="cp-card-header">
              <h2 className="cp-card-title">Leaderboard</h2>
            </div>

            {/* Tabs */}
            <div className="cp-tabs">
              {tabs.map(t => (
                <button
                  key={t.key}
                  className={`cp-tab ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="cp-filters">
              <button
                className={`cp-filter-btn ${filterScope === 'global' ? 'active' : ''}`}
                onClick={() => setFilterScope('global')}
              >
                🌍 Global
              </button>
              <button
                className={`cp-filter-btn ${filterScope === 'friends' ? 'active' : ''}`}
                onClick={() => setFilterScope('friends')}
              >
                👥 Friends
              </button>
              <select
                className="cp-filter-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="study">📚 Study</option>
                <option value="fitness">💪 Fitness</option>
                <option value="work">💼 Work</option>
              </select>

              <div className="cp-search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="cp-table-wrap">
              <table className="cp-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Streak</th>
                    <th>XP</th>
                    <th>Consistency</th>
                    <th style={{ textAlign: 'right' }}>Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((user) => (
                    <tr key={user.id} className={user.isCurrentUser ? 'cp-me' : ''}>
                      <td>
                        <span className={`cp-rank ${rankClass(user.rank)}`}>
                          {user.rank <= 3 ? (user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉') : user.rank}
                        </span>
                      </td>
                      <td>
                        <div className="cp-user">
                          <div className="cp-avatar">{user.avatar}</div>
                          <span className="cp-username">{user.username}</span>
                          {user.isCurrentUser && <span className="cp-you-tag">You</span>}
                        </div>
                      </td>
                      <td>
                        <span className="cp-streak">🔥 {user.streak}d</span>
                      </td>
                      <td>
                        <span className="cp-xp">{user.xp.toLocaleString()}</span>
                      </td>
                      <td>
                        <div className="cp-consistency">
                          <div className="cp-bar-track">
                            <div className="cp-bar-fill" style={{ width: `${user.consistency}%` }} />
                          </div>
                          <span className="cp-bar-label">{user.consistency}%</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="cp-badge-label">{user.badge}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Challenges */}
          <div className="cp-card" style={{ marginTop: '1.5rem' }}>
            <div className="cp-card-header">
              <h2 className="cp-card-title">Active Challenges</h2>
              <button className="cp-view-all">View All →</button>
            </div>
            <div className="cp-card-body">
              <div className="cp-challenges-grid">
                {mockChallenges.map((c) => (
                  <div key={c.id} className="cp-challenge">
                    {/* Top: tags + reward */}
                    <div className="cp-challenge-top">
                      <div className="cp-tags">
                        {c.tags.map((tag, i) => (
                          <span key={i} className={`cp-tag ${tag.toLowerCase()}`}>{tag}</span>
                        ))}
                      </div>
                      <div className="cp-reward">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <span>{c.reward}</span>
                      </div>
                    </div>

                    <h3 className="cp-challenge-title">{c.title}</h3>
                    <p className="cp-challenge-desc">{c.description}</p>

                    {/* Progress (only for joined) */}
                    {c.status === 'joined' && (
                      <div className="cp-challenge-progress">
                        <div className="cp-challenge-progress-header">
                          <span>Progress</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="cp-progress-track">
                          <div className="cp-progress-fill" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="cp-challenge-footer">
                      <div className="cp-challenge-meta">
                        <div className="cp-participants">
                          <div className="cp-mini-avatars">
                            {c.participants.slice(0, 3).map((a, i) => (
                              <div key={i} className="cp-mini-avatar">{a}</div>
                            ))}
                            {c.participantCount > 3 && (
                              <div className="cp-mini-avatar more">+{c.participantCount - 3}</div>
                            )}
                          </div>
                          <span className="cp-participants-text">{c.participantCount} joined</span>
                        </div>
                        <div className="cp-dates">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <path d="M16 2v4M8 2v4M3 10h18"/>
                          </svg>
                          <span>{c.startDate} — {c.endDate}</span>
                        </div>
                      </div>
                      <button className={`cp-join-btn ${c.status === 'joined' ? 'joined' : 'available'}`}>
                        {c.status === 'joined' ? '✓ Joined' : 'Join'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="cp-sidebar">
          {/* Claim XP */}
          <div className="cp-side-card">
            <h4 className="cp-side-card-title">Daily Bonus</h4>
            <button className="cp-claim-btn" onClick={handleClaimXP}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
              Claim XP Bonus
            </button>
          </div>

          {/* Weekly Progress */}
          <div className="cp-side-card">
            <h4 className="cp-side-card-title">Weekly Progress</h4>
            <div className="cp-chart-wrap">
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={weeklyProgressData}>
                  <Line
                    type="monotone"
                    dataKey="progress"
                    stroke="var(--accent-primary, #3b82f6)"
                    strokeWidth={2.5}
                    dot={{ fill: 'var(--accent-primary, #3b82f6)', r: 3, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="cp-chart-labels">
                {weeklyProgressData.map((d, i) => (
                  <span key={i} className="cp-chart-label">{d.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="cp-side-card">
            <h4 className="cp-side-card-title">Achievements</h4>
            <div className="cp-achievements">
              <div className="cp-ach gold">🏆</div>
              <div className="cp-ach silver">🥈</div>
              <div className="cp-ach bronze">🥉</div>
              <div className="cp-ach">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompetePage
