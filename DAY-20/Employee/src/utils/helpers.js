export const formatCurrency = (v) => `₹${Number(v).toLocaleString('en-IN')}`;
export const formatDate = (d) => { if (!d) return '-'; return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }); };
export const getInitials = (name) => { if (!name) return 'U'; return name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2); };
export const getStatusBadge = (status) => {
  const m = { Active:'success', Inactive:'danger', Present:'success', Absent:'danger', Late:'warning', 'Half Day':'warning', Approved:'success', Rejected:'danger', Pending:'warning', Paid:'success', 'In Progress':'primary', Done:'success', Todo:'gray', Planning:'gray', Completed:'success', Active_proj:'primary', Closed:'danger' };
  return m[status] || 'gray';
};
export const paginate = (arr, page, per) => arr.slice((page-1)*per, page*per);
export const avatarColors = ['#2563EB','#7C3AED','#059669','#D97706','#DB2777','#0891B2','#EA580C','#65A30D'];
export const getColor = (name) => avatarColors[(name||'').charCodeAt(0) % avatarColors.length];
