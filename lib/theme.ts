import chakraTheme from '@chakra-ui/theme'
import { extendTheme } from '@chakra-ui/react'
const { Button } = chakraTheme.components
const config = {
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
    initialColorMode: 'dark',
    useSystemColorMode: true,
}
const theme = extendTheme({ config })

export default theme;