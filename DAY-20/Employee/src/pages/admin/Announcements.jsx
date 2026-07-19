import { announcements } from '../../data/projects';
import { Badge } from '../../components/ui/index';
import { formatDate } from '../../utils/helpers';
import { motion } from 'framer-motion';

const catColor = {Event:'#2563EB',HR:'#22C55E',Policy:'#F59E0B',Facility:'#7C3AED'};

export default function Announcements() {
  return (
    <div>
      <div className="page-header"><div><h2>Announcements</h2><p>{announcements.length} announcements</p></div></div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {announcements.map((a,i)=>(
          <motion.div key={a.id} className="card" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
            style={{borderLeft:`4px solid ${catColor[a.category]||'#6B7280'}`}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap',gap:8}}>
              <div>
                <h3 style={{fontSize:16,marginBottom:4}}>{a.title}</h3>
                <div style={{display:'flex',gap:10,fontSize:12,color:'var(--text-muted)'}}>
                  <span>👤 {a.author}</span>
                  <span>📅 {formatDate(a.date)}</span>
                </div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <Badge variant="primary">{a.category}</Badge>
                {a.priority==='High'&&<Badge variant="danger">⚡ High Priority</Badge>}
              </div>
            </div>
            <p style={{fontSize:14,color:'var(--text-muted)',lineHeight:1.6}}>{a.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
