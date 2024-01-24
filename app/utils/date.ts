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
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}

export { formatDate };
