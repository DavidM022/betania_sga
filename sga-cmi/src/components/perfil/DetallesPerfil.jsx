import React, { useEffect } from 'react'
import { Avatar, Badge, Box, Card, Divider, Stack, Text } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { useNavigate } from 'react-router-dom';
import { getUsuario, reset } from '../../features/usuarioSlice';
import { Loading } from '../../helpers/Loading';

const DetallesPerfil = ({ userData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { usuario, isLoading, isError, message } = useSelector((state) => state.usuarios);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        dispatch(getUsuario(userData.id))

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, userData.id]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Box w="full" h="full">
                <Stack direction="column" spacing={4} justifyContent="stretch">
                    <Stack direction={"column"} spacing={4} justifyContent="center" minW={"420px"}>
                        <Avatar
                            rounded={'full'}
                            size={'2xl'}
                            alignSelf={"center"}
                            name={usuario?.nombre}
                            color="white"
                            src={usuario?.img}
                            alt={usuario?.nombre}
                            border={'1px'}
                            borderColor="gray.200"
                            // fallbackSrc='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                        />
                    </Stack>
                    <Card w="full" h="full" p={8} borderRadius="2xl" _dark={{ bg: "primary.1000" }} boxShadow="base">
                        <Stack direction="column" spacing={4} justifyContent="stretch">
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>ID: </Text>
                                <Text>{ usuario?.uid }</Text>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>NOMBRES: </Text>
                                <Text>{ usuario?.nombre }</Text>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>CORREO ELECTRÓNICO </Text>
                                <Text>{ usuario?.correo }</Text>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>ESTADO: </Text>
                                <Badge 
                                    colorScheme={usuario?.estado === true ? 'green' : 'red'}
                                    variant="solid"
                                    w={24}
                                    textAlign="center"
                                    py={2}
                                    rounded="full"
                                >
                                    {usuario?.estado === true ? 'ACTIVO' : 'INACTIVO'}
                                </Badge>
                            </Stack>
                            <Divider />
                            <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                                <Text fontWeight={'bold'}>ROL: </Text>
                                <Badge
                                    bg={usuario.rol === 'ADMIN_ROLE' ? 'messenger.600' : 'red.600'}
                                    variant="solid"
                                    w={36}
                                    textAlign="center"
                                    py={2}
                                    rounded="full"
                                    color="white"
                                >
                                    {usuario.rol === 'ADMIN_ROLE' ? 'ADMINISTRADOR' : 'USUARIO'}
                                </Badge>
                            </Stack>
                            <Divider />
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </>
    )
}

export default DetallesPerfil