import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../stores/AuthContext';
import {
  LayoutDashboard, ShoppingCart, Truck, Warehouse as WarehouseIcon,
  Package, ShoppingBag, DollarSign, BarChart3, ChevronLeft, ChevronRight,
  Users, Settings, LogOut
} from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, permission: 'DASHBOARD_VIEW' },
  { path: '/procurement', label: 'Procurement', icon: ShoppingCart, permission: 'PROCUREMENT_VIEW' },
  { path: '/transport', label: 'Transport', icon: Truck, permission: 'TRANSPORT_VIEW' },
  { path: '/warehouse', label: 'Warehouse', icon: WarehouseIcon, permission: 'WAREHOUSE_VIEW' },
  { path: '/inventory', label: 'Inventory', icon: Package, permission: 'INVENTORY_VIEW' },
  { path: '/sales', label: 'Sales', icon: ShoppingBag, permission: 'SALES_VIEW' },
  { path: '/finance', label: 'Finance', icon: DollarSign, permission: 'FINANCE_VIEW' },
  { path: '/reports', label: 'Reports', icon: BarChart3, permission: 'REPORTS_VIEW' },
];

const adminItems = [
  { path: '/admin/users', label: 'Users', icon: Users, permission: 'ADMIN_USERS' },
  { path: '/admin/settings', label: 'Settings', icon: Settings, permission: 'ADMIN_SETTINGS' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { hasPermission, logout, user } = useAuth();
  const location = useLocation();

  const visibleMenu = menuItems.filter(item => hasPermission(item.permission));
  const visibleAdmin = adminItems.filter(item => hasPermission(item.permission));

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="brand-logo">A</div>
        {!collapsed && <span className="brand-name">AVANI FEEDS</span>}
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <div className="nav-section-label">MAIN MENU</div>}
          {visibleMenu.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={collapsed ? item.label : undefined}
              onClick={() => { if (onMobileClose) onMobileClose(); }}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {visibleAdmin.length > 0 && (
          <div className="nav-section">
            {!collapsed && <div className="nav-section-label">ADMIN</div>}
            {visibleAdmin.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
                onClick={() => { if (onMobileClose) onMobileClose(); }}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout-btn" onClick={logout} title="Logout">
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      <button className="sidebar-toggle" onClick={onToggle}>
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
