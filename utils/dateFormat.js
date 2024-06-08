// Function to format a JavaScript Date object to MM/DD/YYYY format
const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [month, day, year].join('/');
  };
  
  // Export the formatDate function to be used in other files
  module.exports = { formatDate };
  