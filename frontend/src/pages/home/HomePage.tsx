import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Truck, Package, ShieldCheck, Globe, Users, DownloadCloud, Sprout } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-brand">
          <div className="home-logo">A</div>
          <span className="home-brand-name">AVANI FEEDS</span>
        </div>
        <div className="home-nav-actions">
          <button className="btn btn-outline nav-app-btn">
            <DownloadCloud size={16} /> Download App
          </button>
          <button className="btn btn-outline nav-farmer-btn">
            <Sprout size={16} /> Farmer Login
          </button>
          <button className="btn btn-primary login-nav-btn" onClick={() => navigate('/login')}>
            Employee Login <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="home-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-badge">Enterprise Resource Planning</div>
          <h1 className="hero-title">Intelligent Operations for Modern Agriculture</h1>
          <p className="hero-subtitle">
            Seamlessly integrate Procurement, Transport, Warehouse, Inventory, Sales, and Finance into one unified platform.
          </p>
          <div className="hero-cta-group">
            <button className="btn btn-primary btn-lg hero-cta-primary" onClick={() => navigate('/login')}>
              Access Portal
            </button>
            <button className="btn btn-outline btn-lg hero-cta-secondary">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Mockup / Dashboard Preview Illustration */}
        <div className="hero-visual">
          <div className="glass-panel">
            <div className="glass-header">
              <div className="dot red"></div><div className="dot amber"></div><div className="dot green"></div>
            </div>
            <div className="glass-body">
              <div className="glass-sidebar"></div>
              <div className="glass-main">
                <div className="glass-cards">
                  <div className="glass-card"></div>
                  <div className="glass-card"></div>
                  <div className="glass-card"></div>
                </div>
                <div className="glass-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="home-features">
        <div className="features-header fade-in">
          <h2>End-to-End Visibility</h2>
          <p>Everything you need to run your operations efficiently</p>
        </div>
        <div className="features-grid stagger-container">
          <div className="feature-card stagger-item">
            <div className="feature-icon"><Users size={24} /></div>
            <h3>Procurement</h3>
            <p>Manage farmers, contracts, and quality-based purchasing with automated workflows.</p>
          </div>
          <div className="feature-card stagger-item">
            <div className="feature-icon"><Truck size={24} /></div>
            <h3>Transport</h3>
            <p>Real-time vehicle tracking, freight management, and driver trip coordination.</p>
          </div>
          <div className="feature-card stagger-item">
            <div className="feature-icon"><Package size={24} /></div>
            <h3>Warehouse</h3>
            <p>Gate entry, weighment integration, quality inspection, and intelligent storage.</p>
          </div>
          <div className="feature-card stagger-item">
            <div className="feature-icon"><BarChart3 size={24} /></div>
            <h3>Finance</h3>
            <p>Automated payment processing, invoicing, and real-time bank reconciliation.</p>
          </div>
          <div className="feature-card stagger-item">
            <div className="feature-icon"><ShieldCheck size={24} /></div>
            <h3>Compliance & Security</h3>
            <p>Role-based access, full audit trails, and strict data security protocols.</p>
          </div>
          <div className="feature-card stagger-item">
            <div className="feature-icon"><Globe size={24} /></div>
            <h3>Anywhere Access</h3>
            <p>Cloud-native platform accessible on desktop and mobile devices seamlessly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="home-logo small">A</div>
            <span>AVANI FEEDS ERP</span>
          </div>
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Avani Feeds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
