import { useState } from 'react';
import { toast } from 'react-toastify';
import { allAttendance as initial } from '../../data/attendance';
import { weeklyAttendance } from '../../data/attendance';
import { Badge, SearchBar, EmptyState, Pagination } from '../../components/ui/index';
import { getStatusBadge, paginate } from '../../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Attendance() {
  const [records] = useState(initial);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const PER = 8;

  const filtered = records.filter(r =>
    (!search || r.employee.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || r.status === filter)
  );
  const paged = paginate(filtered, page, PER);

  const counts = { Present:records.filter(r=>r.status==='Present').length, Late:records.filter(r=>r.status==='Late').length, Absent:records.filter(r=>r.status==='Absent').length, 'Half Day':records.filter(r=>r.status==='Half Day').length };

  return (
    <div>
      <div className="page-header"><div><h2>Attendance</h2><p>Daily attendance records — {new Date().toLocaleDateString('en-IN',{dateStyle:'long'})}</p></div></div>
      <div className="stats-grid" style={{marginBottom:24}}>
        {[['✅','Present',counts.Present,'#22C55E'],['⏰','Late',counts.Late,'#F59E0B'],['❌','Absent',counts.Absent,'#EF4444'],['🕐','Half Day',counts['Half Day'],'#7C3AED']].map(([icon,label,val,color])=>(
          <div key={label} className="stat-card" style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:48,height:48,borderRadius:12,background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{icon}</div>
            <div><div style={{fontSize:24,fontWeight:700,fontFamily:'Poppins',color}}>{val}</div><div style={{fontSize:13,color:'var(--text-muted)'}}>{label}</div></div>
          </div>
        ))}
      </div>
      <div className="chart-container" style={{marginBottom:24}}>
        <h3 style={{fontSize:16,marginBottom:4}}>Weekly Overview</h3>
        <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>Attendance trend this week</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={weeklyAttendance} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="day" tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
            <Legend/>
            <Bar dataKey="present" name="Present" fill="#2563EB" radius={[5,5,0,0]}/>
            <Bar dataKey="late" name="Late" fill="#F59E0B" radius={[5,5,0,0]}/>
            <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[5,5,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="data-table-wrapper">
        <div style={{display:'flex',gap:12,padding:'16px 20px',borderBottom:'1px solid var(--border)',flexWrap:'wrap'}}>
          <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search employee..." style={{flex:1}}/>
          <select className="form-input" style={{width:140}} value={filter} onChange={e=>{setFilter(e.target.value);setPage(1);}}>
            <option value="">All Status</option>
            <option>Present</option><option>Late</option><option>Absent</option><option>Half Day</option>
          </select>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Employee</th><th>Emp ID</th><th>Date</th><th>Check In</th><th>Check Out</th><th>Working Hours</th><th>Status</th></tr></thead>
            <tbody>
              {paged.length===0 ? <tr><td colSpan={7}><EmptyState/></td></tr> : paged.map(r=>(
                <tr key={r.id}>
                  <td style={{fontWeight:600,fontSize:13}}>{r.employee}</td>
                  <td><span className="badge badge-gray">{r.empId}</span></td>
                  <td style={{color:'var(--text-muted)'}}>{new Date(r.date).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})}</td>
                  <td style={{fontWeight:500,color:r.checkIn==='-'?'var(--text-muted)':r.checkIn<'09:15'?'#22C55E':'#F59E0B'}}>{r.checkIn}</td>
                  <td style={{color:'var(--text-muted)'}}>{r.checkOut}</td>
                  <td style={{fontWeight:500}}>{r.workingHours}</td>
                  <td><Badge variant={getStatusBadge(r.status)} dot>{r.status}</Badge></td>
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
