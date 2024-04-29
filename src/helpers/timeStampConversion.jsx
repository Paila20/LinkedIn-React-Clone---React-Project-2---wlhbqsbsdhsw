export const timeStampConversionToDateAndTime = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
     
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  } else {
    return "";
  }
};
