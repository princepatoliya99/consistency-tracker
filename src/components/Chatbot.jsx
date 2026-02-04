import { useState, useRef, useEffect } from 'react'

function Chatbot({ isOpen, onClose, currentUser }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi ${currentUser?.name || 'there'}! 👋 I'm your AI fitness coach. I can help you create personalized workout schedules, set realistic goals, and stay motivated. How can I assist you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Demo responses based on keywords
  const getDemoResponse = (userMessage) => {
    const msg = userMessage.toLowerCase()
    
    if (msg.includes('schedule') || msg.includes('plan') || msg.includes('routine')) {
      return "Great! I can help you create a workout schedule. Here's a beginner-friendly plan:\n\n🏋️ **Monday**: Upper Body Strength (30 min)\n💪 **Tuesday**: Core & Abs (20 min)\n🏃 **Wednesday**: Cardio (30 min)\n🦵 **Thursday**: Lower Body Strength (30 min)\n🧘 **Friday**: Yoga & Flexibility (25 min)\n⚡ **Saturday**: HIIT Workout (20 min)\n😴 **Sunday**: Rest & Recovery\n\nWould you like me to customize this based on your fitness level?"
    }
    
    if (msg.includes('goal') || msg.includes('target') || msg.includes('achieve')) {
      return "Setting SMART goals is key! Here's my advice:\n\n✅ **Specific**: Define exactly what you want (e.g., 'lose 10 lbs')\n✅ **Measurable**: Track your progress daily\n✅ **Achievable**: Start with 3-4 workouts per week\n✅ **Relevant**: Align with your lifestyle\n✅ **Time-bound**: Set a 30-60 day timeline\n\nWhat's your primary fitness goal right now?"
    }
    
    if (msg.includes('motivat') || msg.includes('inspire') || msg.includes('tired') || msg.includes('quit')) {
      return "I understand motivation can be tough! Here are some tips:\n\n🔥 Remember WHY you started\n💪 Focus on progress, not perfection\n📊 Track your consistency - you're already doing it!\n👥 Find an accountability partner\n🎯 Set small daily wins\n⭐ Reward yourself for milestones\n\nYou've got this! Every day you show up is a victory. 💯"
    }
    
    if (msg.includes('rest') || msg.includes('recovery') || msg.includes('sore')) {
      return "Recovery is just as important as training! 💤\n\n✨ **Get 7-9 hours of sleep**\n💧 Stay hydrated (2-3 liters/day)\n🥗 Eat protein-rich foods\n🧊 Ice baths or cold showers\n🧘 Gentle stretching or yoga\n😴 Take 1-2 rest days per week\n\nListening to your body prevents injuries and improves performance!"
    }
    
    if (msg.includes('diet') || msg.includes('nutrition') || msg.includes('eat') || msg.includes('food')) {
      return "Nutrition is 70% of your results! 🥗\n\n**Basic Guidelines:**\n🍗 Lean proteins (chicken, fish, tofu)\n🥦 Plenty of vegetables\n🍚 Complex carbs (brown rice, quinoa)\n🥑 Healthy fats (avocado, nuts)\n💧 Drink plenty of water\n\n**Avoid:** Processed foods, excess sugar, alcohol\n\nWould you like a sample meal plan?"
    }
    
    if (msg.includes('beginner') || msg.includes('start') || msg.includes('new')) {
      return "Welcome to your fitness journey! 🎉\n\n**Week 1-2: Foundation**\n- 20-minute walks daily\n- Bodyweight exercises (squats, push-ups)\n- Focus on consistency\n\n**Week 3-4: Build Up**\n- Increase to 30 minutes\n- Add light weights\n- 4-5 days per week\n\nRemember: Start slow, stay consistent, and celebrate small wins! 💪"
    }
    
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return `Hello ${currentUser?.name}! 👋 Ready to crush your fitness goals today? Ask me anything about workouts, schedules, motivation, or nutrition!`
    }
    
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're very welcome! 😊 Keep up the amazing work! Remember, consistency is key. I'm here whenever you need guidance or motivation! 💪"
    }
    
    // Default response
    return "That's a great question! While I'm in demo mode right now, I can help you with:\n\n📅 Creating workout schedules\n🎯 Setting fitness goals\n💪 Motivation & tips\n🥗 Basic nutrition advice\n🏃 Exercise recommendations\n💤 Recovery strategies\n\nWhat would you like to know more about?"
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    
    if (!inputValue.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getDemoResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay 1-2 seconds
  }

  const quickActions = [
    { label: "Create Schedule", icon: "📅" },
    { label: "Set Goals", icon: "🎯" },
    { label: "Get Motivated", icon: "💪" },
    { label: "Nutrition Tips", icon: "🥗" }
  ]

  const handleQuickAction = (action) => {
    setInputValue(action.label)
  }

  if (!isOpen) return null

  return (
    <div className="chatbot-overlay">
      <div className="chatbot-container">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <div>
              <h3>AI Fitness Coach</h3>
              <span className="chatbot-status">
                <span className="status-dot"></span> Online
              </span>
            </div>
          </div>
          <button className="chatbot-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chatbot-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              {message.sender === 'bot' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="message-avatar user-avatar">
                  {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="chatbot-quick-actions">
            <p className="quick-actions-label">Quick Actions:</p>
            <div className="quick-actions-buttons">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                >
                  <span className="quick-action-icon">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form className="chatbot-input-container" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="chatbot-input"
            placeholder="Ask me anything about fitness..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
          <button 
            type="submit" 
            className="chatbot-send-btn"
            disabled={!inputValue.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>

        <div className="chatbot-footer">
          <p>🤖 Demo Mode - AI API will be integrated soon</p>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
