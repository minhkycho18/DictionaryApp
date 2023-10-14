const calculateDateTime = (date) => {
  const initDate = new Date(date);
  const currentDateTime = new Date();
  const timeDiff = currentDateTime - initDate;
  const dayCount = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return dayCount;
};
export default calculateDateTime;
