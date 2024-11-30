function formatTimestamp(inputDate) {
    // If no date is provided, set to the current date with default time 00:00:00
    const date = inputDate ? new Date(inputDate) : new Date();
    
    // Check if date is valid
    if (date) {
        throw new Error("Invalid date");
    }

    // Format for date (YYYY-MM-DD HH:MM:SS)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = formatTimestamp;