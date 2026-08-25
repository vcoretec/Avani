import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../stores/AuthContext';
import { LogIn, Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react';
import { authApi } from '../../api';
import './LoginPage.css';

export default function LoginPage() {
  const { login, loginFarmer, loginDriver, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  type LoginType = 'STAFF' | 'FARMER' | 'DRIVER';
  const [loginType, setLoginType] = useState<LoginType>('STAFF');
  const [isLogin, setIsLogin] = useState(true);
  const [identifier, setIdentifier] = useState('');
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
    
    if (loginType === 'FARMER') {
      if (!identifier || !/^\d{10}$/.test(identifier)) { setError('Please enter a valid 10-digit mobile number'); return; }
      setLoading(true);
      try {
        await loginFarmer(identifier, '');
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
      return;
    }
    
    if (isLogin) {
      if (!identifier || !password) { setError('Please enter your credentials'); return; }
      setLoading(true);
      try {
        if (loginType === 'STAFF') await login(identifier, password);
        else if (loginType === 'DRIVER') await loginDriver(identifier, password);
        
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      if (!identifier || !password || (loginType === 'STAFF' && (!fullName || !email))) { 
        setError('Please fill all fields'); 
        return; 
      }
      setLoading(true);
      try {
        if (loginType === 'STAFF') {
          await authApi.register({ username: identifier, password, fullName, email });
        } else if (loginType === 'DRIVER') {
          await authApi.registerDriver({ vehicleNumber: identifier, password });
        }
        setIsLogin(true);
        setError('');
        alert('Registration successful. Please log in.');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
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
        <div className="app-downloads slide-up-delayed" style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="farmer-app-download" style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h3 style={{ color: 'white', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span role="img" aria-label="mobile">📱</span> Avani Farmer App
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px', fontSize: '14px' }}>
              Are you a farmer? Download our dedicated mobile app for easier access.
            </p>
            <a href="/downloads/avani-farmer.apk" download className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: '#2E7D32', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '8px' }}>
              ⬇️ Download Farmer App
            </a>
          </div>
          
          <div className="driver-app-download" style={{ padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <h3 style={{ color: 'white', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span role="img" aria-label="truck">🚚</span> Avani Driver App
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '16px', fontSize: '14px' }}>
              Transport partner? Download our dedicated driver app for active trips.
            </p>
            <a href="/downloads/avani-driver.apk" download className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', background: '#1565C0', border: 'none', color: 'white', padding: '10px 16px', borderRadius: '8px' }}>
              ⬇️ Download Driver App
            </a>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-card fade-in">
          {loginType !== 'FARMER' && (
            <div className="login-tabs">
              <button className={`tab-btn ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); }}>Sign In</button>
              <button className={`tab-btn ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); }}>Register</button>
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{loginType === 'FARMER' ? 'Farmer Login/Registration' : (isLogin ? 'Welcome Back' : 'Create Account')}</h2>
            <p className="login-subtitle">
              {loginType === 'FARMER' ? 'Enter your 10-digit mobile number to access the platform' : (isLogin ? 'Enter your credentials to access the platform' : 'Register to join the operations platform')}
            </p>
            
            <div className="login-type-tabs" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button type="button" className={`type-btn ${loginType === 'STAFF' ? 'active' : ''}`} onClick={() => { setLoginType('STAFF'); setIdentifier(''); setError(''); }}>Staff</button>
              <button type="button" className={`type-btn ${loginType === 'FARMER' ? 'active' : ''}`} onClick={() => { setLoginType('FARMER'); setIdentifier(''); setError(''); }}>Farmer</button>
              <button type="button" className={`type-btn ${loginType === 'DRIVER' ? 'active' : ''}`} onClick={() => { setLoginType('DRIVER'); setIdentifier(''); setError(''); }}>Driver</button>
            </div>

            {error && <div className="login-error shake">{error}</div>}
            
            {!isLogin && loginType === 'STAFF' && (
              <div className="form-group slide-down">
                <label className="form-label">Full Name</label>
                <input className="form-input" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter full name" />
              </div>
            )}
            
            {!isLogin && loginType === 'STAFF' && (
              <div className="form-group slide-down">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" />
              </div>
            )}
            
            <div className="form-group">
              <label className="form-label">
                {loginType === 'STAFF' ? 'Username' : loginType === 'FARMER' ? '10-Digit Mobile Number' : 'Vehicle Number'}
              </label>
              <input className="form-input" type="text" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder={loginType === 'STAFF' ? 'Enter username' : loginType === 'FARMER' ? 'Enter 10-digit mobile number' : 'Enter vehicle number'} autoFocus />
            </div>
            
            {loginType !== 'FARMER' && (
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="password-wrapper">
                  <input className="form-input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}
            
            <button type="submit" className="btn btn-primary btn-lg login-btn" disabled={loading}>
              {loading ? <span className="spinner" style={{width:20,height:20,borderWidth:2}} /> : (isLogin || loginType === 'FARMER' ? <LogIn size={18} /> : <UserPlus size={18} />)}
              {loading ? (isLogin || loginType === 'FARMER' ? 'Processing...' : 'Registering...') : (isLogin || loginType === 'FARMER' ? 'Continue' : 'Register')}
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
