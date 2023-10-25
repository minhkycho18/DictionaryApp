const calculateDateTime = (date) => {
  const dateParts = date.split("-");
  if (dateParts.length !== 3) {
    throw new Error("Invalid date format. Please use 'dd-mm-yyyy'.");
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Lưu ý: Tháng trong đối tượng Date bắt đầu từ 0 (0 là tháng 1, 11 là tháng 12)
  const year = parseInt(dateParts[2], 10);

  const initDate = new Date(year, month, day);
  const currentDateTime = new Date();
  const timeDiff = currentDateTime - initDate;
  const dayCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return dayCount;
};
export default calculateDateTime;
