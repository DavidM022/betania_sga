import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Textarea
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FaArrowLeft } from 'react-icons/fa';
import { Loading } from '../../helpers/Loading';
import moment from 'moment';
import { getLaboratorio, updateLaboratorio, reset } from '../../features/laboratorioSlice';

const EditarLaboratorio = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { isLoading, isError, message } = useSelector((state) => state.laboratorios);

    const params = useParams();

    const initialValues = {
        _id: null,
        codigo: '',
        nombre: '',
        modelo: '',
        marca: '',
        color: '',
        accesorios: '',
        condicion: '',
        cantidad: '',
        fecha_ingreso: '',
        descripcion: '',
        img: '',
        ubicacion: '',
        responsable: '',
        observaciones: '',
        fecha_anulacion: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user?.token) {
            navigate("/login");
        }

        dispatch(getLaboratorio(params.id)).then((res) => {
            setIndice(res.payload);
        });

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, params.id]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const handleSave = (e) => {

        e.preventDefault();

        dispatch(updateLaboratorio(indice)).then(() => {
            navigate('/laboratorios');
        });

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
                    <Text fontSize={{ base: "xs", lg: "lg" }}>Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize={{ base: "xs", lg: "lg" }} fontWeight={'bold'}>Modificar Equipo Seleccionado</Text>
                </HStack>
            </Stack>

            <form onSubmit={handleSave}>
                <Box
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white"
                    _dark={{ bg: "primary.1000" }}
                    mt={4}
                    p={6}
                >
                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CÓDIGO</FormLabel>
                                <Input
                                    defaultValue={indice?.codigo}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, codigo: e.target.value })}
                                    isReadOnly
                                />
                                <FormHelperText color={'purple.500'}>
                                    Este campo no se puede editar
                                </FormHelperText>
                            </FormControl>
                            
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                <Input
                                    placeholder="Escribe el nombre"
                                    defaultValue={indice?.nombre}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                <Input
                                    placeholder='Ejemplo: 100'
                                    defaultValue={indice?.cantidad}
                                    type="number"
                                    onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                />
                            </FormControl>
                        </Stack>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                            <Textarea
                                placeholder="Escribe la descripcion"
                                defaultValue={indice?.descripcion}
                                type="text"
                                onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                            <Input
                                placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                defaultValue={indice?.img}
                                type="text"
                                onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>UBICACION</FormLabel>
                            <Input
                                placeholder="Escribe la ubicacion del equipo"
                                defaultValue={indice?.ubicacion}
                                type="text"
                                onChange={(e) => setIndice({ ...indice, ubicacion: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>RESPONSABLE</FormLabel>
                            <Input
                                placeholder="Escribe el nombre del responsable"
                                defaultValue={indice?.responsable}
                                type="text"
                                onChange={(e) => setIndice({ ...indice, responsable: e.target.value })}
                            />
                        </FormControl>
                    </Stack>
                </Box>

                <Stack spacing={4} direction="row" justifyContent="space-between" py={6}>
                    <Text fontSize="lg" fontWeight={'bold'}>Más Detalles del equipo</Text>
                </Stack>

                <Box
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white"
                    _dark={{ bg: "primary.1000" }}
                    p={6}
                >
                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>MODELO</FormLabel>
                                <Input
                                    placeholder='Ejemplo: HP - ELITEBOOK 840'
                                    defaultValue={indice?.modelo}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, modelo: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>MARCA</FormLabel>
                                <Input
                                    placeholder='Ejemplo: LENOVO'
                                    defaultValue={indice?.marca}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, marca: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>COLOR</FormLabel>
                                <Input
                                    placeholder='Ejemplo: ROJO'
                                    defaultValue={indice?.color}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, color: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CONDICIÓN</FormLabel>
                                <Input
                                    placeholder='Ejemplo: BUENO / REGULAR / MALO'
                                    defaultValue={indice?.condicion}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, condicion: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>FECHA DE INGRESO</FormLabel>
                                <Input
                                    value={moment(indice?.fecha_ingreso).format("YYYY-MM-DD HH:mm")}
                                    onChange={(e) => setIndice({ ...indice, fecha_ingreso: e.target.value })}
                                    type="datetime-local"
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>ACCESORIOS</FormLabel>
                                <Input
                                    placeholder='Ejemplo: MOUSE, TECLADO, CABLE DE RED'
                                    defaultValue={indice?.accesorios}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, accesorios: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                <Textarea
                                    placeholder="Escribe las observaciones acerca del articulo"
                                    defaultValue={indice.observaciones}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                />
                            </FormControl>
                            <Stack spacing={4} direction="row">
                                <FormControl>
                                    <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                    <RadioGroup
                                        onChange={(e) => setIndice({ ...indice, estado: e })}
                                        value={indice?.estado}
                                    >
                                        <Stack direction='row'>
                                            <Radio value={'ACTIVO'}>ACTIVO</Radio>
                                            <Radio value={'INACTIVO'}>INACTIVO</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl hidden = { indice.estado !== "INACTIVO" }>
                                    <FormLabel fontWeight={'semibold'}>FECHA DE ANULACIÓN / INACTIVIDAD</FormLabel>
                                    <Input
                                        value={!indice?.fecha_anulacion ? new Date() : moment(indice?.fecha_anulacion).format("YYYY-MM-DD HH:mm")}
                                        onChange={(e) => setIndice({ ...indice, fecha_anulacion: e.target.value })}
                                        type="datetime-local"
                                    />
                                </FormControl>
                            </Stack>
                        </Stack>

                        <Stack spacing={4} direction="row" justifyContent="right">
                            <Button
                                colorScheme="green"
                                _dark={{ bg: "green.500", color: "white", _hover: { bg: "green.600" } }}
                                size="lg"
                                type='submit'
                                borderRadius="xl"
                            >
                                Actualizar
                            </Button>
                        </Stack>

                    </Stack>
                </Box>
            </form>
        </>
    )
}

export default EditarLaboratorio;