import Head from 'next/head'
import {
    Text,
    Container,
    Flex
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar'
export default function Home() {
    return (
        <>
            <Head>
                <title>Video</title>
            </Head>
            <main>
                <Navbar />
                <Container> 
                    <Flex direction={'row'}
                        mt={6}
                        mb={6}  
                        mx={'auto'}> 
                            <Text>Soon</Text>
                    </Flex>
                </Container>
            </main>
        </>
    )
}
 