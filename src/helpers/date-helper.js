const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

/**
 * Gets the formatted (yyyy mmm dd) version of the given Date.
 * @param   {Date} date The date to format
 * @returns {string} The formatted string
 */
export const formatDate = 
  date => date.getFullYear() + ' ' + monthNames[date.getMonth()] + ' ' + date.getDate();