import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { leaveTypes, leaveBalance } from '../../data/leaves';
import { Badge, Button, Modal, EmptyState } from '../../components/ui/index';
import { formatDate, getStatusBadge } from '../../utils/helpers';

const initial = [
  {id:'LV001',leaveType:'Casual Leave',from:'2026-07-10',to:'2026-07-12',days:3,reason:'Family function',status:'Pending',appliedOn:'2026-07-08'},
  {id:'LV002',leaveType:'Sick Leave',from:'2026-07-05',to:'2026-07-06',days:2,reason:'Fever',status:'Approved',appliedOn:'2026-07-04'},
  {id:'LV003',leaveType:'Earned Leave',from:'2026-06-20',to:'2026-06-22',days:3,reason:'Vacation',status:'Approved',appliedOn:'2026-06-15'},
];

export default function MyLeave() {
  const [leaves, setLeaves] = useState(initial);
  const [modal, setModal] = useState(false);
  const {register,handleSubmit,reset,formState:{errors}} = useForm();

  const onSubmit = (data) => {
    const days = Math.ceil((new Date(data.to)-new Date(data.from))/(86400000))+1;
    setLeaves(p=>[{id:`LV${Date.now()}`,leaveType:data.leaveType,from:data.from,to:data.to,days,reason:data.reason,status:'Pending',appliedOn:new Date().toISOString().split('T')[0]},...p]);
    toast.success('Leave request submitted!'); setModal(false); reset();
  };

  const bal = [{type:'Casual',days:leaveBalance.casual,max:12,color:'#2563EB'},{type:'Sick',days:leaveBalance.sick,max:10,color:'#22C55E'},{type:'Earned',days:leaveBalance.earned,max:20,color:'#F59E0B'},{type:'Comp-off',days:leaveBalance.compensatory,max:5,color:'#7C3AED'}];

  return (
    <div>
      <div className="page-header"><div><h2>My Leave</h2></div><Button icon="+" onClick={()=>setModal(true)}>Apply for Leave</Button></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:24}}>
        {bal.map((b,i)=>(
          <motion.div key={b.type} className="card card-sm" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}>
            <div style={{fontSize:12,color:'var(--text-muted)',marginBottom:6,fontWeight:500}}>{b.type} Leave</div>
            <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:10}}>
              <span style={{fontSize:30,fontWeight:800,fontFamily:'Poppins',color:b.color}}>{b.days}</span>
              <span style={{fontSize:13,color:'var(--text-muted)'}}>/ {b.max}</span>
            </div>
            <div className="progress-bar"><motion.div className="progress-fill" initial={{width:0}} animate={{width:`${(b.days/b.max)*100}%`}} transition={{duration:0.8,delay:i*0.1}} style={{background:b.color}}/></div>
            <div style={{fontSize:11,color:'var(--text-muted)',marginTop:6}}>{b.max-b.days} used</div>
          </motion.div>
        ))}
      </div>
      <div className="data-table-wrapper">
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)'}}><h3 style={{fontSize:15}}>Leave History</h3></div>
        <table>
          <thead><tr><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Applied</th><th>Status</th></tr></thead>
          <tbody>
            {leaves.length===0 ? <tr><td colSpan={7}><EmptyState icon="🌴" title="No leave requests"/></td></tr> : leaves.map(l=>(
              <tr key={l.id}>
                <td><Badge variant="primary">{l.leaveType}</Badge></td>
                <td>{formatDate(l.from)}</td><td>{formatDate(l.to)}</td>
                <td style={{fontWeight:700}}>{l.days}</td>
                <td style={{color:'var(--text-muted)',fontSize:12,maxWidth:180,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.reason}</td>
                <td style={{color:'var(--text-muted)',fontSize:13}}>{formatDate(l.appliedOn)}</td>
                <td><Badge variant={getStatusBadge(l.status)} dot>{l.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal open={modal} onClose={()=>{setModal(false);reset();}} title="Apply for Leave" size="sm">
        <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="form-group">
            <label className="form-label">Leave Type *</label>
            <select className={`form-input${errors.leaveType?' error':''}`} {...register('leaveType',{required:true})}><option value="">Select</option>{leaveTypes.map(t=><option key={t}>{t}</option>)}</select>
            {errors.leaveType&&<span className="form-error">Required</span>}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div className="form-group"><label className="form-label">From *</label><input type="date" className={`form-input${errors.from?' error':''}`} {...register('from',{required:true})}/></div>
            <div className="form-group"><label className="form-label">To *</label><input type="date" className={`form-input${errors.to?' error':''}`} {...register('to',{required:true})}/></div>
          </div>
          <div className="form-group"><label className="form-label">Reason *</label><textarea className={`form-input${errors.reason?' error':''}`} rows={3} placeholder="Reason for leave..." {...register('reason',{required:true})}/></div>
          <div style={{display:'flex',gap:12,justifyContent:'flex-end',paddingTop:8,borderTop:'1px solid var(--border)'}}>
            <Button type="button" variant="ghost" onClick={()=>{setModal(false);reset();}}>Cancel</Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
