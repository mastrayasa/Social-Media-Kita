'use client'
import React, { useEffect, useCallback, useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import {
    Box,
    VStack,
    Text,
    Input,
    Button, Icon, Image,
    useToast,
    InputLeftElement,
    Center, Flex,
    Spacer,
    Link,
    InputGroup,
    FormControl,
    InputRightElement, Spinner, Stack, InputLeftAddon, InputRightAddon
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { FaRegEyeSlash, FaRegEye, FaEnvelope, FaKey } from "react-icons/fa";
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    return (
        <Flex direction="column" alig={'center'} mx={'auto'} w={{ base: "full", md: 'md' }} h={"100vh"} >
            <Head>
                <title>Login</title>
            </Head>
            <Flex px={5} direction="column" justify={'center'}>
                <Text
                    mb={6}
                    mt={6}
                    align={"center"}
                    color={"brand.dark"}
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Login Sekarang
                </Text>

                {!isLoading &&
                    <form >
                        <VStack>

                            <VStack w={'full'}  > 
                                <Button
                                    onClick={() => {
                                        signIn('google' ,{ callbackUrl: '/' });
                                    }}
                                    w={'full'} 
                                    fontWeight={'normal'}
                                    variant={'outline'}
                                    leftIcon={<FcGoogle />}>
                                    <Center>
                                        <Text>Lanjutkan dengan Google</Text>
                                    </Center>
                                </Button> 
                            </VStack>

                            <Box py={5}>
                                <Text color={'gray'}>atau</Text>
                            </Box>

                            <Box w="full"   >
                                <FormControl mb="2" w="full" >
                                    <InputGroup>

                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<Icon as={FaEnvelope} color='gray.300' />}
                                        />
                                        <Input

                                            placeholder="Alamat Email"
                                            variant={"outline"}
                                            colorScheme="blue"
                                            type="email"
                                        /></InputGroup>
                                    
                                </FormControl>
                            </Box>
                            <Box w="full">
                                <FormControl mb="2" w="full" >
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<Icon as={FaKey} color='gray.300' />} />
                                        <Input

                                            placeholder="Password"
                                            variant={"outline"}
                                            colorScheme="blue"
                                            type={showPassword ? 'text' : 'password'} />
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <Icon color={'gray.500'} as={FaRegEyeSlash} /> : <Icon color={'gray.500'} as={FaRegEye} />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup> 
                                </FormControl>
                            </Box>

                            <Box w="full"   >
                                <Button
                                    onClick={() => alert("soon!")}
                                    type="button"
                                    w="full"
                                    colorScheme={'blue'} >
                                    Masuk
                                </Button>
                            </Box>


                            

                            



                            <Flex pt={10} w={'full'}>
                                <Box>
                                    <Link href='/auth/signup' as={NextLink} color={'gray'}>
                                        Belum punya akun?
                                    </Link>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href='/auth/forgot' as={NextLink} color={'gray'}>
                                        Lupa Password?
                                    </Link>
                                </Box>
                            </Flex>



                        </VStack>
                    </form>}

                {isLoading &&
                    <Flex w="full" h={200} align="center" justify="center">
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="pink.500"
                            size="xl"
                        />
                    </Flex>}
            </Flex>
            
            <Center pt={16}>
                <Link href='/' as={NextLink} color={'gray'}>
                    Beranda
                </Link>
            </Center>

        </Flex>
    );
}
