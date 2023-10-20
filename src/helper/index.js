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