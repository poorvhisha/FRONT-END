import { AnimatePresence, motion } from 'framer-motion';
import { getInitials, getColor } from '../../utils/helpers';

export function Button({ children, variant='primary', size='', icon, loading, className='', ...props }) {
  return (
    <button className={`btn btn-${variant}${size?` btn-${size}`:''} ${className}`} disabled={loading||props.disabled} {...props}>
      {loading ? <span className="loader-spinner" style={{width:16,height:16,borderWidth:2}}/> : icon}
      {children}
    </button>
  );
}

export function Input({ label, error, icon, className='', ...props }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div style={{position:'relative'}}>
        {icon && <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--text-muted)',fontSize:16}}>{icon}</span>}
        <input className={`form-input${error?' error':''} ${className}`} style={icon?{paddingLeft:40}:{}} {...props}/>
      </div>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export function Select({ label, error, children, className='', ...props }) {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <select className={`form-input${error?' error':''} ${className}`} {...props}>{children}</select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export function Badge({ children, variant='gray', dot=false }) {
  return (
    <span className={`badge badge-${variant}`}>
      {dot && <span style={{width:6,height:6,borderRadius:'50%',background:'currentColor',display:'inline-block'}}/>}
      {children}
    </span>
  );
}

export function Avatar({ name, src, size=36, className='' }) {
  if (src) return <img src={src} alt={name} className={`avatar ${className}`} style={{width:size,height:size}}/>;
  return (
    <div className={`avatar ${className}`} style={{width:size,height:size,fontSize:size*0.35,background:getColor(name),flexShrink:0}}>
      {getInitials(name)}
    </div>
  );
}

export function Modal({ open, onClose, title, children, size='md' }) {
  const w = {sm:420,md:600,lg:800,xl:1000}[size]||600;
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
          <motion.div className="modal-box" style={{maxWidth:w}} initial={{opacity:0,scale:0.95,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.95,y:20}} transition={{type:'spring',damping:25,stiffness:300}} onClick={e=>e.stopPropagation()}>
            {title && (
              <div className="modal-header">
                <h3 style={{fontSize:17}}>{title}</h3>
                <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',fontSize:22,color:'var(--text-muted)',lineHeight:1}}>×</button>
              </div>
            )}
            <div className="modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StatCard({ title, value, subtitle, icon, color='#2563EB', trend }) {
  return (
    <motion.div className="stat-card" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.3}}>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div style={{width:48,height:48,borderRadius:12,background:`${color}18`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{icon}</div>
        {trend && <span style={{background:trend.positive?'var(--success-light)':'var(--danger-light)',color:trend.positive?'#16A34A':'#DC2626',padding:'4px 8px',borderRadius:100,fontSize:12,fontWeight:500}}>{trend.positive?'↑':'↓'} {trend.value}</span>}
      </div>
      <div style={{fontSize:26,fontWeight:700,fontFamily:'Poppins,sans-serif',color:'var(--text)',marginBottom:4}}>{value}</div>
      <div style={{fontSize:13,fontWeight:500,color:'var(--text-muted)'}}>{title}</div>
      {subtitle && <div style={{fontSize:12,color:'var(--text-light)',marginTop:4}}>{subtitle}</div>}
      <div style={{position:'absolute',right:-20,top:-20,width:100,height:100,borderRadius:'50%',background:`${color}08`}}/>
    </motion.div>
  );
}

export function SearchBar({ value, onChange, placeholder='Search...', style={} }) {
  return (
    <div className="search-bar" style={style}>
      <span style={{color:'var(--text-muted)',fontSize:16}}>🔍</span>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
    </div>
  );
}

export function Pagination({ page, total, perPage=10, onChange }) {
  const totalPages = Math.ceil(total/perPage); if (totalPages<=1) return null;
  const start=(page-1)*perPage+1; const end=Math.min(page*perPage,total);
  return (
    <div className="pagination">
      <span style={{fontSize:13,color:'var(--text-muted)'}}>Showing {start}–{end} of {total}</span>
      <div className="pagination-pages">
        <button className="page-btn" onClick={()=>onChange(page-1)} disabled={page===1}>‹</button>
        {Array.from({length:totalPages},(_,i)=>i+1).map(p=>(
          <button key={p} className={`page-btn${p===page?' active':''}`} onClick={()=>onChange(p)}>{p}</button>
        ))}
        <button className="page-btn" onClick={()=>onChange(page+1)} disabled={page===totalPages}>›</button>
      </div>
    </div>
  );
}

export function Loader({ fullPage=false }) {
  if (fullPage) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}><div className="loader-spinner"/></div>;
  return <div className="loader-spinner"/>;
}

export function EmptyState({ icon='📭', title='No data found', message='Nothing to show here.' }) {
  return (
    <div className="empty-state">
      <div style={{fontSize:44}}>{icon}</div>
      <h3 style={{fontSize:15,color:'var(--text)'}}>{title}</h3>
      <p style={{fontSize:13}}>{message}</p>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title='Confirm', message='Are you sure?', danger=false }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p style={{color:'var(--text-muted)',marginBottom:20}}>{message}</p>
      <div style={{display:'flex',gap:12,justifyContent:'flex-end'}}>
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant={danger?'danger':'primary'} onClick={()=>{onConfirm();onClose();}}>Confirm</Button>
      </div>
    </Modal>
  );
}
