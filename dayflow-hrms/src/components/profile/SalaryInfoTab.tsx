import React, { useState, useEffect } from 'react';
import { Employee, SalaryData, SalaryComponent } from '../../types';
import { useHRMS } from '../../context/HRMSContext';
import {
  formatINR,
  formatINRWithDecimals,
  calculateSalaryData,
} from '../../utils/salaryCalculator';
import {
  DollarSign,
  Calendar,
  Coffee,
  ShieldCheck,
  Edit2,
  Save,
  RotateCcw,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  Info,
} from 'lucide-react';

interface SalaryInfoTabProps {
  employee: Employee;
}

export const SalaryInfoTab: React.FC<SalaryInfoTabProps> = ({ employee }) => {
  const { user, updateSalary, addToast } = useHRMS();
  const isAdmin = user?.role === 'ADMIN';

  const [isEditingSalary, setIsEditingSalary] = useState(false);

  // Local editable draft state
  const [draftSalary, setDraftSalary] = useState<SalaryData>(employee.salary);

  // Synchronize when employee changes
  useEffect(() => {
    setDraftSalary(employee.salary);
    setIsEditingSalary(false);
  }, [employee]);

  // Recalculate helper whenever fields change in draft
  const handleWageChange = (newMonthlyWage: number) => {
    const updated = calculateSalaryData(
      newMonthlyWage,
      draftSalary.components,
      draftSalary.pfContribution.employeePercentage,
      draftSalary.pfContribution.employerPercentage,
      draftSalary.taxDeductions.professionalTax,
      draftSalary.workingDaysPerWeek,
      draftSalary.breakTimeHours
    );
    setDraftSalary(updated);
  };

  const handleComponentChange = (
    index: number,
    field: 'value' | 'type' | 'percentageOf' | 'name',
    val: any
  ) => {
    const updatedComponents = [...draftSalary.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [field]: val,
    };

    const updated = calculateSalaryData(
      draftSalary.monthlyWage,
      updatedComponents,
      draftSalary.pfContribution.employeePercentage,
      draftSalary.pfContribution.employerPercentage,
      draftSalary.taxDeductions.professionalTax,
      draftSalary.workingDaysPerWeek,
      draftSalary.breakTimeHours
    );
    setDraftSalary(updated);
  };

  const handlePFPercentageChange = (
    type: 'employee' | 'employer',
    percent: number
  ) => {
    const updated = calculateSalaryData(
      draftSalary.monthlyWage,
      draftSalary.components,
      type === 'employee' ? percent : draftSalary.pfContribution.employeePercentage,
      type === 'employer' ? percent : draftSalary.pfContribution.employerPercentage,
      draftSalary.taxDeductions.professionalTax,
      draftSalary.workingDaysPerWeek,
      draftSalary.breakTimeHours
    );
    setDraftSalary(updated);
  };

  const handleTaxChange = (amount: number) => {
    const updated = calculateSalaryData(
      draftSalary.monthlyWage,
      draftSalary.components,
      draftSalary.pfContribution.employeePercentage,
      draftSalary.pfContribution.employerPercentage,
      amount,
      draftSalary.workingDaysPerWeek,
      draftSalary.breakTimeHours
    );
    setDraftSalary(updated);
  };

  const handleWorkingDaysChange = (days: number) => {
    setDraftSalary((prev) => ({ ...prev, workingDaysPerWeek: days }));
  };

  const handleBreakTimeChange = (hours: number) => {
    setDraftSalary((prev) => ({ ...prev, breakTimeHours: hours }));
  };

  const handleAddComponent = () => {
    const newComp: SalaryComponent = {
      id: 'comp-' + Date.now(),
      name: 'Special Allowance',
      type: 'FIXED',
      value: 1000,
      calculatedAmount: 1000,
    };
    const updated = calculateSalaryData(
      draftSalary.monthlyWage,
      [...draftSalary.components, newComp],
      draftSalary.pfContribution.employeePercentage,
      draftSalary.pfContribution.employerPercentage,
      draftSalary.taxDeductions.professionalTax,
      draftSalary.workingDaysPerWeek,
      draftSalary.breakTimeHours
    );
    setDraftSalary(updated);
  };

  const handleRemoveComponent = (id: string) => {
    const filtered = draftSalary.components.filter((c) => c.id !== id);
    const updated = calculateSalaryData(
      draftSalary.monthlyWage,
      filtered,
      draftSalary.pfContribution.employeePercentage,
      draftSalary.pfContribution.employerPercentage,
      draftSalary.taxDeductions.professionalTax,
      draftSalary.workingDaysPerWeek,
      draftSalary.breakTimeHours
    );
    setDraftSalary(updated);
  };

  const handleSaveSalary = () => {
    if (!isAdmin) {
      addToast('Unauthorized. Only HR Administrators can edit salary.', 'error');
      return;
    }
    updateSalary(employee.id, draftSalary);
    setIsEditingSalary(false);
  };

  const handleCancelEdit = () => {
    setDraftSalary(employee.salary);
    setIsEditingSalary(false);
  };

  const currentSalary = isEditingSalary ? draftSalary : employee.salary;

  // Calculate Net Take-Home Pay
  const basicComponent = currentSalary.components.find((c) =>
    c.name.toLowerCase().includes('basic')
  );
  const netMonthlySalary =
    currentSalary.monthlyWage -
    currentSalary.pfContribution.employeeAmount -
    currentSalary.taxDeductions.professionalTax;

  return (
    <div id="profile-salary-info-tab" className="space-y-6">
      {/* Top Header & Edit Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Salary Info</span>
            {!isAdmin && (
              <span className="text-[11px] font-normal text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                <Lock className="w-3 h-3 text-slate-400" /> View Only (Employee)
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Compensation package, allowances breakdown, statutory PF contribution and tax deductions
          </p>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-2">
            {!isEditingSalary ? (
              <button
                id="edit-salary-btn"
                onClick={() => setIsEditingSalary(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Salary Structure</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="cancel-salary-edit-btn"
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="save-salary-btn"
                  onClick={handleSaveSalary}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Screenshot 3 Top Section: Monthly Wage, Yearly Wage, Working days, Break time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Monthly Wage */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
            Monthly Wage
          </span>
          {isEditingSalary && isAdmin ? (
            <div className="mt-1">
              <div className="relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500 font-semibold text-xs">
                  ₹
                </div>
                <input
                  type="number"
                  value={draftSalary.monthlyWage}
                  onChange={(e) => handleWageChange(Number(e.target.value) || 0)}
                  className="w-full pl-6 pr-3 py-1.5 text-sm font-bold text-slate-900 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
              <span className="text-[10px] text-slate-600 mt-1 block">/ Month</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900">
                {formatINR(currentSalary.monthlyWage)}
              </span>
              <span className="text-xs text-slate-600 font-medium">/ Month</span>
            </div>
          )}
        </div>

        {/* Yearly Wage */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-1">
            Yearly Wage
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-slate-900">
              {formatINR(currentSalary.yearlyWage)}
            </span>
            <span className="text-xs text-slate-600 font-medium">/ Yearly</span>
          </div>
          <span className="text-[10px] text-slate-600 block mt-0.5">Calculated (12 × Monthly)</span>
        </div>

        {/* Working days in a week */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            Working Days / Week
          </span>
          {isEditingSalary && isAdmin ? (
            <select
              value={draftSalary.workingDaysPerWeek}
              onChange={(e) => handleWorkingDaysChange(Number(e.target.value))}
              className="mt-1 w-full p-1.5 border border-slate-300 rounded text-xs text-slate-800 bg-white"
            >
              <option value={5}>5 days (Mon - Fri)</option>
              <option value={6}>6 days (Mon - Sat)</option>
              <option value={4}>4 days (Flexible)</option>
            </select>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900">
                {currentSalary.workingDaysPerWeek}
              </span>
              <span className="text-xs text-slate-600 font-medium">days in a week</span>
            </div>
          )}
        </div>

        {/* Break time */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1 mb-1">
            <Coffee className="w-3 h-3 text-slate-400" />
            Break Time
          </span>
          {isEditingSalary && isAdmin ? (
            <select
              value={draftSalary.breakTimeHours}
              onChange={(e) => handleBreakTimeChange(Number(e.target.value))}
              className="mt-1 w-full p-1.5 border border-slate-300 rounded text-xs text-slate-800 bg-white"
            >
              <option value={0.5}>30 mins / day</option>
              <option value={1}>1 hr / day</option>
              <option value={1.5}>1.5 hrs / day</option>
            </select>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900">
                {currentSalary.breakTimeHours}
              </span>
              <span className="text-xs text-slate-600 font-medium">hr / day</span>
            </div>
          )}
        </div>
      </div>

      {/* Salary Components Breakdown Section (Screenshot 3) */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Salary Components
            </h3>
            <p className="text-[11px] text-slate-500">
              Monthly breakdown of base earnings and standard allowances
            </p>
          </div>
          {isEditingSalary && isAdmin && (
            <button
              onClick={handleAddComponent}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Add Component</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {currentSalary.components.map((comp, idx) => (
            <div
              key={comp.id}
              className="px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/50 transition-colors"
            >
              {/* Component Name */}
              <div className="flex-1 min-w-0">
                {isEditingSalary && isAdmin ? (
                  <input
                    type="text"
                    value={comp.name}
                    onChange={(e) => handleComponentChange(idx, 'name', e.target.value)}
                    className="font-semibold text-slate-900 border border-slate-300 rounded px-2 py-1 text-xs w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                ) : (
                  <div>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {comp.name}
                    </span>
                    {comp.percentageOf === 'BASIC' && (
                      <span className="ml-2 text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        Calculated on Basic
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Edit Controls in Admin Mode */}
              {isEditingSalary && isAdmin ? (
                <div className="flex items-center gap-3">
                  <select
                    value={comp.type}
                    onChange={(e) =>
                      handleComponentChange(idx, 'type', e.target.value as 'PERCENTAGE' | 'FIXED')
                    }
                    className="p-1 border border-slate-300 rounded text-xs bg-white"
                  >
                    <option value="PERCENTAGE">% Percentage</option>
                    <option value="FIXED">Fixed (₹)</option>
                  </select>

                  {comp.type === 'PERCENTAGE' && (
                    <select
                      value={comp.percentageOf || 'MONTHLY_WAGE'}
                      onChange={(e) =>
                        handleComponentChange(
                          idx,
                          'percentageOf',
                          e.target.value as 'MONTHLY_WAGE' | 'BASIC'
                        )
                      }
                      className="p-1 border border-slate-300 rounded text-xs bg-white"
                    >
                      <option value="MONTHLY_WAGE">% of Wage</option>
                      <option value="BASIC">% of Basic</option>
                    </select>
                  )}

                  <div className="flex items-center gap-1 w-24">
                    <input
                      type="number"
                      step="0.01"
                      value={comp.value}
                      onChange={(e) =>
                        handleComponentChange(idx, 'value', Number(e.target.value) || 0)
                      }
                      className="w-full p-1 border border-slate-300 rounded text-xs font-semibold"
                    />
                    <span className="text-slate-500 font-bold">
                      {comp.type === 'PERCENTAGE' ? '%' : '₹'}
                    </span>
                  </div>

                  <div className="w-28 text-right font-bold text-slate-800">
                    {formatINRWithDecimals(comp.calculatedAmount)}
                  </div>

                  <button
                    onClick={() => handleRemoveComponent(comp.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Delete component"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* View Mode matching Screenshot 3 */
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-64">
                  <div className="text-right">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                      {formatINRWithDecimals(comp.calculatedAmount)}
                    </span>
                    <span className="text-slate-600 text-[11px] ml-1">/ month</span>
                  </div>
                  <div className="w-16 text-right font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {comp.type === 'PERCENTAGE'
                      ? `${comp.value.toFixed(2)}%`
                      : 'Fixed'}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Provident Fund (PF) Contribution & Tax Deductions (Screenshot 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Provident Fund (PF) Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Provident Fund (PF) Contribution
            </h3>
            <span className="text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              Statutory 12%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Employee PF */}
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 block">Employee PF</span>
                <span className="text-[11px] text-slate-500">Deducted from gross salary</span>
              </div>
              <div className="text-right">
                {isEditingSalary && isAdmin ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={draftSalary.pfContribution.employeePercentage}
                      onChange={(e) =>
                        handlePFPercentageChange('employee', Number(e.target.value) || 0)
                      }
                      className="w-14 p-1 border border-slate-300 rounded text-xs text-right font-semibold"
                    />
                    <span className="text-slate-500 font-bold">%</span>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-slate-900">
                      {formatINR(currentSalary.pfContribution.employeeAmount)}
                    </span>
                    <span className="text-slate-600 text-[11px]"> / month</span>
                    <span className="block text-[11px] text-slate-600">
                      {currentSalary.pfContribution.employeePercentage}% of Basic
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Employer PF */}
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 block">Employer PF</span>
                <span className="text-[11px] text-slate-500">Company co-contribution</span>
              </div>
              <div className="text-right">
                {isEditingSalary && isAdmin ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={draftSalary.pfContribution.employerPercentage}
                      onChange={(e) =>
                        handlePFPercentageChange('employer', Number(e.target.value) || 0)
                      }
                      className="w-14 p-1 border border-slate-300 rounded text-xs text-right font-semibold"
                    />
                    <span className="text-slate-500 font-bold">%</span>
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-slate-900">
                      {formatINR(currentSalary.pfContribution.employerAmount)}
                    </span>
                    <span className="text-slate-600 text-[11px]"> / month</span>
                    <span className="block text-[11px] text-slate-600">
                      {currentSalary.pfContribution.employerPercentage}% of Basic
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tax Deductions Section */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tax Deductions
            </h3>
            <span className="text-[11px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              Monthly
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Professional Tax */}
            <div className="flex items-center justify-between p-2.5 rounded bg-slate-50 border border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 block">Professional Tax (PT)</span>
                <span className="text-[11px] text-slate-500">State statutory deduction</span>
              </div>
              <div className="text-right">
                {isEditingSalary && isAdmin ? (
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 font-semibold">₹</span>
                    <input
                      type="number"
                      value={draftSalary.taxDeductions.professionalTax}
                      onChange={(e) => handleTaxChange(Number(e.target.value) || 0)}
                      className="w-20 p-1 border border-slate-300 rounded text-xs text-right font-semibold"
                    />
                  </div>
                ) : (
                  <div>
                    <span className="font-bold text-slate-900">
                      {formatINR(currentSalary.taxDeductions.professionalTax)}
                    </span>
                    <span className="text-slate-600 text-[11px]"> / month</span>
                  </div>
                )}
              </div>
            </div>

            {/* Net Take-Home Calculation Summary */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950 mt-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs uppercase tracking-wide text-emerald-900">
                    Estimated Net Take-Home
                  </span>
                  <p className="text-[10px] text-emerald-700">Gross Wage - Employee PF - PT</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-900">
                    {formatINR(netMonthlySalary)}
                  </span>
                  <span className="text-[11px] text-emerald-800"> / mo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
