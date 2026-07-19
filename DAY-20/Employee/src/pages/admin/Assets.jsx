import { assets } from '../../data/projects';
import { Badge } from '../../components/ui/index';
import { formatDate } from '../../utils/helpers';

export default function Assets() {
  const typeIcon = {Laptop:'💻',Phone:'📱',Monitor:'🖥️',Furniture:'🪑'};
  return (
    <div>
      <div className="page-header"><div><h2>Assets</h2><p>{assets.length} assets assigned</p></div></div>
      <div className="data-table-wrapper">
        <table>
          <thead><tr><th>Asset Name</th><th>Type</th><th>Assigned To</th><th>Assigned Date</th><th>Condition</th><th>Serial No.</th></tr></thead>
          <tbody>
            {assets.map(a=>(
              <tr key={a.id}>
                <td><div style={{fontWeight:600,fontSize:13}}>{typeIcon[a.type]||'📦'} {a.name}</div></td>
                <td><Badge variant="primary">{a.type}</Badge></td>
                <td><div style={{fontWeight:500,fontSize:13}}>{a.assignedTo}</div><div style={{fontSize:11,color:'var(--text-muted)'}}>{a.empId}</div></td>
                <td style={{color:'var(--text-muted)'}}>{formatDate(a.assignedDate)}</td>
                <td><Badge variant={a.condition==='Excellent'?'success':a.condition==='Good'?'primary':'warning'}>{a.condition}</Badge></td>
                <td style={{fontFamily:'monospace',fontSize:12,color:'var(--text-muted)'}}>{a.serialNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
