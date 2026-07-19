export const leaveTypes = ['Casual Leave','Sick Leave','Earned Leave','Maternity Leave','Paternity Leave','Compensatory Off','Loss of Pay'];

export const leaveRequests = [
  { id:'LV001', employee:'Mohan Kumar', empId:'EMP001', leaveType:'Casual Leave', from:'2026-07-10', to:'2026-07-12', days:3, reason:'Family function', status:'Pending', appliedOn:'2026-07-08' },
  { id:'LV002', employee:'Priya Sharma', empId:'EMP002', leaveType:'Sick Leave', from:'2026-07-05', to:'2026-07-06', days:2, reason:'Fever and cold', status:'Approved', appliedOn:'2026-07-04' },
  { id:'LV003', employee:'Ravi Verma', empId:'EMP003', leaveType:'Earned Leave', from:'2026-06-20', to:'2026-06-22', days:3, reason:'Vacation', status:'Approved', appliedOn:'2026-06-15' },
  { id:'LV004', employee:'Anita Patel', empId:'EMP004', leaveType:'Casual Leave', from:'2026-05-15', to:'2026-05-15', days:1, reason:'Personal work', status:'Rejected', appliedOn:'2026-05-14' },
  { id:'LV005', employee:'Suresh Babu', empId:'EMP005', leaveType:'Sick Leave', from:'2026-07-08', to:'2026-07-09', days:2, reason:'Back pain', status:'Pending', appliedOn:'2026-07-07' },
  { id:'LV006', employee:'Kavya Reddy', empId:'EMP006', leaveType:'Casual Leave', from:'2026-07-15', to:'2026-07-16', days:2, reason:'Wedding attendance', status:'Pending', appliedOn:'2026-07-10' },
  { id:'LV007', employee:'Divya Menon', empId:'EMP008', leaveType:'Earned Leave', from:'2026-06-10', to:'2026-06-14', days:5, reason:'Annual holiday', status:'Approved', appliedOn:'2026-06-01' },
];

export const leaveBalance = { casual:8, sick:5, earned:15, compensatory:2 };
