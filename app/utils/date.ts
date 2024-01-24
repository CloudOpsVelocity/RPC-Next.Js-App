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

  // Get the day of the week (0-6, where 0 is Sunday and 6 is Saturday)
  const dayOfWeek = date.getDay();

  // Calculate the number of milliseconds in one day
  const oneDay = 24 * 60 * 60 * 1000;

  // Calculate the new date by subtracting one day
  const newDate = new Date(date?.getTime() - oneDay);

  // Format the new date string
  const formattedDate = newDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    // day: "numeric",
    year: "numeric",
  });

  return formattedDate;
}
export { formatDate };
