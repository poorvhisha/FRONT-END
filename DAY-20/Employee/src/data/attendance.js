export const weeklyAttendance = [
  { day:'Mon', present:9, late:1, absent:0 },
  { day:'Tue', present:8, late:2, absent:0 },
  { day:'Wed', present:7, late:1, absent:2 },
  { day:'Thu', present:9, late:0, absent:1 },
  { day:'Fri', present:10, late:0, absent:0 },
];

export const generateAttendance = (empId) => {
  const records = []; const statuses = ['Present','Present','Present','Present','Late','Absent','Half Day'];
  const today = new Date();
  for (let d = 29; d >= 0; d--) {
    const date = new Date(today); date.setDate(today.getDate() - d);
    const day = date.getDay(); if (day === 0 || day === 6) continue;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const h = 8 + Math.floor(Math.random() * 2); const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const oh = 5 + Math.floor(Math.random() * 2); const om = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    records.push({ id:`ATT-${empId}-${d}`, employeeId: empId, date: date.toISOString().split('T')[0], checkIn: status==='Absent'?'-':`0${h}:${m} AM`, checkOut: status==='Absent'?'-':`0${oh}:${om} PM`, workingHours: status==='Absent'?'-':`${7+Math.floor(Math.random()*2)}h ${Math.floor(Math.random()*60)}m`, status });
  }
  return records;
};

export const allAttendance = [
  { id:'A001', employee:'Mohan Kumar', empId:'EMP001', date:'2026-07-10', checkIn:'09:01 AM', checkOut:'06:02 PM', workingHours:'8h 55m', status:'Present' },
  { id:'A002', employee:'Priya Sharma', empId:'EMP002', date:'2026-07-10', checkIn:'08:45 AM', checkOut:'05:45 PM', workingHours:'9h 00m', status:'Present' },
  { id:'A003', employee:'Ravi Verma', empId:'EMP003', date:'2026-07-10', checkIn:'09:30 AM', checkOut:'06:30 PM', workingHours:'9h 00m', status:'Late' },
  { id:'A004', employee:'Anita Patel', empId:'EMP004', date:'2026-07-10', checkIn:'-', checkOut:'-', workingHours:'-', status:'Absent' },
  { id:'A005', employee:'Suresh Babu', empId:'EMP005', date:'2026-07-10', checkIn:'08:55 AM', checkOut:'05:55 PM', workingHours:'9h 00m', status:'Present' },
  { id:'A006', employee:'Kavya Reddy', empId:'EMP006', date:'2026-07-10', checkIn:'09:10 AM', checkOut:'06:10 PM', workingHours:'9h 00m', status:'Present' },
  { id:'A007', employee:'Arjun Singh', empId:'EMP007', date:'2026-07-10', checkIn:'10:00 AM', checkOut:'03:00 PM', workingHours:'5h 00m', status:'Half Day' },
  { id:'A008', employee:'Divya Menon', empId:'EMP008', date:'2026-07-10', checkIn:'09:00 AM', checkOut:'06:00 PM', workingHours:'9h 00m', status:'Present' },
  { id:'A009', employee:'Karthik Raj', empId:'EMP009', date:'2026-07-10', checkIn:'08:30 AM', checkOut:'05:30 PM', workingHours:'9h 00m', status:'Present' },
  { id:'A010', employee:'Sneha Thomas', empId:'EMP010', date:'2026-07-10', checkIn:'-', checkOut:'-', workingHours:'-', status:'Absent' },
];
