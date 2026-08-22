import React from 'react';
import { AttendanceStatus } from '../../types';
import { Plane } from 'lucide-react';

interface StatusIndicatorProps {
  status: AttendanceStatus;
  showLabel?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = false,
  className = '',
}) => {
  switch (status) {
    case 'PRESENT':
      return (
        <span
          className={`inline-flex items-center gap-1.5 ${className}`}
          title="Present in Office"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100 flex-shrink-0" />
          {showLabel && <span className="text-xs font-medium text-emerald-700">Present</span>}
        </span>
      );

    case 'LEAVE':
      return (
        <span
          className={`inline-flex items-center gap-1.5 ${className}`}
          title="On Approved Leave"
        >
          <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-200">
            <Plane className="w-3 h-3 transform -rotate-45" />
          </span>
          {showLabel && <span className="text-xs font-medium text-blue-700">On Leave</span>}
        </span>
      );

    case 'ABSENT':
      return (
        <span
          className={`inline-flex items-center gap-1.5 ${className}`}
          title="Absent / Unregistered"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100 flex-shrink-0" />
          {showLabel && <span className="text-xs font-medium text-amber-700">Absent</span>}
        </span>
      );

    case 'HALF_DAY':
      return (
        <span
          className={`inline-flex items-center gap-1.5 ${className}`}
          title="Half Day"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-purple-100 flex-shrink-0" />
          {showLabel && <span className="text-xs font-medium text-purple-700">Half Day</span>}
        </span>
      );

    default:
      return null;
  }
};
