import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const TermsOfService = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('legal-visible');
        });
      },
      { threshold: 0.1 }
    );
    const els = document.querySelectorAll('.legal-animate');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="legal-page">
      {/* Hero */}
      <section className="legal-hero">
        <div className="legal-hero-bg">
          <div className="legal-hero-orb legal-hero-orb-1" />
          <div className="legal-hero-orb legal-hero-orb-2" />
          <div className="legal-hero-grid-lines" />
        </div>
        <div className="legal-hero-inner">
          <div className="legal-hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            Terms of Service
          </div>
          <h1 className="legal-hero-title">
            Terms of <span>Service.</span>
          </h1>
          <p className="legal-hero-subtitle">
            By using Consistify, you agree to these terms. Please read them carefully — we've kept them clear and straightforward.
          </p>
          <div className="legal-hero-meta">
            <span>Last updated: March 11, 2026</span>
            <span className="legal-hero-meta-dot" />
            <span>6 min read</span>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="legal-nav-section">
        <div className="legal-container">
          <div className="legal-quick-nav legal-animate">
            <h3>On this page</h3>
            <div className="legal-nav-links">
              <a href="#acceptance">Acceptance of Terms</a>
              <a href="#account">Your Account</a>
              <a href="#usage">Acceptable Use</a>
              <a href="#content-rights">Your Content</a>
              <a href="#ip">Intellectual Property</a>
              <a href="#compete-terms">Compete Feature</a>
              <a href="#termination">Termination</a>
              <a href="#disclaimers">Disclaimers</a>
              <a href="#limitation">Limitation of Liability</a>
              <a href="#governing">Governing Law</a>
              <a href="#contact-terms">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="legal-section">
        <div className="legal-container legal-content-container">
          <div className="legal-content">
            <div className="legal-block legal-animate" id="acceptance">
              <div className="legal-block-number">01</div>
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing or using Consistify ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
              <p>
                These terms apply to all users, visitors, and anyone who accesses or uses the Service. We may update these terms periodically, and your continued use of the Service constitutes acceptance of any modifications.
              </p>
            </div>

            <div className="legal-block legal-animate" id="account">
              <div className="legal-block-number">02</div>
              <h2>Your Account</h2>
              <p>
                When you create an account on Consistify, you are responsible for:
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">→</span>
                  Providing accurate, current, and complete information during registration
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  Maintaining the security of your login credentials
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  All activity that occurs under your account
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  Notifying us immediately if you suspect unauthorized access
                </li>
              </ul>
              <div className="legal-callout">
                <div className="legal-callout-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <p>Since your data is currently stored locally in your browser, you are responsible for safeguarding it. Clearing your browser data will permanently delete your Consistify data.</p>
              </div>
            </div>

            <div className="legal-block legal-animate" id="usage">
              <div className="legal-block-number">03</div>
              <h2>Acceptable Use</h2>
              <p>You agree not to use Consistify to:</p>
              <div className="legal-do-dont-grid">
                <div className="legal-do-card">
                  <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Do
                  </h4>
                  <ul>
                    <li>Build positive habits and track your progress</li>
                    <li>Compete fairly on leaderboards</li>
                    <li>Share constructive feedback via the Help Center</li>
                    <li>Use the app for personal productivity</li>
                  </ul>
                </div>
                <div className="legal-dont-card">
                  <h4>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Don't
                  </h4>
                  <ul>
                    <li>Attempt to exploit, hack, or reverse-engineer the Service</li>
                    <li>Impersonate other users or misrepresent your identity</li>
                    <li>Use automated tools to manipulate streaks or XP</li>
                    <li>Engage in any activity that disrupts the Service</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="legal-block legal-animate" id="content-rights">
              <div className="legal-block-number">04</div>
              <h2>Your Content</h2>
              <p>
                You retain full ownership of the content you create in Consistify, including your tasks, habits, notes, and profile information. By using the Service, you grant us a limited, non-exclusive license to store and display your content solely to provide the Service to you.
              </p>
              <p>
                We do not claim any intellectual property rights over your content. If you delete your account or clear your data, your content is permanently removed.
              </p>
            </div>

            <div className="legal-block legal-animate" id="ip">
              <div className="legal-block-number">05</div>
              <h2>Intellectual Property</h2>
              <p>
                Consistify and its original content (excluding your user-generated content), features, and functionality are owned by Consistify and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">→</span>
                  The Consistify name, logo, and branding are our trademarks
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  The design, source code, and visual elements are protected
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  You may not copy, modify, or distribute any part of the Service without permission
                </li>
              </ul>
            </div>

            <div className="legal-block legal-animate" id="compete-terms">
              <div className="legal-block-number">06</div>
              <h2>Compete Feature</h2>
              <p>
                By participating in the Compete feature (leaderboards), you agree to:
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">✓</span>
                  Compete fairly and honestly — do not manipulate your scores or XP
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Accept that leaderboard rankings are based on legitimate activity tracked through the Service
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Understand that we reserve the right to remove users who engage in cheating or manipulation
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Acknowledge that rewards and badges are virtual and carry no monetary value
                </li>
              </ul>
            </div>

            <div className="legal-block legal-animate" id="termination">
              <div className="legal-block-number">07</div>
              <h2>Termination</h2>
              <p>
                We may suspend or terminate your access to the Service at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the Service.
              </p>
              <p>
                You may terminate your account at any time by clearing your browser data or contacting us. Upon termination, your right to use the Service ceases immediately.
              </p>
            </div>

            <div className="legal-block legal-animate" id="disclaimers">
              <div className="legal-block-number">08</div>
              <h2>Disclaimers</h2>
              <p>
                The Service is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis. We make no warranties, expressed or implied, regarding:
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">→</span>
                  The accuracy, reliability, or completeness of any content
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  Uninterrupted or error-free operation of the Service
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  The results that may be obtained from using the Service
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  The security of data stored in your browser's localStorage
                </li>
              </ul>
            </div>

            <div className="legal-block legal-animate" id="limitation">
              <div className="legal-block-number">09</div>
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Consistify and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">→</span>
                  Loss of data, profits, or goodwill
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  Service interruptions or unavailability
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  Any unauthorized access to your data
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  Any errors or omissions in the Service
                </li>
              </ul>
            </div>

            <div className="legal-block legal-animate" id="governing">
              <div className="legal-block-number">10</div>
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiation before pursuing any formal legal action.
              </p>
            </div>

            <div className="legal-block legal-animate" id="contact-terms">
              <div className="legal-block-number">11</div>
              <h2>Contact Us</h2>
              <p>
                If you have questions or concerns about these Terms of Service, reach out to us:
              </p>
              <div className="legal-contact-card">
                <div className="legal-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>support@consistify.app</span>
                </div>
                <div className="legal-contact-row">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  <Link to="/help">Visit our Help Center</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="legal-sidebar legal-animate">
            <div className="legal-sidebar-card">
              <h4>Related Pages</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/help">Help Center</Link></li>
              </ul>
            </div>
            <div className="legal-sidebar-card legal-sidebar-trust">
              <div className="legal-trust-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h4>Fair & Transparent</h4>
              <p>Our terms are written in plain language so you always know where you stand.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
