import React, { useEffect } from 'react'
import {
    Stack,
    Text,
    Divider,
    Badge,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionPanel,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../../helpers/toast';
import { Loading } from '../../../helpers/Loading';
import { getPago, reset } from '../../../features/pagos/EBR/pagoSlice';
import moment from 'moment';

const DetallesPago = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { pago, isLoading, isError, message } = useSelector((state) => state.pagos_ebr);

    const params = useParams(location);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getPago(params.id));

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
            <Stack
                direction="column"
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full">
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'start'}>DETALLES DEL PAGO</Text>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-between" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CODIGO </Text>
                            <Text>{pago?.codigo}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">METODO DE PAGO </Text>
                            <Text>{pago?.metodo_pago}</Text>
                        </Stack>
                        <Stack spacing={1} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">IMPORTE PAGADO</Text>
                            <Badge
                                colorScheme={'purple'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                Bs/{pago?.importe}
                            </Badge>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-around" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">MESES:</Text>
                            <Text>{pago?.meses?.map(mes => mes).join(', ')}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">AÑO:</Text>
                            <Text>{pago?.anio}</Text>
                        </Stack>
                        <Stack spacing={1} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">ESTADO:</Text>
                            <Badge
                                colorScheme={pago?.estado === "CANCELADO" ? 'green' : 'red'}
                                variant="solid"
                                px={6}
                                py={1.5}
                                rounded="full"
                            >
                                {pago?.estado}
                            </Badge>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Text fontWeight="bold">CONCEPTO:</Text>
                        <Text fontWeight="normal">
                            {pago?.concepto?.map(data => data.label).join(', ')}
                        </Text>
                    </Stack>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Text fontWeight="bold">FECHA REGISTRADA DEL PAGO:</Text>
                        <Text fontWeight="normal">
                            {moment(pago?.createdAt).format('DD-MM-YYYY - HH:mm:ss A')}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                mt={3}
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
                p={4}
            >
                <Stack direction="column" py={6} px={4} spacing={4} w="full">
                    <Text fontSize={{ base: "md", lg: "lg" }} fontWeight={'black'} textAlign={'start'}>DETALLES DEL ESTUDIANTE QUIEN REALIZÓ EL PAGO</Text>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-between" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">APELLIDOS</Text>
                            <Text>{pago?.estudiante?.apellidos}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">NOMBRES</Text>
                            <Text>{pago?.estudiante?.nombres}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CI</Text>
                            <Text>{pago?.estudiante?.dni}</Text>
                        </Stack>
                    </Stack>
                    <Divider />
                    <Stack direction={{ base: "column", lg: "row" }} spacing={1} w="full" justifyContent="space-around" textAlign={'center'}>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CORREO </Text>
                            <Text>{pago?.estudiante?.correo}</Text>
                        </Stack>
                        <Stack spacing={0} direction="column" justifyContent="space-between">
                            <Text fontWeight="bold">CELULAR:</Text>
                            <Text>{pago?.estudiante?.celular}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            <Stack
                direction="column"
                mt={3}
                borderRadius="2xl"
                boxShadow="base"
                overflow="hidden"
                bg="white"
                _dark={{ bg: "primary.1000" }}
                p={4}
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
                                    {pago?.descripcion}
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
                                    {pago?.observaciones}
                                </AccordionPanel>

                            </>
                        )}
                    </AccordionItem>
                </Accordion>
            </Stack>
        </>
    )
}

export default DetallesPago;