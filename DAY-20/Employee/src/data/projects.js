export const projects = [
  { id:'PRJ001', name:'EMS Web App', department:'Engineering', lead:'Mohan Kumar', status:'In Progress', priority:'High', progress:65, startDate:'2026-01-01', endDate:'2026-09-30', team:['EMP001','EMP005','EMP006'], description:'Full-stack employee management system' },
  { id:'PRJ002', name:'HR Portal Redesign', department:'HR', lead:'Priya Sharma', status:'Planning', priority:'Medium', progress:20, startDate:'2026-06-01', endDate:'2026-12-31', team:['EMP002','EMP008'], description:'Modern HR self-service portal' },
  { id:'PRJ003', name:'Payroll Automation', department:'Finance', lead:'Karthik Raj', status:'In Progress', priority:'High', progress:80, startDate:'2026-02-01', endDate:'2026-08-31', team:['EMP003','EMP009'], description:'Automated payroll processing system' },
  { id:'PRJ004', name:'Marketing Campaign Q3', department:'Marketing', lead:'Anita Patel', status:'In Progress', priority:'Medium', progress:45, startDate:'2026-07-01', endDate:'2026-09-30', team:['EMP004','EMP010'], description:'Q3 digital marketing campaign' },
  { id:'PRJ005', name:'Sales CRM Integration', department:'Sales', lead:'Arjun Singh', status:'Completed', priority:'Low', progress:100, startDate:'2026-01-01', endDate:'2026-06-30', team:['EMP007'], description:'CRM system integration for sales team' },
  { id:'PRJ006', name:'Mobile App Development', department:'Engineering', lead:'Kavya Reddy', status:'Planning', priority:'High', progress:10, startDate:'2026-08-01', endDate:'2027-02-28', team:['EMP006','EMP005'], description:'Employee mobile app' },
];

export const tasks = [
  { id:'TSK001', title:'Build employee table component', project:'EMS Web App', assignee:'Suresh Babu', priority:'High', dueDate:'2026-07-15', status:'In Progress' },
  { id:'TSK002', title:'Setup payroll module backend', project:'Payroll Automation', assignee:'Karthik Raj', priority:'High', dueDate:'2026-07-20', status:'Done' },
  { id:'TSK003', title:'Design HR portal wireframes', project:'HR Portal Redesign', assignee:'Divya Menon', priority:'Medium', dueDate:'2026-07-25', status:'Todo' },
  { id:'TSK004', title:'Create Q3 content calendar', project:'Marketing Campaign Q3', assignee:'Sneha Thomas', priority:'Medium', dueDate:'2026-07-18', status:'In Progress' },
  { id:'TSK005', title:'Auth module implementation', project:'EMS Web App', assignee:'Mohan Kumar', priority:'High', dueDate:'2026-07-10', status:'Done' },
  { id:'TSK006', title:'Mobile app UI design', project:'Mobile App Development', assignee:'Kavya Reddy', priority:'High', dueDate:'2026-08-15', status:'Todo' },
  { id:'TSK007', title:'Payroll PDF generation', project:'Payroll Automation', assignee:'Ravi Verma', priority:'Low', dueDate:'2026-07-30', status:'Todo' },
  { id:'TSK008', title:'Social media ads setup', project:'Marketing Campaign Q3', assignee:'Anita Patel', priority:'High', dueDate:'2026-07-12', status:'In Progress' },
];

export const assets = [
  { id:'AST001', name:'Dell Laptop', type:'Laptop', assignedTo:'Mohan Kumar', empId:'EMP001', assignedDate:'2022-01-10', condition:'Good', serialNumber:'DL-2022-001' },
  { id:'AST002', name:'MacBook Pro 14"', type:'Laptop', assignedTo:'Kavya Reddy', empId:'EMP006', assignedDate:'2023-05-15', condition:'Excellent', serialNumber:'MB-2023-001' },
  { id:'AST003', name:'Office Chair', type:'Furniture', assignedTo:'Priya Sharma', empId:'EMP002', assignedDate:'2021-04-15', condition:'Good', serialNumber:'OC-2021-001' },
  { id:'AST004', name:'iPhone 14', type:'Phone', assignedTo:'Karthik Raj', empId:'EMP009', assignedDate:'2023-01-01', condition:'Good', serialNumber:'IP-2023-001' },
  { id:'AST005', name:'Monitor 27"', type:'Monitor', assignedTo:'Suresh Babu', empId:'EMP005', assignedDate:'2023-02-01', condition:'Good', serialNumber:'MN-2023-001' },
];

export const announcements = [
  { id:'ANN001', title:'Company Picnic on July 20th', content:'We are organizing a company picnic at ECR Beach on July 20th. All employees and their families are welcome!', category:'Event', author:'Admin User', date:'2026-07-10', priority:'Normal' },
  { id:'ANN002', title:'Q2 Performance Review Dates', content:'Q2 performance reviews will be conducted from July 15-25. Please ensure your self-assessment forms are submitted by July 14.', category:'HR', author:'Priya Sharma', date:'2026-07-08', priority:'High' },
  { id:'ANN003', title:'New Leave Policy Update', content:'The leave policy has been updated effective August 1. Casual leaves are now increased to 12 days per year.', category:'Policy', author:'Admin User', date:'2026-07-05', priority:'High' },
  { id:'ANN004', title:'Office Maintenance on Saturday', content:'The office will undergo electrical maintenance on Saturday July 12. Remote work is encouraged for that day.', category:'Facility', author:'Admin User', date:'2026-07-03', priority:'Normal' },
];

export const recruitment = [
  { id:'REC001', position:'Senior React Developer', department:'Engineering', postedDate:'2026-07-01', applications:24, stage:'Technical Round', status:'Active', salary:'₹8-12 LPA' },
  { id:'REC002', position:'HR Business Partner', department:'HR', postedDate:'2026-06-25', applications:18, stage:'HR Interview', status:'Active', salary:'₹6-9 LPA' },
  { id:'REC003', position:'Financial Analyst', department:'Finance', postedDate:'2026-06-20', applications:31, stage:'Offer', status:'Active', salary:'₹7-10 LPA' },
  { id:'REC004', position:'Content Marketing Manager', department:'Marketing', postedDate:'2026-06-15', applications:45, stage:'Screening', status:'Active', salary:'₹5-8 LPA' },
  { id:'REC005', position:'Sales Manager', department:'Sales', postedDate:'2026-06-10', applications:22, stage:'Closed', status:'Closed', salary:'₹9-13 LPA' },
];
