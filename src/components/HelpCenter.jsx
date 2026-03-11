import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HelpCenter.css';

const HelpCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hc-visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll('.hc-animate');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      ),
      title: 'Getting Started',
      description: 'Learn the basics of Consistify',
      id: 'getting-started'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      title: 'Features Guide',
      description: 'Explore all features in detail',
      id: 'features'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      title: 'Account & Settings',
      description: 'Manage your profile and preferences',
      id: 'account'
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Troubleshooting',
      description: 'Solutions to common issues',
      id: 'troubleshooting'
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
    console.log('Contact form submitted:', contactForm);
    setFormStatus('success');
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setFormStatus(''), 5000);
  };

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const displayFAQs = searchQuery ? filteredFAQs : (activeCategory ? faqs.filter(c => c.id === activeCategory) : faqs);

  const totalQuestions = faqs.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <div className="hc-page">
      {/* Hero */}
      <section className="hc-hero">
        <div className="hc-hero-bg">
          <div className="hc-hero-orb hc-hero-orb-1" />
          <div className="hc-hero-orb hc-hero-orb-2" />
          <div className="hc-hero-grid-lines" />
        </div>
        <div className="hc-hero-inner">
          <div className="hc-hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            Help Center
          </div>
          <h1 className="hc-hero-title">
            How can we <span>help you?</span>
          </h1>
          <p className="hc-hero-subtitle">
            Find answers, learn features, or reach out to our team
          </p>

          {/* Search */}
          <div className="hc-search-wrap">
            <div className="hc-search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
            <input
              type="text"
              className="hc-search-input"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory(null); }}
            />
            {searchQuery && (
              <button className="hc-search-clear" onClick={() => setSearchQuery('')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Quick stats */}
          <div className="hc-hero-stats">
            <div className="hc-hero-stat">
              <strong>{faqs.length}</strong> Categories
            </div>
            <div className="hc-hero-stat-divider" />
            <div className="hc-hero-stat">
              <strong>{totalQuestions}</strong> Articles
            </div>
            <div className="hc-hero-stat-divider" />
            <div className="hc-hero-stat">
              <strong>24/7</strong> Support
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="hc-section">
        <div className="hc-container">
          <div className="hc-categories-grid hc-animate">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`hc-category-card ${activeCategory === cat.id ? 'hc-category-active' : ''}`}
                onClick={() => { setActiveCategory(activeCategory === cat.id ? null : cat.id); setSearchQuery(''); }}
              >
                <div className="hc-category-icon">{cat.icon}</div>
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <div className="hc-category-count">
                  {faqs.find(f => f.id === cat.id)?.questions.length || 0} articles
                </div>
                <div className="hc-category-arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hc-section hc-section-alt">
        <div className="hc-container hc-faq-container">
          <div className="hc-section-header hc-animate">
            <span className="hc-label-tag">Knowledge Base</span>
            <h2 className="hc-section-heading">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategory
                  ? categories.find(c => c.id === activeCategory)?.title
                  : 'Frequently Asked Questions'}
            </h2>
            {activeCategory && !searchQuery && (
              <button className="hc-back-btn" onClick={() => setActiveCategory(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Show all categories
              </button>
            )}
          </div>

          {displayFAQs.length > 0 ? (
            displayFAQs.map((category, catIdx) => (
              <div key={catIdx} id={category.id} className="hc-faq-group hc-animate">
                {!activeCategory && !searchQuery && (
                  <div className="hc-faq-group-header">
                    <h3>{category.category}</h3>
                    <span className="hc-faq-count">{category.questions.length} questions</span>
                  </div>
                )}

                <div className="hc-faq-list">
                  {category.questions.map((faq, idx) => {
                    const faqId = `${category.id}-${idx}`;
                    const isOpen = openFAQ === faqId;

                    return (
                      <div className={`hc-faq-item ${isOpen ? 'hc-faq-open' : ''}`} key={idx}>
                        <button
                          className="hc-faq-question"
                          onClick={() => setOpenFAQ(isOpen ? null : faqId)}
                        >
                          <div className="hc-faq-q-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                              <path d="M12 17h.01"/>
                            </svg>
                          </div>
                          <span className="hc-faq-q-text">{faq.q}</span>
                          <span className={`hc-faq-chevron ${isOpen ? 'hc-faq-chevron-open' : ''}`}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m6 9 6 6 6-6"/>
                            </svg>
                          </span>
                        </button>

                        <div className={`hc-faq-answer-wrap ${isOpen ? 'hc-faq-answer-open' : ''}`}>
                          <div className="hc-faq-answer">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="hc-empty-state hc-animate">
              <div className="hc-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <h3>No results found for "{searchQuery}"</h3>
              <p>Try different keywords or browse categories above</p>
              <button className="hc-empty-btn" onClick={() => setSearchQuery('')}>
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="hc-section">
        <div className="hc-container">
          <div className="hc-section-header hc-animate">
            <span className="hc-label-tag">Quick Help</span>
            <h2 className="hc-section-heading">Popular resources</h2>
          </div>
          <div className="hc-resources-grid hc-animate">
            <div className="hc-resource-card">
              <div className="hc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <h3>Quick Start Guide</h3>
              <p>Get up and running in under 5 minutes with our step-by-step setup guide.</p>
              <button className="hc-resource-link" onClick={() => { setActiveCategory('getting-started'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Read guide
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <div className="hc-resource-card">
              <div className="hc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>Feature Walkthrough</h3>
              <p>Discover Focus Mode, streaks, XP, competitions, and unlock your full potential.</p>
              <button className="hc-resource-link" onClick={() => { setActiveCategory('features'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Explore features
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <div className="hc-resource-card">
              <div className="hc-resource-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Privacy & Data</h3>
              <p>Your data stays in your browser. Learn how we keep your information safe.</p>
              <button className="hc-resource-link" onClick={() => { setActiveCategory('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Learn more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="hc-section hc-section-alt hc-contact-section">
        <div className="hc-container">
          <div className="hc-contact-layout hc-animate">
            <div className="hc-contact-info">
              <span className="hc-label-tag">Get In Touch</span>
              <h2 className="hc-section-heading">Still need help?</h2>
              <p className="hc-contact-desc">
                Can't find what you're looking for? Send us a message and our team will get back to you as soon as possible.
              </p>
              <div className="hc-contact-channels">
                <div className="hc-contact-channel">
                  <div className="hc-contact-channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Email Support</strong>
                    <span>support@consistify.app</span>
                  </div>
                </div>
                <div className="hc-contact-channel">
                  <div className="hc-contact-channel-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Response Time</strong>
                    <span>Usually within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hc-contact-form-wrap">
              {formStatus === 'success' && (
                <div className="hc-form-success">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="hc-contact-form">
                <div className="hc-form-row">
                  <div className="hc-form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    />
                  </div>
                  <div className="hc-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="hc-form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  />
                </div>
                <div className="hc-form-group">
                  <label>Message</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Describe your issue or question..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>
                <button type="submit" className="hc-submit-btn">
                  Send message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
