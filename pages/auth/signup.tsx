'use client'
import React, { useEffect, useCallback, useRef, useState } from 'react' 
import {
    Box,
    VStack,
    Text, 
    Input,
    Button, Icon,Image,
    useToast,
    InputLeftElement,
    Center, Flex,
    Spacer,
    Link,
    InputGroup,  
    FormControl,
    InputRightElement,Spinner, Stack, InputLeftAddon, InputRightAddon, useColorModeValue
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { FaRegEyeSlash, FaRegEye, FaEnvelope, FaKey, FaPeopleArrows, FaUser } from "react-icons/fa";
import Head from 'next/head'

export default function LoginForm() { 
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const inputBg = useColorModeValue('gray.100', 'gray.700')
    return (
        <Flex direction="column"  mx={'auto'}    w={{base:"full", md:'md'}} h={"100vh"} >
            <Head>
                <title>Sign Up</title> 
            </Head>
            <Flex   px={5} direction="column" justify={'center'}>
                <Text
                    mb={6}
                    mt={6} 
                    align={"center"}
                    color={"brand.dark"}
                    fontSize="2xl"
                    fontWeight="bold"
                >
                    Sign Up
                </Text>

                {!isLoading && 
                <form >
                    <VStack>

                        <Box w="full"   >
                            <FormControl mb="2" w="full" >
                                <InputGroup>
                                
                                    <InputLeftElement pointerEvents='none'>
                                    <Icon as={FaUser} color='gray.300' />
                                    </InputLeftElement>
                                    <Input
                                        bg={inputBg}
                                        placeholder="Full Name"
                                        variant={"outline"}
                                        colorScheme="brand.primary-blue"
                                        type="text"
                                    /></InputGroup>
                                {/* {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>} */}
                            </FormControl>
                        </Box>


                        <Box w="full"   >
                            <FormControl mb="2" w="full" >
                                <InputGroup>
                                
                                    <InputLeftElement pointerEvents='none'>
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
                                colorScheme={'blue'}
                            >
                                Sign Up
                            </Button>
                        </Box>


                        



                        
                            <Center pt={12}  >
                                <Link href='/auth/signin' as={NextLink} color={'gray'}>
                                    Sign In
                                </Link>
                            </Center>
                             
                     



                    </VStack>
                </form> }
                
                {isLoading && 
                <Flex w="full" h={200}  align="center" justify="center">
                    <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="pink.500"
                    size="xl"
                    />
                </Flex>}
            </Flex>

            
        </Flex>
    );
}
