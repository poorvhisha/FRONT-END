import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/ui/index';

export default function LoginPage() {
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await login(data.email, data.password, role);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back! 👋`);
      navigate(role === 'admin' ? '/admin/dashboard' : '/employee/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  const fillAdmin = () => { setValue('email', 'admin@ems.com'); setValue('password', 'admin123'); setRole('admin'); };
  const fillEmp   = () => { setValue('email', 'mohan@ems.com'); setValue('password', 'emp123'); setRole('employee'); };

  return (
    <div className="auth-page">
      <div className="auth-bg-orb" style={{width:450,height:450,background:'rgba(37,99,235,0.15)',top:-120,left:-120}}/>
      <div className="auth-bg-orb" style={{width:300,height:300,background:'rgba(124,58,237,0.12)',bottom:-80,right:-80}}/>
      <div className="auth-bg-orb" style={{width:200,height:200,background:'rgba(5,150,105,0.1)',top:'40%',right:'25%'}}/>
      <div style={{position:'absolute',inset:0,opacity:0.03,backgroundImage:'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',backgroundSize:'50px 50px'}}/>

      <motion.div className="auth-card" initial={{opacity:0,y:40,scale:0.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:0.5,ease:'easeOut'}}>
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{width:64,height:64,background:'linear-gradient(135deg,#2563EB,#7C3AED)',borderRadius:18,display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',fontSize:28,fontWeight:800,color:'white',fontFamily:'Poppins'}}>E</div>
          <h1 style={{fontSize:26,fontWeight:800,marginBottom:4,background:'linear-gradient(135deg,#2563EB,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>EMS Pro</h1>
          <p style={{color:'var(--text-muted)',fontSize:13}}>Employee Management System</p>
        </div>

        {/* Role Toggle */}
        <div className="role-toggle">
          <button type="button" className={`role-btn${role==='admin'?' active':''}`} onClick={()=>setRole('admin')}>🛡 Admin</button>
          <button type="button" className={`role-btn${role==='employee'?' active':''}`} onClick={()=>setRole('employee')}>👤 Employee</button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column',gap:16}}>
          <Input label="Email Address" type="email" placeholder={role==='admin'?'admin@ems.com':'employee@ems.com'} icon="✉️"
            error={errors.email?.message} {...register('email',{required:'Email required',pattern:{value:/\S+@\S+\.\S+/,message:'Invalid email'}})}/>
          <Input label="Password" type="password" placeholder="Enter your password" icon="🔒"
            error={errors.password?.message} {...register('password',{required:'Password required'})}/>
          <Button type="submit" loading={loading} size="lg" style={{width:'100%',marginTop:4}}>
            {loading?'Signing in...`':`Sign In as ${role==='admin'?'Admin':'Employee'}`}
          </Button>
        </form>

        {/* Demo creds */}
        <div style={{marginTop:20,padding:14,background:'#F8FAFC',borderRadius:12,border:'1px solid var(--border)'}}>
          <p style={{fontSize:11,color:'var(--text-muted)',marginBottom:8,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em'}}>Demo Credentials</p>
          <div style={{display:'flex',gap:8}}>
            <button type="button" onClick={fillAdmin} style={{flex:1,padding:'8px 12px',borderRadius:8,border:'1.5px solid #BFDBFE',background:'#EFF6FF',color:'var(--primary)',fontSize:12,fontWeight:600,cursor:'pointer'}}>
              🛡 Admin Login
            </button>
            <button type="button" onClick={fillEmp} style={{flex:1,padding:'8px 12px',borderRadius:8,border:'1.5px solid #D1FAE5',background:'#F0FDF4',color:'#16A34A',fontSize:12,fontWeight:600,cursor:'pointer'}}>
              👤 Employee Login
            </button>
          </div>
        </div>
        <p style={{textAlign:'center',marginTop:18,fontSize:12,color:'var(--text-muted)'}}>© 2026 EMS Pro. All rights reserved.</p>
      </motion.div>
    </div>
  );
}
