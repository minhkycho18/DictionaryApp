import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: 'rgba(97, 47, 222, 0.8)',
  gray: '#8b8989',
  lightGray: '#b2b2b2',
  light: '#fbfbfb',
  white: '#fff',
  black: '#000',
  textColor: '#6b7280',
  textTitle: '#07285a',
  icon: "#182B40"

};
export const colorStudy = {
  review: '#878E93',
  flashcard: '#37CABE',
  spelling: '#B7ADFF',
  quiz: '#3A91EF',
}
export const svgStudy = {
  review: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.27 209"><title>Asset 14@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M160.48,28.32l-27.6-5.72A25,25,0,0,0,108,0H25A25,25,0,0,0,0,25V169.51a25,25,0,0,0,25,25H57.15a5.25,5.25,0,0,0,2,.88l64,13.25a17.79,17.79,0,0,0,3.54.36,17.29,17.29,0,0,0,16.91-13.8L173.91,48.78A17.34,17.34,0,0,0,160.48,28.32ZM10,169.51V25A15,15,0,0,1,25,10h83a15,15,0,0,1,15,15V169.51a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.51Z" fill="#878E93"/><path d="M95,114.4H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill="#878E93"/><path d="M95,92.15H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill="#878E93"/></g></g></svg>`,
  flashcard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.29 209"><title>Asset 13@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M160.49,28.22,133,22.52A25,25,0,0,0,108.08,0H25A25,25,0,0,0,0,25V169.62a25,25,0,0,0,25,25H57.62a5.15,5.15,0,0,0,2,.87l63.5,13.15a17.82,17.82,0,0,0,3.55.36,17.31,17.31,0,0,0,16.91-13.8L173.93,48.68A17.34,17.34,0,0,0,160.49,28.22Zm-37.41,141.4a15,15,0,0,1-15,15H25a15,15,0,0,1-15-15V25A15,15,0,0,1,25,10h83.08a15,15,0,0,1,15,15Z" fill="#37CABE"/><path d="M58.92,106.74c4.56,4.56-2.51,11.63-7.07,7.07l-9.66-9.66-9.51,9.51c-4.56,4.56-11.63-2.52-7.07-7.07l9.51-9.51-9.51-9.51C21.05,83,28.13,75.94,32.68,80.5L42.19,90l9.66-9.66c4.56-4.56,11.63,2.51,7.07,7.07l-9.66,9.66Z" fill="#37CABE"/><path d="M112.93,88.18,89.08,116.61a3.8,3.8,0,0,1-1.74,1.17.73.73,0,0,1-.25.08,5.44,5.44,0,0,1-5.22-1.15L67.65,104.78c-2.08-1.74-1.78-5.29,0-7.07a5.13,5.13,0,0,1,7.07,0q5.05,4.23,10.1,8.48l21-25.08c1.74-2.08,5.29-1.78,7.07,0A5.13,5.13,0,0,1,112.93,88.18Z" fill="#37CABE"/></g></g></svg>`,
  spelling: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.88 210"><title>Asset 15@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M108.26,0H25A25,25,0,0,0,0,25V169.9a25,25,0,0,0,25,25H56.85a5.31,5.31,0,0,1,3.77-9.05h55.93a7.32,7.32,0,0,0,7.32-7.32V21.26l9.32,1.93A25,25,0,0,0,108.26,0Zm15,169.9a15,15,0,0,1-15,15H25a15,15,0,0,1-15-15V25A15,15,0,0,1,25,10h83.26a15,15,0,0,1,15,15Z" fill="#B7ADFF"/><path d="M102.9,124.75,75.34,63.68l-4-8.79a4.33,4.33,0,0,0-3.32-2.34,5.58,5.58,0,0,0-1.68-.05,4.76,4.76,0,0,0-3.66,2.44,3.89,3.89,0,0,0-.25.55L35.18,116l-4,8.78c-1.11,2.46-.71,5.38,1.79,6.84,2.14,1.26,5.73.68,6.84-1.79l10-22.23H84.23L90.3,121l4,8.78c1.11,2.46,4.69,3.06,6.84,1.79C103.64,130.11,104,127.22,102.9,124.75ZM54.39,97.57q6.35-14,12.67-28.07L79.72,97.57Z" fill="#B7ADFF"/><path d="M66.38,52.5a4.76,4.76,0,0,0-3.66,2.44s0,0,0-.05A4.4,4.4,0,0,1,66.38,52.5Z"/><path d="M174.52,49.45l-30.4,146.73A17.33,17.33,0,0,1,127.19,210a17.89,17.89,0,0,1-3.55-.36L59.55,196.36a5.31,5.31,0,0,1,1.07-10.51h55.93a7.32,7.32,0,0,0,7.32-7.32V21.26l9.32,1.93L161.07,29A17.37,17.37,0,0,1,174.52,49.45Z" fill="#B7ADFF"/></g></g></svg>`,
  quiz: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.32 209.01"><title>Asset 12@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M58.13,75.28a4,4,0,0,0-4,4v2a6,6,0,0,1-12,0v-2A16.08,16.08,0,0,1,58.13,63.23H72.69A17.51,17.51,0,0,1,90.26,80.57a17.05,17.05,0,0,1-8.53,15.06l-11.55,7.15v.6a6,6,0,1,1-12,0v-4a6,6,0,0,1,2.94-5.17l14.46-8.68a6.1,6.1,0,0,0,2.69-4.94,5.46,5.46,0,0,0-5.52-5.3Z" fill="#3A91EF"/><circle cx="64.15" cy="123.47" r="8.03" fill="#3A91EF"/><path d="M160.54,28.41l-27.71-5.74A25,25,0,0,0,107.94,0H25A25,25,0,0,0,0,25V169.42a25,25,0,0,0,25,25H57.13a5,5,0,0,0,2.15,1l63.93,13.24a17.29,17.29,0,0,0,20.44-13.43L174,48.86A17.34,17.34,0,0,0,160.54,28.41ZM10,169.42V25A15,15,0,0,1,25,10h82.94a15,15,0,0,1,15,15V169.42a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.42Z" fill="#3A91EF"/></g></g></svg>`,
}
export const colorPos = [
  { verb: '#69b1ff' },
  { noun: '#5cdbd3' },
  { adjective: '#ff7875' },
  { interjection: "#c0c3cf" },
  { phrase: "#4096ff" },
  { adverb: "#b37feb" },
  { preposition: "#ffd666" },
  { determiner: "#c0c3cf" },
  { pronoun: "#95de64" },
  { "phrasal verb": " #4096ff" },
  { article: "#c0c3cf" }
]

export const colorSynonym = [
  {
    Synonym: {
      bg: "#CFE5DE",
      text: "#467A4D"
    }
  },
  {
    Antonym: {
      bg: "#FDEFEF",
      text: "#D15C67"
    }
  }

]
export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  body: 14,
  caption: 12,
  radius: 16,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};
export const svgreview = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.27 209"><title>Asset 14@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M160.48,28.32l-27.6-5.72A25,25,0,0,0,108,0H25A25,25,0,0,0,0,25V169.51a25,25,0,0,0,25,25H57.15a5.25,5.25,0,0,0,2,.88l64,13.25a17.79,17.79,0,0,0,3.54.36,17.29,17.29,0,0,0,16.91-13.8L173.91,48.78A17.34,17.34,0,0,0,160.48,28.32ZM10,169.51V25A15,15,0,0,1,25,10h83a15,15,0,0,1,15,15V169.51a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.51Z" fill="#0D48A3"/><path d="M95,114.4H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill="#0D48A3"/><path d="M95,92.15H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill="#0D48A3"/></g></g></svg>'
export const svgstudy = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" class="svg-inline--fa fa-graduation-cap " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"> <path fill="#FEFEFE"  d="M623.1 136.9l-282.7-101.2c-13.73-4.91-28.7-4.91-42.43 0L16.05 136.9C6.438 140.4 0 149.6 0 160s6.438 19.65 16.05 23.09L76.07 204.6c-11.89 15.8-20.26 34.16-24.55 53.95C40.05 263.4 32 274.8 32 288c0 9.953 4.814 18.49 11.94 24.36l-24.83 149C17.48 471.1 25 480 34.89 480H93.11c9.887 0 17.41-8.879 15.78-18.63l-24.83-149C91.19 306.5 96 297.1 96 288c0-10.29-5.174-19.03-12.72-24.89c4.252-17.76 12.88-33.82 24.94-47.03l190.6 68.23c13.73 4.91 28.7 4.91 42.43 0l282.7-101.2C633.6 179.6 640 170.4 640 160S633.6 140.4 623.1 136.9zM351.1 314.4C341.7 318.1 330.9 320 320 320c-10.92 0-21.69-1.867-32-5.555L142.8 262.5L128 405.3C128 446.6 213.1 480 320 480c105.1 0 192-33.4 192-74.67l-14.78-142.9L351.1 314.4z"></path></svg>'

export const configFont = {
  "Quicksand-Bold": require("~/assets/fonts/Quicksand-Bold.ttf"),
  "Quicksand-SemiBold": require("~/assets/fonts/Quicksand-SemiBold.ttf"),
  "Quicksand-Regular": require("~/assets/fonts/Quicksand-Regular.ttf"),
  "Quicksand-Medium": require("~/assets/fonts/Quicksand-Medium.ttf"),
  "Quicksand-Light": require("~/assets/fonts/Quicksand-Light.ttf"),
}
