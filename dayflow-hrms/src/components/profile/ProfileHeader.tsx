import React, { useState } from 'react';
import { Employee } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { StatusIndicator } from '../common/StatusIndicator';
import {
  Camera,
  Edit2,
  Save,
  X,
  Mail,
  Phone,
  Building,
  MapPin,
  UserCheck,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';

interface ProfileHeaderProps {
  employee: Employee;
  isEditing: boolean;
  canEdit: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onUpdateHeader: (updates: Partial<Employee>) => void;
  onBack?: () => void;
  isOwnProfile?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  employee,
  isEditing,
  canEdit,
  onToggleEdit,
  onSave,
  onCancel,
  onUpdateHeader,
  onBack,
  isOwnProfile = false,
}) => {
  const { user } = useHRMS();
  const isAdmin = user?.role === 'ADMIN';

  const [avatarUrlInput, setAvatarUrlInput] = useState('');
  const [showAvatarPrompt, setShowAvatarPrompt] = useState(false);

  const handleAvatarChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (avatarUrlInput.trim()) {
      onUpdateHeader({ avatar: avatarUrlInput.trim() });
      setShowAvatarPrompt(false);
      setAvatarUrlInput('');
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors mr-1"
              title="Back to Employees"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{isOwnProfile ? 'My Profile' : employee.name}</span>
              <StatusIndicator status={employee.status} showLabel={false} />
            </h1>
            <p className="text-xs text-slate-500">
              {employee.employeeId} &bull; {employee.position}
            </p>
          </div>
        </div>

        {/* Edit / Save Action Buttons */}
        {canEdit && (
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                id="edit-profile-btn"
                onClick={onToggleEdit}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="cancel-profile-edit-btn"
                  onClick={onCancel}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="save-profile-btn"
                  onClick={onSave}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Profile Header Card matching Screenshot 2 Two-Column Layout */}
      <div
        id="profile-header-card"
        className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs"
      >
        <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8">
          {/* Left Column: Circular Avatar */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="relative group">
              <img
                src={
                  employee.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(employee.name)}`
                }
                alt={employee.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-slate-200 shadow-xs"
                referrerPolicy="no-referrer"
              />
              {isEditing && (
                <button
                  id="change-avatar-btn"
                  onClick={() => setShowAvatarPrompt(true)}
                  className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Change Profile Picture"
                >
                  <Camera className="w-5 h-5 mb-0.5" />
                  <span className="text-[10px] font-medium">Change</span>
                </button>
              )}
            </div>

            {/* Change Avatar mini modal */}
            {showAvatarPrompt && (
              <form onSubmit={handleAvatarChange} className="mt-2 text-center w-48 space-y-1">
                <input
                  type="text"
                  placeholder="Paste Image URL..."
                  value={avatarUrlInput}
                  onChange={(e) => setAvatarUrlInput(e.target.value)}
                  className="w-full text-xs p-1 border border-slate-300 rounded text-slate-800"
                  autoFocus
                />
                <div className="flex justify-center gap-1">
                  <button
                    type="submit"
                    className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px]"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAvatarPrompt(false)}
                    className="px-2 py-0.5 border border-slate-300 rounded text-[10px]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-2 text-center">
              <span className="inline-block text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {employee.employeeId}
              </span>
            </div>
          </div>

          {/* Right/Center: Simple Two-Column Layout (Screenshot 2) */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
            {/* Column 1: Personal & Identity Info */}
            <div className="space-y-3">
              {/* Employee Name */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Employee Name
                </span>
                {isEditing && isAdmin ? (
                  <input
                    type="text"
                    value={employee.name}
                    onChange={(e) => onUpdateHeader({ name: e.target.value })}
                    className="mt-1 font-bold text-slate-900 text-sm border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-sm font-bold text-slate-900 mt-0.5">{employee.name}</p>
                )}
              </div>

              {/* Login ID */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Login ID
                </span>
                {isEditing && isAdmin ? (
                  <input
                    type="text"
                    value={employee.loginId}
                    onChange={(e) => onUpdateHeader({ loginId: e.target.value })}
                    className="mt-1 font-medium text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-slate-800 font-medium mt-0.5">{employee.loginId}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Email
                </span>
                {isEditing && isAdmin ? (
                  <input
                    type="email"
                    value={employee.email}
                    onChange={(e) => onUpdateHeader({ email: e.target.value })}
                    className="mt-1 text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-slate-700 flex items-center gap-1.5 mt-0.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{employee.email}</span>
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Mobile
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={employee.phone}
                    onChange={(e) => onUpdateHeader({ phone: e.target.value })}
                    className="mt-1 text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-slate-700 flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{employee.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Column 2: Job Information (Screenshot 2) */}
            <div className="space-y-3">
              {/* Company */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Company
                </span>
                {isEditing && isAdmin ? (
                  <input
                    type="text"
                    value={employee.company}
                    onChange={(e) => onUpdateHeader({ company: e.target.value })}
                    className="mt-1 text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-slate-800 font-medium flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{employee.company}</span>
                  </p>
                )}
              </div>

              {/* Department */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Department
                </span>
                {isEditing && isAdmin ? (
                  <select
                    value={employee.department}
                    onChange={(e) => onUpdateHeader({ department: e.target.value })}
                    className="mt-1 text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance & Accounts">Finance & Accounts</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                    <option value="Operations">Operations</option>
                  </select>
                ) : (
                  <p className="text-slate-800 font-medium flex items-center gap-1.5 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{employee.department}</span>
                  </p>
                )}
              </div>

              {/* Manager */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Manager
                </span>
                {isEditing && isAdmin ? (
                  <input
                    type="text"
                    value={employee.manager}
                    onChange={(e) => onUpdateHeader({ manager: e.target.value })}
                    className="mt-1 text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-slate-700 flex items-center gap-1.5 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{employee.manager}</span>
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                  Location
                </span>
                {isEditing && isAdmin ? (
                  <input
                    type="text"
                    value={employee.location}
                    onChange={(e) => onUpdateHeader({ location: e.target.value })}
                    className="mt-1 text-slate-800 border border-slate-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <p className="text-slate-700 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{employee.location}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
