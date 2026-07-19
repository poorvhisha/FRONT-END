import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Input } from '../../components/ui/index';

export default function Settings() {
  const [form, setForm] = useState({companyName:'EMS Pro Ltd',email:'hr@emspro.com',phone:'9000000000',address:'Chennai, Tamil Nadu',website:'www.emspro.com'});
  const [notif, setNotif] = useState({leaveApproval:true,payrollRelease:true,newEmployee:false,announcements:true});

  return (
    <div>
      <div className="page-header"><div><h2>Settings</h2><p>System configuration</p></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:20}}>
        <div className="card">
          <h3 style={{fontSize:16,marginBottom:20}}>Company Information</h3>
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {Object.entries(form).map(([k,v])=>(
              <Input key={k} label={k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())} value={v} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/>
            ))}
            <Button onClick={()=>toast.success('Settings saved!')} style={{alignSelf:'flex-start'}}>Save Changes</Button>
          </div>
        </div>
        <div className="card">
          <h3 style={{fontSize:16,marginBottom:20}}>Notifications</h3>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {Object.entries(notif).map(([k,v])=>(
              <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid var(--border)'}}>
                <div>
                  <div style={{fontWeight:500,fontSize:13}}>{k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase())}</div>
                  <div style={{fontSize:12,color:'var(--text-muted)'}}>Email & push alerts</div>
                </div>
                <div onClick={()=>setNotif(p=>({...p,[k]:!v}))} style={{width:44,height:24,borderRadius:12,background:v?'var(--primary)':'#D1D5DB',cursor:'pointer',position:'relative',transition:'background 0.2s'}}>
                  <div style={{width:18,height:18,borderRadius:'50%',background:'white',position:'absolute',top:3,left:v?23:3,transition:'left 0.2s',boxShadow:'0 1px 3px rgba(0,0,0,0.2)'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
