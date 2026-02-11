import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <div className="about-hero-badge">Our Story</div>
          <h1 className="about-hero-title">
            Built for the days <br /><span>no one sees.</span>
          </h1>
          <p className="about-hero-subtitle">
            Consistify isn't another habit tracker. It's a system for the tired mornings, 
            the overwhelmed evenings, and the weeks where you're just trying to survive.
          </p>
          <div className="about-hero-divider" />
        </div>
      </section>

      {/* Problem */}
      <section className="about-section">
        <div className="about-container about-two-col">
          <div className="about-col-label">
            <span className="about-label-tag">The Problem</span>
          </div>
          <div className="about-col-content">
            <h2 className="about-section-heading">
              Most habit apps only work when you're already winning.
            </h2>
            <p>
              They're designed for the version of you that wakes up energized, ready to conquer. 
              Then you miss a day. The streak breaks. The guilt sets in.
            </p>
            <p className="about-emphasis">
              Suddenly, the app that was supposed to help becomes another thing you've failed at.
            </p>
            <p>
              We got tired of tools built on motivation alone. So we built something that works 
              when motivation doesn't — something for discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-label-tag">Our Beliefs</span>
            <h2 className="about-section-heading about-centered">
              The principles behind everything we build
            </h2>
          </div>
          <div className="about-beliefs-grid">
            <div className="about-belief-card">
              <div className="about-belief-number">01</div>
              <h3>Consistency beats motivation</h3>
              <p>
                Motivation is a spark. Consistency is the fire that keeps burning long after the spark fades.
              </p>
            </div>
            <div className="about-belief-card">
              <div className="about-belief-number">02</div>
              <h3>Progress is quiet</h3>
              <p>
                Real growth doesn't announce itself. It compounds in silence. One rep. One page. One day at a time.
              </p>
            </div>
            <div className="about-belief-card">
              <div className="about-belief-number">03</div>
              <h3>Discipline grows through repetition</h3>
              <p>
                You don't need perfection. You need practice. Show up enough times, and discipline becomes automatic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-label-tag">What's Different</span>
            <h2 className="about-section-heading about-centered">
              Tools designed for real life
            </h2>
          </div>
          <div className="about-features-grid">
            {[
              { icon: '◎', title: 'Focus Mode', desc: 'Strip away everything. Just you, your tasks, and the work. No distractions.' },
              { icon: '↻', title: 'No shame for missed days', desc: "Life happens. We don't punish you. Just pick up where you left off." },
              { icon: '⚡', title: 'Gentle competition', desc: "Not about crushing others. Just a nudge to keep going. Compete, don't compare." },
              { icon: '◆', title: 'Rewards that respect effort', desc: "XP. Streaks. Coins. Small ways to acknowledge that you showed up." },
              { icon: '∞', title: 'Built for the long game', desc: "Not 30-day challenges. This is about systems that last a lifetime." },
              { icon: '♡', title: 'Why you started', desc: "On the hardest days, we remind you why this mattered in the first place." },
            ].map((f, i) => (
              <div className="about-feature-card" key={i}>
                <div className="about-feature-icon">{f.icon}</div>
                <div className="about-feature-text">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="about-section about-section-alt">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-label-tag">Who It's For</span>
            <h2 className="about-section-heading about-centered">
              Anyone who's tired of starting over
            </h2>
          </div>
          <div className="about-audience-grid">
            {[
              { who: 'Students', desc: 'For the late-night study sessions no one sees. The daily grind that outlasts the semester.' },
              { who: 'Professionals', desc: 'For the side projects after work. The skills you build in the margins.' },
              { who: 'Creators', desc: 'For the drafts no one reads. The reps that don\'t get likes but make you better.' },
              { who: 'Rebuilders', desc: 'For those starting over. Those getting back on track. This time, with a system.' },
            ].map((a, i) => (
              <div className="about-audience-card" key={i}>
                <h3>{a.who}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="about-section about-manifesto">
        <div className="about-container about-manifesto-inner">
          <span className="about-label-tag about-label-tag-light">What We Stand For</span>
          <div className="about-manifesto-lines">
            <p>Progress over perfection.</p>
            <p>Discipline without pressure.</p>
            <p>Showing up counts.</p>
            <p className="about-manifesto-highlight">
              The work no one sees builds the results everyone notices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-section about-cta">
        <div className="about-container about-cta-inner">
          <p className="about-cta-text">
            You don't need another app.<br />You need a system that works when you don't feel like it.
          </p>
          <button className="about-cta-btn" onClick={() => navigate('/')}>
            Start building consistency
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
