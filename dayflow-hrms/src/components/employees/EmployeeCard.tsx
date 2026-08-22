import React from 'react';
import { Employee } from '../../types';
import { StatusIndicator } from '../common/StatusIndicator';
import { Mail, Phone, Building2 } from 'lucide-react';

interface EmployeeCardProps {
  employee: Employee;
  onClick: (employeeId: string) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  return (
    <div
      id={`employee-card-${employee.employeeId}`}
      onClick={() => onClick(employee.id)}
      className="group relative bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-150 rounded-lg p-3.5 sm:p-4 cursor-pointer flex flex-col justify-between"
    >
      {/* Top right status indicator */}
      <div className="absolute top-3 right-3 z-10">
        <StatusIndicator status={employee.status} />
      </div>

      {/* Main card body with image and info */}
      <div>
        <div className="flex items-start gap-3">
          {/* Avatar image */}
          <div className="relative flex-shrink-0">
            <img
              src={
                employee.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(employee.name)}`
              }
              alt={employee.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200 group-hover:border-slate-300 transition-colors"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Name & Role */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                {employee.name}
              </h3>
            </div>
            <p className="text-xs text-slate-600 truncate mt-0.5">{employee.position}</p>
            <span className="inline-block text-[11px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded mt-1">
              {employee.employeeId}
            </span>
          </div>
        </div>

        {/* Details list */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <span className="truncate">{employee.department}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Mail className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <span className="truncate text-slate-600">{employee.email}</span>
          </div>
          <div className="flex items-center gap-2 truncate">
            <Phone className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <span className="truncate">{employee.phone}</span>
          </div>
        </div>
      </div>

      {/* Footer minimal tag */}
      <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-slate-600">
        <span>{employee.location.split(',')[0]}</span>
        <span className="font-medium text-indigo-700 group-hover:underline">
          View Profile &rarr;
        </span>
      </div>
    </div>
  );
};
