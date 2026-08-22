import React, { useState } from 'react';
import { Employee } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import { Plus, X, Award, Code2, Heart, Sparkles, BookOpen } from 'lucide-react';

interface ResumeTabProps {
  employee: Employee;
  isEditing: boolean;
  canEdit: boolean;
  onUpdateResume: (resumeUpdates: Partial<Employee['resume']>) => void;
}

export const ResumeTab: React.FC<ResumeTabProps> = ({
  employee,
  isEditing,
  canEdit,
  onUpdateResume,
}) => {
  const { addSkill, removeSkill, addCertification, removeCertification } = useHRMS();

  const [newSkillInput, setNewSkillInput] = useState('');
  const [showAddSkill, setShowAddSkill] = useState(false);

  const [newCertInput, setNewCertInput] = useState('');
  const [showAddCert, setShowAddCert] = useState(false);

  const handleAddSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkillInput.trim()) {
      addSkill(employee.id, newSkillInput.trim());
      setNewSkillInput('');
      setShowAddSkill(false);
    }
  };

  const handleAddCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCertInput.trim()) {
      addCertification(employee.id, newCertInput.trim());
      setNewCertInput('');
      setShowAddCert(false);
    }
  };

  return (
    <div id="profile-resume-tab" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: About, What I love, Interests */}
        <div className="lg:col-span-2 space-y-6">
          {/* ABOUT Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>ABOUT</span>
            </h3>
            {isEditing && canEdit ? (
              <textarea
                rows={4}
                value={employee.resume.about}
                onChange={(e) => onUpdateResume({ about: e.target.value })}
                className="w-full text-xs text-slate-700 p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
                placeholder="Write a brief professional introduction..."
              />
            ) : (
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {employee.resume.about || 'No information provided.'}
              </p>
            )}
          </div>

          {/* WHAT I LOVE ABOUT MY JOB Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>WHAT I LOVE ABOUT MY JOB</span>
            </h3>
            {isEditing && canEdit ? (
              <textarea
                rows={3}
                value={employee.resume.loveAboutJob}
                onChange={(e) => onUpdateResume({ loveAboutJob: e.target.value })}
                className="w-full text-xs text-slate-700 p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
                placeholder="Describe what motivates and excites you about your role..."
              />
            ) : (
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {employee.resume.loveAboutJob || 'No information provided.'}
              </p>
            )}
          </div>

          {/* MY INTERESTS AND HOBBIES Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>MY INTERESTS AND HOBBIES</span>
            </h3>
            {isEditing && canEdit ? (
              <textarea
                rows={3}
                value={employee.resume.interestsHobbies}
                onChange={(e) => onUpdateResume({ interestsHobbies: e.target.value })}
                className="w-full text-xs text-slate-700 p-2.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
                placeholder="Mention personal hobbies, interests and recreational pursuits..."
              />
            ) : (
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                {employee.resume.interestsHobbies || 'No information provided.'}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Skills & Certifications */}
        <div className="space-y-6">
          {/* SKILLS Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>SKILLS</span>
              </h3>
              {canEdit && (
                <button
                  id="add-skill-toggle-btn"
                  onClick={() => setShowAddSkill(!showAddSkill)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Skills</span>
                </button>
              )}
            </div>

            {/* Add Skill mini form */}
            {showAddSkill && (
              <form onSubmit={handleAddSkillSubmit} className="mb-3 flex items-center gap-2">
                <input
                  type="text"
                  value={newSkillInput}
                  onChange={(e) => setNewSkillInput(e.target.value)}
                  placeholder="e.g. React, SQL, Java..."
                  className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddSkill(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2">
              {employee.resume.skills && employee.resume.skills.length > 0 ? (
                employee.resume.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded text-xs font-medium"
                  >
                    <span>{skill}</span>
                    {canEdit && (
                      <button
                        onClick={() => removeSkill(employee.id, skill)}
                        className="text-slate-400 hover:text-rose-600 focus:outline-none"
                        title="Remove skill"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-600 italic">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* CERTIFICATION Section */}
          <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>CERTIFICATION</span>
              </h3>
              {canEdit && (
                <button
                  id="add-cert-toggle-btn"
                  onClick={() => setShowAddCert(!showAddCert)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Certification</span>
                </button>
              )}
            </div>

            {/* Add Certification mini form */}
            {showAddCert && (
              <form onSubmit={handleAddCertSubmit} className="mb-3 flex items-center gap-2">
                <input
                  type="text"
                  value={newCertInput}
                  onChange={(e) => setNewCertInput(e.target.value)}
                  placeholder="e.g. AWS Certified Practitioner"
                  className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddCert(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Certification List */}
            <div className="space-y-2">
              {employee.resume.certifications && employee.resume.certifications.length > 0 ? (
                employee.resume.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-start justify-between gap-2 p-2 rounded bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  >
                    <div className="flex items-start gap-2">
                      <Award className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{cert}</span>
                    </div>
                    {canEdit && (
                      <button
                        onClick={() => removeCertification(employee.id, cert)}
                        className="text-slate-400 hover:text-rose-600 p-0.5"
                        title="Remove certification"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-600 italic">No certifications listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
