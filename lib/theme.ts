import chakraTheme from '@chakra-ui/theme'
import {  extendTheme  } from '@chakra-ui/react'
const { Button } = chakraTheme.components
const theme = extendTheme({
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