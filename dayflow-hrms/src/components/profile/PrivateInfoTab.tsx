import React from 'react';
import { Employee } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Calendar, User, MapPin, Phone, AlertTriangle, ShieldCheck, BadgeCheck } from 'lucide-react';

interface PrivateInfoTabProps {
  employee: Employee;
  isEditing: boolean;
  onUpdatePrivateInfo: (updates: Partial<Employee['privateInfo']>) => void;
}

export const PrivateInfoTab: React.FC<PrivateInfoTabProps> = ({
  employee,
  isEditing,
  onUpdatePrivateInfo,
}) => {
  const { user } = useHRMS();
  const isAdmin = user?.role === 'ADMIN';

  // Permission rules:
  // Admin: can edit all private info fields
  // Employee: can edit Address, Phone only
  const canEditAddressPhone = isEditing;
  const canEditAllFields = isEditing && isAdmin;

  const info = employee.privateInfo || {
    dob: '',
    gender: '',
    address: '',
    phone: '',
    emergencyContact: '',
    joiningDate: '',
    employeeId: employee.employeeId,
  };

  return (
    <div id="profile-private-info-tab" className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs space-y-6">
      {/* Notice bar when in edit mode */}
      {isEditing && (
        <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-md text-xs text-indigo-900">
          <ShieldCheck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            {isAdmin
              ? 'Administrator Mode: You can modify all official and personal employee records.'
              : 'Employee Mode: You are permitted to update your Residential Address and Contact Phone Number.'}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Employee ID */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Employee ID</span>
          </label>
          {canEditAllFields ? (
            <input
              type="text"
              value={info.employeeId || employee.employeeId}
              onChange={(e) => onUpdatePrivateInfo({ employeeId: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-medium">
              {info.employeeId || employee.employeeId}
            </div>
          )}
        </div>

        {/* Date of Joining */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Date of Joining</span>
          </label>
          {canEditAllFields ? (
            <input
              type="date"
              value={info.joiningDate}
              onChange={(e) => onUpdatePrivateInfo({ joiningDate: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
              {info.joiningDate || 'Not specified'}
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Date of Birth</span>
          </label>
          {canEditAllFields ? (
            <input
              type="date"
              value={info.dob}
              onChange={(e) => onUpdatePrivateInfo({ dob: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
            />
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
              {info.dob || 'Not specified'}
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-500" />
            <span>Gender</span>
          </label>
          {canEditAllFields ? (
            <select
              value={info.gender}
              onChange={(e) => onUpdatePrivateInfo({ gender: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs bg-white"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
              {info.gender || 'Not specified'}
            </div>
          )}
        </div>

        {/* Contact Phone */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Personal Phone</span>
            {isEditing && !isAdmin && (
              <span className="text-[10px] text-emerald-600 font-normal">(Editable)</span>
            )}
          </label>
          {canEditAddressPhone ? (
            <input
              type="text"
              value={info.phone}
              onChange={(e) => onUpdatePrivateInfo({ phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
              placeholder="+91 98000 00000"
            />
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono">
              {info.phone || employee.phone || 'Not specified'}
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Emergency Contact</span>
          </label>
          {canEditAllFields ? (
            <input
              type="text"
              value={info.emergencyContact}
              onChange={(e) => onUpdatePrivateInfo({ emergencyContact: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs"
              placeholder="Name (Relationship) - Phone"
            />
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
              {info.emergencyContact || 'Not specified'}
            </div>
          )}
        </div>

        {/* Residential Address */}
        <div className="md:col-span-2 space-y-1">
          <label className="font-semibold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>Residential Address</span>
            {isEditing && !isAdmin && (
              <span className="text-[10px] text-emerald-600 font-normal">(Editable)</span>
            )}
          </label>
          {canEditAddressPhone ? (
            <textarea
              rows={3}
              value={info.address}
              onChange={(e) => onUpdatePrivateInfo({ address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 text-xs leading-relaxed"
              placeholder="Full permanent or present residential address"
            />
          ) : (
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800 leading-relaxed">
              {info.address || 'Not specified'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
