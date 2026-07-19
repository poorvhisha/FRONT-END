import { useState } from 'react';
import { toast } from 'react-toastify';
import { projects as initial } from '../../data/projects';
import { Badge, Button, EmptyState } from '../../components/ui/index';
import { formatDate, getStatusBadge } from '../../utils/helpers';
import { motion } from 'framer-motion';

const FILTERS = ['All','Planning','In Progress','Completed'];
const priorityColor = {High:'#EF4444',Medium:'#F59E0B',Low:'#22C55E'};

export default function Projects() {
  const [projects, setProjects] = useState(initial);
  const [filter, setFilter] = useState('All');

  const filtered = filter==='All' ? projects : projects.filter(p=>p.status===filter);

  return (
    <div>
      <div className="page-header">
        <div><h2>Projects</h2><p>{projects.length} total projects</p></div>
        <Button icon="+" onClick={()=>toast.info('Add project form coming soon!')}>New Project</Button>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
        {FILTERS.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{padding:'8px 20px',borderRadius:100,border:'1.5px solid',borderColor:filter===f?'var(--primary)':'var(--border)',background:filter===f?'var(--primary)':'white',color:filter===f?'white':'var(--text-muted)',fontSize:13,fontWeight:500,cursor:'pointer',transition:'all 0.2s'}}>{f}</button>
        ))}
      </div>
      {filtered.length===0 ? <EmptyState icon="📂" title="No projects found"/> : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {filtered.map((p,i)=>(
            <motion.div key={p.id} className="card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
              style={{cursor:'pointer'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='var(--shadow-lg)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='var(--shadow)'}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <div>
                  <h3 style={{fontSize:15,marginBottom:4}}>{p.name}</h3>
                  <p style={{fontSize:12,color:'var(--text-muted)'}}>{p.department}</p>
                </div>
                <Badge variant={getStatusBadge(p.status)}>{p.status}</Badge>
              </div>
              <p style={{fontSize:12,color:'var(--text-muted)',marginBottom:14,lineHeight:1.5}}>{p.description}</p>
              <div style={{marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:12}}>
                  <span style={{color:'var(--text-muted)'}}>Progress</span>
                  <span style={{fontWeight:700,color:p.progress>=80?'#22C55E':p.progress>=50?'#F59E0B':'#EF4444'}}>{p.progress}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{width:`${p.progress}%`,background:p.progress>=80?'#22C55E':p.progress>=50?'#F59E0B':'#EF4444'}}/></div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:12,color:'var(--text-muted)'}}>
                <span>📅 {formatDate(p.endDate)}</span>
                <span style={{padding:'3px 10px',borderRadius:100,background:`${priorityColor[p.priority]}15`,color:priorityColor[p.priority],fontWeight:600}}>{p.priority}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
