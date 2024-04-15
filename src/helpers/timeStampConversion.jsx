export const timeStampConversionToDateAndTime = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
      // hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } else {
    return "";
  }
};
