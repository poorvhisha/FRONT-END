import { employees } from '../../data/employees';
import { payrollData } from '../../data/payroll';
import { allAttendance } from '../../data/attendance';
import { leaveRequests } from '../../data/leaves';
import { formatCurrency } from '../../utils/helpers';
import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,PieChart,Pie,Cell,AreaChart,Area,Legend } from 'recharts';

const deptData = [
  {name:'Engineering',count:4},{name:'HR',count:2},{name:'Finance',count:2},{name:'Marketing',count:2},{name:'Sales',count:1}
];
const leaveStats = [{type:'Casual',count:3},{type:'Sick',count:2},{type:'Earned',count:1},{type:'Comp',count:1}];
const COLORS=['#2563EB','#22C55E','#F59E0B','#EF4444','#7C3AED'];
const payrollData2=[{m:'Jan',v:720000},{m:'Feb',v:718000},{m:'Mar',v:725000},{m:'Apr',v:728000},{m:'May',v:730000},{m:'Jun',v:727900}];
const attData=[{day:'Mon',p:9,l:1,a:0},{day:'Tue',p:8,l:2,a:0},{day:'Wed',p:7,l:1,a:2},{day:'Thu',p:9,l:0,a:1},{day:'Fri',p:10,l:0,a:0}];

export default function Reports() {
  return (
    <div>
      <div className="page-header"><div><h2>Reports & Analytics</h2><p>Comprehensive business intelligence</p></div></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
        <div className="chart-container">
          <h3 style={{fontSize:15,marginBottom:4}}>Department Headcount</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:14}}>Employees per department</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:11,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
              <Bar dataKey="count" fill="#2563EB" radius={[6,6,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 style={{fontSize:15,marginBottom:4}}>Leave Statistics</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:14}}>Requests by type</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={leaveStats} cx="50%" cy="50%" outerRadius={80} dataKey="count" nameKey="type" label={({type,count})=>`${type}: ${count}`}>
                {leaveStats.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 style={{fontSize:15,marginBottom:4}}>Payroll Trend</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:14}}>Monthly total payroll (₹)</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={payrollData2}>
              <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22C55E" stopOpacity={0.15}/><stop offset="95%" stopColor="#22C55E" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="m" tick={{fontSize:11,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#6B7280'}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}K`}/>
              <Tooltip formatter={v=>[formatCurrency(v),'Payroll']} contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
              <Area type="monotone" dataKey="v" stroke="#22C55E" strokeWidth={2.5} fill="url(#rg)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 style={{fontSize:15,marginBottom:4}}>Attendance Overview</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:14}}>This week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={attData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
              <XAxis dataKey="day" tick={{fontSize:11,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:11,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
              <Legend/>
              <Bar dataKey="p" name="Present" fill="#2563EB" radius={[4,4,0,0]}/>
              <Bar dataKey="l" name="Late" fill="#F59E0B" radius={[4,4,0,0]}/>
              <Bar dataKey="a" name="Absent" fill="#EF4444" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
