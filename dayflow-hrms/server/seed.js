const fs = require('fs');
const path = require('path');
const db = require('./db');

// Helper to determine gender based on common South Indian name endings
function inferGender(name) {
  const lowercaseName = name.toLowerCase().trim();
  if (
    lowercaseName.endsWith('a') ||
    lowercaseName.endsWith('i') ||
    lowercaseName.endsWith('ya') ||
    lowercaseName.endsWith('na') ||
    lowercaseName.endsWith('shree') ||
    lowercaseName.endsWith('devi') ||
    lowercaseName.endsWith('mathi') ||
    lowercaseName.endsWith('sree')
  ) {
    return 'Female';
  }
  return 'Male';
}

function getSkillsForDept(dept) {
  switch (dept) {
    case 'Engineering':
      return ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git', 'Tailwind CSS'];
    case 'Human Resources':
      return ['Talent Acquisition', 'Employee Engagement', 'HR Compliance', 'Conflict Resolution', 'Onboarding'];
    case 'Finance & Accounts':
      return ['Financial Analysis', 'Accounting', 'Taxation (GST/TDS)', 'Tally Prime', 'Excel Formulas'];
    case 'Marketing':
      return ['SEO Strategy', 'Content Writing', 'Google Analytics', 'Email Marketing', 'Social Media Branding'];
    case 'Sales & Ops':
      return ['Negotiation', 'CRM Tools (Salesforce)', 'Lead Generation', 'Client Relations', 'Sales Strategy'];
    case 'Operations':
      return ['Vendor Management', 'Asset Management', 'Facilities Operations', 'Procurement', 'Logistics'];
    default:
      return ['Problem Solving', 'Communication', 'Teamwork', 'Microsoft Office'];
  }
}

function getCertByRole(role) {
  const r = role.toLowerCase();
  if (r.includes('engineer') || r.includes('developer')) {
    return 'AWS Certified Developer Associate';
  } else if (r.includes('hr') || r.includes('talent')) {
    return 'SHRM-CP Certified Professional';
  } else if (r.includes('analyst') || r.includes('accountant')) {
    return 'Chartered Financial Analyst (CFA Level 1)';
  } else if (r.includes('marketing')) {
    return 'HubSpot Inbound Marketing Certification';
  } else if (r.includes('sales')) {
    return 'Certified Sales Professional (CSP)';
  } else {
    return 'Six Sigma Green Belt Certification';
  }
}

function getBaseSalary(role) {
  const r = role.toLowerCase();
  if (r.includes('lead') || r.includes('senior')) {
    return 75000;
  }
  if (r.includes('software engineer') || r.includes('backend developer') || r.includes('frontend developer')) {
    return 55000;
  }
  if (r.includes('analyst') || r.includes('accountant')) {
    return 48000;
  }
  if (r.includes('executive') || r.includes('associate')) {
    return 40000;
  }
  return 38000;
}

// Generate default salary components structure
function getDefaultSalaryData(monthlyWage) {
  const basic = Math.round(monthlyWage * 0.50);
  const hra = Math.round(monthlyWage * 0.25);
  const lta = Math.round(monthlyWage * 0.08);
  const special = Math.round(monthlyWage * 0.17);
  const pf = Math.round(basic * 0.12);
  const professionalTax = 200;
  const gross = basic + hra + lta + special;
  const deductions = pf + professionalTax;
  const netPay = gross - deductions;

  return {
    monthlyWage,
    allowances: { basic, hra, lta, special },
    deductions: { pf, professionalTax },
    summary: { gross, deductions, netPay }
  };
}

async function runSeed() {
  try {
    console.log('Running schema.sql on SQLite database...');
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    
    // Execute schema SQL in SQLite
    await new Promise((resolve, reject) => {
      db.db.exec(schemaSql, (err) => {
        if (err) {
          console.error('Failed to run schema.sql:', err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
    console.log('Schema created successfully.');

    // Parse CSV
    const csvPath = path.join(__dirname, '..', '..', 'dayflow_south_indian_employees.csv');
    if (!fs.existsSync(csvPath)) {
      throw new Error(`CSV file not found at ${csvPath}`);
    }

    console.log('Reading and parsing CSV...');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split(/\r?\n/);

    const employees = [];
    const users = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const columns = line.split(',');
      if (columns.length < 8) continue;

      const empId = columns[0].trim();
      const name = columns[1].trim();
      const originalEmail = columns[5].trim();
      const dept = columns[6].trim();
      const role = columns[7].trim();
      const joiningYear = parseInt(columns[8].trim()) || 2024;
      const joiningSerial = parseInt(columns[9].trim()) || 1;

      const email = originalEmail.replace('@dayflow.com', '@nexconnect.com');

      let mappedDept = dept;
      if (dept === 'HR') mappedDept = 'Human Resources';
      else if (dept === 'Finance') mappedDept = 'Finance & Accounts';
      else if (dept === 'Sales') mappedDept = 'Sales & Ops';

      const gender = inferGender(name);
      const avatarName = name.replace(/\s+/g, '+');
      const avatar = `https://ui-avatars.com/api/?name=${avatarName}&background=6366F1&color=fff&bold=true`;
      const location = joiningSerial % 2 === 0 ? 'Chennai, India' : 'Bangalore, India';
      
      let manager = 'Arun Kumar (HR Manager)';
      if (mappedDept === 'Engineering') {
        manager = 'Vikram Mehta (Engineering Lead)';
      } else if (mappedDept === 'Finance & Accounts') {
        manager = 'Deepa Narayan (CFO)';
      } else if (mappedDept === 'Marketing') {
        manager = 'Rohan Gupta (Marketing Director)';
      }

      const baseSalary = getBaseSalary(role);

      // Generate custom Login ID NC + first 2 first name + first 2 last name + joining year + 4-digit serial
      const nameParts = name.split(/\s+/);
      const firstName = nameParts[0] || 'Employee';
      const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
      const firstTwo = (firstName.slice(0, 2) + 'XX').slice(0, 2).toUpperCase();
      const lastTwo = (lastName ? lastName.slice(0, 2) : 'XX').slice(0, 2).toUpperCase();
      const serialStr = String(joiningSerial).padStart(4, '0');
      const loginId = `NC${firstTwo}${lastTwo}${joiningYear}${serialStr}`;

      const employee = {
        id: empId,
        employeeId: empId,
        name,
        loginId,
        email,
        phone: `+91 98450 ${String(joiningSerial).padStart(5, '0')}`,
        avatar,
        company: 'NexConnect Pvt Ltd',
        department: mappedDept,
        position: role,
        manager,
        location,
        status: 'PRESENT',
        resume: {
          about: `Experienced ${role} in ${mappedDept} with a demonstrated history of driving performance at NexConnect Pvt Ltd.`,
          loveAboutJob: 'Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.',
          interestsHobbies: 'Reading professional journals, playing badminton, weekend hiking, and volunteering.',
          skills: getSkillsForDept(mappedDept),
          certifications: [getCertByRole(role)]
        },
        privateInfo: {
          dob: `199${joiningSerial % 10}-${String((joiningSerial % 12) + 1).padStart(2, '0')}-${String((joiningSerial % 28) + 1).padStart(2, '0')}`,
          gender,
          address: `#${joiningSerial * 3}, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020`,
          phone: `+91 98450 ${String(joiningSerial).padStart(5, '0')}`,
          emergencyContact: `Family Member - +91 98450 ${String(10000 - joiningSerial).padStart(5, '0')}`,
          joiningDate: `${joiningYear}-06-15`,
          employeeId: empId
        },
        salary: getDefaultSalaryData(baseSalary)
      };

      employees.push(employee);

      const user = {
        id: `usr-${empId}`,
        employeeId: empId,
        name,
        email,
        loginId,
        password: 'Password@123',
        role: mappedDept === 'Human Resources' ? 'ADMIN' : 'EMPLOYEE',
        avatar
      };

      users.push(user);
    }

    console.log(`Inserting ${employees.length} employees into SQLite database...`);
    for (const emp of employees) {
      await db.query(
        `INSERT INTO employees (id, employee_id, name, login_id, email, phone, avatar, company, department, position, manager, location, status, resume, private_info, salary)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          emp.id, emp.employeeId, emp.name, emp.loginId, emp.email, emp.phone, emp.avatar,
          emp.company, emp.department, emp.position, emp.manager, emp.location, emp.status,
          JSON.stringify(emp.resume), JSON.stringify(emp.privateInfo), JSON.stringify(emp.salary)
        ]
      );
    }

    console.log(`Inserting ${users.length} users into SQLite database...`);
    for (const usr of users) {
      await db.query(
        `INSERT INTO users (id, employee_id, name, email, role, avatar, login_id, password)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [usr.id, usr.employeeId, usr.name, usr.email, usr.role, usr.avatar, usr.loginId, usr.password]
      );
    }

    console.log('Inserting initial attendance records...');
    const initialAttendance = [
      { id: 'att-1', employeeId: 'EMP001', employeeName: 'Arun Kumar', department: 'Engineering', date: '2026-08-21', checkInTime: '09:05 AM', checkOutTime: null, workingHours: 'In Progress', status: 'PRESENT' },
      { id: 'att-2', employeeId: 'EMP020', employeeName: 'Priya Shankar', department: 'Finance & Accounts', date: '2026-08-21', checkInTime: '09:15 AM', checkOutTime: '06:05 PM', workingHours: '8h 50m', status: 'PRESENT' },
      { id: 'att-3', employeeId: 'EMP003', employeeName: 'Karthik Rajan', department: 'Finance & Accounts', date: '2026-08-21', checkInTime: null, checkOutTime: null, workingHours: null, status: 'LEAVE' },
      { id: 'att-4', employeeId: 'EMP004', employeeName: 'Divya Suresh', department: 'Marketing', date: '2026-08-21', checkInTime: '09:30 AM', checkOutTime: '06:30 PM', workingHours: '9h 00m', status: 'PRESENT' },
      { id: 'att-5', employeeId: 'EMP007', employeeName: 'Pradeep Kumar', department: 'Engineering', date: '2026-08-21', checkInTime: null, checkOutTime: null, workingHours: null, status: 'ABSENT' },
      { id: 'att-6', employeeId: 'EMP006', employeeName: 'Keerthana Mohan', department: 'Operations', date: '2026-08-21', checkInTime: '09:10 AM', checkOutTime: '05:45 PM', workingHours: '8h 35m', status: 'PRESENT' },
      { id: 'att-7', employeeId: 'EMP009', employeeName: 'Sanjay Balan', department: 'Sales & Ops', date: '2026-08-21', checkInTime: '08:55 AM', checkOutTime: '05:55 PM', workingHours: '9h 00m', status: 'PRESENT' },
      { id: 'att-8', employeeId: 'EMP010', employeeName: 'Nandhini Ramesh', department: 'Finance & Accounts', date: '2026-08-21', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', workingHours: '9h 00m', status: 'PRESENT' },
      { id: 'att-9', employeeId: 'EMP020', employeeName: 'Priya Shankar', department: 'Finance & Accounts', date: '2026-08-20', checkInTime: '09:10 AM', checkOutTime: '06:15 PM', workingHours: '9h 05m', status: 'PRESENT' },
      { id: 'att-10', employeeId: 'EMP001', employeeName: 'Arun Kumar', department: 'Engineering', date: '2026-08-20', checkInTime: '09:00 AM', checkOutTime: '06:00 PM', workingHours: '9h 00m', status: 'PRESENT' }
    ];

    for (const att of initialAttendance) {
      await db.query(
        `INSERT INTO attendance (id, employee_id, employee_name, department, date, check_in_time, check_out_time, working_hours, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [att.id, att.employeeId, att.employeeName, att.department, att.date, att.checkInTime, att.checkOutTime, att.workingHours, att.status]
      );
    }

    console.log('Inserting initial leave requests...');
    const initialLeaves = [
      { id: 'lr-1', employeeId: 'EMP003', employeeName: 'Karthik Rajan', department: 'Finance & Accounts', leaveType: 'Paid', fromDate: '2026-08-21', toDate: '2026-08-22', durationDays: 2, remarks: 'Attending family wedding function in hometown.', status: 'Approved', adminComment: 'Approved. Please ensure hand-over is done.', appliedAt: '2026-08-18 10:30 AM' },
      { id: 'lr-2', employeeId: 'EMP007', employeeName: 'Pradeep Kumar', department: 'Engineering', leaveType: 'Sick', fromDate: '2026-08-25', toDate: '2026-08-25', durationDays: 1, remarks: 'Scheduled medical appointment and checkup.', status: 'Pending', adminComment: null, appliedAt: '2026-08-20 04:15 PM' },
      { id: 'lr-3', employeeId: 'EMP020', employeeName: 'Priya Shankar', department: 'Finance & Accounts', leaveType: 'Paid', fromDate: '2026-08-28', toDate: '2026-08-29', durationDays: 2, remarks: 'Personal travel plans.', status: 'Pending', adminComment: null, appliedAt: '2026-08-21 11:00 AM' },
      { id: 'lr-4', employeeId: 'EMP004', employeeName: 'Divya Suresh', department: 'Marketing', leaveType: 'Paid', fromDate: '2026-08-10', toDate: '2026-08-12', durationDays: 3, remarks: 'Annual leave for personal time off.', status: 'Approved', adminComment: 'Approved as per department schedule.', appliedAt: '2026-08-05 02:00 PM' }
    ];

    for (const lv of initialLeaves) {
      await db.query(
        `INSERT INTO leaves (id, employee_id, employee_name, department, leave_type, from_date, to_date, duration_days, remarks, status, admin_comment, applied_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [lv.id, lv.employeeId, lv.employeeName, lv.department, lv.leaveType, lv.fromDate, lv.toDate, lv.durationDays, lv.remarks, lv.status, lv.adminComment, lv.appliedAt]
      );
    }

    console.log('Seeding SQLite database completed successfully!');
  } catch (e) {
    console.error('Seeding SQLite transaction failed:', e);
  } finally {
    db.db.close((err) => {
      if (err) {
        console.error('Error closing database connection:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
}

runSeed();
