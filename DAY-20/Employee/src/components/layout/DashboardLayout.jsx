import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const pageTitles = {
  '/admin/dashboard':'Dashboard', '/admin/employees':'Employees', '/admin/departments':'Departments',
  '/admin/attendance':'Attendance', '/admin/leave':'Leave Management', '/admin/payroll':'Payroll',
  '/admin/projects':'Projects', '/admin/tasks':'Tasks', '/admin/recruitment':'Recruitment',
  '/admin/assets':'Assets', '/admin/announcements':'Announcements', '/admin/reports':'Reports',
  '/admin/settings':'Settings', '/admin/profile':'My Profile',
  '/employee/dashboard':'My Dashboard', '/employee/attendance':'My Attendance',
  '/employee/leave':'My Leave', '/employee/payroll':'My Payroll', '/employee/profile':'My Profile',
};

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'EMS Pro';

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} role={user?.role}/>
      <div className={`main-content${collapsed?' collapsed':''}`}>
        <Topbar collapsed={collapsed} onToggle={()=>setCollapsed(!collapsed)} pageTitle={title}/>
        <main className="page-content">
          <div className="page-enter"><Outlet/></div>
        </main>
      </div>
    </div>
  );
}
