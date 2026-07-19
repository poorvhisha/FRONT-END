import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { employees as initial, departments } from '../../data/employees';
import { Button, SearchBar, Badge, Avatar, Modal, Input, Select, Pagination, EmptyState, ConfirmDialog } from '../../components/ui/index';
import { formatDate, getStatusBadge, paginate } from '../../utils/helpers';

const PER_PAGE = 8;

export default function Employees() {
  const [data, setData] = useState(initial.filter(e=>e.role==='employee'));
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'view'
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { register, handleSubmit, reset, setValue, formState:{errors} } = useForm();

  const filtered = data.filter(e => {
    const s = search.toLowerCase();
    return (!search || e.name.toLowerCase().includes(s) || e.email.toLowerCase().includes(s) || e.id.toLowerCase().includes(s))
      && (!deptFilter || e.department === deptFilter)
      && (!statusFilter || e.status === statusFilter);
  });
  const paged = paginate(filtered, page, PER_PAGE);

  const openAdd = () => { reset(); setSelected(null); setModal('add'); };
  const openEdit = (emp) => { setSelected(emp); Object.entries(emp).forEach(([k,v])=>setValue(k,v)); setModal('edit'); };
  const openView = (emp) => { setSelected(emp); setModal('view'); };

  const onSubmit = (formData) => {
    if (modal === 'add') {
      const newEmp = { ...formData, id:`EMP${String(data.length+1).padStart(3,'0')}`, role:'employee' };
      setData(prev=>[newEmp,...prev]);
      toast.success('Employee added successfully!');
    } else {
      setData(prev=>prev.map(e=>e.id===selected.id?{...e,...formData}:e));
      toast.success('Employee updated!');
    }
    setModal(null); reset();
  };

  const handleDelete = (id) => {
    setData(prev=>prev.filter(e=>e.id!==id));
    toast.success('Employee deleted!');
    setDeleteId(null);
  };

  return (
    <div>
      <div className="page-header">
        <div><h2>Employees</h2><p>{filtered.length} employees found</p></div>
        <Button icon="+" onClick={openAdd}>Add Employee</Button>
      </div>

      <div className="data-table-wrapper">
        <div style={{display:'flex',gap:12,padding:'16px 20px',borderBottom:'1px solid var(--border)',flexWrap:'wrap',alignItems:'center'}}>
          <SearchBar value={search} onChange={v=>{setSearch(v);setPage(1);}} placeholder="Search employees..." style={{flex:1}}/>
          <select className="form-input" style={{width:160}} value={deptFilter} onChange={e=>{setDeptFilter(e.target.value);setPage(1);}}>
            <option value="">All Departments</option>
            {departments.map(d=><option key={d.id} value={d.name}>{d.name}</option>)}
          </select>
          <select className="form-input" style={{width:130}} value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPage(1);}}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={{overflowX:'auto'}}>
          <table>
            <thead><tr><th>Employee</th><th>Emp ID</th><th>Department</th><th>Designation</th><th>Phone</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {paged.length===0 ? <tr><td colSpan={8}><EmptyState/></td></tr> : paged.map(e=>(
                <motion.tr key={e.id} initial={{opacity:0}} animate={{opacity:1}}>
                  <td><div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={e.name} size={34}/><div><div style={{fontWeight:600,fontSize:13}}>{e.name}</div><div style={{fontSize:11,color:'var(--text-muted)'}}>{formatDate(e.joiningDate)}</div></div></div></td>
                  <td><span className="badge badge-gray">{e.id}</span></td>
                  <td style={{color:'var(--text-muted)'}}>{e.department}</td>
                  <td style={{color:'var(--text-muted)'}}>{e.designation}</td>
                  <td>{e.phone}</td>
                  <td style={{fontSize:12,color:'var(--text-muted)'}}>{e.email}</td>
                  <td><Badge variant={getStatusBadge(e.status)} dot>{e.status}</Badge></td>
                  <td>
                    <div style={{display:'flex',gap:6}}>
                      <button className="btn btn-ghost btn-sm" onClick={()=>openView(e)} title="View">👁</button>
                      <button className="btn btn-outline btn-sm" onClick={()=>openEdit(e)} title="Edit">✏</button>
                      <button className="btn btn-danger btn-sm" onClick={()=>setDeleteId(e.id)} title="Delete">🗑</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} perPage={PER_PAGE} onChange={setPage}/>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={modal==='add'||modal==='edit'} onClose={()=>{setModal(null);reset();}} title={modal==='add'?'Add Employee':'Edit Employee'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            {[['Full Name','name','text'],['Email','email','email'],['Phone','phone','tel'],['Designation','designation','text'],['Date of Birth','dob','date'],['Joining Date','joiningDate','date'],['Salary','salary','number'],['Bank Account','bankAccount','text'],['IFSC Code','ifsc','text'],['PAN Number','pan','text'],['Aadhaar','aadhaar','text'],['Emergency Contact','emergencyContact','tel']].map(([label,name,type])=>(
              <Input key={name} label={label} type={type} error={errors[name]?.message} {...register(name,{required:`${label} required`})}/>
            ))}
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select className="form-input" {...register('gender',{required:true})}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select>
            </div>
            <div className="form-group">
              <label className="form-label">Department</label>
              <select className="form-input" {...register('department',{required:true})}><option value="">Select</option>{departments.map(d=><option key={d.id}>{d.name}</option>)}</select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-input" {...register('status',{required:true})}><option>Active</option><option>Inactive</option></select>
            </div>
            <Input label="Password" type="password" {...register('password',{required:modal==='add'})} error={errors.password?.message}/>
            <div className="form-group" style={{gridColumn:'1 / -1'}}>
              <label className="form-label">Address</label>
              <textarea className="form-input" rows={2} {...register('address')}/>
            </div>
          </div>
          <div style={{display:'flex',gap:12,justifyContent:'flex-end',paddingTop:16,borderTop:'1px solid var(--border)',marginTop:16}}>
            <Button type="button" variant="ghost" onClick={()=>{setModal(null);reset();}}>Cancel</Button>
            <Button type="submit">Save Employee</Button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      {selected && modal==='view' && (
        <Modal open onClose={()=>setModal(null)} title="Employee Details" size="md">
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:20}}>
            <Avatar name={selected.name} size={72}/>
            <h3 style={{marginTop:12,fontSize:18}}>{selected.name}</h3>
            <p style={{color:'var(--text-muted)',fontSize:13}}>{selected.designation} · {selected.department}</p>
            <Badge variant={getStatusBadge(selected.status)} dot style={{marginTop:8}}>{selected.status}</Badge>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[['ID',selected.id],['Email',selected.email],['Phone',selected.phone],['Gender',selected.gender],['DOB',formatDate(selected.dob)],['Joining',formatDate(selected.joiningDate)],['Salary',`₹${Number(selected.salary).toLocaleString('en-IN')}`],['Bank',selected.bankAccount],['IFSC',selected.ifsc],['PAN',selected.pan]].map(([l,v])=>(
              <div key={l} style={{padding:'10px 12px',background:'#F8FAFC',borderRadius:8,border:'1px solid var(--border)'}}>
                <div style={{fontSize:10,color:'var(--text-muted)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:3}}>{l}</div>
                <div style={{fontSize:13,fontWeight:500}}>{v||'-'}</div>
              </div>
            ))}
          </div>
        </Modal>
      )}

      <ConfirmDialog open={!!deleteId} onClose={()=>setDeleteId(null)} onConfirm={()=>handleDelete(deleteId)} title="Delete Employee" message="Are you sure you want to delete this employee? This action cannot be undone." danger/>
    </div>
  );
}
