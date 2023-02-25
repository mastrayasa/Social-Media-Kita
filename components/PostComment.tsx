import Image from 'next/image';
import axios, { Method } from "axios";
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar, Textarea, IconButton,
    useColorModeValue,
    VStack,
    Button,
    Spacer,
    HStack,
} from '@chakra-ui/react';
import { FaEllipsisH, FaEllipsisV, FaGrin, FaMapMarkerAlt, FaPhotoVideo, FaRegCalendarAlt, FaRegChartBar, FaSearchLocation, FaThList } from 'react-icons/fa';
import { Callback } from 'mongodb';
import Moment from 'react-moment';
import { setCommentRange } from 'typescript';
interface UseFormInputs {
    id: string,
    comment: string
}
interface PostCommentProps {
    post: {
        _id: string,
        createAt: string,
        image: string,
        content: string,
        likes: object,
        comments: object
        user: {
            name: string,
            image: string
        }
    }
}


export default function PostComment(props: PostCommentProps) {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UseFormInputs>();
    const [isLoading, setIsLoading] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const { post } = props;
    register("id", { value: post._id })
    const onSubmit = async (data: UseFormInputs) => {
        setIsLoading(true)
        let response = null;
        await axios
            .post("/api/comment", data)
            .then((res) => {

                reset()
            })
            .catch((err) => {
            });
        setIsLoading(false)
        return 0;
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Box
                mt={1}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                overflow={'hidden'}> 
                <Textarea 
                    onFocus={(e) => setShowComment(true)}
                     
                    disabled={isLoading} rows={1}
                    {...register('comment', { required: true })}
                    placeholder='Tulis komentar anda disini?' />
                    {errors.comment && <Text color={'yellow.600'} fontSize={'sm'}>Tuliskan sesuatu untuk dibagikan</Text>}
                {showComment &&
                    <HStack mt={2}>
                        <Box>
                            <IconButton color={'gray.400'} size={'sm'}
                                variant='unstyled'
                                aria-label='Upload Gambar'
                                icon={<FaPhotoVideo />}
                            />

                            <IconButton color={'gray.400'} size={'sm'}
                                variant='unstyled'
                                aria-label='Tambah Peransaan'
                                icon={<FaGrin />}
                            /> 
                        </Box>
                        <Spacer />
                        <Button
                            colorScheme={'blue'} size={'sm'}
                            isLoading={isLoading}
                            type="submit"
                        >
                            Kirim
                        </Button>
                    </HStack>}

            </Box>

            <Box mt={0}>
                {post.comments.map((val, index) => (
                    <Box key={index}>
                        <Stack
                            direction={'row'}
                            spacing={4}
                            align={'flex-start'}
                            mt={4}
                        >
                            <Avatar size='sm' src={val?.user?.image} />
                            <Stack
                                direction={'column'} spacing={0} fontSize={'sm'}>

                                <Box
                                    bg={'gray.100'}
                                    px={2}
                                    py={2}
                                    rounded={'xl'} >
                                    <HStack>
                                        <Text fontWeight={600}>Mastrayasa{val?.user?.name}</Text>
                                        <Spacer />
                                        <Text fontSize='xs' color={'gray.500'}><Moment fromNow date={val?.createAt} /></Text>
                                    </HStack>

                                    <Text>{val.comment}</Text>
                                </Box>
                                <HStack>
                                    <Text _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}>Suka</Text>

                                    <Text _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}>Balas</Text>

                                    <Text _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}>Bagikan</Text>
                                </HStack>
                            </Stack>
                        </Stack>
                    </Box>
                ))}
            </Box>
        </form>

    );
}
