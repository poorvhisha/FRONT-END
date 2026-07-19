import { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { generateAttendance } from '../../data/attendance';
import { employees } from '../../data/employees';
import { Badge, SearchBar, Pagination, EmptyState } from '../../components/ui/index';
import { formatDate, getStatusBadge, paginate } from '../../utils/helpers';

export default function MyAttendance() {
  const { user } = useAuth();
  const emp = employees.find(e=>e.id===user?.id) || employees[0];
  const records = useMemo(()=>generateAttendance(emp.id).sort((a,b)=>new Date(b.date)-new Date(a.date)),[emp.id]);
  const [search, setSearch] = useState(''); const [filter, setFilter] = useState(''); const [page, setPage] = useState(1);
  const PER = 10;
  const filtered = records.filter(r=>(!search||r.date.includes(search))&&(!filter||r.status===filter));
  const paged = paginate(filtered,page,PER);
  const counts = {Present:records.filter(r=>r.status==='Present').length,Late:records.filter(r=>r.status==='Late').length,Absent:records.filter(r=>r.status==='Absent').length};
  const pct = Math.round(((counts.Present+counts.Late)/records.length)*100);

  return (
    <div>
      <div className="page-header"><div><h2>My Attendance</h2><p>Last 30 working days</p></div></div>
      <div className="stats-grid" style={{marginBottom:24}}>
        {[['📅',records.length,'Total Days','#2563EB'],['🟢',counts.Present,'Present','#22C55E'],['🟡',counts.Late,'Late','#F59E0B'],['🔴',counts.Absent,'Absent','#EF4444']].map(([icon,val,label,color])=>(
          <div key={label} className="card card-sm" style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:48,height:48,borderRadius:12,background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{icon}</div>
            <div><div style={{fontSize:24,fontWeight:700,fontFamily:'Poppins',color}}>{val}</div><div style={{fontSize:12,color:'var(--text-muted)'}}>{label}</div></div>
          </div>
        ))}
      </div>
      <div className="card" style={{marginBottom:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
          <div><h3 style={{fontSize:16}}>Attendance Rate</h3><p style={{fontSize:13,color:'var(--text-muted)'}}>This month</p></div>
          <span style={{fontSize:28,fontWeight:800,fontFamily:'Poppins',color:pct>=90?'#22C55E':pct>=75?'#F59E0B':'#EF4444'}}>{pct}%</span>
        </div>
        <div style={{height:12,background:'#F1F5F9',borderRadius:6,overflow:'hidden'}}>
          <div style={{height:'100%',width:`${pct}%`,background:pct>=90?'#22C55E':pct>=75?'#F59E0B':'#EF4444',borderRadius:6}}/>
        </div>
      </div>
      <div className="data-table-wrapper">
        <div style={{display:'flex',gap:12,padding:'16px 20px',borderBottom:'1px solid var(--border)',flexWrap:'wrap'}}>
          <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search by date..." style={{flex:1}}/>
          <select className="form-input" style={{width:140}} value={filter} onChange={e=>{setFilter(e.target.value);setPage(1);}}>
            <option value="">All Status</option>
            {['Present','Late','Absent','Half Day'].map(s=><option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Date</th><th>Day</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
            <tbody>
              {paged.length===0 ? <tr><td colSpan={6}><EmptyState/></td></tr> : paged.map(a=>(
                <tr key={a.id}>
                  <td style={{fontWeight:500}}>{formatDate(a.date)}</td>
                  <td style={{color:'var(--text-muted)'}}>{new Date(a.date).toLocaleDateString('en-IN',{weekday:'short'})}</td>
                  <td style={{fontWeight:500,color:a.checkIn==='-'?'var(--text-muted)':a.checkIn<'09:15'?'#22C55E':'#F59E0B'}}>{a.checkIn}</td>
                  <td style={{color:'var(--text-muted)'}}>{a.checkOut}</td>
                  <td style={{fontWeight:500}}>{a.workingHours}</td>
                  <td><Badge variant={getStatusBadge(a.status)} dot>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage}/>
      </div>
    </div>
  );
}
