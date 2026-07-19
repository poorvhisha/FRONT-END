import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import LoginPage from '../pages/auth/LoginPage';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard';
import Employees from '../pages/admin/Employees';
import Departments from '../pages/admin/Departments';
import Attendance from '../pages/admin/Attendance';
import Leave from '../pages/admin/Leave';
import Payroll from '../pages/admin/Payroll';
import Projects from '../pages/admin/Projects';
import Tasks from '../pages/admin/Tasks';
import Recruitment from '../pages/admin/Recruitment';
import Assets from '../pages/admin/Assets';
import Announcements from '../pages/admin/Announcements';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';
import AdminProfile from '../pages/admin/Profile';

// Employee pages
import EmployeeDashboard from '../pages/employee/Dashboard';
import MyAttendance from '../pages/employee/MyAttendance';
import MyLeave from '../pages/employee/MyLeave';
import MyPayroll from '../pages/employee/MyPayroll';
import MyProfile from '../pages/employee/MyProfile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="departments" element={<Departments />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<Leave />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="recruitment" element={<Recruitment />} />
            <Route path="assets" element={<Assets />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* Employee routes */}
          <Route path="/employee" element={
            <ProtectedRoute role="employee"><DashboardLayout /></ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="attendance" element={<MyAttendance />} />
            <Route path="leave" element={<MyLeave />} />
            <Route path="payroll" element={<MyPayroll />} />
            <Route path="profile" element={<MyProfile />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
