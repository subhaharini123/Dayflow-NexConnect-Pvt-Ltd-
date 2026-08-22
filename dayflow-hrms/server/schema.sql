-- Drop existing tables if they exist
DROP TABLE IF EXISTS leaves;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;

-- Create Users table
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar TEXT,
  login_id TEXT UNIQUE,
  password TEXT
);

-- Create Employees table
CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  login_id TEXT,
  email TEXT,
  phone TEXT,
  avatar TEXT,
  company TEXT,
  department TEXT,
  position TEXT,
  manager TEXT,
  location TEXT,
  status TEXT,
  resume TEXT,       -- Stores stringified JSON
  private_info TEXT, -- Stores stringified JSON
  salary TEXT        -- Stores stringified JSON
);

-- Create Attendance table
CREATE TABLE attendance (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  department TEXT,
  date TEXT NOT NULL,
  check_in_time TEXT,
  check_out_time TEXT,
  working_hours TEXT,
  status TEXT NOT NULL
);

-- Create Leaves table
CREATE TABLE leaves (
  id TEXT PRIMARY KEY,
  employee_id TEXT NOT NULL,
  employee_name TEXT NOT NULL,
  department TEXT,
  leave_type TEXT NOT NULL,
  from_date TEXT NOT NULL,
  to_date TEXT NOT NULL,
  duration_days INTEGER NOT NULL,
  remarks TEXT,
  status TEXT NOT NULL,
  admin_comment TEXT,
  applied_at TEXT
);

-- Create indexes for performance
CREATE INDEX idx_employees_emp_id ON employees(employee_id);
CREATE INDEX idx_users_login_id ON users(login_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_emp_id ON attendance(employee_id);
CREATE INDEX idx_leaves_emp_id ON leaves(employee_id);
