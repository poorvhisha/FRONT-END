import { recruitment } from '../../data/projects';
import { Badge } from '../../components/ui/index';
import { formatDate } from '../../utils/helpers';
import { motion } from 'framer-motion';

const stages = ['Screening','Technical Round','HR Interview','Offer','Closed'];
const stageColor = {'Screening':'#6B7280','Technical Round':'#2563EB','HR Interview':'#F59E0B','Offer':'#22C55E','Closed':'#EF4444'};

export default function Recruitment() {
  return (
    <div>
      <div className="page-header"><div><h2>Recruitment</h2><p>{recruitment.filter(r=>r.status==='Active').length} active positions</p></div></div>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        {recruitment.map((r,i)=>(
          <motion.div key={r.id} className="card" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
            style={{display:'flex',alignItems:'center',gap:20,flexWrap:'wrap'}}>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
                <h3 style={{fontSize:15}}>{r.position}</h3>
                <Badge variant={r.status==='Active'?'success':'danger'} dot>{r.status}</Badge>
              </div>
              <div style={{display:'flex',gap:16,fontSize:12,color:'var(--text-muted)',flexWrap:'wrap'}}>
                <span>🏢 {r.department}</span>
                <span>📅 Posted: {formatDate(r.postedDate)}</span>
                <span>👥 {r.applications} applications</span>
                <span>💰 {r.salary}</span>
              </div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
              {stages.map((s,si) => {
                const active = stages.indexOf(r.stage) >= si;
                return (
                  <div key={s} style={{display:'flex',alignItems:'center',gap:4}}>
                    <div style={{padding:'4px 12px',borderRadius:100,fontSize:11,fontWeight:600,background:active&&r.stage===s?stageColor[s]+'25':'#F1F5F9',color:active&&r.stage===s?stageColor[s]:'#9CA3AF',border:`1.5px solid ${active&&r.stage===s?stageColor[s]:'#E5E7EB'}`}}>{s}</div>
                    {si<stages.length-1&&<span style={{color:'#D1D5DB',fontSize:16}}>›</span>}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
