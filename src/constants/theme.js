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