/**
 * Formatting utilities for dates and currencies
 * Supports international formats and multiple currencies
 */

/**
 * Format date according to locale
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-US', options = {}) => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const defaultOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
};

/**
 * Format date with time
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date with time string
 */
export const formatDateTime = (date, locale = 'en-US') => {
  if (!date) return '';
  
  const dateObj = date instanceof Date ? date : new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const formattedDate = formatDate(date, locale);
  const time = dateObj.toLocaleTimeString(locale, { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });
  
  return `${formattedDate} at ${time}`;
};

/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale string (default: 'en-US')
 * @param {object} options - Intl.NumberFormat options
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US', options = {}) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return formatCurrency(0, currency, locale, options);
  }

  const defaultOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options
  };

  return new Intl.NumberFormat(locale, defaultOptions).format(amount);
};

/**
 * Format number with locale-specific formatting
 * @param {number} number - Number to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @param {object} options - Intl.NumberFormat options
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, locale = 'en-US', options = {}) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options
  };

  return new Intl.NumberFormat(locale, defaultOptions).format(number);
};

/**
 * Format currency for display (simplified format)
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string with symbol
 */
export const formatCurrencySimple = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    TRY: '₺',
  };

  const symbol = currencySymbols[currency] || currency;
  return `${symbol}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

/**
 * Get currency from data object
 * @param {object} data - Data object that may contain currency info
 * @returns {string} Currency code (default: 'USD')
 */
export const getCurrency = (data) => {
  if (data?.currency) return data.currency;
  if (data?.amount?.currency) return data.amount.currency;
  return 'USD';
};

/**
 * Get amount from data object
 * @param {object} data - Data object that may contain amount info
 * @returns {number} Amount value
 */
export const getAmount = (data) => {
  if (typeof data === 'number') return data;
  if (data?.amount !== undefined) return typeof data.amount === 'number' ? data.amount : (data.amount?.amount || 0);
  return 0;
};
