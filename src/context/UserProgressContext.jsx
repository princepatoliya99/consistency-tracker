import { createContext, useContext, useState, useEffect } from 'react'

const UserProgressContext = createContext()

export const useUserProgress = () => {
  const context = useContext(UserProgressContext)
  if (!context) {
    throw new Error('useUserProgress must be used within UserProgressProvider')
  }
  return context
}

export const UserProgressProvider = ({ children, currentUser }) => {
  const [userProgress, setUserProgress] = useState(() => {
    // Load from localStorage or use defaults
    const saved = localStorage.getItem(`userProgress_${currentUser?.email || 'guest'}`)
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      username: currentUser?.name || 'User',
      xp: 2980,
      currentStreak: 35,
      globalRank: 3,
      ownedRewards: [],
      unlockedBadges: ['🏆', '🔥', '⚡'],
      activityLog: [
        { id: 1, type: 'xp_earned', amount: 100, timestamp: new Date().toISOString(), description: 'Completed 7-Day Challenge' },
        { id: 2, type: 'badge_unlocked', badge: '🔥', timestamp: new Date(Date.now() - 86400000).toISOString(), description: 'Unlocked Fire Badge' },
        { id: 3, type: 'xp_earned', amount: 50, timestamp: new Date(Date.now() - 172800000).toISOString(), description: 'Daily consistency bonus' },
      ]
    }
  })

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`userProgress_${currentUser.email}`, JSON.stringify(userProgress))
    }
  }, [userProgress, currentUser])

  // Calculate coins from XP (10 XP = 1 coin)
  const coins = Math.floor(userProgress.xp / 10)

  // Calculate level from XP
  const getLevel = (xp) => {
    if (xp < 1000) return 1
    if (xp < 2500) return 2
    if (xp < 5000) return 3
    if (xp < 10000) return 4
    if (xp < 20000) return 5
    return Math.floor(xp / 5000)
  }

  const level = getLevel(userProgress.xp)
  const nextLevelXP = level < 5 ? [1000, 2500, 5000, 10000, 20000][level] : (level + 1) * 5000
  const currentLevelXP = level === 1 ? 0 : level === 2 ? 1000 : level === 3 ? 2500 : level === 4 ? 5000 : level === 5 ? 10000 : level * 5000
  const levelProgress = ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  // Add XP
  const addXP = (amount, description = 'XP earned') => {
    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp + amount,
      activityLog: [
        {
          id: Date.now(),
          type: 'xp_earned',
          amount,
          timestamp: new Date().toISOString(),
          description
        },
        ...prev.activityLog
      ]
    }))
    return amount
  }

  // Claim XP (random bonus)
  const claimXP = () => {
    const amount = Math.random() > 0.5 ? 100 : 50
    addXP(amount, `Claimed ${amount} XP bonus`)
    return amount
  }

  // Redeem reward
  const redeemReward = (reward) => {
    const cost = reward.cost
    if (coins < cost) {
      return { success: false, message: 'Insufficient coins' }
    }

    const xpToDeduct = cost * 10 // Convert coins back to XP

    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp - xpToDeduct,
      ownedRewards: [...prev.ownedRewards, reward],
      activityLog: [
        {
          id: Date.now(),
          type: 'reward_redeemed',
          reward: reward.title,
          cost,
          timestamp: new Date().toISOString(),
          description: `Redeemed ${reward.title} for ${cost} coins`
        },
        ...prev.activityLog
      ]
    }))

    return { success: true, message: `Successfully redeemed ${reward.title}!` }
  }

  // Unlock badge
  const unlockBadge = (badge, description) => {
    if (userProgress.unlockedBadges.includes(badge)) {
      return false
    }

    setUserProgress(prev => ({
      ...prev,
      unlockedBadges: [...prev.unlockedBadges, badge],
      activityLog: [
        {
          id: Date.now(),
          type: 'badge_unlocked',
          badge,
          timestamp: new Date().toISOString(),
          description
        },
        ...prev.activityLog
      ]
    }))

    return true
  }

  // Update streak
  const updateStreak = (newStreak) => {
    setUserProgress(prev => ({
      ...prev,
      currentStreak: newStreak
    }))
  }

  // Check if reward is owned
  const hasReward = (rewardId) => {
    return userProgress.ownedRewards.some(r => r.id === rewardId)
  }

  const value = {
    ...userProgress,
    coins,
    level,
    nextLevelXP,
    levelProgress,
    addXP,
    claimXP,
    redeemReward,
    unlockBadge,
    updateStreak,
    hasReward
  }

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  )
}
