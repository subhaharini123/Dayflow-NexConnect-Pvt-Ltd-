import React, { useState } from 'react';
import { useHRMS } from '../../context/HRMSContext';
import { LeaveType, LeaveRequest } from '../../types';
import {
  CalendarDays,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  X,
  FileText,
} from 'lucide-react';

export const TimeOffView: React.FC = () => {
  const { user, leaveRequests, applyLeave, updateLeaveStatus, employees } = useHRMS();
  const isAdmin = user?.role === 'ADMIN';

  // Find user's employee record
  const currentEmp = employees.find(
    (e) =>
      e.employeeId.toLowerCase() === (user?.employeeId || '').toLowerCase() ||
      e.id === user?.id ||
      e.email.toLowerCase() === (user?.email || '').toLowerCase()
  );

  // Apply Leave Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveType>('Paid');
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [remarks, setRemarks] = useState('');
  const [formError, setFormError] = useState('');

  // Admin Review Modal State
  const [reviewingLeave, setReviewingLeave] = useState<LeaveRequest | null>(null);
  const [adminComment, setAdminComment] = useState('');

  // Filter tab for Admin: All | Pending | Approved | Rejected
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pending' | 'Approved' | 'Rejected'>('ALL');

  // Filtered leaves
  const displayedLeaves = leaveRequests.filter((lr) => {
    // If regular employee, only show their own leaves
    if (!isAdmin && currentEmp) {
      if (lr.employeeId.toLowerCase() !== currentEmp.employeeId.toLowerCase()) {
        return false;
      }
    }

    if (statusFilter !== 'ALL' && lr.status !== statusFilter) {
      return false;
    }

    return true;
  });

  // Calculate user's balances
  const userLeaves = leaveRequests.filter(
    (l) =>
      l.employeeId.toLowerCase() === (currentEmp?.employeeId || '').toLowerCase() &&
      l.status === 'Approved'
  );
  const paidTaken = userLeaves
    .filter((l) => l.leaveType === 'Paid')
    .reduce((sum, l) => sum + l.durationDays, 0);
  const sickTaken = userLeaves
    .filter((l) => l.leaveType === 'Sick')
    .reduce((sum, l) => sum + l.durationDays, 0);

  const paidRemaining = Math.max(0, 18 - paidTaken);
  const sickRemaining = Math.max(0, 10 - sickTaken);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      setFormError('Please select both start and end dates.');
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      setFormError('End Date must be greater than or equal to Start Date.');
      return;
    }
    if (!remarks.trim()) {
      setFormError('Please provide a reason / remark for the leave.');
      return;
    }

    applyLeave({
      employeeId: currentEmp ? currentEmp.employeeId : user?.employeeId || 'DF-101',
      leaveType,
      fromDate,
      toDate,
      remarks: remarks.trim(),
    });

    setIsApplyModalOpen(false);
    setRemarks('');
    setFormError('');
  };

  const handleAdminDecision = (status: 'Approved' | 'Rejected') => {
    if (!reviewingLeave) return;
    updateLeaveStatus(reviewingLeave.id, status, adminComment.trim());
    setReviewingLeave(null);
    setAdminComment('');
  };

  return (
    <div id="time-off-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-slate-700" />
            <span>Time Off & Leave Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {isAdmin
              ? 'Review, approve, or reject employee leave requests and track team absence'
              : 'Submit leave applications, track approval status, and manage leave allowances'}
          </p>
        </div>

        {/* Action Button: Apply Leave */}
        <button
          id="apply-leave-btn"
          onClick={() => setIsApplyModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider shadow-xs transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Apply Leave</span>
        </button>
      </div>

      {/* Leave Balances Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Paid Leave Balance */}
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            Annual / Paid Leave
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold text-slate-900">{paidRemaining}</span>
            <span className="text-xs text-slate-500">days available (out of 18)</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Accrues monthly (1.5 days/mo)</span>
        </div>

        {/* Sick Leave Balance */}
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            Sick / Medical Leave
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold text-slate-900">{sickRemaining}</span>
            <span className="text-xs text-slate-500">days available (out of 10)</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">Requires medical certificate if &gt; 2 days</span>
        </div>

        {/* Unpaid Leave / Pending */}
        <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
            Pending Applications
          </span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-2xl font-bold text-amber-600">
              {
                leaveRequests.filter(
                  (lr) =>
                    lr.status === 'Pending' &&
                    (isAdmin || lr.employeeId.toLowerCase() === (currentEmp?.employeeId || '').toLowerCase())
                ).length
              }
            </span>
            <span className="text-xs text-slate-500">awaiting decision</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">
            {isAdmin ? 'Requires your administrative review' : 'Under management review'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-600 mr-2">Filter Requests:</span>
          {(['ALL', 'Pending', 'Approved', 'Rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {st === 'ALL' ? 'All Requests' : st}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500">Showing {displayedLeaves.length} record(s)</span>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                {isAdmin && <th className="px-4 py-3">Employee</th>}
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">To</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Remarks / Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedLeaves.length > 0 ? (
                displayedLeaves.map((lr) => {
                  let statusBadge = (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-medium">
                      <Clock className="w-3 h-3" /> Pending
                    </span>
                  );
                  if (lr.status === 'Approved') {
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    );
                  } else if (lr.status === 'Rejected') {
                    statusBadge = (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-medium">
                        <XCircle className="w-3 h-3" /> Rejected
                      </span>
                    );
                  }

                  return (
                    <tr key={lr.id} className="hover:bg-slate-50/50 transition-colors">
                      {isAdmin && (
                        <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                          <div>{lr.employeeName}</div>
                          <span className="text-[10px] text-slate-600 font-mono">
                            {lr.employeeId} &bull; {lr.department}
                          </span>
                        </td>
                      )}
                      <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                          {lr.leaveType} Leave
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-mono">{lr.fromDate}</td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap font-mono">{lr.toDate}</td>
                      <td className="px-4 py-3 text-slate-800 whitespace-nowrap font-bold">
                        {lr.durationDays} {lr.durationDays === 1 ? 'day' : 'days'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 max-w-xs truncate" title={lr.remarks}>
                        {lr.remarks}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">{statusBadge}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        {isAdmin && lr.status === 'Pending' ? (
                          <button
                            id={`review-leave-btn-${lr.id}`}
                            onClick={() => {
                              setReviewingLeave(lr);
                              setAdminComment('');
                            }}
                            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors"
                          >
                            Review &rarr;
                          </button>
                        ) : (
                          <div className="text-[11px] text-slate-500 max-w-xs truncate text-right">
                            {lr.adminComment ? (
                              <span title={`Admin Note: ${lr.adminComment}`}>
                                Note: {lr.adminComment}
                              </span>
                            ) : (
                              <span className="italic text-slate-400">No notes</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={isAdmin ? 8 : 7}
                    className="px-4 py-8 text-center text-slate-500 italic"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <div
          id="apply-leave-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">Apply for Time Off</h3>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="p-5 space-y-4 text-xs">
              {formError && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Leave Type */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                  className="w-full p-2 border border-slate-300 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option value="Paid">Paid Annual Leave ({paidRemaining} days left)</option>
                  <option value="Sick">Sick / Medical Leave ({sickRemaining} days left)</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>

              {/* Date range */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason / Remarks <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="State the purpose of time off or handover notes..."
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors"
                >
                  Apply Leave
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Leave Review & Approval Modal */}
      {reviewingLeave && (
        <div
          id="admin-leave-review-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Review Leave Application</h3>
                <p className="text-xs text-slate-500">
                  {reviewingLeave.employeeName} ({reviewingLeave.employeeId})
                </p>
              </div>
              <button
                onClick={() => setReviewingLeave(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Type:</span>
                  <span className="font-semibold text-slate-800">{reviewingLeave.leaveType} Leave</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-semibold text-slate-800">
                    {reviewingLeave.fromDate} to {reviewingLeave.toDate} ({reviewingLeave.durationDays}{' '}
                    {reviewingLeave.durationDays === 1 ? 'day' : 'days'})
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Reason:</span>
                  <span className="text-slate-800 text-right font-medium max-w-xs">{reviewingLeave.remarks}</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Admin Feedback / Decision Comment (Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  placeholder="e.g. Approved. Please coordinate handover with the team."
                  className="w-full p-2 border border-slate-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setReviewingLeave(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAdminDecision('Rejected')}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-medium transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAdminDecision('Approved')}
                  className="inline-flex items-center gap-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
