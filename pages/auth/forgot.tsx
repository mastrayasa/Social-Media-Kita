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
    InputRightElement,Spinner, Stack, InputLeftAddon, InputRightAddon
} from "@chakra-ui/react";
import NextLink from 'next/link'
import { FaRegEyeSlash, FaRegEye, FaEnvelope, FaKey } from "react-icons/fa";
import Head from 'next/head'

export default function LoginForm() { 
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    return (
        <Flex direction="column"   mx={'auto'}    w={{base:"full", md:'md'}} h={"100vh"} >
            <Head>
                <title>Forgot Password</title> 
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
                    Forgot Password
                </Text>

                {!isLoading && 
                <form >
                    <VStack>
                        <Box w="full"   >
                            <FormControl mb="2" w="full" >
                                <InputGroup>
                                
                                    <InputLeftElement
                                        pointerEvents='none'>
                                            <Icon as={FaEnvelope} color='gray.300' />
                                    </InputLeftElement>
                                    <Input
                                        
                                        placeholder="Email Address"
                                        variant={"outline"}
                                        colorScheme="brand.primary-blue"
                                        type="email"
                                    /></InputGroup> 
                            </FormControl>
                        </Box>
                         

                        <Box w="full"   >
                            <Button
                               onClick={() => alert("soon!")}
                               type="button"
                                w="full"
                                colorScheme={'blue'}
                            >
                                Sent
                            </Button>
                        </Box>


                        



                         
                            <Center pt={12}>
                                <Link href='/auth/signin' as={NextLink} color={'gray'}>
                                    Sign In
                                </Link>
                            </Center>
                            
                        



                    </VStack>
                </form> }
                
                {isLoading && 
                <Flex w="full" h={200} hide  align="center" justify="center">
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
