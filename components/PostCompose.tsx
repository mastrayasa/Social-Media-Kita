import Image from 'next/image';
import axios, { Method } from "axios";
import { useForm } from 'react-hook-form';
import React, {  useState } from 'react'
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
import { FaEllipsisV, FaGrin, FaMapMarkerAlt, FaPhotoVideo, FaRegCalendarAlt, FaRegChartBar, FaSearchLocation, FaThList } from 'react-icons/fa';
import { Callback } from 'mongodb';
interface UseFormInputs{
    post: string
}

interface CallbackNewPost{
    (src: object): void
}

interface PostComposeProps{
    addOneSuccess: CallbackNewPost
}

export default function PostCompose( props: PostComposeProps ) {
    const { register, handleSubmit,reset , watch, formState: { errors } } = useForm<UseFormInputs>();
    const [isLoading, setIsLoading] = useState(false)
    const { addOneSuccess } = props;

    const onSubmit = async (data: UseFormInputs) => {
        setIsLoading(true)
        let response = null;
        await axios
          .post("/api/post", data)
          .then((res) => {
            addOneSuccess(res.data)
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
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'md'}
            rounded={'md'}
            p={4}
            overflow={'hidden'}>


            <Textarea 
                disabled={isLoading}
                {...register('post', { required: true })}
                placeholder='Apa yang sedang anda pikirkan?' />
                {errors.post && <Text color={'yellow.600'} fontSize={'sm'}>Tuliskan sesuatu untuk dibagikan</Text>}
            <HStack mt={2}>
                <Box>
                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='Upload Gambar'
                        icon={<FaPhotoVideo />}
                    />

                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='Berbagi Lokasi'
                        icon={<FaMapMarkerAlt />}
                    />

                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='Tambah Peransaan'
                        icon={<FaGrin />}
                    />

                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='Berbagi daftar keseharian'
                        icon={<FaThList />} />

                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='Berbagi Jadwal atau rencana'
                        icon={<FaRegCalendarAlt />} />

                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='Berbagi Grafik'
                        icon={<FaRegChartBar />} />

                    <IconButton color={'gray.600'}
                        variant='unstyled'
                        aria-label='More'
                        icon={<FaEllipsisV />} />

                </Box>
                <Spacer />
                <Button 
                    colorScheme={'blue'} 
                    isLoading={isLoading}
                    type="submit"
                    >
                    Kirim
                </Button>
            </HStack>

        </Box>
        </form>

    );
}
