import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
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
    Tooltip,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { createPrestamoLibro, getLibroByCodigo } from '../../../features/prestamo_libroSlice';
import { Search2Icon } from '@chakra-ui/icons';
import { getDocenteByDni } from '../../../features/docenteSlice';
import { getEstudianteByDni } from '../../../features/estudianteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RegistrarPrestamoLibro = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        codigo: '',
        estudiante: '',
        docente: '',
        libro: '',
        descripcion_entrega: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [codigoLibro, setCodigoLibro] = useState('');
    const [dniEstudiante, setDniEstudiante] = useState('');
    const [dniDocente, setDniDocente] = useState('');
    const [datosLibro, setDatosLibro] = useState([{}]);
    const [datosEstudiante, setDatosEstudiante] = useState([{}]);
    const [datosDocente, setDatosDocente] = useState([{}]);
    const [tipoSeleccion, setTipoSeleccion] = useState('');

    const handleSearchLibroByCodigo = () => {
        dispatch(getLibroByCodigo(codigoLibro)).then((res) => {
            if (res.meta?.requestStatus !== 'rejected') {
                setIndice({ ...indice, libro: res.payload._id });
                setDatosLibro(res.payload);
            } else {
                ToastChakra('LIBRO NO ENCONTRADO', 'El libro no se encuentra registrado con ese codigo', 'error', 1500, 'bottom');
            }
        })
    }

    const handleSearchEstudianteByDni = () => {
        dispatch(getEstudianteByDni(dniEstudiante)).then((res) => {
            setIndice({ ...indice, estudiante: res.payload._id });
            setDatosEstudiante(res.payload);
        });
    }

    const handleSearchDocenteByDni = () => {
        dispatch(getDocenteByDni(dniDocente)).then((res) => {
            setIndice({ ...indice, docente: res.payload._id });
            setDatosDocente(res.payload);
        });
    }

    const handleChangeRadio = (e) => {
        setTipoSeleccion(e);
        if (e === 'ESTUDIANTE') {
            setDniDocente('');
            setDatosDocente([{}]);
        } else {
            setDniEstudiante('');
            setDatosEstudiante([{}]);
        }
    }

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createPrestamoLibro(indice)).then(() => {
            setCargando(false);
            navigate('/libros/prestamos');
        })
        setIndice(initialValues);
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/libros/prestamos'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="lg">Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'bold'}>Registrar Nuevo Prestamo de Libros</Text>
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
                    p={4}
                >

                    <Stack spacing={8} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                            {/* <FormControl isRequired>
                                <FormLabel fontWeight="semibold">CODIGO</FormLabel>
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
                            </FormControl> */}
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">LIBRO</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Buscar por codigo'
                                        onChange={(e) => setCodigoLibro(e.target.value.toUpperCase())}
                                        textTransform={'uppercase'}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Buscar por codigo' placement='auto'>
                                            <IconButton
                                                aria-label="Buscar"
                                                rounded={'full'} size={'sm'}
                                                icon={<Icon as={Search2Icon} fontSize="md" />}
                                                colorScheme={'green'}
                                                variant="solid"
                                                disabled={codigoLibro === '' ? true : false}
                                                onClick={handleSearchLibroByCodigo}
                                            />
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                                {
                                    !datosLibro?.nombre ? null : <FormHelperText>
                                        El libro Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosLibro?.nombre}</span> y su autor es : <span style={{ color: 'blue', fontWeight: "bold" }}> {datosLibro?.autor} </span>
                                    </FormHelperText>
                                }
                            </FormControl>
                        </Stack>
                        <Stack spacing={4} direction="column" justifyContent="space-between" mt={2}>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">A QUIEN SE HACE EL PRESTADO</FormLabel>
                                <RadioGroup
                                    onChange={(e) => handleChangeRadio(e)}
                                >
                                    <Stack direction='row'>
                                        <Radio value={"ESTUDIANTE"}>ESTUDIANTE</Radio>
                                        <Radio value={"DOCENTE"}>PROFESOR</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl isRequired={tipoSeleccion === 'ESTUDIANTE'} hidden={tipoSeleccion !== 'ESTUDIANTE'}>
                                <FormLabel fontWeight="semibold">ESTUDIANTE</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Buscar por CI'
                                        onChange={(e) => setDniEstudiante(e.target.value)}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Buscar por CI' placement='auto'>
                                            <IconButton
                                                aria-label="Buscar"
                                                rounded={'full'} size={'sm'}
                                                icon={<Icon as={Search2Icon} fontSize="md" />}
                                                colorScheme={'green'}
                                                variant="solid"
                                                disabled={dniEstudiante === '' ? true : false}
                                                onClick={handleSearchEstudianteByDni}
                                            />
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                                {
                                    !datosEstudiante?.nombres ? null : <FormHelperText>
                                        El estudiante Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosEstudiante?.nombres + ' ' + datosEstudiante?.apellidos}</span>
                                    </FormHelperText>
                                }
                            </FormControl>

                            <FormControl isRequired={tipoSeleccion === 'DOCENTE'} hidden={tipoSeleccion !== 'DOCENTE'}>
                                <FormLabel fontWeight="semibold">PROFESOR</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        type={'text'}
                                        placeholder='Buscar por CI'
                                        onChange={(e) => setDniDocente(e.target.value)}
                                    />
                                    <InputRightElement width='2.5rem'>
                                        <Tooltip hasArrow label='Buscar por CI' placement='auto'>
                                            <IconButton
                                                aria-label="Buscar"
                                                rounded={'full'} size={'sm'}
                                                icon={<Icon as={Search2Icon} fontSize="md" />}
                                                colorScheme={'green'}
                                                variant="solid"
                                                disabled={dniDocente === '' ? true : false}
                                                onClick={handleSearchDocenteByDni}
                                            />
                                        </Tooltip>
                                    </InputRightElement>
                                </InputGroup>
                                {
                                    !datosDocente?.nombres ? null : <FormHelperText>
                                        El Docente Seleccionado es : <span style={{ color: 'blue', fontWeight: "bold" }}>{datosDocente?.nombres + ' ' + datosDocente?.apellidos}</span>
                                    </FormHelperText>
                                }
                            </FormControl>
                        </Stack>
                        <Stack spacing={2} direction="column" justifyContent="space-between" mt={2}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">DESCRIPCION DE LA ENTREGA</FormLabel>
                                <Textarea
                                    placeholder="Descripcion de la entrega"
                                    onChange={(e) => setIndice({ ...indice, descripcion_entrega: e.target.value })}
                                    rows={2}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                                <Textarea
                                    placeholder="Observaciones adicionales de la entrega"
                                    onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                    rows={2}
                                />
                            </FormControl>
                        </Stack>

                        <Stack spacing={4} direction="row" justifyContent="right">
                            <Button
                                colorScheme="purple"
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                                loadingText='Guardando...'
                                spinnerPlacement='start'
                                type='submit'
                                isLoading={cargando ? true : false}
                                isDisabled={tipoSeleccion === 'ESTUDIANTE' ? !indice.estudiante : !indice?.docente || !indice.libro}
                                borderRadius="xl"
                            >
                                REGISTRAR PRESTAMO
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </form>
        </>
    )
}

export default RegistrarPrestamoLibro;