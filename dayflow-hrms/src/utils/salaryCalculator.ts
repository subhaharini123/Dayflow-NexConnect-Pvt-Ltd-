import { SalaryComponent, SalaryData } from '../types';

export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return '₹' + Math.round(amount).toLocaleString('en-IN');
}

export function formatINRWithDecimals(amount: number): string {
  if (isNaN(amount)) return '₹0.00';
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function calculateSalaryData(
  monthlyWage: number,
  components: SalaryComponent[],
  pfEmployeePercent: number = 12,
  pfEmployerPercent: number = 12,
  professionalTax: number = 200,
  workingDaysPerWeek: number = 5,
  breakTimeHours: number = 1
): SalaryData {
  const yearlyWage = monthlyWage * 12;

  // First pass: Calculate Basic Salary if present
  let basicSalaryAmount = 0;
  const basicComp = components.find(c => c.name.toLowerCase().includes('basic'));
  if (basicComp) {
    if (basicComp.type === 'PERCENTAGE') {
      basicSalaryAmount = (monthlyWage * basicComp.value) / 100;
    } else {
      basicSalaryAmount = basicComp.value;
    }
  } else {
    basicSalaryAmount = monthlyWage * 0.5; // default fallback 50%
  }

  // Second pass: Calculate all components
  const calculatedComponents: SalaryComponent[] = components.map(comp => {
    let amount = 0;
    if (comp.type === 'PERCENTAGE') {
      if (comp.percentageOf === 'BASIC') {
        amount = (basicSalaryAmount * comp.value) / 100;
      } else {
        // Default to percentage of monthly wage
        amount = (monthlyWage * comp.value) / 100;
      }
    } else {
      amount = comp.value;
    }

    return {
      ...comp,
      calculatedAmount: amount,
    };
  });

  // Calculate PF (typically on Basic Salary)
  const employeePFAmount = (basicSalaryAmount * pfEmployeePercent) / 100;
  const employerPFAmount = (basicSalaryAmount * pfEmployerPercent) / 100;

  return {
    monthlyWage,
    yearlyWage,
    workingDaysPerWeek,
    breakTimeHours,
    components: calculatedComponents,
    pfContribution: {
      employeePercentage: pfEmployeePercent,
      employerPercentage: pfEmployerPercent,
      employeeAmount: employeePFAmount,
      employerAmount: employerPFAmount,
    },
    taxDeductions: {
      professionalTax,
    },
  };
}

export function getDefaultSalaryData(monthlyWage: number = 50000): SalaryData {
  const defaultComponents: SalaryComponent[] = [
    {
      id: 'comp-1',
      name: 'Basic Salary',
      type: 'PERCENTAGE',
      value: 50.00,
      percentageOf: 'MONTHLY_WAGE',
      calculatedAmount: 25000,
    },
    {
      id: 'comp-2',
      name: 'House Rent Allowance',
      type: 'PERCENTAGE',
      value: 50.00,
      percentageOf: 'BASIC',
      calculatedAmount: 12500,
    },
    {
      id: 'comp-3',
      name: 'Standard Allowance',
      type: 'PERCENTAGE',
      value: 16.67,
      percentageOf: 'MONTHLY_WAGE',
      calculatedAmount: 4167,
    },
    {
      id: 'comp-4',
      name: 'Performance Bonus',
      type: 'PERCENTAGE',
      value: 8.33,
      percentageOf: 'MONTHLY_WAGE',
      calculatedAmount: 2082.50,
    },
    {
      id: 'comp-5',
      name: 'Leave Travel Allowance',
      type: 'PERCENTAGE',
      value: 8.33,
      percentageOf: 'MONTHLY_WAGE',
      calculatedAmount: 2082.50,
    },
    {
      id: 'comp-6',
      name: 'Fixed Allowance',
      type: 'PERCENTAGE',
      value: 11.67,
      percentageOf: 'MONTHLY_WAGE',
      calculatedAmount: 2918,
    },
  ];

  return calculateSalaryData(monthlyWage, defaultComponents, 12, 12, 200, 5, 1);
}
