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
    Stack, VStack, HStack,
    Button

} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export default function PostLoading(){
    return (<Stack
        direction={'row'}
        spacing={4}
        align={'center'}
        mb={6}
        px={4} py={6} shadow={'sm'} rounded={6} >
        <Box>
            <SkeletonCircle size='10' />
        </Box>
        <Stack direction={'column'} spacing={0} fontSize={'sm'} w={'full'}>
            <SkeletonText mt='4' noOfLines={4} spacing='2' skeletonHeight='2' />
        </Stack>
    </Stack>)
}