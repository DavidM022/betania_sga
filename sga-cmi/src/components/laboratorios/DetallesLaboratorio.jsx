import React, { useEffect } from 'react'
import {
    IconButton,
    Stack,
    Text,
    Divider,
    Badge,
    Image,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
    HStack,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { Loading } from '../../helpers/Loading';
import { getLaboratorio, reset } from '../../features/laboratorioSlice';
import fallbackIMG from '../../assets/img/400x400.png';

const DetallesLaboratorio = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { laboratorio, isLoading, isError, message } = useSelector((state) => state.laboratorios);

    const params = useParams(location);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getLaboratorio(params.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, params.id]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/laboratorios'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize={{base: "xs", lg: "lg"}}>Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize={{ base: "xs", lg: "lg" }} fontWeight={'bold'}>Detalles del Equipo Seleccionado</Text>
                </HStack>
            </Stack>

            <Stack 
                direction="column" 
                mt={3}
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white" 
                _dark={{ bg: "primary.1000" }}
                p={6}
            >
                <Stack 
                    direction={{ base: "column", lg: "row" }} 
                    w="full" 
                    justifyContent="stretch"
                    spacing={4}
                >
                    <Image 
                        objectFit='cover' 
                        src={laboratorio?.img} 
                        fallbackSrc={fallbackIMG}
                        alt={laboratorio?.nombre} 
                        maxH={'400px'} 
                        maxW={'400px'} 
                        minW="400px"
                        alignSelf={'center'}
                        borderRadius="lg"
                        p={4}
                    />
                    <Stack direction="column" p={6} spacing={4} w="full" bg="white" _dark={{ bg: "primary.1000" }}>
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>CODIGO </Text>
                            <Text>{laboratorio?.codigo}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>NOMBRE </Text>
                            <Text>{laboratorio?.nombre}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">CANTIDAD</Text>
                            <Badge
                                colorScheme={'purple'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {laboratorio?.cantidad !== null ? laboratorio?.cantidad : 0}
                            </Badge>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>UBICACIÓN DEL EQUIPO </Text>
                            <Text>{laboratorio?.ubicacion}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">FECHA CREADA </Text>
                            <Text>{Moment(laboratorio?.createdAt).format('DD-MM-YYYY - hh:mm:ss A')}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={laboratorio?.estado === "ACTIVO" ? 'green' : 'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {laboratorio?.estado}
                            </Badge>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            <Stack 
                direction="column" 
                mt={3}
                borderRadius="2xl"
                p={6}
                boxShadow="base"
                overflow="hidden"
                bg="white" 
                _dark={{ bg: "primary.1000" }}
            >
                <Accordion allowMultiple defaultIndex={[0]}>
                    <AccordionItem>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <Text fontWeight="bold" alignSelf={'center'}>DESCRIPCIÓN</Text>
                                        </Box>
                                        {isExpanded ? (
                                            <MinusIcon fontSize='14px' />
                                        ) : (
                                            <AddIcon fontSize='14px' />
                                        )}
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {laboratorio?.descripcion}
                                </AccordionPanel>
                            </>
                        )}
                    </AccordionItem>
                    <AccordionItem>
                        {({ isExpanded }) => (
                            <>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <Text fontWeight="bold" alignSelf={'center'}>OBSERVACIONES</Text>
                                        </Box>
                                        {isExpanded ? (
                                            <MinusIcon fontSize='14px' />
                                        ) : (
                                            <AddIcon fontSize='14px' />
                                        )}
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    {laboratorio?.observaciones}
                                </AccordionPanel>

                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            </Stack>

            <Stack spacing={4} direction="row" justifyContent="space-between" py={6}>
                <Text fontSize="lg" fontWeight={'bold'}>Más Detalles del equipo</Text>
            </Stack>

            <Stack 
                direction={{ base: "column", lg : "row" }}
            >
                <Stack 
                    direction="column" 
                    p={6} 
                    spacing={4} 
                    w="full" 
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white" 
                    _dark={{ bg: "primary.1000" }}
                >
                        <Stack justifyContent="center">
                            <Text fontWeight="bold" textAlign="center" fontSize={'lg'}>Detalles especificos del equipo</Text>
                        </Stack>
                        <Divider />
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>MODELO </Text>
                            <Text>{laboratorio?.modelo}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>MARCA </Text>
                            <Text>{laboratorio?.marca}</Text>
                        </Stack>
                        <Divider />
                        <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>COLOR </Text>
                            <Text>{laboratorio?.color}</Text>
                        </Stack>
                        <Divider />
                </Stack>
                <Stack 
                    direction="column"
                    p={6} 
                    spacing={4} 
                    w="full" 
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white" 
                    _dark={{ bg: "primary.1000" }}
                >
                        <Stack justifyContent="center">
                            <Text fontWeight="bold" textAlign="center" fontSize={'lg'}>Detalles adiciones</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>ACCESORIOS </Text>
                            <Text>{laboratorio?.accesorios}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>CONDICIÓN </Text>
                            <Text>{laboratorio?.condicion}</Text>
                        </Stack>
                        <Divider />
                        <Stack spacing={4} direction={{ xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                            <Text fontWeight="bold" mr={2}>FECHA DE INGRESO </Text>
                            <Text>{Moment(laboratorio?.fecha_ingreso).format('[EL] DD [de] MMMM [del] YYYY [a las] HH:mm')}</Text>
                        </Stack>
                        <Divider />
                </Stack>
            </Stack>
            <Stack 
                direction="column"
                p={6} 
                spacing={4} 
                w="full" 
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                mt={3}
                _dark={{ bg: "primary.1000" }}
            >
                <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                    <Text fontWeight="bold" mr={2}>RESPONSABLE </Text>
                    <Text>{laboratorio?.responsable}</Text>
                </Stack>
                {
                    laboratorio?.estado === 'INACTIVO' ? (
                        <>
                            <Divider />
                            <Stack direction={{ base: "column", xs: "column", sm: "column", md: "row", lg: "row" }} justifyContent="space-between">
                                <Text fontWeight="bold" mr={2}>FECHA DE ANULACIÓN / INACTIVIDAD </Text>
                                <Text>{Moment.utc(laboratorio?.fecha_anulacion).format('DD [de] MMMM [del] YYYY [a las] HH:mm')}</Text>
                            </Stack>
                        </>
                    ) : null
                }
            </Stack>
        </>
    )
}

export default DetallesLaboratorio;