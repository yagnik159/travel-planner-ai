class Common {

    constructor() {
    }

    static convertDateFormat(inputDate) {
        // Split the input date string into day, month, and year
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
            throw new Error('Invalid date format. Please use "dd-mm-yyyy" format.');
        }

        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const year = parseInt(parts[2]);

        // Create a Date object with the parsed values
        const dateObject = new Date(year, month - 1, day);

        // Check if the date is valid
        if (isNaN(dateObject.getTime())) {
            throw new Error('Invalid date.');
        }

        // Format the date as "yyyy-mm-dd"
        const formattedDate = dateObject.toISOString().split('T')[0];

        return formattedDate;
    }

    static addDaysToDate(inputDate, daysToAdd) {
        // Parse the input date string in "yyyy-mm-dd" format
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
            throw new Error('Invalid date format. Please use "yyyy-mm-dd" format.');
        }

        const day = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const year = parseInt(parts[2]);

        // Create a Date object with the parsed values
        const dateObject = new Date(year, month - 1, day);

        // Add the specified number of days
        dateObject.setDate(dateObject.getDate() + daysToAdd);

        // Format the new date as "yyyy-mm-dd"
        const newDate = dateObject.toISOString().split('T')[0];

        return newDate;
    }
}

module.exports = Common;