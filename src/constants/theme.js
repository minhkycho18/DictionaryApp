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
export const svgStudy = (type, color) => {
  switch (type) {
    case "review":
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.27 209"><title>Asset 14@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M160.48,28.32l-27.6-5.72A25,25,0,0,0,108,0H25A25,25,0,0,0,0,25V169.51a25,25,0,0,0,25,25H57.15a5.25,5.25,0,0,0,2,.88l64,13.25a17.79,17.79,0,0,0,3.54.36,17.29,17.29,0,0,0,16.91-13.8L173.91,48.78A17.34,17.34,0,0,0,160.48,28.32ZM10,169.51V25A15,15,0,0,1,25,10h83a15,15,0,0,1,15,15V169.51a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.51Z" fill=${color}/><path d="M95,114.4H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill=${color}/><path d="M95,92.15H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill=${color}/></g></g></svg>`
    case 'flashcard':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.29 209"><title>Asset 13@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M160.49,28.22,133,22.52A25,25,0,0,0,108.08,0H25A25,25,0,0,0,0,25V169.62a25,25,0,0,0,25,25H57.62a5.15,5.15,0,0,0,2,.87l63.5,13.15a17.82,17.82,0,0,0,3.55.36,17.31,17.31,0,0,0,16.91-13.8L173.93,48.68A17.34,17.34,0,0,0,160.49,28.22Zm-37.41,141.4a15,15,0,0,1-15,15H25a15,15,0,0,1-15-15V25A15,15,0,0,1,25,10h83.08a15,15,0,0,1,15,15Z" fill=${color}/><path d="M58.92,106.74c4.56,4.56-2.51,11.63-7.07,7.07l-9.66-9.66-9.51,9.51c-4.56,4.56-11.63-2.52-7.07-7.07l9.51-9.51-9.51-9.51C21.05,83,28.13,75.94,32.68,80.5L42.19,90l9.66-9.66c4.56-4.56,11.63,2.51,7.07,7.07l-9.66,9.66Z" fill=${color}/><path d="M112.93,88.18,89.08,116.61a3.8,3.8,0,0,1-1.74,1.17.73.73,0,0,1-.25.08,5.44,5.44,0,0,1-5.22-1.15L67.65,104.78c-2.08-1.74-1.78-5.29,0-7.07a5.13,5.13,0,0,1,7.07,0q5.05,4.23,10.1,8.48l21-25.08c1.74-2.08,5.29-1.78,7.07,0A5.13,5.13,0,0,1,112.93,88.18Z" fill=${color}/></g></g></svg>`
    case 'spelling':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.88 210"><title>Asset 15@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M108.26,0H25A25,25,0,0,0,0,25V169.9a25,25,0,0,0,25,25H56.85a5.31,5.31,0,0,1,3.77-9.05h55.93a7.32,7.32,0,0,0,7.32-7.32V21.26l9.32,1.93A25,25,0,0,0,108.26,0Zm15,169.9a15,15,0,0,1-15,15H25a15,15,0,0,1-15-15V25A15,15,0,0,1,25,10h83.26a15,15,0,0,1,15,15Z" fill=${color}/><path d="M102.9,124.75,75.34,63.68l-4-8.79a4.33,4.33,0,0,0-3.32-2.34,5.58,5.58,0,0,0-1.68-.05,4.76,4.76,0,0,0-3.66,2.44,3.89,3.89,0,0,0-.25.55L35.18,116l-4,8.78c-1.11,2.46-.71,5.38,1.79,6.84,2.14,1.26,5.73.68,6.84-1.79l10-22.23H84.23L90.3,121l4,8.78c1.11,2.46,4.69,3.06,6.84,1.79C103.64,130.11,104,127.22,102.9,124.75ZM54.39,97.57q6.35-14,12.67-28.07L79.72,97.57Z" fill=${color}/><path d="M66.38,52.5a4.76,4.76,0,0,0-3.66,2.44s0,0,0-.05A4.4,4.4,0,0,1,66.38,52.5Z"/><path d="M174.52,49.45l-30.4,146.73A17.33,17.33,0,0,1,127.19,210a17.89,17.89,0,0,1-3.55-.36L59.55,196.36a5.31,5.31,0,0,1,1.07-10.51h55.93a7.32,7.32,0,0,0,7.32-7.32V21.26l9.32,1.93L161.07,29A17.37,17.37,0,0,1,174.52,49.45Z" fill=${color}/></g></g></svg>`
    case 'quiz':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.32 209.01"><title>Asset 12@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M58.13,75.28a4,4,0,0,0-4,4v2a6,6,0,0,1-12,0v-2A16.08,16.08,0,0,1,58.13,63.23H72.69A17.51,17.51,0,0,1,90.26,80.57a17.05,17.05,0,0,1-8.53,15.06l-11.55,7.15v.6a6,6,0,1,1-12,0v-4a6,6,0,0,1,2.94-5.17l14.46-8.68a6.1,6.1,0,0,0,2.69-4.94,5.46,5.46,0,0,0-5.52-5.3Z" fill=${color}/><circle cx="64.15" cy="123.47" r="8.03" fill="#3A91EF"/><path d="M160.54,28.41l-27.71-5.74A25,25,0,0,0,107.94,0H25A25,25,0,0,0,0,25V169.42a25,25,0,0,0,25,25H57.13a5,5,0,0,0,2.15,1l63.93,13.24a17.29,17.29,0,0,0,20.44-13.43L174,48.86A17.34,17.34,0,0,0,160.54,28.41ZM10,169.42V25A15,15,0,0,1,25,10h82.94a15,15,0,0,1,15,15V169.42a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.42Z" fill=${color}/></g></g></svg>`
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.32 209.01"><title>Asset 12@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M58.13,75.28a4,4,0,0,0-4,4v2a6,6,0,0,1-12,0v-2A16.08,16.08,0,0,1,58.13,63.23H72.69A17.51,17.51,0,0,1,90.26,80.57a17.05,17.05,0,0,1-8.53,15.06l-11.55,7.15v.6a6,6,0,1,1-12,0v-4a6,6,0,0,1,2.94-5.17l14.46-8.68a6.1,6.1,0,0,0,2.69-4.94,5.46,5.46,0,0,0-5.52-5.3Z" fill=${color}/><circle cx="64.15" cy="123.47" r="8.03" fill="#3A91EF"/><path d="M160.54,28.41l-27.71-5.74A25,25,0,0,0,107.94,0H25A25,25,0,0,0,0,25V169.42a25,25,0,0,0,25,25H57.13a5,5,0,0,0,2.15,1l63.93,13.24a17.29,17.29,0,0,0,20.44-13.43L174,48.86A17.34,17.34,0,0,0,160.54,28.41ZM10,169.42V25A15,15,0,0,1,25,10h82.94a15,15,0,0,1,15,15V169.42a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.42Z" fill=${color}/></g></g></svg>`
  }
}

export const incorrect_correct_back = {
  incorrect: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1.7rem" height="1.7rem" fill="#F50057" class="tw-mt-[.1rem]" ><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" fill="#F50057"/></svg>`,
  correct: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1.7rem" height="1.7rem" fill="#2E7D32" class="tw-mt-1" ><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="#2E7D32"/></svg>`,
  back: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1.5rem" height="1.5rem" fill="#ffffff" class=" !tw-text-center !tw-self-center tw-mr-2" font-weight="900"><path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" fill="#ffffff"/></svg>`,
}
export const IconLike = `<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium !tw-text-[4rem] tw-mb-3 css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ThumbUpAltOutlinedIcon"><path d="M21 8h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2zm0 4-3 7H9V9l4.34-4.34L12.23 10H21v2zM1 9h4v12H1z" fill="#3B5999"></path></svg>`

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
  { "phrasal verb": "#4096ff" },
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
export const svgWordlist = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214 186.5"><title>Asset 18@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M186.5,27.5H109.75l-29.27-22A27.74,27.74,0,0,0,64,0H27.5A27.54,27.54,0,0,0,0,27.5V159a27.53,27.53,0,0,0,27.5,27.5h159A27.53,27.53,0,0,0,214,159V55A27.54,27.54,0,0,0,186.5,27.5Zm-18.3,16V95.58l-14.39-9.73a8,8,0,0,0-8.85,0l-15,9.93V43.5ZM199,159a12.51,12.51,0,0,1-12.5,12.5H27.5A12.51,12.51,0,0,1,15,159V27.5A12.52,12.52,0,0,1,27.5,15H64a12.67,12.67,0,0,1,7.51,2.51L102.21,40.6a9.53,9.53,0,0,0,5.71,1.9H115c0,.16,0,.32,0,.49v65a8.42,8.42,0,0,0,13.09,7l21.24-14.08,20.72,14a8.44,8.44,0,0,0,13.16-7V43c0-.17,0-.33,0-.49h3.31A12.52,12.52,0,0,1,199,55Z" fill="#6b7280"/></g></g></svg>`
export const svgleitner = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 214 214"><title>Asset 17@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M213.37,68.32a8.47,8.47,0,0,0-.64-2.27L188,10.4A17.5,17.5,0,0,0,172,0H42A17.5,17.5,0,0,0,26,10.4L1.27,66a8.47,8.47,0,0,0-.64,2.27A8.24,8.24,0,0,0,0,71.5v115A27.53,27.53,0,0,0,27.5,214h159A27.53,27.53,0,0,0,214,186.5V71.5A8.24,8.24,0,0,0,213.37,68.32ZM174.29,16.49,195,63H114V15h58A2.52,2.52,0,0,1,174.29,16.49Zm-134.58,0A2.52,2.52,0,0,1,42,15H99V63H19ZM199,186.5A12.51,12.51,0,0,1,186.5,199H27.5A12.51,12.51,0,0,1,15,186.5V78H199Z" fill="#6b7280"/></g></g></svg>`
export const logout = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" fill="#BE3144"></path><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" fill="#BE3144"></path></svg>`
export const configFont = {
  "Quicksand-Bold": require("~/assets/fonts/Quicksand-Bold.ttf"),
  "Quicksand-SemiBold": require("~/assets/fonts/Quicksand-SemiBold.ttf"),
  "Quicksand-Regular": require("~/assets/fonts/Quicksand-Regular.ttf"),
  "Quicksand-Medium": require("~/assets/fonts/Quicksand-Medium.ttf"),
  "Quicksand-Light": require("~/assets/fonts/Quicksand-Light.ttf"),
}
