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
export { formatDate, formatDateDDMMYYYY };
