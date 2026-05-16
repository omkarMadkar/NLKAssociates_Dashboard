import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [nlOpen, setNlOpen] = useState(true);

  const NAV = [
    { label: 'Dashboard', icon: '⊞', path: '/dashboard' },
    { label: 'All Cases', icon: '📁', path: '/cases' },
    ...(role === 'admin' ? [{ label: 'New Case', icon: '➕', path: '/cases/new' }] : []),
    {
      label: 'Non-Litigation', icon: '🏛️', path: null,
      children: [
        { label: 'ICICI Bank', path: '/non-litigation/icici' },
        { label: 'Aditya Birla', path: '/non-litigation/aditya-birla' },
        { label: 'Bajaj', path: '/non-litigation/bajaj' },
      ]
    },
    { label: 'Search', icon: '🔍', path: '/search' },
    { label: 'Approvals', icon: '✅', path: '/approvals' },
    { label: 'Reports', icon: '📊', path: '/reports' },
  ];


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ width: collapsed ? 64 : 260, background: 'var(--navy)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', transition: 'width 0.25s ease',
      position: 'fixed', top: 0, left: 0, zIndex: 100, overflow: 'hidden' }}>

      {/* Logo */}
      <div style={{ padding: '24px 16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', gap: 12, justifyContent: collapsed ? 'center' : 'space-between' }}>
        {!collapsed && (
          <div>
            <div style={{ fontFamily: 'Playfair Display', color: 'var(--gold)', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>NLK</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase' }}>Associates</div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 18, padding: 4 }}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {NAV.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <button onClick={() => setNlOpen(!nlOpen)}
                  style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12, padding: collapsed ? '12px 20px' : '12px 20px',
                    color: 'rgba(255,255,255,0.7)', fontSize: 13, justifyContent: collapsed ? 'center' : 'flex-start' }}>
                  <span style={{ fontSize: 16 }}>{item.icon}</span>
                  {!collapsed && <><span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span><span>{nlOpen ? '▾' : '▸'}</span></>}
                </button>
                {nlOpen && !collapsed && item.children.map(child => (
                  <Link key={child.path} to={child.path}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px 10px 44px',
                      color: isActive(child.path) ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                      textDecoration: 'none', fontSize: 13, borderLeft: isActive(child.path) ? '3px solid var(--gold)' : '3px solid transparent',
                      background: isActive(child.path) ? 'rgba(201,168,76,0.08)' : 'transparent',
                      transition: 'all 0.15s ease' }}>
                    {child.label}
                  </Link>
                ))}
              </div>
            );
          }
          return (
            <Link key={item.path} to={item.path}
              style={{ display: 'flex', alignItems: 'center', gap: 12,
                padding: collapsed ? '12px 20px' : '12px 20px', justifyContent: collapsed ? 'center' : 'flex-start',
                color: isActive(item.path) ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none', fontSize: 13, borderLeft: isActive(item.path) ? '3px solid var(--gold)' : '3px solid transparent',
                background: isActive(item.path) ? 'rgba(201,168,76,0.08)' : 'transparent',
                transition: 'all 0.15s ease' }}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: role + logout */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {!collapsed && (
          <div style={{ marginBottom: 10, padding: '6px 10px', background: 'rgba(201,168,76,0.15)',
            borderRadius: 6, color: 'var(--gold)', fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 1 }}>
            {role || 'staff'}
          </div>
        )}
        <button onClick={logout}
          style={{ width: '100%', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
            color: '#f87171', padding: '8px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          {collapsed ? '↩' : '↩ Logout'}
        </button>
      </div>
    </div>
  );
}
