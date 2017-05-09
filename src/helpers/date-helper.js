const monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

export const formatDate = 
  date => date.getFullYear() + ' ' + monthNames[date.getMonth()] + ' ' + date.getDate();