import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { employees } from '../../data/employees';
import { Avatar, Badge, Button, Input } from '../../components/ui/index';
import { formatDate, formatCurrency, getStatusBadge } from '../../utils/helpers';
import { toast } from 'react-toastify';

export default function AdminProfile() {
  const { user } = useAuth();
  const emp = employees.find(e=>e.id===user?.id) || employees.find(e=>e.role==='admin');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({phone:emp?.phone||'', address:emp?.address||''});

  return (
    <div>
      <div className="page-header"><div><h2>My Profile</h2></div></div>
      <div style={{position:'relative',marginBottom:60}}>
        <div style={{background:'linear-gradient(135deg,#2563EB,#7C3AED)',borderRadius:16,height:180}}/>
        <div style={{position:'absolute',bottom:-48,left:32,display:'flex',alignItems:'flex-end',gap:20}}>
          <div style={{border:'4px solid white',borderRadius:'50%',boxShadow:'var(--shadow-lg)'}}><Avatar name={emp?.name} size={88}/></div>
          <div style={{paddingBottom:6}}>
            <h2 style={{fontSize:22,marginBottom:2}}>{emp?.name}</h2>
            <p style={{fontSize:14,color:'var(--text-muted)'}}>{emp?.designation} · {emp?.department}</p>
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'280px 1fr',gap:20}}>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="card card-sm">
            <h4 style={{fontSize:14,marginBottom:14}}>Quick Info</h4>
            {[['✉️',emp?.email],['📞',form.phone],['🏢',emp?.department],['🪪',emp?.id],['📅',`Joined ${formatDate(emp?.joiningDate)}`]].map(([icon,val])=>(
              <div key={val} style={{display:'flex',gap:10,marginBottom:10,fontSize:13,color:'var(--text-muted)'}}><span>{icon}</span><span>{val}</span></div>
            ))}
            <Badge variant={getStatusBadge(emp?.status)} dot>{emp?.status}</Badge>
          </div>
          <div className="card card-sm" style={{background:'linear-gradient(135deg,#059669,#10B981)',color:'white'}}>
            <p style={{fontSize:12,opacity:0.8,marginBottom:4}}>Monthly Salary</p>
            <div style={{fontSize:22,fontWeight:800,fontFamily:'Poppins'}}>{formatCurrency(emp?.salary)}</div>
          </div>
        </div>
        <div className="card">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <h3 style={{fontSize:16}}>Personal Information</h3>
            <Button variant={editing?'ghost':'outline'} size="sm" onClick={()=>editing?(toast.success('Profile updated!'),setEditing(false)):setEditing(true)}>
              {editing?'✓ Save':'✏️ Edit'}
            </Button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            {[['Employee ID',emp?.id],['Full Name',emp?.name],['Email',emp?.email],['Gender',emp?.gender],['Date of Birth',formatDate(emp?.dob)],['Department',emp?.department],['Designation',emp?.designation],['Joining Date',formatDate(emp?.joiningDate)]].map(([l,v])=>(
              <div key={l} style={{padding:'10px 14px',background:'#F8FAFC',borderRadius:8,border:'1px solid var(--border)'}}>
                <div style={{fontSize:10,color:'var(--text-muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>{l}</div>
                <div style={{fontSize:14,fontWeight:500}}>{v||'-'}</div>
              </div>
            ))}
            <div style={{padding:'10px 14px',background:'#F8FAFC',borderRadius:8,border:'1px solid var(--border)'}}>
              <div style={{fontSize:10,color:'var(--text-muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Phone</div>
              {editing ? <input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} className="form-input" style={{padding:'4px 8px',fontSize:13}}/> : <div style={{fontSize:14,fontWeight:500}}>{form.phone}</div>}
            </div>
            <div style={{padding:'10px 14px',background:'#F8FAFC',borderRadius:8,border:'1px solid var(--border)',gridColumn:'1/-1'}}>
              <div style={{fontSize:10,color:'var(--text-muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>Address</div>
              {editing ? <input value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} className="form-input" style={{padding:'4px 8px',fontSize:13}}/> : <div style={{fontSize:14,fontWeight:500}}>{form.address}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
