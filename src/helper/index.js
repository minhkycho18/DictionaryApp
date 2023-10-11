import { colorPos } from "~/constants/theme" ;


export const GetColor = text => {
    for (const item of colorPos) {
        if (text in item) {
          return item[text]; 
        }
      }
}