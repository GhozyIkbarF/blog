import date from "date-and-time";

const timePosted = (inputDate: string): string => {
  const currentDate = new Date();
  const inputDateTime = new Date(inputDate);
  const timeDifference = currentDate.getTime() - inputDateTime.getTime();

  if (timeDifference >= 86400000) {
    const days = Math.floor(timeDifference / 86400000);
    return `${days}d`;
  } else if (timeDifference >= 3600000) {
    const hours = Math.floor(timeDifference / 3600000);
    return `${hours}h`;
  } else if (timeDifference >= 60000) {
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes}m`;
  } else if (timeDifference >= 1000) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds}s`;
  } else {
    return "Now";
  }
};

const createdAt = (inputDate: string | undefined) => {
  if (inputDate) {
    const parsedDate = date.parse(inputDate, "YYYY-MM-DD HH:mm:ss.SSS");
    const formattedDate = date.format(parsedDate, "h:mm A · MMM DD, YYYY");
    return formattedDate;
  }
};

export { timePosted, createdAt };
