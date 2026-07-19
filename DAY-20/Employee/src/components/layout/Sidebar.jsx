import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const adminNav = [
  { section:'Main' },
  { path:'/admin/dashboard', icon:'🏠', label:'Dashboard' },
  { path:'/admin/employees', icon:'👥', label:'Employees' },
  { path:'/admin/departments', icon:'🏢', label:'Departments' },
  { section:'Operations' },
  { path:'/admin/attendance', icon:'📅', label:'Attendance' },
  { path:'/admin/leave', icon:'🌴', label:'Leave' },
  { path:'/admin/payroll', icon:'💰', label:'Payroll' },
  { section:'Work' },
  { path:'/admin/projects', icon:'📂', label:'Projects' },
  { path:'/admin/tasks', icon:'✅', label:'Tasks' },
  { path:'/admin/recruitment', icon:'💼', label:'Recruitment' },
  { section:'Management' },
  { path:'/admin/assets', icon:'💻', label:'Assets' },
  { path:'/admin/announcements', icon:'📢', label:'Announcements' },
  { path:'/admin/reports', icon:'📊', label:'Reports' },
  { path:'/admin/settings', icon:'⚙', label:'Settings' },
  { path:'/admin/profile', icon:'👤', label:'Profile' },
];

const employeeNav = [
  { section:'My Portal' },
  { path:'/employee/dashboard', icon:'🏠', label:'Dashboard' },
  { path:'/employee/attendance', icon:'📅', label:'My Attendance' },
  { path:'/employee/leave', icon:'🌴', label:'My Leave' },
  { path:'/employee/payroll', icon:'💰', label:'My Payroll' },
  { path:'/employee/profile', icon:'👤', label:'My Profile' },
];

export function Sidebar({ collapsed, role='admin' }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const navItems = role === 'admin' ? adminNav : employeeNav;

  return (
    <aside className={`sidebar${collapsed?' collapsed':''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">E</div>
        <div className="sidebar-logo-text">
          <h1>EMS Pro</h1>
          <span>{role === 'admin' ? 'Admin Panel' : 'Employee Portal'}</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          if (item.section) return <div key={i} className="sidebar-section-title">{item.section}</div>;
          return (
            <NavLink key={item.path} to={item.path} className={({isActive})=>`nav-item${isActive?' active':''}`} title={collapsed?item.label:''}>
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <button onClick={()=>{logout();navigate('/login');}} className="nav-item" style={{color:'#F87171',width:'100%',cursor:'pointer'}} title={collapsed?'Logout':''}>
          <span className="nav-item-icon">🚪</span>
          <span className="nav-item-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
