import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }} className="dark:bg-gray-900">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #4f46e5 100%)',
        padding: '6rem 1.5rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
            fontWeight: '800', 
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Consistify wasn't built for perfect days.
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', 
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            It was built for the days in between. The ones where no one's watching. 
            The ones that don't make the feed. The ones that actually matter.
          </p>
        </div>
      </section>

      {/* The Problem Section */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)', 
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#111827'
        }} className="dark:text-white">
          The problem we saw
        </h2>
        <div style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#374151' }} className="dark:text-gray-300">
          <p style={{ marginBottom: '1.5rem' }}>
            Most habit apps are built on motivation. They're designed for the version of you that wakes up 
            energized, ready to conquer the world. They're great—until you're not feeling it.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            Then you miss a day. The streak breaks. The guilt sets in. And suddenly, the app that was 
            supposed to help you becomes another thing you've failed at.
          </p>
          <p style={{ marginBottom: '1.5rem', fontWeight: '600', color: '#1f2937' }} className="dark:text-white">
            We got tired of tools that only work when you're already winning.
          </p>
          <p>
            So we built something different. Something for the tired mornings. The overwhelmed evenings. 
            The weeks where you're just trying to survive. Because that's when discipline actually matters.
          </p>
        </div>
      </section>

      {/* Beliefs Section */}
      <section style={{ 
        background: '#f8fafc',
        padding: '5rem 1.5rem' 
      }} className="dark:bg-gray-800">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700',
            marginBottom: '3rem',
            color: '#111827',
            textAlign: 'center'
          }} className="dark:text-white">
            What we believe
          </h2>
          <div style={{ display: 'grid', gap: '2.5rem' }}>
            <div style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
                Consistency beats motivation
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                Motivation is a spark. Consistency is the fire that keeps burning long after the spark fades.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #6366f1', paddingLeft: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
                Progress is quiet
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                Real growth doesn't announce itself. It compounds in silence. One rep. One page. One day at a time.
              </p>
            </div>

            <div style={{ borderLeft: '4px solid #8b5cf6', paddingLeft: '2rem' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
                Discipline grows through repetition
              </h3>
              <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                You don't need perfection. You need practice. Show up enough times, and discipline becomes automatic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1300px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)', 
          fontWeight: '700',
          marginBottom: '3rem',
          color: '#111827',
          textAlign: 'center'
        }} className="dark:text-white">
          What makes Consistify different
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ 
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }} className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
              Focus Mode
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#6b7280' }} className="dark:text-gray-400">
              Strip away everything. Just you, your tasks, and the work. No distractions. No noise. 
              Just what matters.
            </p>
          </div>

          <div style={{ 
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }} className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💭</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
              Why You Started
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#6b7280' }} className="dark:text-gray-400">
              On the hardest days, we remind you why this mattered in the first place. Your reason is your anchor.
            </p>
          </div>

          <div style={{ 
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }} className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
              Gentle competition
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#6b7280' }} className="dark:text-gray-400">
              Not about crushing others. Just a nudge to keep going. Compete, but don't compare. We're all building.
            </p>
          </div>

          <div style={{ 
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }} className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
              Rewards that respect effort
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#6b7280' }} className="dark:text-gray-400">
              XP. Streaks. Coins. Not gimmicks—just small ways to acknowledge that you showed up.
            </p>
          </div>

          <div style={{ 
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }} className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
              No shame for missed days
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#6b7280' }} className="dark:text-gray-400">
              Life happens. We don't punish you for being human. Just pick up where you left off. Progress isn't linear.
            </p>
          </div>

          <div style={{ 
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            padding: '2rem',
            transition: 'all 0.3s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }} className="dark:bg-gray-800 dark:border-gray-700 hover-lift">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>♾️</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#111827' }} className="dark:text-white">
              Built for the long game
            </h3>
            <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#6b7280' }} className="dark:text-gray-400">
              Not about 30-day challenges. This is about building systems that last. Months. Years. A lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section style={{ 
        background: '#f8fafc',
        padding: '5rem 1.5rem' 
      }} className="dark:bg-gray-800">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: '700',
            marginBottom: '3rem',
            color: '#111827',
            textAlign: 'center'
          }} className="dark:text-white">
            Who Consistify is for
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }} className="dark:bg-gray-900">
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }} className="dark:text-white">
                Students
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                For the late-night study sessions no one sees. The daily grind of notes, problems, and repetition. 
                Building the habits that outlast the semester.
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }} className="dark:bg-gray-900">
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }} className="dark:text-white">
                Professionals
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                For the side projects after work. The skills you're learning in the margins. The slow, steady climb 
                to where you want to be.
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }} className="dark:bg-gray-900">
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }} className="dark:text-white">
                Creators
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                For the drafts no one will read. The sketches no one will see. The reps that don't get likes but 
                make you better anyway.
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }} className="dark:bg-gray-900">
              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }} className="dark:text-white">
                Anyone rebuilding discipline
              </h3>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563' }} className="dark:text-gray-300">
                For those starting over. Those getting back on track. Those who've tried before and are trying again. 
                This time, you have a system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section style={{ padding: '5rem 1.5rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: 'clamp(2rem, 4vw, 3rem)', 
          fontWeight: '700',
          marginBottom: '3rem',
          color: '#111827'
        }} className="dark:text-white">
          What we stand for
        </h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }} className="dark:text-white">
            Progress over perfection
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }} className="dark:text-white">
            Discipline without pressure
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }} className="dark:text-white">
            Showing up counts
          </p>
          <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#111827' }} className="dark:text-white">
            The work no one sees builds the results everyone notices
          </p>
          <p style={{ 
            marginTop: '2rem', 
            fontSize: '1.25rem', 
            fontStyle: 'italic', 
            color: '#6b7280',
            lineHeight: '1.7'
          }} className="dark:text-gray-400">
            We're not here to motivate you. We're here to help you show up—especially when motivation is nowhere to be found.
          </p>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ 
        background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #2563eb 100%)',
        padding: '5rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ 
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', 
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '1.5rem',
            lineHeight: '1.4'
          }}>
            You don't need another app. You need a system that works when you don't feel like it.
          </p>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2.5rem'
          }}>
            Start showing up. Track the days. Build the discipline.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.125rem 2.5rem',
              background: 'white',
              color: '#3b82f6',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.25)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            }}
          >
            Start building consistency
            <span style={{ fontSize: '1.25rem' }}>→</span>
          </button>
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

export default About;
