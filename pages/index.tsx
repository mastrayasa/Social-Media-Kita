import Head from 'next/head'
import {
    Avatar,
    Box,
    chakra,
    color, Text,
    Container,
    Flex,
    Icon, Input,
    SimpleGrid,
    useColorModeValue,
    Stack

} from '@chakra-ui/react';
import clientPromise from "@/lib/mongodb";
import Navbar from '@/components/Navbar'
import PostCompose from '@/components/PostCompose'
import PostCard from '@/components/PostCard'
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import axios, { Method } from "axios";
interface HomeProps {
    posts: object
}

export default function Home() {
    const { data: session, status } = useSession()
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => { 
        loadPost()
    },[]);

    const addOneSuccess = (res) => {
        console.log(res)
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
        return ('Loading...')
    }

    else if (status === 'unauthenticated') {
        // redirect('/hello-nextjs');
    }
    // const { posts } = props;
    return (
        <>
            <Head>
                <title>Social Media Kita</title>
            </Head>
            <main>
                <Navbar />
                <Container>
                    {session &&
                        <Box mt={6}><PostCompose addOneSuccess={addOneSuccess} /></Box>
                    }
                    <Flex direction={'row'}
                        mt={6}
                        mb={6}
                        mx={'auto'}>
                        {isLoading && <Text>Memuat...</Text>}
                        <Stack spacing={4} align={'center'} w={'full'}>
                            {posts &&
                                posts.map((post, index) => (
                                    <PostCard key={index} post={post}></PostCard>
                                ))
                            }
                        </Stack>
                    </Flex>
                </Container>
            </main>
        </>
    )
}

// export async function getStaticProps() {
//     try {
//         const client = await clientPromise;  
//         const posts = await client.db().collection("posts") 
//             .find({})
//             .sort({ createAt: -1 })
//             .limit(100)
//             .toArray();

//         return {
//             props: { posts: JSON.parse(JSON.stringify(posts)) },
//         };
//     } catch (e) {
//         console.error(e);
//     }
// }
