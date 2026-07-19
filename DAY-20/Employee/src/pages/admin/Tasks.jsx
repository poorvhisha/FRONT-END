import { useState } from 'react';
import { toast } from 'react-toastify';
import { tasks as initial } from '../../data/projects';
import { Badge, Button } from '../../components/ui/index';
import { formatDate } from '../../utils/helpers';
import { motion } from 'framer-motion';

const COLS = ['Todo','In Progress','Done'];
const priorityColor = {High:'#EF4444',Medium:'#F59E0B',Low:'#22C55E'};

export default function Tasks() {
  const [tasks, setTasks] = useState(initial);

  const move = (id, dir) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const idx = COLS.indexOf(t.status);
      const next = COLS[idx + dir];
      if (!next) return t;
      toast.success(`Task moved to "${next}"`);
      return { ...t, status: next };
    }));
  };

  return (
    <div>
      <div className="page-header">
        <div><h2>Tasks</h2><p>Kanban board — {tasks.length} tasks</p></div>
        <Button icon="+" onClick={()=>toast.info('Add task form coming soon!')}>New Task</Button>
      </div>
      <div className="kanban-board">
        {COLS.map(col => {
          const colTasks = tasks.filter(t => t.status === col);
          const colColor = {Todo:'#6B7280','In Progress':'#2563EB',Done:'#22C55E'}[col];
          return (
            <div key={col} className="kanban-col">
              <div className="kanban-col-header">
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{width:10,height:10,borderRadius:'50%',background:colColor}}/>
                  <h3 style={{fontSize:14,fontWeight:600}}>{col}</h3>
                </div>
                <span style={{background:`${colColor}18`,color:colColor,padding:'2px 10px',borderRadius:100,fontSize:12,fontWeight:600}}>{colTasks.length}</span>
              </div>
              {colTasks.length === 0 ? <div style={{padding:'20px',textAlign:'center',color:'var(--text-muted)',fontSize:13}}>No tasks</div> : colTasks.map((t,i)=>(
                <motion.div key={t.id} className="kanban-card" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                    <h4 style={{fontSize:13,fontWeight:600,lineHeight:1.4,flex:1}}>{t.title}</h4>
                    <span style={{fontSize:11,fontWeight:600,color:priorityColor[t.priority],background:`${priorityColor[t.priority]}15`,padding:'2px 8px',borderRadius:100,marginLeft:8,flexShrink:0}}>{t.priority}</span>
                  </div>
                  <p style={{fontSize:11,color:'var(--primary)',marginBottom:8}}>📂 {t.project}</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:11,color:'var(--text-muted)',marginBottom:10}}>
                    <span>👤 {t.assignee.split(' ')[0]}</span>
                    <span>📅 {formatDate(t.dueDate)}</span>
                  </div>
                  <div style={{display:'flex',gap:6}}>
                    {COLS.indexOf(t.status) > 0 && <button className="btn btn-ghost btn-sm" style={{fontSize:11,padding:'4px 10px'}} onClick={()=>move(t.id,-1)}>← Back</button>}
                    {COLS.indexOf(t.status) < 2 && <button className="btn btn-primary btn-sm" style={{fontSize:11,padding:'4px 10px'}} onClick={()=>move(t.id,1)}>Next →</button>}
                  </div>
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
