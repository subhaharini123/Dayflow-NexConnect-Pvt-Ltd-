import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { X, Plus, UserPlus } from 'lucide-react';
import { getDefaultSalaryData } from '../../utils/salaryCalculator';

interface NewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (employeeId: string) => void;
}

export const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createEmployee, employees } = useHRMS();

  const nextId = 'EMP' + String(employees.length + 1).padStart(3, '0');

  const [formData, setFormData] = useState({
    name: '',
    employeeId: nextId,
    email: '',
    phone: '+91 ',
    department: 'Engineering',
    position: 'Software Engineer',
    manager: 'Arun Kumar',
    location: 'Bangalore, India',
    monthlyWage: 50000,
    about: 'Dedicated professional at NexConnect Pvt Ltd.',
    joiningDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email address';
    if (!formData.employeeId.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = 'Valid phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const salary = getDefaultSalaryData(Number(formData.monthlyWage) || 50000);

    const newEmp = createEmployee({
      name: formData.name.trim(),
      employeeId: formData.employeeId.trim(),
      loginId: formData.email.split('@')[0],
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: 'NexConnect Pvt Ltd',
      department: formData.department,
      position: formData.position,
      manager: formData.manager,
      location: formData.location,
      status: 'PRESENT',
      resume: {
        about: formData.about,
        loveAboutJob: 'Collaborating on high-impact projects and engineering solutions.',
        interestsHobbies: 'Reading, technology, and fitness.',
        skills: formData.department === 'Engineering' ? ['React', 'TypeScript', 'Node.js'] : ['HR Operations', 'Recruitment'],
        certifications: [],
      },
      privateInfo: {
        dob: '1995-05-15',
        gender: 'Not specified',
        address: `${formData.location.split(',')[0]}, India`,
        phone: formData.phone.trim(),
        emergencyContact: 'Family Contact - +91 98000 00000',
        joiningDate: formData.joiningDate,
        employeeId: formData.employeeId.trim(),
      },
      salary,
    });

    onClose();
    onSuccess(newEmp.id);
  };

  return (
    <div
      id="new-employee-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-xl w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-600">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Add New Employee</h2>
              <p className="text-xs text-slate-500">Create employee record and onboard to NexConnect HRMS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Varma"
                className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                  errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Employee ID */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Employee ID <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                  errors.employeeId ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.employeeId && <p className="text-[11px] text-rose-500 mt-1">{errors.employeeId}</p>}
            </div>

            {/* Work Email */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ramesh@nexconnect.com"
                className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                  errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
            </div>

            {/* Mobile / Phone */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98000 12345"
                className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                  errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="Engineering">Engineering</option>
                <option value="Product & Design">Product & Design</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance & Accounts">Finance & Accounts</option>
                <option value="Quality Assurance">Quality Assurance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            {/* Designation / Position */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">Designation / Role</label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g. Frontend Developer"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Reporting Manager */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">Reporting Manager</label>
              <input
                type="text"
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                placeholder="e.g. Arun Kumar"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Work Location */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">Work Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bangalore, India"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Monthly Wage */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">Monthly Wage (₹)</label>
              <input
                type="number"
                value={formData.monthlyWage}
                onChange={(e) => setFormData({ ...formData, monthlyWage: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Joining Date */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">Date of Joining</label>
              <input
                type="date"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* About / Summary */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">Short Introduction / About</label>
            <textarea
              rows={2}
              value={formData.about}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 border border-slate-300 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Employee</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
