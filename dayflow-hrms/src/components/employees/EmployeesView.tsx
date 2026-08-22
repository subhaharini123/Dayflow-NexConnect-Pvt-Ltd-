import React, { useState, useMemo } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { EmployeeCard } from './EmployeeCard';
import { NewEmployeeModal } from './NewEmployeeModal';
import { Search, Plus, Users, Filter, CheckCircle2, Plane, AlertCircle } from 'lucide-react';

interface EmployeesViewProps {
  onSelectEmployee: (employeeId: string) => void;
}

export const EmployeesView: React.FC<EmployeesViewProps> = ({ onSelectEmployee }) => {
  const { employees, user } = useHRMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Departments list for filter
  const departments = useMemo(() => {
    const set = new Set(employees.map((e) => e.department));
    return ['ALL', ...Array.from(set)];
  }, [employees]);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        emp.department.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase().trim());

      const matchesDept = departmentFilter === 'ALL' || emp.department === departmentFilter;
      const matchesStatus = statusFilter === 'ALL' || emp.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // Counts for status
  const counts = useMemo(() => {
    return {
      total: employees.length,
      present: employees.filter((e) => e.status === 'PRESENT').length,
      leave: employees.filter((e) => e.status === 'LEAVE').length,
      absent: employees.filter((e) => e.status === 'ABSENT').length,
    };
  }, [employees]);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div id="employees-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header Row matching Screenshot 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-slate-700" />
            <span>Employees</span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              {employees.length}
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage company personnel records, profiles, attendance and payroll
          </p>
        </div>

        {/* Action Controls: NEW button & Search Field */}
        <div className="flex items-center gap-3">
          {/* Small NEW button per Screenshot 1 */}
          {isAdmin && (
            <button
              id="new-employee-btn"
              onClick={() => setIsNewModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>NEW</span>
            </button>
          )}

          {/* Search Input Field */}
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              id="employee-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, dept..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter and Status Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
        {/* Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-slate-600 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-slate-500" /> Filter:
          </span>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({counts.total})
          </button>
          <button
            onClick={() => setStatusFilter('PRESENT')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              statusFilter === 'PRESENT'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-emerald-800 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Present ({counts.present})
          </button>
          <button
            onClick={() => setStatusFilter('LEAVE')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              statusFilter === 'LEAVE'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-blue-800 border border-slate-200 hover:bg-blue-50'
            }`}
          >
            <Plane className="w-3 h-3 text-blue-500" />
            On Leave ({counts.leave})
          </button>
          <button
            onClick={() => setStatusFilter('ABSENT')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              statusFilter === 'ABSENT'
                ? 'bg-amber-700 text-white'
                : 'bg-white text-amber-800 border border-slate-200 hover:bg-amber-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Absent ({counts.absent})
          </button>
        </div>

        {/* Department Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-slate-500 font-medium">Department:</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'ALL' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Employee Cards */}
      {filteredEmployees.length > 0 ? (
        <div
          id="employee-cards-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredEmployees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onClick={(id) => onSelectEmployee(id)}
            />
          ))}
        </div>
      ) : (
        <div
          id="no-employees-found"
          className="bg-white border border-dashed border-slate-300 rounded-lg p-12 text-center"
        >
          <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No employees found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchTerm
              ? `No employee records match the search term "${searchTerm}". Try a different name, department or ID.`
              : 'No employees match the selected filters.'}
          </p>
          {(searchTerm || departmentFilter !== 'ALL' || statusFilter !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setDepartmentFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="mt-4 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* New Employee Modal */}
      <NewEmployeeModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSuccess={(newId) => onSelectEmployee(newId)}
      />
    </div>
  );
};
