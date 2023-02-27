import { Html, Head, Main, NextScript } from 'next/document'
import theme from '@/lib/theme'
import { ColorModeScript } from '@chakra-ui/react'
export default function Document() {
  return (
    <Html lang="id">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
