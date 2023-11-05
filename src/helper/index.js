import { colorPos } from "~/constants/theme";


export const GetColor = text => {
  for (const item of colorPos) {
    if (text in item) {
      return item[text];
    }
  }
}
export const UpperText = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
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