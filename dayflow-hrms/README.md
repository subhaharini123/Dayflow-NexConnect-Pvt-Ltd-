# NexConnect HRMS Portal

A complete, modern Human Resource Management System (HRMS) portal branded for **NexConnect Pvt Ltd** and powered by the **Dayflow Portal** shell. 

This application integrates a premium login interface with a complete HRMS package, connected to a self-healing **SQLite database** to manage employee records, attendance check-ins/check-outs, and time-off leave requests.

---

## 🚀 Key Features

* **Premium Integrated Authentication**: Uses a secure Login ID system (format: `NC` + 2 letters of first name + 2 letters of last name + joining year + 4-digit serial).
* **Role-Based Access Control (RBAC)**:
  * **HR Admins**: Access to add new employees (with automatic Login ID and temporary password generation), view all company attendance logs, approve/reject leave requests, and view detailed salary segments.
  * **Employees**: Self-service dashboard showing personal attendance statistics, leave balances, a check-in/check-out console, time-off applications, and a public directory.
* **Self-Healing SQLite Database**: Zero database software installation required. On a fresh clone, the backend server detects the empty database, creates table schemas, and automatically seeds the **101 South Indian employee records** from the source CSV file.
* **Graceful Offline Fallback**: If the Express server is ever offline, the frontend context automatically switches to **LocalStorage** mode, preventing page crashes and maintaining local changes.
* **Modern Interface**: Designed with the **Inter** font family for maximum readability, keeping only the NexConnect brand logo headings in the elegant **Poor Richard** style.

---

## 🛠️ Architecture

* **Frontend**: React 19, Vite, Tailwind CSS v4, Motion v12
* **Backend**: Node.js, Express, CORS
* **Database**: SQLite (stored locally as `server/nexconnect.sqlite`)

---

## 💻 Quick Start (Run Locally)

You can install and run the entire stack (both React frontend and SQLite backend) using single-command triggers from the project root:

### 1. Install Dependencies
Run this in the root folder. The `postinstall` hook will automatically install all frontend and backend server packages:
```bash
npm install
```

### 2. Boot the Servers
Start both the Vite dev server (port `3000`) and the Express database API server (port `5000`) concurrently:
```bash
npm start
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Sample Login Credentials for Testing

Use these credentials to explore the different permission layers inside the portal:

### 1. HR Admin Profile (Anitha Ravi)
* **Login ID**: `NCANRA20230001`
* **Password**: `Password@123`

### 2. General Employee Profile (Priya Shankar)
* **Login ID**: `NCPRSH20250005`
* **Password**: `Password@123`

---

## 📂 Project Structure

* `/src` - React frontend application (views, components, context, and state managers).
* `/server` - Express API server, db connections, SQL schemas, and CSV seeding scripts.
* `dayflow_south_indian_employees.csv` - The source Kaggle employee dataset.
