import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../stores/AuthContext';
import { LogIn, Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Register state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      if (!username || !password) { setError('Please enter username and password'); return; }
      setLoading(true);
      try {
        await login(username, password);
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!username || !password || !fullName || !email) { setError('Please fill all fields'); return; }
      setLoading(true);
      // Simulate registration delay
      setTimeout(() => {
        setLoading(false);
        setError('Registration is currently disabled for this demo environment.');
      }, 1000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <button className="btn btn-ghost back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={20} /> Back to Home
        </button>
        <div className="login-brand slide-up">
          <div className="login-logo">A</div>
          <h1>AVANI FEEDS</h1>
          <p>Integrated Procurement, Warehouse, Transport & Sales Management System</p>
        </div>
        <div className="login-features slide-up-delayed">
          <div className="feature-item"><span className="feature-dot" />Procurement & Farmer Management</div>
          <div className="feature-item"><span className="feature-dot" />Transport & GPS Tracking</div>
          <div className="feature-item"><span className="feature-dot" />Warehouse & Quality Control</div>
          <div className="feature-item"><span className="feature-dot" />Inventory & Stock Management</div>
          <div className="feature-item"><span className="feature-dot" />Sales & Dispatch Operations</div>
          <div className="feature-item"><span className="feature-dot" />Finance & Reconciliation</div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-card fade-in">
          <div className="login-tabs">
            <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button>
            <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Register</button>
          </div>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="login-subtitle">
              {isLogin ? 'Enter your credentials to access the platform' : 'Register to join the operations platform'}
            </p>
            
            {error && <div className="login-error shake">{error}</div>}
            
            {!isLogin && (
              <div className="form-group slide-down">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter full name" />
              </div>
            )}
            
            {!isLogin && (
              <div className="form-group slide-down">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" autoFocus />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input className="form-input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-lg login-btn" disabled={loading}>
              {loading ? <span className="spinner" style={{width:20,height:20,borderWidth:2}} /> : (isLogin ? <LogIn size={18} /> : <UserPlus size={18} />)}
              {loading ? (isLogin ? 'Signing in...' : 'Registering...') : (isLogin ? 'Sign In' : 'Register')}
            </button>
            
            {isLogin && (
              <div className="login-hint">
                <strong>Demo:</strong> admin / Admin@123
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
