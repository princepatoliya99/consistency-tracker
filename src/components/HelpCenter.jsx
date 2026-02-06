import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const categories = [
    {
      icon: '🚀',
      title: 'Getting Started',
      description: 'Learn the basics of using Consistify',
      link: '#getting-started'
    },
    {
      icon: '⚡',
      title: 'Features Guide',
      description: 'Explore all features in detail',
      link: '#features'
    },
    {
      icon: '👤',
      title: 'Account & Settings',
      description: 'Manage your profile and preferences',
      link: '#account'
    },
    {
      icon: '🔧',
      title: 'Troubleshooting',
      description: 'Solutions to common issues',
      link: '#troubleshooting'
    }
  ];

  const faqs = [
    {
      category: 'Getting Started',
      id: 'getting-started',
      questions: [
        {
          q: 'How do I create my first task?',
          a: 'Click on "Add New Task" on your home page, enter a task name, and click save. Your task will appear in the calendar. Click on any day to mark it as complete.'
        },
        {
          q: 'What is the calendar view and how does it work?',
          a: 'The calendar shows your entire month at a glance. Each day can be marked as complete (green checkmark) or incomplete. This visual representation helps you see your consistency patterns over time.'
        },
        {
          q: 'How do I navigate between different sections?',
          a: 'Use the navigation menu at the top: Home (task tracking), Analysis (stats), Compete (leaderboards), and Rewards (achievements). Your profile is accessible from the avatar in the top-right corner.'
        }
      ]
    },
    {
      category: 'Features',
      id: 'features',
      questions: [
        {
          q: 'What is Focus Mode and how do I use it?',
          a: 'Focus Mode removes all distractions and shows only your tasks for today. Click the "Focus Mode" button in the header on your home page. Press "Exit Focus Mode" when you\'re done.'
        },
        {
          q: 'How does the streak system work?',
          a: 'A streak counts consecutive days you\'ve completed tasks. Missing a day breaks your streak, but you can always start a new one. Your longest streak is saved and displayed in your stats.'
        },
        {
          q: 'How do I earn XP and coins?',
          a: 'You earn XP for completing tasks daily. The more consistent you are, the more XP you accumulate. Coins are awarded for maintaining streaks and achieving milestones. Use coins to unlock rewards in the Rewards section.'
        },
        {
          q: 'What is "Why You Started" and where do I set it?',
          a: 'This is your personal reminder of why you began this journey. Set it in your profile settings under "Edit Profile". It appears on tough days to reconnect you with your motivation.'
        },
        {
          q: 'How does the compete feature work?',
          a: 'The Compete section shows leaderboards where you can see how you rank against other users based on XP, streaks, and consistency. It\'s designed for gentle motivation, not hardcore competition.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      id: 'account',
      questions: [
        {
          q: 'How do I change my profile information?',
          a: 'Click your avatar in the top-right corner, then click "Edit Profile". You can update your name, bio, profile picture, and your "Why You Started" message.'
        },
        {
          q: 'Can I switch between dark and light mode?',
          a: 'Yes! Click the Dark/Light toggle button in the header. Your preference is saved automatically and will be remembered on your next visit.'
        },
        {
          q: 'How do I log out of my account?',
          a: 'Click your profile avatar in the top-right corner. At the bottom of your profile page, you\'ll find the logout button.'
        },
        {
          q: 'Is my data saved if I close the browser?',
          a: 'Yes, all your tasks, streaks, XP, and settings are saved locally in your browser. Your progress persists across sessions.'
        }
      ]
    },
    {
      category: 'Troubleshooting',
      id: 'troubleshooting',
      questions: [
        {
          q: 'What happens if I miss a day?',
          a: 'Missing a day will break your current streak, but there\'s no punishment or shame. Simply mark the next day as complete and start building a new streak. Progress isn\'t linear—what matters is getting back on track.'
        },
        {
          q: 'My tasks disappeared. What should I do?',
          a: 'Your tasks are stored in your browser\'s local storage. If they disappeared, it might be due to cleared browser data or cache. Make sure you\'re using the same browser and haven\'t cleared site data.'
        },
        {
          q: 'The calendar isn\'t updating when I click. Help?',
          a: 'Try refreshing the page. If the issue persists, check your internet connection and browser console for errors. Clear your browser cache and try again.'
        },
        {
          q: 'Can I use Consistify on my phone?',
          a: 'Yes! Consistify is fully responsive and works on mobile browsers. For the best experience, use Chrome, Safari, or Firefox on your phone.'
        },
        {
          q: 'How do I recover a deleted task?',
          a: 'Currently, deleted tasks cannot be recovered. Be careful when deleting tasks. We recommend editing task names instead of deleting if you want to repurpose them.'
        }
      ]
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    // Placeholder for EmailJS integration
    // TODO: Implement EmailJS here
    console.log('Contact form submitted:', contactForm);
    
    setFormStatus('success');
    setContactForm({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => {
      setFormStatus('');
    }, 5000);
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }} className="dark:bg-gray-900">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #4f46e5 100%)',
        padding: '4rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontWeight: '800', 
            color: 'white',
            marginBottom: '1rem'
          }}>
            How can we help you?
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem'
          }}>
            Find answers, learn features, or get in touch
          </p>
          
          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 3rem 1rem 1.5rem',
                fontSize: '1.125rem',
                borderRadius: '12px',
                border: 'none',
                outline: 'none',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
              }}
              className="dark:bg-gray-800 dark:text-white"
            />
            <span style={{ 
              position: 'absolute', 
              right: '1.5rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              fontSize: '1.5rem'
            }}>
              🔍
            </span>
          </div>
        </div>
      </section>

      {/* Quick Access Categories */}
      <section style={{ padding: '4rem 1.5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={cat.link}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '2rem',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              className="dark:bg-gray-800 dark:border-gray-700 hover-lift"
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: '#111827' }} className="dark:text-white">
                {cat.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280' }} className="dark:text-gray-400">
                {cat.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* FAQ Sections */}
      <section style={{ padding: '2rem 1.5rem 4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#111827',
          textAlign: 'center'
        }} className="dark:text-white">
          Frequently Asked Questions
        </h2>

        {(searchQuery ? filteredFAQs : faqs).map((category, catIdx) => (
          <div key={catIdx} id={category.id} style={{ marginBottom: '3rem' }}>
            <h3 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700', 
              marginBottom: '1.5rem',
              color: '#1f2937',
              borderBottom: '2px solid #3b82f6',
              paddingBottom: '0.5rem'
            }} className="dark:text-white">
              {category.category}
            </h3>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {category.questions.map((faq, idx) => {
                const faqId = `${category.id}-${idx}`;
                const isOpen = openFAQ === faqId;
                
                return (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                    className="dark:bg-gray-800 dark:border-gray-700"
                  >
                    <button
                      onClick={() => setOpenFAQ(isOpen ? null : faqId)}
                      style={{
                        width: '100%',
                        padding: '1.25rem',
                        textAlign: 'left',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#111827'
                      }}
                      className="dark:text-white"
                    >
                      <span>{faq.q}</span>
                      <span style={{ 
                        fontSize: '1.5rem',
                        transition: 'transform 0.3s ease',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                      }}>
                        ▼
                      </span>
                    </button>
                    
                    {isOpen && (
                      <div style={{
                        padding: '0 1.25rem 1.25rem',
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        color: '#4b5563',
                        borderTop: '1px solid #e5e7eb'
                      }} className="dark:text-gray-300 dark:border-gray-700">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {searchQuery && filteredFAQs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>No results found for "{searchQuery}"</p>
            <p>Try different keywords or contact us below</p>
          </div>
        )}
      </section>

      {/* Contact Form */}
      <section style={{ 
        background: 'white',
        padding: '4rem 1.5rem',
        borderTop: '1px solid #e5e7eb'
      }} className="dark:bg-gray-800 dark:border-gray-700">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#111827',
            textAlign: 'center'
          }} className="dark:text-white">
            Still need help?
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.125rem', 
            color: '#6b7280',
            marginBottom: '2rem'
          }} className="dark:text-gray-400">
            Send us a message and we'll get back to you as soon as possible
          </p>

          {formStatus === 'success' && (
            <div style={{
              background: '#d1fae5',
              border: '1px solid #10b981',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1.5rem',
              textAlign: 'center',
              color: '#065f46',
              fontWeight: '600'
            }}>
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleContactSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }} className="dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                required
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }} className="dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }} className="dark:text-gray-300">
                Subject
              </label>
              <input
                type="text"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none'
                }}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '600',
                color: '#374151'
              }} className="dark:text-gray-300">
                Message
              </label>
              <textarea
                required
                rows="6"
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  outline: 'none',
                  resize: 'vertical'
                }}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.125rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <style>{`
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};

export default HelpCenter;
