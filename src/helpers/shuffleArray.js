const shuffleArray = (originalArray) => {
  let newArray = originalArray.slice();

  newArray.sort(function () {
    return 0.5 - Math.random();
  });
  if (newArray === originalArray) {
    return shuffleArray(originalArray);
  }
  if (newArray.join("") === originalArray.reverse().join("")) {
    return shuffleArray(originalArray);
  }
  return newArray;
};
export default shuffleArray;
