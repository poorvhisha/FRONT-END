import { useAuth } from '../../context/AuthContext';
import { employees } from '../../data/employees';
import { generateAttendance, weeklyAttendance } from '../../data/attendance';
import { leaveBalance } from '../../data/leaves';
import { payrollData } from '../../data/payroll';
import { StatCard, Badge, Avatar } from '../../components/ui/index';
import { formatDate, formatCurrency, getStatusBadge } from '../../utils/helpers';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const emp = employees.find(e=>e.id===user?.id) || employees[0];
  const myAtt = generateAttendance(emp.id);
  const present = myAtt.filter(a=>a.status==='Present'||a.status==='Late').length;
  const payroll = payrollData.find(p=>p.empId===emp.id) || payrollData[0];

  const stats = [
    {title:'Days Present',value:present,icon:'✅',color:'#22C55E',subtitle:'Last 30 days',trend:{positive:true,value:'94%'}},
    {title:'Leave Balance',value:`${leaveBalance.casual+leaveBalance.sick}`,icon:'🌴',color:'#F59E0B',subtitle:'Casual + Sick'},
    {title:'Net Salary',value:formatCurrency(payroll.netSalary),icon:'💰',color:'#059669',subtitle:'This month'},
    {title:'Pending Leaves',value:0,icon:'⏳',color:'#EF4444',subtitle:'Awaiting approval'},
  ];

  return (
    <div>
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
        style={{background:'linear-gradient(135deg,#2563EB,#7C3AED)',borderRadius:16,padding:'24px 28px',marginBottom:24,color:'white',position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{position:'absolute',right:-30,top:-30,width:160,height:160,borderRadius:'50%',background:'rgba(255,255,255,0.07)'}}/>
        <div>
          <h2 style={{fontSize:22,color:'white',marginBottom:6}}>Welcome back, {emp.name.split(' ')[0]}! 👋</h2>
          <p style={{opacity:0.85,fontSize:14,marginBottom:12}}>{emp.designation} · {emp.department}</p>
          <div style={{display:'flex',gap:20,fontSize:13,opacity:0.85}}>
            <span>🪪 {emp.id}</span><span>📅 Joined {formatDate(emp.joiningDate)}</span>
          </div>
        </div>
        <Avatar name={emp.name} size={72}/>
      </motion.div>

      <div className="stats-grid">
        {stats.map((s,i)=><motion.div key={s.title} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}><StatCard {...s}/></motion.div>)}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:20,marginBottom:20}}>
        <div className="chart-container">
          <h3 style={{fontSize:16,marginBottom:4}}>Team Attendance</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>This week</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAttendance} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="day" tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
              <Bar dataKey="present" name="Present" fill="#2563EB" radius={[5,5,0,0]}/>
              <Bar dataKey="late" name="Late" fill="#F59E0B" radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3 style={{fontSize:16,marginBottom:4}}>Leave Balance</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:20}}>Available days</p>
          {[['Casual',leaveBalance.casual,12,'#2563EB'],['Sick',leaveBalance.sick,10,'#22C55E'],['Earned',leaveBalance.earned,20,'#F59E0B'],['Comp-off',leaveBalance.compensatory,5,'#7C3AED']].map(([type,days,max,color])=>(
            <div key={type} style={{marginBottom:14}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:5,fontSize:13}}>
                <span style={{color:'var(--text-muted)'}}>{type}</span>
                <span style={{fontWeight:700,color}}>{days} days</span>
              </div>
              <div className="progress-bar"><motion.div className="progress-fill" initial={{width:0}} animate={{width:`${(days/max)*100}%`}} transition={{duration:0.8}} style={{background:color}}/></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
        <div className="data-table-wrapper">
          <div style={{padding:'16px 20px',borderBottom:'1px solid var(--border)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h3 style={{fontSize:15}}>Recent Attendance</h3>
            <a href="/employee/attendance" style={{fontSize:13,color:'var(--primary)',textDecoration:'none',fontWeight:500}}>View all →</a>
          </div>
          <table>
            <thead><tr><th>Date</th><th>Check In</th><th>Status</th></tr></thead>
            <tbody>
              {myAtt.slice(0,5).map(a=>(
                <tr key={a.id}>
                  <td style={{fontSize:13}}>{formatDate(a.date)}</td>
                  <td style={{fontWeight:500}}>{a.checkIn}</td>
                  <td><Badge variant={getStatusBadge(a.status)} dot>{a.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3 style={{fontSize:15,marginBottom:14}}>Salary Summary</h3>
          {[['Basic Salary',payroll.basicSalary],['HRA',payroll.hra],['Bonus',payroll.bonus],['Deductions',-payroll.deductions]].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:'1px solid #F1F5F9',fontSize:13}}>
              <span style={{color:'var(--text-muted)'}}>{l}</span>
              <span style={{fontWeight:600,color:v<0?'#EF4444':'var(--text)'}}>{v<0?`-${formatCurrency(-v)}`:formatCurrency(v)}</span>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0 0',borderTop:'2px solid var(--border)',marginTop:4}}>
            <span style={{fontWeight:700,fontFamily:'Poppins'}}>Net Salary</span>
            <span style={{fontWeight:700,color:'#059669',fontSize:16}}>{formatCurrency(payroll.netSalary)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
