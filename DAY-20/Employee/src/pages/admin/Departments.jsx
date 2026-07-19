import { departments } from '../../data/employees';
import { motion } from 'framer-motion';

export default function Departments() {
  return (
    <div>
      <div className="page-header"><div><h2>Departments</h2><p>{departments.length} departments</p></div></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
        {departments.map((d,i)=>(
          <motion.div key={d.id} className="card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            style={{borderTop:`4px solid ${d.color}`,cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
            <div style={{width:52,height:52,borderRadius:14,background:`${d.color}15`,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16,fontSize:24}}>🏢</div>
            <h3 style={{fontSize:17,marginBottom:4}}>{d.name}</h3>
            <p style={{fontSize:13,color:'var(--text-muted)',marginBottom:16}}>Head: {d.head}</p>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 16px',background:'#F8FAFC',borderRadius:10}}>
              <span style={{fontSize:12,color:'var(--text-muted)'}}>Total Employees</span>
              <span style={{fontSize:20,fontWeight:800,fontFamily:'Poppins',color:d.color}}>{d.employees}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
