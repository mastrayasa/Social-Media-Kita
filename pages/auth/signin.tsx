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
    InputRightElement, Spinner, Stack, InputLeftAddon, InputRightAddon, useColorModeValue
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { FaRegEyeSlash, FaRegEye, FaEnvelope, FaKey } from "react-icons/fa";
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const inputBg = useColorModeValue('gray.100', 'gray.700')
    return (
        <Flex direction="column" mx={'auto'} w={{ base: "full", md: 'md' }} h={"100vh"} >
            <Head>
                <title>Sign In</title>
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
                    Sign In
                </Text>

                {!isLoading &&
                    <form >
                        <VStack>

                            <VStack w={'full'}  > 
                                <Button
                                    onClick={() => {
                                        signIn('google' ,{ callbackUrl: '/' });
                                    }}
                                    bg={inputBg}
                                    w={'full'} 
                                    fontWeight={'normal'}
                                    variant={'outline'}
                                    leftIcon={<FcGoogle />}>
                                    <Center>
                                        <Text>Continue with Google</Text>
                                    </Center>
                                </Button> 
                            </VStack>

                            <Box py={5}>
                                <Text color={'gray'}>or</Text>
                            </Box>

                            <Box w="full"   >
                                <FormControl mb="2" w="full" >
                                    <InputGroup>

                                        <InputLeftElement
                                            pointerEvents='none'>
                                                <Icon as={FaEnvelope} color='gray.300' />
                                                </InputLeftElement>
                                        <Input
                                            bg={inputBg}
                                            placeholder="Email Address"
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
                                            ><Icon as={FaKey} color='gray.300' /></InputLeftElement>
                                        <Input
                                            bg={inputBg}
                                            placeholder="Strong Password"
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
                                    Sign in
                                </Button>
                            </Box>


                            

                            



                            <Flex pt={10} w={'full'}>
                                <Box>
                                    <Link href='/auth/signup' as={NextLink} color={'gray'}>
                                        Sign up
                                    </Link>
                                </Box>
                                <Spacer />
                                <Box>
                                    <Link href='/auth/forgot' as={NextLink} color={'gray'}>
                                        Forgot Password
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
                   Back to home
                </Link>
            </Center>

        </Flex>
    );
}
