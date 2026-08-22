const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NexConnect HRMS PostgreSQL server is active' });
});

// ==========================================
// EMPLOYEES ENDPOINTS
// ==========================================

// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM employees ORDER BY employee_id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employees:', err.message);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Create new employee
app.post('/api/employees', async (req, res) => {
  const emp = req.body;
  try {
    await db.query(
      `INSERT INTO employees (id, employee_id, name, login_id, email, phone, avatar, company, department, position, manager, location, status, resume, private_info, salary)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
      [
        emp.id, emp.employeeId, emp.name, emp.loginId, emp.email, emp.phone, emp.avatar,
        emp.company, emp.department, emp.position, emp.manager, emp.location, emp.status,
        JSON.stringify(emp.resume || {}),
        JSON.stringify(emp.privateInfo || {}),
        JSON.stringify(emp.salary || {})
      ]
    );
    res.status(201).json(emp);
  } catch (err) {
    console.error('Error creating employee:', err.message);
    res.status(500).json({ error: 'Failed to create employee record' });
  }
});

// Update employee
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const emp = req.body;
  try {
    await db.query(
      `UPDATE employees SET 
        name = $1, login_id = $2, email = $3, phone = $4, avatar = $5,
        company = $6, department = $7, position = $8, manager = $9,
        location = $10, status = $11, resume = $12, private_info = $13, salary = $14
       WHERE id = $15`,
      [
        emp.name, emp.loginId, emp.email, emp.phone, emp.avatar,
        emp.company, emp.department, emp.position, emp.manager,
        emp.location, emp.status,
        JSON.stringify(emp.resume || {}),
        JSON.stringify(emp.privateInfo || {}),
        JSON.stringify(emp.salary || {}),
        id
      ]
    );
    res.json({ success: true, message: 'Employee updated successfully' });
  } catch (err) {
    console.error('Error updating employee:', err.message);
    res.status(500).json({ error: 'Failed to update employee' });
  }
});


// ==========================================
// USERS ENDPOINTS
// ==========================================

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  const usr = req.body;
  try {
    await db.query(
      `INSERT INTO users (id, employee_id, name, email, role, avatar, login_id, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [usr.id, usr.employeeId, usr.name, usr.email, usr.role, usr.avatar, usr.loginId, usr.password]
    );
    res.status(201).json(usr);
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Update user password
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [password, id]);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating user password:', err.message);
    res.status(500).json({ error: 'Failed to update password' });
  }
});


// ==========================================
// ATTENDANCE ENDPOINTS
// ==========================================

// Get all attendance logs
app.get('/api/attendance', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM attendance ORDER BY date DESC, check_in_time ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching attendance records:', err.message);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
});

// Log attendance (Check-in / Check-out)
app.post('/api/attendance', async (req, res) => {
  const att = req.body;
  try {
    await db.query(
      `INSERT INTO attendance (id, employee_id, employee_name, department, date, check_in_time, check_out_time, working_hours, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [att.id, att.employeeId, att.employeeName, att.department, att.date, att.checkInTime, att.checkOutTime, att.workingHours, att.status]
    );
    res.status(201).json(att);
  } catch (err) {
    console.error('Error creating attendance log:', err.message);
    res.status(500).json({ error: 'Failed to log attendance' });
  }
});

// Update attendance log (e.g. check-out updates)
app.put('/api/attendance/:id', async (req, res) => {
  const { id } = req.params;
  const att = req.body;
  try {
    await db.query(
      `UPDATE attendance SET 
        check_out_time = $1, working_hours = $2, status = $3
       WHERE id = $4`,
      [att.checkOutTime, att.workingHours, att.status, id]
    );
    res.json({ success: true, message: 'Attendance updated successfully' });
  } catch (err) {
    console.error('Error updating attendance:', err.message);
    res.status(500).json({ error: 'Failed to update attendance log' });
  }
});


// ==========================================
// LEAVES ENDPOINTS
// ==========================================

// Get all leave requests
app.get('/api/leaves', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM leaves ORDER BY applied_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching leave requests:', err.message);
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
});

// Create leave request
app.post('/api/leaves', async (req, res) => {
  const lv = req.body;
  try {
    await db.query(
      `INSERT INTO leaves (id, employee_id, employee_name, department, leave_type, from_date, to_date, duration_days, remarks, status, admin_comment, applied_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [lv.id, lv.employeeId, lv.employeeName, lv.department, lv.leaveType, lv.fromDate, lv.toDate, lv.durationDays, lv.remarks, lv.status, lv.adminComment, lv.appliedAt]
    );
    res.status(201).json(lv);
  } catch (err) {
    console.error('Error creating leave request:', err.message);
    res.status(500).json({ error: 'Failed to apply for leave' });
  }
});

// Update leave request status (Approve / Reject)
app.put('/api/leaves/:id', async (req, res) => {
  const { id } = req.params;
  const { status, adminComment } = req.body;
  try {
    await db.query(
      `UPDATE leaves SET status = $1, admin_comment = $2 WHERE id = $3`,
      [status, adminComment, id]
    );
    res.json({ success: true, message: 'Leave status updated successfully' });
  } catch (err) {
    console.error('Error updating leave status:', err.message);
    res.status(500).json({ error: 'Failed to update leave request' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`NexConnect HRMS backend server listening on port ${port}`);
});
