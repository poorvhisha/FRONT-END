import { motion } from 'framer-motion';
import { employees, departments } from '../../data/employees';
import { allAttendance, weeklyAttendance } from '../../data/attendance';
import { leaveRequests } from '../../data/leaves';
import { payrollData, payrollTrend } from '../../data/payroll';
import { StatCard, Avatar, Badge } from '../../components/ui/index';
import { formatCurrency, formatDate, getStatusBadge } from '../../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend } from 'recharts';

const COLORS = ['#2563EB','#22C55E','#F59E0B','#EF4444','#7C3AED','#0891B2'];
const deptDist = departments.map(d=>({name:d.name,value:d.employees}));
const empGrowth = [{m:'Jan',count:8},{m:'Feb',count:9},{m:'Mar',count:9},{m:'Apr',count:10},{m:'May',count:10},{m:'Jun',count:10}];

export default function AdminDashboard() {
  const activeEmp = employees.filter(e=>e.status==='Active'&&e.role==='employee').length;
  const presentToday = allAttendance.filter(a=>a.status==='Present').length;
  const pendingLeaves = leaveRequests.filter(l=>l.status==='Pending').length;
  const totalPayroll = payrollData.reduce((s,p)=>s+p.netSalary,0);

  const stats = [
    {title:'Total Employees',value:activeEmp,icon:'👥',color:'#2563EB',subtitle:`${employees.length} total`,trend:{positive:true,value:'+2 this month'}},
    {title:'Present Today',value:presentToday,icon:'✅',color:'#22C55E',subtitle:`${Math.round((presentToday/activeEmp)*100)}% attendance`,trend:{positive:true,value:'93%'}},
    {title:'Monthly Payroll',value:formatCurrency(totalPayroll),icon:'💰',color:'#F59E0B',subtitle:'June 2026'},
    {title:'Pending Leaves',value:pendingLeaves,icon:'🌴',color:'#EF4444',subtitle:'Awaiting approval'},
  ];

  return (
    <div>
      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s,i)=>(
          <motion.div key={s.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}>
            <StatCard {...s}/>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:20,marginBottom:20}}>
        <div className="chart-container">
          <h3 style={{fontSize:16,marginBottom:4}}>Attendance Overview</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>This week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyAttendance} barSize={18}>
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
        <div className="chart-container">
          <h3 style={{fontSize:16,marginBottom:4}}>Department Distribution</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>Employees by dept</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={deptDist} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,value})=>`${name}: ${value}`} labelLine={false}>
                {deptDist.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
        <div className="chart-container">
          <h3 style={{fontSize:16,marginBottom:4}}>Employee Growth</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>Headcount trend</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={empGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
              <Line type="monotone" dataKey="count" stroke="#2563EB" strokeWidth={2.5} dot={{fill:'#2563EB',r:4}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 style={{fontSize:16,marginBottom:4}}>Payroll Trend</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>Monthly payroll (₹)</p>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={payrollTrend}>
              <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.15}/><stop offset="95%" stopColor="#22C55E" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="month" tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}K`}/>
              <Tooltip formatter={v=>[formatCurrency(v),'Payroll']} contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
              <Area type="monotone" dataKey="total" stroke="#22C55E" strokeWidth={2.5} fill="url(#pg)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:20}}>
        <div className="data-table-wrapper">
          <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15}}>Recent Employees</h3>
            <a href="/admin/employees" style={{fontSize:13,color:'var(--primary)',textDecoration:'none',fontWeight:500}}>View all →</a>
          </div>
          <table>
            <thead><tr><th>Employee</th><th>Department</th><th>Status</th></tr></thead>
            <tbody>
              {employees.filter(e=>e.role==='employee').slice(0,5).map(e=>(
                <tr key={e.id}>
                  <td><div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={e.name} size={32}/><div><div style={{fontWeight:500,fontSize:13}}>{e.name}</div><div style={{fontSize:11,color:'var(--text-muted)'}}>{e.id}</div></div></div></td>
                  <td style={{color:'var(--text-muted)',fontSize:13}}>{e.department}</td>
                  <td><Badge variant={getStatusBadge(e.status)} dot>{e.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="data-table-wrapper">
          <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15}}>Pending Leaves</h3>
            <a href="/admin/leave" style={{fontSize:13,color:'var(--primary)',textDecoration:'none',fontWeight:500}}>View all →</a>
          </div>
          <table>
            <thead><tr><th>Employee</th><th>Type</th><th>Days</th></tr></thead>
            <tbody>
              {leaveRequests.filter(l=>l.status==='Pending').map(l=>(
                <tr key={l.id}>
                  <td style={{fontWeight:500,fontSize:13}}>{l.employee}</td>
                  <td style={{color:'var(--text-muted)',fontSize:12}}>{l.leaveType.replace(' Leave','')}</td>
                  <td><Badge variant="warning">{l.days}d</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
