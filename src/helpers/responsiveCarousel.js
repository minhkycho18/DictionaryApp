const responsiveCarousel = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 767,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 767,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
};
export default responsiveCarousel;
