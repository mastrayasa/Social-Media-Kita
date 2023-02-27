import Head from 'next/head'
import {
    Box,
    Text,
    Container,
    Flex,
    useColorModeValue,
    VStack,
    Button,
    Spinner
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar'
import PostCompose from '@/components/PostCompose'
import PostCard from '@/components/PostCard'
import React, { useState, useEffect } from 'react'
import { useSession } from "next-auth/react"
import axios from "axios";
import PostLoading from '@/components/PostLoading';
export default function Home() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadPost()
    }, []);

    const addOneSuccess = (res) => {
        setPosts([res, ...posts]);
    }

    const loadPost = async () => {
        setIsLoading(true)
        let response = null;
        await axios
            .post("/api/posts")
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
            });
        setIsLoading(false)
        return 0;
    };

    if (status === 'loading') {
        return (
            <Flex w="full" h='calc(100vh)' direction={'column'}  align="center" justify="center">
              <Spinner
                thickness="2px"
                speed="1s"  
                emptyColor="blue.200"
                color="blue.700"
                size="xl"/>
                <Text color={'blue.600'} mt="3">Please wait...</Text>
            </Flex>
        );
    }

    else if (status === 'unauthenticated') {
        // redirect('/hello-nextjs');
    }
   
    return (
        <>
            <Head>
                <title>Social Media Kita</title>
            </Head>
            <main>
                <Navbar />
                <Container >
                    {session &&
                        <Box mt={6}><PostCompose addOneSuccess={addOneSuccess} /></Box>
                    }

                    {/* <Button onClick={() => { loadPost() }}>Reload</Button> */}

                    {isLoading  &&  <>
                        <PostLoading />
                        <PostLoading />
                        <PostLoading />
                        <PostLoading />
                    </>}
                    
                    <Flex direction={'row'}
                        mt={6}
                        mb={6}
                        w={'full'}
                        mx={'auto'}> 
                        <VStack spacing={6} w={'full'}>
                            {posts &&
                                posts.map((post, index) => (
                                    <PostCard key={index} post={post}></PostCard>
                                ))
                            }
                        </VStack>
                    </Flex>
                </Container>
            </main>
        </>
    )
}
