import axios from "axios";
import { useForm } from 'react-hook-form';
import React, { useState } from 'react'
import {
    Box,
    Text,
    Textarea, IconButton,
    useColorModeValue,
    Button,
    Spacer,
    HStack,
} from '@chakra-ui/react';
import {  FaGrin, FaPhotoVideo } from 'react-icons/fa';
import { PostType } from '@/lib/types/post';
import CommentCard from '@/components/CommentCard';
interface UseFormInputs {
    id: string,
    comment: string
}
interface PostCommentProps {
    post: PostType
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
                    placeholder='Write your comment here' />
                {errors.comment && <Text color={'yellow.600'} fontSize={'sm'}>Comment can't be empty</Text>}
                {showComment &&
                    <HStack mt={2}>
                        <Box>
                            <IconButton color={'gray.400'} size={'sm'}
                                variant='unstyled'
                                aria-label='Upload Image'
                                icon={<FaPhotoVideo />}
                            />

                            <IconButton color={'gray.400'} size={'sm'}
                                variant='unstyled'
                                aria-label='Tambah Icon'
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
                {post.comments.map((comment, index) => (
                    <CommentCard comment={comment} key={index} />
                ))}
            </Box>
        </form>

    );
}
