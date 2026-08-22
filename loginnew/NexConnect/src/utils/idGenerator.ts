/**
 * Dayflow HRMS - ID & Security Generator Utilities
 * 
 * Auto-generated Login ID format:
 * [First 2 letters of Company Name][First 2 letters of employee's first+last name][Year of Joining][4-digit serial number for that year]
 * Example: OIJODO20220001
 *   OI   -> Odoo India (Company Name)
 *   JODO -> First 2 letters of First Name (JO) + First 2 letters of Last Name (DO)
 *   2022 -> Year of Joining
 *   0001 -> 4-digit Serial Number for that year
 */

export function extractCompanyCode(companyName: string): string {
  if (!companyName || !companyName.trim()) return 'DF';
  const clean = companyName.trim().replace(/[^a-zA-Z0-9\s]/g, '');
  const words = clean.split(/\s+/).filter(Boolean);
  
  if (words.length >= 2) {
    // e.g. "Odoo India" -> "OI", "Acme Corp" -> "AC"
    const code = (words[0][0] + words[1][0]).toUpperCase();
    return code.length === 2 ? code : code.padEnd(2, 'X');
  } else if (words.length === 1) {
    // e.g. "Dayflow" -> "DA", "Meta" -> "ME"
    const single = words[0].toUpperCase();
    return single.length >= 2 ? single.substring(0, 2) : single.padEnd(2, 'X');
  }
  return 'DF';
}

export function extractNameCode(fullName: string): string {
  if (!fullName || !fullName.trim()) return 'USER';
  const clean = fullName.trim().replace(/[^a-zA-Z\s]/g, '');
  const parts = clean.split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    const first = parts[0].toUpperCase();
    const last = parts[parts.length - 1].toUpperCase();
    const firstTwo = first.length >= 2 ? first.substring(0, 2) : first.padEnd(2, 'X');
    const lastTwo = last.length >= 2 ? last.substring(0, 2) : last.padEnd(2, 'X');
    return `${firstTwo}${lastTwo}`; // e.g. "John Doe" -> "JODO"
  } else if (parts.length === 1) {
    const single = parts[0].toUpperCase();
    return single.length >= 4 ? single.substring(0, 4) : single.padEnd(4, 'X');
  }
  return 'USER';
}

export function generateLoginId(
  companyName: string,
  fullName: string,
  yearOfJoining: number = new Date().getFullYear(),
  serialNumber: number = 1
): string {
  const companyCode = extractCompanyCode(companyName);
  const nameCode = extractNameCode(fullName);
  const yearCode = String(yearOfJoining);
  const serialCode = String(serialNumber).padStart(4, '0');

  return `${companyCode}${nameCode}${yearCode}${serialCode}`;
}

/**
 * Generates a random secure temporary password (8-10 characters)
 * Mix of uppercase, lowercase, numbers, and allowed symbols.
 */
export function generateSecureTempPassword(length: number = 9): string {
  const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowers = 'abcdefghijkmnopqrstuvwxyz';
  const numbers = '23456789';
  const symbols = '!@#$%^&*';

  // Ensure at least one of each category
  const passwordArr = [
    uppers[Math.floor(Math.random() * uppers.length)],
    lowers[Math.floor(Math.random() * lowers.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
  ];

  const allChars = uppers + lowers + numbers + symbols;
  for (let i = passwordArr.length; i < length; i++) {
    passwordArr.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the password characters
  for (let i = passwordArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArr[i], passwordArr[j]] = [passwordArr[j], passwordArr[i]];
  }

  return passwordArr.join('');
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  bgColor: string;
  feedback: string[];
  passedCriteria: {
    length: boolean;
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
  };
}

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  const criteria = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[^A-Za-z0-9]/.test(password),
  };

  let score = 0;
  if (password.length >= 6) score += 1;
  if (criteria.length) score += 1;
  if (criteria.hasUpper && criteria.hasLower) score += 1;
  if (criteria.hasNumber || criteria.hasSymbol) score += 1;

  const feedback: string[] = [];
  if (!criteria.length) feedback.push('At least 8 characters');
  if (!criteria.hasUpper) feedback.push('1 uppercase letter');
  if (!criteria.hasLower) feedback.push('1 lowercase letter');
  if (!criteria.hasNumber) feedback.push('1 number');
  if (!criteria.hasSymbol) feedback.push('1 special character');

  if (score <= 1) {
    return {
      score: 1,
      label: 'Weak',
      color: 'text-rose-500',
      bgColor: 'bg-rose-500',
      feedback,
      passedCriteria: criteria,
    };
  }
  if (score === 2) {
    return {
      score: 2,
      label: 'Fair',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500',
      feedback,
      passedCriteria: criteria,
    };
  }
  if (score === 3) {
    return {
      score: 3,
      label: 'Good',
      color: 'text-sky-500',
      bgColor: 'bg-sky-500',
      feedback,
      passedCriteria: criteria,
    };
  }
  return {
    score: 4,
    label: 'Strong',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
    feedback: ['Strong and secure password'],
    passedCriteria: criteria,
  };
}
