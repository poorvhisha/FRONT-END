import { useAuth } from '../../context/AuthContext';
import { employees } from '../../data/employees';
import { payrollData } from '../../data/payroll';
import { Button, Badge } from '../../components/ui/index';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const history = [{m:'Jan',v:62900},{m:'Feb',v:60900},{m:'Mar',v:61500},{m:'Apr',v:62900},{m:'May',v:60900},{m:'Jun',v:62900}];

export default function MyPayroll() {
  const { user } = useAuth();
  const emp = employees.find(e=>e.id===user?.id) || employees[0];
  const p = payrollData.find(pd=>pd.empId===emp.id) || payrollData[0];

  return (
    <div>
      <div className="page-header"><div><h2>My Payroll</h2><p>Salary breakdown — June 2026</p></div><Button onClick={()=>toast.success('Payslip downloaded!')} icon="⬇">Download Payslip</Button></div>
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
        style={{background:'linear-gradient(135deg,#059669,#10B981)',borderRadius:16,padding:'28px 32px',marginBottom:24,color:'white',display:'flex',justifyContent:'space-between',alignItems:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:-20,top:-20,width:140,height:140,borderRadius:'50%',background:'rgba(255,255,255,0.08)'}}/>
        <div>
          <p style={{opacity:0.8,fontSize:14,marginBottom:8}}>Net Take-Home — June 2026</p>
          <div style={{fontSize:40,fontWeight:800,fontFamily:'Poppins'}}>{formatCurrency(p.netSalary)}</div>
          <p style={{opacity:0.7,fontSize:13,marginTop:6}}>Credited to your bank account</p>
        </div>
        <div style={{textAlign:'right',opacity:0.9,fontSize:14}}>
          <div style={{marginBottom:6}}>Gross: <strong>{formatCurrency(p.basicSalary+p.hra+p.ta+p.da+p.bonus)}</strong></div>
          <div>Deductions: <strong>-{formatCurrency(p.deductions)}</strong></div>
        </div>
      </motion.div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
        <div className="card">
          <h3 style={{fontSize:15,color:'#059669',marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:'50%',background:'#059669',display:'inline-block'}}/>Earnings</h3>
          {[['Basic Salary',p.basicSalary],['HRA',p.hra],['Transport Allowance',p.ta],['DA',p.da],['Bonus',p.bonus,true]].map(([l,v,h])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #F1F5F9',fontSize:13}}>
              <span style={{color:'var(--text-muted)'}}>{l}</span>
              <span style={{fontWeight:600,color:h?'#059669':'var(--text)'}}>{h?'+':''}{formatCurrency(v)}</span>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0 0',borderTop:'2px solid var(--border)',marginTop:4}}>
            <span style={{fontWeight:700,fontFamily:'Poppins'}}>Total Earnings</span>
            <span style={{fontWeight:700,color:'#059669',fontSize:16}}>{formatCurrency(p.basicSalary+p.hra+p.ta+p.da+p.bonus)}</span>
          </div>
        </div>
        <div className="card">
          <h3 style={{fontSize:15,color:'#EF4444',marginBottom:16,display:'flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:'50%',background:'#EF4444',display:'inline-block'}}/>Deductions</h3>
          {[['Provident Fund (12%)',p.pf],['Tax (TDS)',p.tax]].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #F1F5F9',fontSize:13}}>
              <span style={{color:'var(--text-muted)'}}>{l}</span>
              <span style={{fontWeight:600,color:'#DC2626'}}>-{formatCurrency(v)}</span>
            </div>
          ))}
          <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0 4px',borderTop:'2px solid var(--border)',marginTop:4,marginBottom:16}}>
            <span style={{fontWeight:700,fontFamily:'Poppins'}}>Total Deductions</span>
            <span style={{fontWeight:700,color:'#DC2626',fontSize:16}}>-{formatCurrency(p.deductions)}</span>
          </div>
          <div style={{padding:16,background:'linear-gradient(135deg,#059669,#10B981)',borderRadius:12,color:'white',textAlign:'center'}}>
            <p style={{fontSize:12,opacity:0.85,marginBottom:4}}>Net Take-Home</p>
            <p style={{fontSize:22,fontWeight:800,fontFamily:'Poppins'}}>{formatCurrency(p.netSalary)}</p>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <h3 style={{fontSize:15,marginBottom:4}}>Salary Trend (6 Months)</h3>
        <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:16}}>Net take-home history</p>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={history}>
            <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#059669" stopOpacity={0.15}/><stop offset="95%" stopColor="#059669" stopOpacity={0}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false}/>
            <XAxis dataKey="m" tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:12,fill:'#6B7280'}} axisLine={false} tickLine={false} tickFormatter={v=>`₹${(v/1000).toFixed(0)}K`}/>
            <Tooltip formatter={v=>[formatCurrency(v),'Net Salary']} contentStyle={{borderRadius:10,border:'1px solid var(--border)'}}/>
            <Area type="monotone" dataKey="v" stroke="#059669" strokeWidth={2.5} fill="url(#sg)" dot={{fill:'#059669',r:4}}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
