import { CommentType } from '@/lib/types/comment';
import Moment from 'react-moment';
import {
    Box, 
    Text,
    Stack,
    Avatar,  
    Spacer,
    HStack,
} from '@chakra-ui/react'; 
interface CommentCardProps {
    comment: CommentType
}
export default function CommentCard (props: CommentCardProps){
    const {comment} = props
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
                    bg={'gray.100'}
                    px={2}
                    py={2}
                    rounded={'xl'} >
                    <HStack>
                        <Text fontWeight={600}>Mastrayasa{comment?.user?.name}</Text>
                        <Spacer />
                        <Text fontSize='xs' color={'gray.500'}><Moment fromNow date={comment?.createAt} /></Text>
                    </HStack>

                    <Text>{comment.comment}</Text>
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
    </Box>)
}