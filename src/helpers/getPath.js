const getFullPath = (pathname = "") => {
  const arrPath = pathname.split("/");
  const result = {
    parent: capitalizeFirstLetter(arrPath[1]),
    child: capitalizeFirstLetter(arrPath[2]),
  };
  return result;
};
function capitalizeFirstLetter(str) {
  return str.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}
export default getFullPath;
