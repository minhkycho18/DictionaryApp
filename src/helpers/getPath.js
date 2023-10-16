const getFullPath = (pathname = "") => {
  const arrPath = pathname.split("/").filter(Boolean);
  const pathLevels = arrPath.map((path, index) => ({
    title: capitalizeFirstLetter(path),
    link: `/${arrPath.slice(0, index + 1).join("/")}`,
  }));
  return pathLevels;
};

function capitalizeFirstLetter(str) {
  return str.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}

export default getFullPath;
