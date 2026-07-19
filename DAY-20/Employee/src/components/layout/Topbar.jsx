import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/index';

export function Topbar({ collapsed, onToggle, pageTitle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profilePath = user?.role==='admin' ? '/admin/profile' : '/employee/profile';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button onClick={onToggle} style={{background:'none',border:'1.5px solid var(--border)',borderRadius:10,width:40,height:40,cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center'}}>
          {collapsed ? '→' : '☰'}
        </button>
        <div>
          <h2 style={{fontSize:17,fontWeight:700}}>{pageTitle}</h2>
          <p style={{fontSize:12,color:'var(--text-muted)',margin:0}}>{new Date().toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
        </div>
      </div>
      <div className="topbar-right">
        <div style={{position:'relative'}}>
          <button onClick={()=>setProfileOpen(!profileOpen)} style={{display:'flex',alignItems:'center',gap:10,background:'none',border:'1.5px solid var(--border)',borderRadius:12,padding:'6px 14px',cursor:'pointer'}}>
            <Avatar name={user?.name} size={30}/>
            <div style={{textAlign:'left'}}>
              <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{user?.name}</div>
              <div style={{fontSize:11,color:'var(--text-muted)',textTransform:'capitalize'}}>{user?.role}</div>
            </div>
            <span style={{fontSize:11,color:'var(--text-muted)'}}>▼</span>
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div initial={{opacity:0,y:-8,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8,scale:0.95}} transition={{duration:0.15}}
                style={{position:'absolute',right:0,top:'calc(100% + 8px)',background:'white',border:'1px solid var(--border)',borderRadius:12,boxShadow:'var(--shadow-xl)',width:190,zIndex:200,overflow:'hidden'}}>
                <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
                  <div style={{fontSize:14,fontWeight:600}}>{user?.name}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)',textTransform:'capitalize'}}>{user?.role}</div>
                </div>
                <button onClick={()=>{navigate(profilePath);setProfileOpen(false);}} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontSize:14,color:'var(--text)'}}
                  onMouseEnter={e=>e.currentTarget.style.background='#F8FAFC'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                  <span>👤</span> My Profile
                </button>
                <div style={{borderTop:'1px solid var(--border)'}}>
                  <button onClick={()=>{logout();navigate('/login');}} style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'12px 16px',background:'none',border:'none',cursor:'pointer',fontSize:14,color:'var(--danger)'}}
                    onMouseEnter={e=>e.currentTarget.style.background='#FEF2F2'} onMouseLeave={e=>e.currentTarget.style.background='none'}>
                    <span>🚪</span> Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
