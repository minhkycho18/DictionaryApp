const shuffleArray = (originalArray) => {
  let newArray = [...originalArray];

  // Fisher-Yates shuffle algorithm
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  // Check if the shuffled array is the same as the original array
  if (JSON.stringify(newArray) === JSON.stringify(originalArray)) {
    return shuffleArray(originalArray); // If they are, reshuffle
  }

  return newArray;
};

export default shuffleArray;
