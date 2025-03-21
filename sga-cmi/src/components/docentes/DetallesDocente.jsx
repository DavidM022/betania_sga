import React, { useEffect } from 'react'
import {
    IconButton,
    Stack,
    Text,
    Divider,
    Badge,
    HStack,
    Avatar,
} from '@chakra-ui/react';
import Moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { Loading } from '../../helpers/Loading';
import { getDocente, reset } from '../../features/docenteSlice';

const DetallesDocente = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { docente, isLoading, isError, message } = useSelector((state) => state.docentes);

    const params = useParams(location);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getDocente(params.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, params.id]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const getBithdayTimer = (birthday) => {
        if (!birthday) return 'No hay fecha de nacimiento';
        else {
            const date = new Date(birthday);
            const today = new Date();
            const diffMonth = today.getMonth() - date.getMonth();
            const diffDay = (today.getDate() - date.getDate()) - 1;

            if (Math.abs(diffMonth) === 0 && Math.abs(diffDay) === 0) {
                return '¡Feliz cumpleaños!';
            }
            else if (Math.abs(diffMonth) === 0) {
                return `${Math.abs(diffDay)} días`;
            }
            else if (Math.abs(diffMonth) > 1) {
                return `${Math.abs(diffMonth)} meses y ${Math.abs(diffDay)} días`;
            } else {
                return `${Math.abs(diffMonth)} mes y ${Math.abs(diffDay)} días`;
            }
        }
    }

    let faltaCumpleanios = getBithdayTimer(docente?.fecha_nacimiento);

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/profesores'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize={{ base: 'sm', lg: 'lg' }}>Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize='lg' display={{ base: 'none', lg: 'flex' }} fontWeight="bold">Detalles del Profesor Seleccionado</Text>
                </HStack>
            </Stack>

            <Stack 
                direction="column"
                mt={3}
                p={4}
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
            >
                <Stack 
                    direction="column"
                    w="full"
                    justifyContent="stretch"
                    spacing={4}
                >
                    <Avatar
                        size={'2xl'}
                        name={docente.nombres}
                        fontWeight="bold"
                        color={'white'}
                        fontSize={'2xl'}
                        alignSelf={'center'}
                        borderRadius="lg"
                        p={4}
                        rounded="full"
                    />
                    <Stack direction="column" p={6} spacing={4} w="full" bg="white" _dark={{ bg: "primary.1000" }}>
                        <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                            <Text fontWeight="bold" mr={2}>NOMBRES </Text>
                            <Text>{docente?.nombres}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                            <Text fontWeight="bold" mr={2}>APELLIDOS </Text>
                            <Text>{docente?.apellidos}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                            <Text fontWeight="bold" mr={2}>CI </Text>
                            <Text>{docente?.dni}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                            <Text fontWeight="bold">FECHA CREADA </Text>
                            <Text>{Moment(docente?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={docente?.estado === 'ACTIVO' ? 'green' : docente?.estado === 'RETIRADO' ? 'gray' : 'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                { docente?.estado }
                            </Badge>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack 
                direction="column" 
                p={10}
                spacing={4} 
                w="full" 
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                mt={3}
                _dark={{ bg: "primary.1000" }}
            >
                    <Stack justifyContent="center">
                        <Text fontWeight="bold" textAlign="center">MÁS DETALLES DEL PROFESOR</Text>
                    </Stack>
                    <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                        <Text fontWeight="bold" mr={2}>DIRECCIÓN </Text>
                        <Text>{docente?.direccion}</Text>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                        <Text fontWeight="bold" mr={2}>CORREO </Text>
                        <Text>{docente?.correo}</Text>
                    </Stack>
                    <Divider />
                    <Stack spacing={4} direction={{ base: 'column', lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                        <Text fontWeight="bold" mr={2}>CELULAR </Text>
                        <Text>{docente?.celular}</Text>
                    </Stack>
                    <Divider />
                    <Stack spacing={4} direction={{ base: 'column', lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                        <Text fontWeight="bold" mr={2}>FECHA DE CUMPLEAÑOS </Text>
                        <Text>{ !docente?.fecha_nacimiento ? 'No se le agregó fecha de cumpleaños' : Moment.utc(docente?.fecha_nacimiento).format('[El] DD [de] MMMM [del] YYYY')}</Text>
                    </Stack>
                    <Divider />
                    <Stack spacing={4} direction={{ base: 'column', lg: "row" }} justifyContent="space-between" alignItems={'center'}>
                        <Text fontWeight="bold" mr={2}>FECHA DE CONTRATACIÓN </Text>
                        <Text>{ !docente?.fecha_contratacion ? 'No se le agregó fecha de contratación' : Moment.utc(docente?.fecha_contratacion).format('[El] DD [de] MMMM [del] YYYY')}</Text>
                    </Stack>
                    <Divider />
                    {
                        docente?.estado === 'RETIRADO' ? 
                            <>
                                <Stack spacing={4} direction={{ base: 'column', lg: "row" }} alignItems={'center'} justifyContent="space-between">
                                    <Text fontWeight="bold" mr={2}>FECHA DE RETIRO </Text>
                                    <Text>{ !docente?.fecha_retiro ? 'No se le agregó fecha de retiro' : Moment.utc(docente?.fecha_retiro).format('[El] DD [de] MMMM [del] YYYY')}</Text>
                                </Stack>
                                <Divider />
                            </>
                        : null
                    }
                    <Stack spacing={4} direction={{ base: 'column', lg: "row" }} alignItems={'center'} justifyContent="space-between">
                        <Text fontWeight="bold" mr={2}>CUANTO FALTA PARA SUS CUMPLEAÑOS </Text>
                        <Badge
                                colorScheme={'pink'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {faltaCumpleanios}
                        </Badge>
                    </Stack>
            </Stack>

        </>
    )
}

export default DetallesDocente;