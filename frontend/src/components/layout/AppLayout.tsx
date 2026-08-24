import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../stores/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main className={`app-main ${collapsed ? 'collapsed' : ''}`}>
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
