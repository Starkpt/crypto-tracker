export function attributeHoursToChartData(values: (number | string)[]) {
  // Initialize an array to store the attributed hour marks
  const attributedValues = [];

  // Start from the last index and decrement by 1 for each value
  let currentHour = new Date();

  for (let i = values.length - 1; i >= 0; i--) {
    // Format the current hour mark
    const formattedTime = new Intl.DateTimeFormat(navigator.language, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
      .format(currentHour)
      .replace(/,\\s?/g, "-")
      .replace(",", "");

    // Assign the current hour mark and value to the current entry
    attributedValues[i] = {
      x: formattedTime,
      y: values[i],
    };

    // Decrement the hour mark by 1
    currentHour = new Date(currentHour.getTime() - 60 * 60 * 1000);
  }

  // Return the array of attributed values
  return attributedValues;
}
