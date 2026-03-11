import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const animatedEls = document.querySelectorAll('.about-animate');
    animatedEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <div className="about-hero-orb about-hero-orb-1" />
          <div className="about-hero-orb about-hero-orb-2" />
          <div className="about-hero-orb about-hero-orb-3" />
          <div className="about-hero-grid-lines" />
        </div>
        <div className="about-hero-inner">
          <div className="about-hero-badge">
            <span className="about-hero-badge-dot" />
            Our Story
          </div>
          <h1 className="about-hero-title">
            Built for the days<br /><span>no one sees.</span>
          </h1>
          <p className="about-hero-subtitle">
            Consistify isn't another habit tracker. It's a system for the tired mornings, 
            the overwhelmed evenings, and the weeks where you're just trying to survive.
          </p>
          <div className="about-hero-actions">
            <button className="about-hero-cta" onClick={() => navigate('/')}>
              Get started free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="about-hero-secondary" onClick={() => {
              document.querySelector('.about-story')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Read our story
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats" ref={statsRef}>
        <div className="about-container">
          <div className="about-stats-grid about-animate">
            {[
              { value: '10K+', label: 'Habits Tracked', icon: '📊' },
              { value: '500+', label: 'Active Users', icon: '👥' },
              { value: '92%', label: 'Retention Rate', icon: '🎯' },
              { value: '4.9', label: 'User Rating', icon: '⭐' },
            ].map((stat, i) => (
              <div className="about-stat-item" key={i}>
                <span className="about-stat-icon">{stat.icon}</span>
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Problem */}
      <section className="about-section about-story">
        <div className="about-container">
          <div className="about-story-layout about-animate">
            <div className="about-story-left">
              <span className="about-label-tag">The Problem</span>
              <h2 className="about-section-heading">
                Most habit apps only work when you're already winning.
              </h2>
            </div>
            <div className="about-story-right">
              <p>
                They're designed for the version of you that wakes up energized, ready to conquer. 
                Then you miss a day. The streak breaks. The guilt sets in.
              </p>
              <blockquote className="about-blockquote">
                <div className="about-blockquote-mark">"</div>
                The app that was supposed to help becomes another thing you've failed at.
              </blockquote>
              <p>
                We got tired of tools built on motivation alone. So we built something that works 
                when motivation doesn't — something for <strong>discipline</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="about-mission about-animate">
            <div className="about-mission-visual">
              <div className="about-mission-ring about-mission-ring-outer">
                <div className="about-mission-ring about-mission-ring-middle">
                  <div className="about-mission-ring about-mission-ring-inner">
                    <span className="about-mission-icon">◎</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-mission-content">
              <span className="about-label-tag">Our Mission</span>
              <h2 className="about-section-heading">
                Make consistency the most rewarding thing you do every day.
              </h2>
              <p className="about-mission-desc">
                We believe the greatest transformations happen through small, repeated actions. 
                Consistify exists to make those actions visible, trackable, and genuinely rewarding — 
                so you never feel like your effort goes unnoticed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs — Timeline Style */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-label-tag">Our Beliefs</span>
            <h2 className="about-section-heading about-centered">
              The principles behind everything we build
            </h2>
            <p className="about-section-subhead">
              These aren't just words on a page. They're the decisions we make every day.
            </p>
          </div>
          <div className="about-beliefs-grid">
            {[
              { 
                num: '01', 
                title: 'Consistency beats motivation',
                desc: 'Motivation is a spark. Consistency is the fire that keeps burning long after the spark fades.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                )
              },
              { 
                num: '02', 
                title: 'Progress is quiet',
                desc: 'Real growth doesn\'t announce itself. It compounds in silence. One rep. One page. One day at a time.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                )
              },
              { 
                num: '03', 
                title: 'Discipline grows through repetition',
                desc: 'You don\'t need perfection. You need practice. Show up enough times, and discipline becomes automatic.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 2.1l4 4-4 4"/>
                    <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4"/>
                    <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"/>
                  </svg>
                )
              },
            ].map((belief, i) => (
              <div className="about-belief-card about-animate" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="about-belief-icon-wrap">{belief.icon}</div>
                <div className="about-belief-number">{belief.num}</div>
                <h3>{belief.title}</h3>
                <p>{belief.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — Bento Grid */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-label-tag">What's Different</span>
            <h2 className="about-section-heading about-centered">
              Tools designed for real life
            </h2>
            <p className="about-section-subhead">
              Every feature is built around one idea: make it easier to keep going.
            </p>
          </div>
          <div className="about-bento-grid">
            {[
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ), 
                title: 'Focus Mode', 
                desc: 'Strip away everything. Just you, your tasks, and the work. No distractions.',
                size: 'large'
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                  </svg>
                ), 
                title: 'No shame for missed days', 
                desc: "Life happens. We don't punish you. Just pick up where you left off.",
                size: 'normal'
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ), 
                title: 'Gentle competition', 
                desc: "Not about crushing others. Just a nudge to keep going. Compete, don't compare.",
                size: 'normal'
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 9 8 9 8s2-4 4.5-4a2.5 2.5 0 0 1 0 5H12"/>
                    <path d="M6 9h6v11H2z"/><path d="M12 9h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6z"/>
                    <path d="M12 9v11"/>
                  </svg>
                ), 
                title: 'Rewards that respect effort', 
                desc: "XP. Streaks. Coins. Small ways to acknowledge that you showed up.",
                size: 'normal'
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.585 8 0 8 5.606 0 7.644-8 12.74-8z"/>
                  </svg>
                ), 
                title: 'Built for the long game', 
                desc: "Not 30-day challenges. This is about systems that last a lifetime.",
                size: 'large'
              },
              { 
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  </svg>
                ), 
                title: 'Why you started', 
                desc: "On the hardest days, we remind you why this mattered in the first place.",
                size: 'normal'
              },
            ].map((f, i) => (
              <div className={`about-bento-card about-bento-${f.size} about-animate`} key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="about-bento-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-label-tag">Who It's For</span>
            <h2 className="about-section-heading about-centered">
              Anyone who's tired of starting over
            </h2>
          </div>
          <div className="about-audience-grid">
            {[
              { 
                who: 'Students', 
                emoji: '📚',
                desc: 'For the late-night study sessions no one sees. The daily grind that outlasts the semester.' 
              },
              { 
                who: 'Professionals', 
                emoji: '💼',
                desc: 'For the side projects after work. The skills you build in the margins.' 
              },
              { 
                who: 'Creators', 
                emoji: '🎨',
                desc: 'For the drafts no one reads. The reps that don\'t get likes but make you better.' 
              },
              { 
                who: 'Rebuilders', 
                emoji: '🔄',
                desc: 'For those starting over. Those getting back on track. This time, with a system.' 
              },
            ].map((a, i) => (
              <div className="about-audience-card about-animate" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="about-audience-emoji">{a.emoji}</div>
                <h3>{a.who}</h3>
                <p>{a.desc}</p>
                <div className="about-audience-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="about-section-header about-animate">
            <span className="about-label-tag">What People Say</span>
            <h2 className="about-section-heading about-centered">
              Real stories from real people
            </h2>
          </div>
          <div className="about-testimonials-grid about-animate">
            {[
              { 
                quote: "I've tried every habit tracker out there. Consistify is the first one that didn't make me feel guilty for missing a day.", 
                name: 'Priya S.', 
                role: 'Medical Student',
                avatar: '👩‍⚕️'
              },
              { 
                quote: "The focus mode is a game changer. I went from constantly distracted to actually finishing my daily tasks.", 
                name: 'Marcus T.', 
                role: 'Software Developer',
                avatar: '👨‍💻'
              },
              { 
                quote: "It's not about perfection — that's what I love about Consistify. It celebrates showing up, even imperfectly.", 
                name: 'Aisha K.', 
                role: 'Content Creator',
                avatar: '👩‍🎨'
              },
            ].map((t, i) => (
              <div className="about-testimonial-card" key={i}>
                <div className="about-testimonial-stars">★★★★★</div>
                <p className="about-testimonial-quote">"{t.quote}"</p>
                <div className="about-testimonial-author">
                  <span className="about-testimonial-avatar">{t.avatar}</span>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="about-section about-manifesto">
        <div className="about-manifesto-bg">
          <div className="about-manifesto-glow" />
        </div>
        <div className="about-container about-manifesto-inner">
          <span className="about-label-tag about-label-tag-light">What We Stand For</span>
          <div className="about-manifesto-lines">
            <p className="about-animate">Progress over perfection.</p>
            <p className="about-animate">Discipline without pressure.</p>
            <p className="about-animate">Showing up counts.</p>
            <p className="about-manifesto-highlight about-animate">
              The work no one sees builds the results everyone notices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-section about-cta">
        <div className="about-container about-cta-inner">
          <div className="about-cta-badge">Start Today</div>
          <h2 className="about-cta-heading">
            You don't need another app.<br />You need a system that works when you don't feel like it.
          </h2>
          <p className="about-cta-sub">
            Join thousands of people building real consistency — one day at a time.
          </p>
          <div className="about-cta-buttons">
            <button className="about-cta-btn" onClick={() => navigate('/')}>
              Start building consistency
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <p className="about-cta-note">Free forever. No credit card required.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
