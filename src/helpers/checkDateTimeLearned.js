const compareDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hour, minute, second] = timePart.split(":");

  // Chú ý rằng month - 1 vì tháng trong Date bắt đầu từ 0 (0 - 11)
  const providedDate = new Date(year, month - 1, day, hour, minute, second);
  const currentDate = new Date();

  if (currentDate.getTime() >= providedDate.getTime()) {
    return true;
  } else {
    return false;
  }
};

export default compareDate;
