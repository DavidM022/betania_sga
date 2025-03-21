import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { RiRefreshLine } from 'react-icons/ri';
import { createLaboratorio } from '../../features/laboratorioSlice';

const AgregarLaboratorio = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
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
        ubicacion: '',
        responsable: '',
        img: '',
        observaciones: '',
        fecha_anulacion: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createLaboratorio(indice)).then(() => {
            setCargando(false);
            navigate('/laboratorios');
        })
        setIndice(initialValues);
    }

    const handleClickGenerateCode = () => {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let result1 = '';

        const charactersLength = characters.length;

        for (let i = 0; i < 10; i++) {
            result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        setIndice({ ...indice, codigo: result1.toUpperCase() });
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={{
                        pathname : '/laboratorios'
                    }}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize={{ base: "xs", lg: "md" }}>Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize={{ base: "xs", lg: "lg" }} fontWeight={'bold'}>Agregar Nuevo Equipo de Laboratorio</Text>
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
                        <FormControl hidden>
                            <FormLabel fontWeight={'semibold'}>CÓDIGO</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    type={'text'}
                                    placeholder='Ingrese el codigo'
                                    defaultValue={indice.codigo !== '' ? indice.codigo : ''}
                                    onChange={(e) => setIndice({ ...indice, codigo: e.target.value.toUpperCase() })}
                                    textTransform={'uppercase'}
                                />
                                <InputRightElement width='2.5rem'>
                                    <Tooltip hasArrow label='Generar codigo' placement='auto'>
                                        <IconButton aria-label="Buscar" colorScheme={'yellow'} rounded={'full'} size={'sm'} onClick={handleClickGenerateCode}>
                                            <Icon as={RiRefreshLine} />
                                        </IconButton>
                                    </Tooltip>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                <Input
                                    placeholder="Escribe el nombre"
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
                                    type="number"
                                    onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                />
                            </FormControl>
                        </Stack>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                            <Textarea
                                placeholder="Escribe la descripcion"
                                type="text"
                                onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                rows={2}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                            <Input
                                type="text"
                                placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>UBICACIÓN DEL EQUIPO</FormLabel>
                            <Input
                                type="text"
                                placeholder='Ejemplo: Aula 1'
                                onChange={(e) => setIndice({ ...indice, ubicacion: e.target.value })}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>RESPONSABLE</FormLabel>
                            <Input
                                type="text"
                                placeholder='Ejemplo: Juan Perez'
                                onChange={(e) => setIndice({ ...indice, responsable: e.target.value })}
                            />
                        </FormControl>
                    </Stack>

                </Box>


                <Stack spacing={4} direction="row" justifyContent="space-between" py={6}>
                    <Text fontSize="lg" fontWeight={'bold'}>Más Detalles del equipo del laboratorio</Text>
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
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>MODELO</FormLabel>
                                <Input
                                    placeholder='Ingrese el modelo'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, modelo: e.target.value })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>MARCA</FormLabel>
                                <Input
                                    placeholder='Ingrese la marca'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, marca: e.target.value })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>COLOR</FormLabel>
                                <Input
                                    placeholder='Ejemplo: ROJO'
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
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, condicion: e.target.value })}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>FECHA DE INGRESO</FormLabel>
                                <Input
                                    type="datetime-local"
                                    onChange={(e) => setIndice({ ...indice, fecha_ingreso: e.target.value })}
                                />
                            </FormControl>

                        </Stack>
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>ACCESORIOS</FormLabel>
                                <Input
                                    placeholder='Ejemplo: CORDEL, VIDRIO, CABLES'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, accesorios: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                <Textarea
                                    defaultValue={indice ? indice.observaciones : ''}
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                    placeholder="Escribe las observaciones acerca del articulo"
                                    rows={2}
                                />
                            </FormControl>
                            <Stack spacing={4} direction="row">
                                <FormControl isRequired>
                                    <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                    <RadioGroup
                                        onChange={(e) => setIndice({ ...indice, estado: e })}
                                    >
                                        <Stack direction='row'>
                                            <Radio value={"ACTIVO"}>ACTIVO</Radio>
                                            <Radio value={"INACTIVO"}>INACTIVO</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>

                                <FormControl hidden={indice.estado !== "INACTIVO"}>
                                    <FormLabel fontWeight={'semibold'}>FECHA DE ANULACIÓN / INACTIVIDAD</FormLabel>
                                    <Input
                                        type="date"
                                        onChange={(e) => setIndice({ ...indice, fecha_anulacion: e.target.value })}
                                    />
                                </FormControl>
                            </Stack>

                        </Stack>

                        <Stack spacing={4} direction="row" justifyContent="right">
                            <Button
                                colorScheme="purple"
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                                loadingText='Guardando...'
                                spinnerPlacement='start'
                                size="lg"
                                type='submit'
                                isLoading={cargando ? true : false}
                                disabled={indice.nombre === '' ? true : false}
                                borderRadius="xl"
                            >
                                Guardar
                            </Button>
                        </Stack>

                    </Stack>
                </Box>
            </form>

        </>
    )
}

export default AgregarLaboratorio;