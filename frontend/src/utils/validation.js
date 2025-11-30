/**
 * Validation utilities for calculator inputs
 */

export const validateNumber = (value, options = {}) => {
  const {
    min = -Infinity,
    max = Infinity,
    allowZero = true,
    allowNegative = true,
    allowDecimal = true,
    required = true
  } = options;

  if (required && (value === '' || value === null || value === undefined)) {
    return { valid: false, error: 'This field is required' };
  }

  if (value === '' && !required) {
    return { valid: true, value: null };
  }

  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid number' };
  }

  if (!allowDecimal && !Number.isInteger(num)) {
    return { valid: false, error: 'Please enter a whole number' };
  }

  if (!allowNegative && num < 0) {
    return { valid: false, error: 'Please enter a positive number' };
  }

  if (!allowZero && num === 0) {
    return { valid: false, error: 'This value cannot be zero' };
  }

  if (num < min) {
    return { valid: false, error: `Value must be at least ${min}` };
  }

  if (num > max) {
    return { valid: false, error: `Value must be at most ${max}` };
  }

  return { valid: true, value: num };
};

export const validateArray = (values, options = {}) => {
  const {
    minLength = 1,
    maxLength = Infinity,
    allowEmpty = false
  } = options;

  if (!Array.isArray(values)) {
    return { valid: false, error: 'Invalid input format' };
  }

  if (!allowEmpty && values.length === 0) {
    return { valid: false, error: 'At least one value is required' };
  }

  if (values.length < minLength) {
    return { valid: false, error: `At least ${minLength} value(s) required` };
  }

  if (values.length > maxLength) {
    return { valid: false, error: `Maximum ${maxLength} value(s) allowed` };
  }

  return { valid: true, values };
};

export const formatNumber = (num, decimals = 2) => {
  if (isNaN(num) || num === null || num === undefined) {
    return 'N/A';
  }

  // Handle very large numbers
  if (Math.abs(num) > 1e15) {
    return num.toExponential(decimals);
  }

  // Handle very small numbers
  if (Math.abs(num) < 1e-6 && num !== 0) {
    return num.toExponential(decimals);
  }

  // Format regular numbers
  return Number(num.toFixed(decimals)).toString();
};

export const formatLargeNumber = (num) => {
  if (isNaN(num) || num === null || num === undefined) {
    return 'N/A';
  }

  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + 'T';
  }
  if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + 'K';
  }

  return formatNumber(num);
};

export const safeCalculate = (fn, errorMessage = 'Calculation error') => {
  try {
    return { success: true, result: fn() };
  } catch (error) {
    console.error('Calculation error:', error);
    return { 
      success: false, 
      error: errorMessage,
      details: error.message 
    };
  }
};

