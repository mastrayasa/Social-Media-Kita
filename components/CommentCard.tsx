import { CommentType } from '@/lib/types/comment';
import Moment from 'react-moment';
import {
    Box, 
    Text,
    Stack,
    Avatar,  
    Spacer,
    HStack,
    useColorModeValue,
} from '@chakra-ui/react'; 
interface CommentCardProps {
    comment: CommentType
}
export default function CommentCard (props: CommentCardProps){
    const {comment} = props
    const commentBg = useColorModeValue('gray.100', 'gray.700')
    const color = useColorModeValue('gray.900', 'gray.100')
    return (<Box >
        <Stack
            direction={'row'}
            spacing={4}
            align={'flex-start'}
            mt={4}
        >
            <Avatar size='sm' src={comment?.user?.image} />
            <Stack
                direction={'column'} spacing={0} fontSize={'sm'}>

                <Box
                    bg={commentBg}
                    px={2}
                    py={2}
                    rounded={'xl'} >
                    <HStack>
                        <Text color={color} fontWeight={600}>Mastrayasa{comment?.user?.name}</Text>
                        <Spacer />
                        <Text fontSize='xs' color={'gray.500'}><Moment fromNow date={comment?.createAt} /></Text>
                    </HStack> 
                    <Text color={color}>{comment.comment}</Text>
                </Box>
                <HStack color={color}>
                    <Text _hover={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}>Like</Text>

                    <Text _hover={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                    }}>Reply</Text> 
                </HStack>
            </Stack>
        </Stack>
    </Box>)
}