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

};
export const colorPos = [
  { verb: '#79DE74' },
  { noun: '#46C5F2' },
  { adjective: '#E47E23' },
  { interjection: "#B4B6E6" },
  { phrase: "#06FBFF" },
  { adverb: "#AED574" },
  { preposition: "#2F9D8C" },
  { determiner: "#C4A986" },
  { pronoun: "#EAC56D" }
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
export const svgreview ='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.27 209"><title>Asset 14@4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M160.48,28.32l-27.6-5.72A25,25,0,0,0,108,0H25A25,25,0,0,0,0,25V169.51a25,25,0,0,0,25,25H57.15a5.25,5.25,0,0,0,2,.88l64,13.25a17.79,17.79,0,0,0,3.54.36,17.29,17.29,0,0,0,16.91-13.8L173.91,48.78A17.34,17.34,0,0,0,160.48,28.32ZM10,169.51V25A15,15,0,0,1,25,10h83a15,15,0,0,1,15,15V169.51a15,15,0,0,1-15,15H25A15,15,0,0,1,10,169.51Z" fill="#0D48A3"/><path d="M95,114.4H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill="#0D48A3"/><path d="M95,92.15H38.76c-6.43,0-6.45,10,0,10H95c6.43,0,6.45-10,0-10Z" fill="#0D48A3"/></g></g></svg>'
export const svgstudy = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" class="svg-inline--fa fa-graduation-cap " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"> <path fill="#FEFEFE"  d="M623.1 136.9l-282.7-101.2c-13.73-4.91-28.7-4.91-42.43 0L16.05 136.9C6.438 140.4 0 149.6 0 160s6.438 19.65 16.05 23.09L76.07 204.6c-11.89 15.8-20.26 34.16-24.55 53.95C40.05 263.4 32 274.8 32 288c0 9.953 4.814 18.49 11.94 24.36l-24.83 149C17.48 471.1 25 480 34.89 480H93.11c9.887 0 17.41-8.879 15.78-18.63l-24.83-149C91.19 306.5 96 297.1 96 288c0-10.29-5.174-19.03-12.72-24.89c4.252-17.76 12.88-33.82 24.94-47.03l190.6 68.23c13.73 4.91 28.7 4.91 42.43 0l282.7-101.2C633.6 179.6 640 170.4 640 160S633.6 140.4 623.1 136.9zM351.1 314.4C341.7 318.1 330.9 320 320 320c-10.92 0-21.69-1.867-32-5.555L142.8 262.5L128 405.3C128 446.6 213.1 480 320 480c105.1 0 192-33.4 192-74.67l-14.78-142.9L351.1 314.4z"></path></svg>'