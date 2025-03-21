import { extendTheme } from '@chakra-ui/react';
import "@fontsource/public-sans";
import "@fontsource/rubik"

const theme = extendTheme({
  fonts: {
    heading: `"Public Sans", sans-serif`,
    body: `"Rubik", sans-serif`,
  },
  colors: {
    primary: {
      50: '#ffffff',
      100: '#08C57C',
      200: '#07A96B',
      300: '#068F5C',
      400: '#067E4D',
      500: '#066B3D',
      600: '#065D2E',
      700: '#ffffff1f',
      800: '#ffffff33',
      900: '#242424',
      1000: '#151822',
      1100: '#0b0f19',
    },
  },
})

export default theme
