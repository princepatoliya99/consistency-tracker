import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

const PrivacyPolicy = () => {
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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Privacy Policy
          </div>
          <h1 className="legal-hero-title">
            Your privacy <span>matters to us.</span>
          </h1>
          <p className="legal-hero-subtitle">
            We believe in transparency. Here's exactly how we handle your data — no fine print, no surprises.
          </p>
          <div className="legal-hero-meta">
            <span>Last updated: March 11, 2026</span>
            <span className="legal-hero-meta-dot" />
            <span>5 min read</span>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="legal-nav-section">
        <div className="legal-container">
          <div className="legal-quick-nav legal-animate">
            <h3>On this page</h3>
            <div className="legal-nav-links">
              <a href="#info-collected">Information We Collect</a>
              <a href="#how-we-use">How We Use Your Data</a>
              <a href="#data-storage">Data Storage</a>
              <a href="#third-party">Third-Party Services</a>
              <a href="#your-rights">Your Rights</a>
              <a href="#cookies">Cookies</a>
              <a href="#children">Children's Privacy</a>
              <a href="#changes">Changes to This Policy</a>
              <a href="#contact-privacy">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="legal-section">
        <div className="legal-container legal-content-container">
          <div className="legal-content">
            <div className="legal-block legal-animate" id="info-collected">
              <div className="legal-block-number">01</div>
              <h2>Information We Collect</h2>
              <p>
                Consistify is designed with a privacy-first approach. We collect only what's necessary to provide you with the best experience:
              </p>
              <div className="legal-info-grid">
                <div className="legal-info-card">
                  <div className="legal-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h4>Account Information</h4>
                  <p>Your name, email address, and profile details you provide during signup.</p>
                </div>
                <div className="legal-info-card">
                  <div className="legal-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  </div>
                  <h4>Usage Data</h4>
                  <p>Task completion records, streaks, XP, and other progress data you generate.</p>
                </div>
                <div className="legal-info-card">
                  <div className="legal-info-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                      <line x1="8" y1="21" x2="16" y2="21"/>
                      <line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                  <h4>Device Information</h4>
                  <p>Browser type and preferences (like dark/light mode) for a better experience.</p>
                </div>
              </div>
            </div>

            <div className="legal-block legal-animate" id="how-we-use">
              <div className="legal-block-number">02</div>
              <h2>How We Use Your Data</h2>
              <p>Your information is used exclusively to:</p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">✓</span>
                  Provide and maintain the Consistify service
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Track your habits, streaks, XP, and progress
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Display your profile on leaderboards (if you participate in Compete)
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Save your preferences (theme, settings)
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Respond to support requests you send through the Help Center
                </li>
              </ul>
              <div className="legal-callout">
                <div className="legal-callout-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p><strong>We will never sell your data.</strong> Your information is not shared with advertisers, data brokers, or any third party for marketing purposes.</p>
              </div>
            </div>

            <div className="legal-block legal-animate" id="data-storage">
              <div className="legal-block-number">03</div>
              <h2>Data Storage</h2>
              <p>
                Consistify currently stores all your data <strong>locally in your browser</strong> using localStorage. This means:
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">✓</span>
                  Your data stays on your device — we don't transmit it to remote servers
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Clearing browser data will remove your Consistify data
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  Data does not sync across different browsers or devices
                </li>
                <li>
                  <span className="legal-list-icon">✓</span>
                  You are in full control of your data at all times
                </li>
              </ul>
              <p>
                If we introduce cloud storage or syncing in the future, we will update this policy and notify you before any changes take effect.
              </p>
            </div>

            <div className="legal-block legal-animate" id="third-party">
              <div className="legal-block-number">04</div>
              <h2>Third-Party Services</h2>
              <p>
                Consistify may use the following third-party services:
              </p>
              <ul className="legal-list">
                <li>
                  <span className="legal-list-icon">→</span>
                  <strong>Hosting provider</strong> — to serve the application (e.g., Vercel, Netlify)
                </li>
                <li>
                  <span className="legal-list-icon">→</span>
                  <strong>EmailJS</strong> — to process contact form submissions in the Help Center (only if you submit a message)
                </li>
              </ul>
              <p>
                These services have their own privacy policies. We encourage you to review them. We do not share any personal information beyond what is necessary for these services to function.
              </p>
            </div>

            <div className="legal-block legal-animate" id="your-rights">
              <div className="legal-block-number">05</div>
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <div className="legal-rights-grid">
                <div className="legal-right-item">
                  <strong>Access</strong>
                  <p>View all the data Consistify stores about you</p>
                </div>
                <div className="legal-right-item">
                  <strong>Delete</strong>
                  <p>Remove your data by clearing browser storage or deleting your account</p>
                </div>
                <div className="legal-right-item">
                  <strong>Modify</strong>
                  <p>Update your profile information at any time through settings</p>
                </div>
                <div className="legal-right-item">
                  <strong>Portability</strong>
                  <p>Your data is stored locally and can be accessed directly</p>
                </div>
              </div>
            </div>

            <div className="legal-block legal-animate" id="cookies">
              <div className="legal-block-number">06</div>
              <h2>Cookies</h2>
              <p>
                Consistify does not use tracking cookies. We use <strong>localStorage</strong> to save your preferences, tasks, and progress. This data is never sent to any external server and is used solely to maintain your experience within the application.
              </p>
            </div>

            <div className="legal-block legal-animate" id="children">
              <div className="legal-block-number">07</div>
              <h2>Children's Privacy</h2>
              <p>
                Consistify is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can take appropriate action.
              </p>
            </div>

            <div className="legal-block legal-animate" id="changes">
              <div className="legal-block-number">08</div>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of Consistify after changes are posted constitutes acceptance of the updated policy.
              </p>
            </div>

            <div className="legal-block legal-animate" id="contact-privacy">
              <div className="legal-block-number">09</div>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how your data is handled, please reach out:
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
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/help">Help Center</Link></li>
              </ul>
            </div>
            <div className="legal-sidebar-card legal-sidebar-trust">
              <div className="legal-trust-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h4>Your Data, Your Control</h4>
              <p>All data is stored locally on your device. We never sell or share your information.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
