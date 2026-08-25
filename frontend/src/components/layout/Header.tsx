import { useAuth } from '../../stores/AuthContext';
import { Bell, Search, User as UserIcon, Menu } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="app-header">
      <div className="header-left">
        {onMobileMenuToggle && (
          <button className="mobile-menu-btn" onClick={onMobileMenuToggle}>
            <Menu size={24} />
          </button>
        )}
        <div className="header-search">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search transactions, orders, trips..." className="header-search-input" />
        </div>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" title="Notifications">
          <Bell size={20} />
          <span className="notif-dot" />
        </button>
        <div className="header-user">
          <div className="header-avatar">
            <UserIcon size={18} />
          </div>
          <div className="header-user-info">
            <span className="header-user-name">{user?.fullName}</span>
            <span className="header-user-role">{user?.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
