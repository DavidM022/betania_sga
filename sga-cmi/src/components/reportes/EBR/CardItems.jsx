import React from 'react';
import {
    Icon,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';

const CardItems = ({ total, textHeader, icon }) => {

    const textColor = useColorModeValue('gray.700', 'gray.100');

    return (
        <Stack
            boxShadow={'base'}
            bg="white"
            _dark={{ bg: "primary.1000" }}
            rounded={'2xl'}
            p={4}
            borderTop={'3px solid #805ad5'}
        >
            <Stack spacing={4} direction="row" justifyContent={'space-between'}>
                <Icon as={icon} color="purple.500" boxSize={20} alignSelf="center"/>
                <Stack direction="column" spacing={0} textAlign={'end'} alignSelf={'center'}>
                    <Text color={'gray.500'} fontSize="lg" noOfLines={1}>{textHeader}</Text>
                    <Text fontWeight={600} color={textColor} fontSize={{ base: 'md', md: 'xl', lg: '5xl' }}>
                        {total}
                    </Text>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default CardItems;