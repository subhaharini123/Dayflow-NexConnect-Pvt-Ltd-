import React, { useState, useEffect } from 'react';
import { Employee } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { ProfileHeader } from './ProfileHeader';
import { ResumeTab } from './ResumeTab';
import { PrivateInfoTab } from './PrivateInfoTab';
import { SalaryInfoTab } from './SalaryInfoTab';
import { FileText, Shield, DollarSign } from 'lucide-react';

interface ProfileViewProps {
  employeeId?: string;
  onBack?: () => void;
}

type TabType = 'resume' | 'private' | 'salary';

export const ProfileView: React.FC<ProfileViewProps> = ({ employeeId, onBack }) => {
  const { user, getEmployeeById, getEmployeeByEmpId, updateEmployee, employees } = useHRMS();

  // Find target employee (either provided by id or matching logged in user)
  const targetEmployee = employeeId
    ? getEmployeeById(employeeId) || getEmployeeByEmpId(employeeId)
    : employees.find(
        (e) =>
          e.employeeId.toLowerCase() === (user?.employeeId || '').toLowerCase() ||
          e.id === user?.id ||
          e.email.toLowerCase() === (user?.email || '').toLowerCase()
      ) || employees[0];

  const [activeTab, setActiveTab] = useState<TabType>('resume');

  // ALWAYS START IN VIEW-ONLY MODE as required!
  const [isEditing, setIsEditing] = useState(false);

  // Local draft state for header & sub-objects while in edit mode
  const [draftData, setDraftData] = useState<Employee | null>(targetEmployee || null);

  // Sync draft when employee changes
  useEffect(() => {
    if (targetEmployee) {
      setDraftData(targetEmployee);
      setIsEditing(false); // Reset to view mode whenever switching employees
    }
  }, [targetEmployee]);

  if (!targetEmployee || !draftData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-500">
        Employee record not found.
      </div>
    );
  }

  const isAdmin = user?.role === 'ADMIN';
  const isOwnProfile =
    user?.employeeId.toLowerCase() === targetEmployee.employeeId.toLowerCase() ||
    user?.id === targetEmployee.id;

  // Can edit? Admin can edit all employees, employee can edit own profile (limited fields)
  const canEdit = isAdmin || isOwnProfile;

  const handleUpdateHeader = (updates: Partial<Employee>) => {
    setDraftData((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const handleUpdateResume = (resumeUpdates: Partial<Employee['resume']>) => {
    setDraftData((prev) =>
      prev
        ? {
            ...prev,
            resume: {
              ...prev.resume,
              ...resumeUpdates,
            },
          }
        : null
    );
  };

  const handleUpdatePrivateInfo = (privateUpdates: Partial<Employee['privateInfo']>) => {
    setDraftData((prev) =>
      prev
        ? {
            ...prev,
            privateInfo: {
              ...prev.privateInfo,
              ...privateUpdates,
            },
          }
        : null
    );
  };

  const handleSave = () => {
    if (draftData) {
      updateEmployee(draftData.id, draftData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setDraftData(targetEmployee);
    setIsEditing(false);
  };

  return (
    <div id="profile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Profile Header Card */}
      <ProfileHeader
        employee={draftData}
        isEditing={isEditing}
        canEdit={canEdit}
        onToggleEdit={() => setIsEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
        onUpdateHeader={handleUpdateHeader}
        onBack={onBack}
        isOwnProfile={isOwnProfile}
      />

      {/* Tabs Navigation (Screenshot 2: Resume, Private Info, Salary Info) */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 sm:space-x-8" aria-label="Profile Tabs">
          {/* Resume Tab */}
          <button
            id="tab-resume"
            onClick={() => setActiveTab('resume')}
            className={`py-3 px-1 inline-flex items-center gap-2 border-b-2 text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'resume'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>

          {/* Private Info Tab */}
          {(isAdmin || isOwnProfile) && (
            <button
              id="tab-private-info"
              onClick={() => setActiveTab('private')}
              className={`py-3 px-1 inline-flex items-center gap-2 border-b-2 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'private'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Private Info</span>
            </button>
          )}

          {/* Salary Info Tab */}
          {(isAdmin || isOwnProfile) && (
            <button
              id="tab-salary-info"
              onClick={() => setActiveTab('salary')}
              className={`py-3 px-1 inline-flex items-center gap-2 border-b-2 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === 'salary'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Salary Info</span>
            </button>
          )}
        </nav>
      </div>

      {/* Active Tab Contents */}
      <div className="pt-2">
        {activeTab === 'resume' && (
          <ResumeTab
            employee={draftData}
            isEditing={isEditing}
            canEdit={canEdit}
            onUpdateResume={handleUpdateResume}
          />
        )}

        {activeTab === 'private' && (
          <PrivateInfoTab
            employee={draftData}
            isEditing={isEditing}
            onUpdatePrivateInfo={handleUpdatePrivateInfo}
          />
        )}

        {activeTab === 'salary' && <SalaryInfoTab employee={targetEmployee} />}
      </div>
    </div>
  );
};
