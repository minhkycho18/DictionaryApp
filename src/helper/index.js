import { colorPos } from "~/constants/theme";


export const GetColor = text => {
  for (const item of colorPos) {
    if (text in item) {
      return item[text];
    }
  }
}
export const UpperText = text => {
  return text?.charAt(0).toUpperCase() + text?.slice(1);
}
export const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
export const convertData = (data) => {
  let key = 0;
  const result = data.map((item) => {
    if (item.definitions.length > 0) {
      return item.definitions.map((i) => {
        key += 1;
        return {
          key: key,
          wordid: item.id,
          word: item.word,
          pos: item.pos,
          defId: i.defId,
          wordDesc: i.wordDesc,
          isWordOfUserWordlist: i.isWordOfUserWordlist
        }
      });

    }
  });
  return result.reduce((acc, subArray) => acc.concat(subArray), []).filter(element => element !== undefined);

}
export const getIdValueInArr = (arr, newId) => {
  for (const item of arr) {
    if (item.id === newId) {
      return item.value;
    }
  }
}
export const checkData = (arr, obj) => {
  return arr.some(item => item.defId === obj.defId && item.vocabId === obj.vocabId)
}
export const checkNull = (str) => {
  if (str === null || str === "") {
    return false
  }
  else {
    return true
  }
}
export const getNameLevel = (level) => {
  if (level === "0") return "waiting";
  else if (level === "7") return "learned";
  else return `Box ${level}`
}

export const filterBoxes = (data, level) => {
  data.shift();
  if (level < 4) {
    return data.slice(0, 5)
  }
  else if (level >= 4 && level < 6) {
    return data.slice(2)
  }
  else if (level >= 6) {
    return data.slice(3)
  }

}
export const compareDate = (date) => {
  var [datePart, timePart] = date.split(" ");
  var [day, month, year] = datePart.split("-");
  var [hour, minute, second] = timePart.split(":");
  var providedDate = new Date(year, month - 1, day, hour, minute, second);
  // var providedDate = new Date(date)
  var currentDate = new Date();
  if (currentDate.getTime() >= providedDate.getTime()) {

    return true
  } else {
    return false
  }
}
export const getVocalIdAndDefId = (data) => {
  return data.map(item => (
    {
      vocabId: item.vocabId,
      defId: item.defId
    }
  ))
}
export const totalLearning = (arr) => {
  let total = 0;
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].level !== "0" || arr[index].level !== "0") {
      total += arr[index].amountOfWord
    }
  }
  return total
}
export const returnHighLevel = arr => {
  for (let index = arr.length - 1; index > 0; index--) {
    if (arr[index].needStudy) {
      return arr[index].level;
    }
  }
}