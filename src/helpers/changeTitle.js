function capitalizeFirstLetter(str) {
  return str.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}
const changeTitle = (path = "") => {
  const arrPath = path.split("/").filter(Boolean);
  document.title = arrPath
    ? "Vocabulary app"
    : capitalizeFirstLetter(arrPath[arrPath.length - 1]) + " - Vocabulary App";
};
export default changeTitle;
