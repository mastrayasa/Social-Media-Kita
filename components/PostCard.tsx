import Image from 'next/image';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
} from '@chakra-ui/react';
import Moment from 'react-moment';
interface PostCardProps {
    post: {
        createAt: string,
        image: string,
        content: string,
        user:{
            name: string,
            image: string
        }
    }
}

export default function PostCard(props: PostCardProps) {
    const { post } = props;
    return (
        <Box
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'md'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <Stack
                direction={'row'}
                spacing={4}
                align={'center'}
                mb={4}
            >
                <Avatar src={post?.user?.image} />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{post?.user?.name}</Text>
                    <Text color={'gray.500'}><Moment fromNow date={post?.createAt} /></Text>
                </Stack>
            </Stack>

            {post.image &&
                <Box
                    h={'210px'}
                    bg={'gray.100'}
                    mx={-6}
                    mb={6}
                    pos={'relative'}>
                    <Image
                        src={post.image}
                        layout={'fill'} alt={'image'}
                    />
                </Box>}


            <Stack>
                <Text color={'gray.500'}>{post.content}</Text>
            </Stack>
        </Box>
    );
}
