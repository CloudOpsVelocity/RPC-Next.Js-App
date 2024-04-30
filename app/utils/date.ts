function formatDate(inputDate: string | undefined): string {
  if (inputDate == null) {
    return ""; // You can return an empty string or any default value
  }

  // Convert the input string to a Date object
  const date = new Date(inputDate.replace(/IST/, "GMT+0530"));

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Format the date string with the desired format
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();

  const formattedDate = `${day} ${month}, ${year}`;

  return formattedDate;
}
function formatDateDDMMYYYY(inputDate: string | undefined): string {
  if (inputDate == null) {
    return ""; // You can return an empty string or any default value
  }

  // Convert the input string to a Date object
  const date = new Date(inputDate.replace(/IST/, "GMT+0530"));

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Format the date string with the desired format
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  const formattedDate = `${day}/ ${month}/ ${year}`;
  return formattedDate;
}

function convertDateToMonthYear(dateString: string): string {
  // Split the date string into day, month, and year
  const parts: string[] = dateString.split("/");
  const day: number = parseInt(parts[0], 10);
  const month: number = parseInt(parts[1], 10);
  const year: number = parseInt(parts[2], 10);

  // Define month names array
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert the month number to month name
  const monthName: string = monthNames[month - 1];

  // Return the formatted date string
  return `${monthName}, ${year}`;
}
export { formatDate, formatDateDDMMYYYY, convertDateToMonthYear };
