import { useState } from 'react';
import { toast } from 'react-toastify';
import { leaveRequests as initial } from '../../data/leaves';
import { Badge, Button, SearchBar, EmptyState, Pagination } from '../../components/ui/index';
import { formatDate, getStatusBadge, paginate } from '../../utils/helpers';

export default function Leave() {
  const [leaves, setLeaves] = useState(initial);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const PER = 8;

  const filtered = leaves.filter(l =>
    (!search || l.employee.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || l.status === filter)
  );
  const paged = paginate(filtered, page, PER);

  const approve = (id) => { setLeaves(p => p.map(l => l.id===id ? {...l,status:'Approved'} : l)); toast.success('Leave approved!'); };
  const reject  = (id) => { setLeaves(p => p.map(l => l.id===id ? {...l,status:'Rejected'} : l)); toast.error('Leave rejected!'); };

  const counts = { Pending: leaves.filter(l=>l.status==='Pending').length, Approved: leaves.filter(l=>l.status==='Approved').length, Rejected: leaves.filter(l=>l.status==='Rejected').length };

  return (
    <div>
      <div className="page-header">
        <div><h2>Leave Management</h2><p>Review and manage employee leave requests</p></div>
      </div>
      <div className="stats-grid" style={{marginBottom:24}}>
        {[['⏳','Pending',counts.Pending,'#F59E0B'],['✅','Approved',counts.Approved,'#22C55E'],['❌','Rejected',counts.Rejected,'#EF4444'],['📊','Total',leaves.length,'#2563EB']].map(([icon,label,val,color])=>(
          <div key={label} className="stat-card" style={{display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:48,height:48,borderRadius:12,background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{icon}</div>
            <div><div style={{fontSize:24,fontWeight:700,fontFamily:'Poppins',color}}>{val}</div><div style={{fontSize:13,color:'var(--text-muted)'}}>{label}</div></div>
          </div>
        ))}
      </div>
      <div className="data-table-wrapper">
        <div style={{display:'flex',gap:12,padding:'16px 20px',borderBottom:'1px solid var(--border)',flexWrap:'wrap'}}>
          <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search employee..." style={{flex:1}}/>
          <select className="form-input" style={{width:140}} value={filter} onChange={e=>{setFilter(e.target.value);setPage(1);}}>
            <option value="">All Status</option>
            <option>Pending</option><option>Approved</option><option>Rejected</option>
          </select>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {paged.length===0 ? <tr><td colSpan={8}><EmptyState icon="🌴" title="No leave requests"/></td></tr> : paged.map(l=>(
                <tr key={l.id}>
                  <td style={{fontWeight:600,fontSize:13}}>{l.employee}</td>
                  <td><Badge variant="primary">{l.leaveType}</Badge></td>
                  <td>{formatDate(l.from)}</td>
                  <td>{formatDate(l.to)}</td>
                  <td style={{fontWeight:700}}>{l.days}</td>
                  <td style={{color:'var(--text-muted)',fontSize:12,maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{l.reason}</td>
                  <td><Badge variant={getStatusBadge(l.status)} dot>{l.status}</Badge></td>
                  <td>
                    {l.status==='Pending' && (
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn btn-success btn-sm" onClick={()=>approve(l.id)}>✓ Approve</button>
                        <button className="btn btn-danger btn-sm" onClick={()=>reject(l.id)}>✗ Reject</button>
                      </div>
                    )}
                    {l.status!=='Pending' && <Badge variant={getStatusBadge(l.status)}>{l.status}</Badge>}
                  </td>
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
