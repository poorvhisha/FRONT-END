import { useState } from 'react';
import { toast } from 'react-toastify';
import { payrollData, payrollTrend } from '../../data/payroll';
import { Badge, SearchBar, Button, EmptyState, Pagination } from '../../components/ui/index';
import { formatCurrency, paginate } from '../../utils/helpers';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Payroll() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER = 8;
  const filtered = payrollData.filter(p => !search || p.employee.toLowerCase().includes(search.toLowerCase()));
  const paged = paginate(filtered, page, PER);
  const totalNet = payrollData.reduce((s,p)=>s+p.netSalary,0);
  const totalBasic = payrollData.reduce((s,p)=>s+p.basicSalary,0);
  const totalBonus = payrollData.reduce((s,p)=>s+p.bonus,0);
  const totalDed = payrollData.reduce((s,p)=>s+p.deductions,0);

  return (
    <div>
      <div className="page-header"><div><h2>Payroll</h2><p>Monthly salary — June 2026</p></div><Button icon="⬇" onClick={()=>toast.success('Payroll report exported!')}>Export Report</Button></div>
      <div className="stats-grid" style={{marginBottom:24}}>
        {[[formatCurrency(totalNet),'Net Payroll','💰','#22C55E'],[formatCurrency(totalBasic),'Basic Total','📊','#2563EB'],[formatCurrency(totalBonus),'Total Bonus','🎁','#F59E0B'],[formatCurrency(totalDed),'Deductions','📉','#EF4444']].map(([val,label,icon,color])=>(
          <div key={label} className="stat-card">
            <div style={{width:48,height:48,borderRadius:12,background:`${color}15`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,marginBottom:14}}>{icon}</div>
            <div style={{fontSize:22,fontWeight:700,fontFamily:'Poppins',color,marginBottom:4}}>{val}</div>
            <div style={{fontSize:13,color:'var(--text-muted)'}}>{label}</div>
          </div>
        ))}
      </div>
      <div className="chart-container" style={{marginBottom:24}}>
        <h3 style={{fontSize:16,marginBottom:4}}>Payroll Trend (6 Months)</h3>
        <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>Total net salary paid monthly</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={payrollTrend}>
            <defs><linearGradient id="pg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.15}/><stop offset="95%" stopColor="#22C55E" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="month" tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}K`}/>
            <Tooltip formatter={v=>[formatCurrency(v),'Total Payroll']} contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
            <Area type="monotone" dataKey="total" stroke="#22C55E" strokeWidth={2.5} fill="url(#pg2)"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="data-table-wrapper">
        <div style={{display:'flex',gap:12,padding:'16px 20px',borderBottom:'1px solid var(--border)'}}>
          <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search employee..." style={{flex:1}}/>
        </div>
        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Employee</th><th>Department</th><th>Basic</th><th>HRA</th><th>Bonus</th><th>Deductions</th><th>Net Salary</th><th>Payslip</th></tr></thead>
            <tbody>
              {paged.length===0 ? <tr><td colSpan={8}><EmptyState/></td></tr> : paged.map(p=>(
                <tr key={p.id}>
                  <td><div style={{fontWeight:600,fontSize:13}}>{p.employee}</div><div style={{fontSize:11,color:'var(--text-muted)'}}>{p.designation}</div></td>
                  <td style={{color:'var(--text-muted)'}}>{p.department}</td>
                  <td>{formatCurrency(p.basicSalary)}</td>
                  <td style={{color:'var(--text-muted)'}}>{formatCurrency(p.hra)}</td>
                  <td style={{color:'#22C55E',fontWeight:600}}>+{formatCurrency(p.bonus)}</td>
                  <td style={{color:'#EF4444'}}>-{formatCurrency(p.deductions)}</td>
                  <td style={{fontWeight:700,color:'#22C55E',fontSize:15}}>{formatCurrency(p.netSalary)}</td>
                  <td><Button variant="outline" size="sm" icon="⬇" onClick={()=>toast.success(`${p.employee} payslip downloaded!`)}>Payslip</Button></td>
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
