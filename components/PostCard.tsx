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
        create_at: string,
        image: string,
        content: string
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
                <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
                <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>Mastrayasa</Text>
                    <Text color={'gray.500'}><Moment fromNow date={post.createAt} /></Text>
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
                        layout={'fill'}
                    />
                </Box>}


            <Stack>
                <Text color={'gray.500'}>{post.content}</Text>
            </Stack>
        </Box>
    );
}
