import chakraTheme from '@chakra-ui/theme'
import {  extendTheme  } from '@chakra-ui/react'
const { Button } = chakraTheme.components
// const colors = {
//     brand: {
//       primary: "#25316D",
//       secondary: "#5F6F94",
//       light: "#ffffff",
//       dark: "#1F1F1F",
//       "light-grey": "#F9F9F9",
//       "light-blue": "#F6FBFF",
//       warning: "#FFC107",
//       "warning-soft": "#FFFAEB",
//       "warning-hover": "#ffac07",
//       success: "#20D15C",
//       error: "#EE5757",
//     },
//     type: {
//       primary: "#0B1E74",
//       heading: "#3D3D3D",
//       strong: "#161616",
//       strongest: "#181818",
//       soft: "#787878",
//       softest: "#A8A8A8",
//     },
//   };
const theme = extendTheme({
  //  colors,
  components: {
    Button,
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.100',
      }
    })
  },
})

export default theme;