import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('ems_user');
    if (stored) try { setUser(JSON.parse(stored)); } catch {}
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    await new Promise(r => setTimeout(r, 700));
    const { employees } = await import('../data/employees');
    const found = employees.find(e => e.email === email && e.password === password && e.role === role);
    if (found) {
      const u = { id: found.id, name: found.name, email: found.email, role: found.role, department: found.department, designation: found.designation };
      setUser(u); localStorage.setItem('ems_user', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => { setUser(null); localStorage.removeItem('ems_user'); };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};
