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
    Select,
    Stack,
    Text,
    Textarea
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FaArrowLeft } from 'react-icons/fa';
import { createEstudiante } from '../../../features/estudiantes/CEBA/estudianteSlice';
import { getGrados, reset } from '../../../features/gradoSlice';

const AgregarEstudiante = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { grados, isError, message } = useSelector((state) => state.grados);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user?.token) {
            navigate("/login");
        }

        dispatch(getGrados());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const initialValues = {
        nombres: '',
        apellidos: '',
        dni: '',
        sexo: '',
        correo: '',
        celular: '',
        domicilio: '',
        fecha_nacimiento: '',
        nombre_padres: '',
        celular_padres: '',
        correo_padres: '',
        colegio_procedencia: '',
        tipo_estudiante: '',
        modalidad: '',
        ubicacion_periferico: '',
        grado: '',
        img: '',
        observaciones: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    let gradosFilter = grados.filter(grado => grado.modalidad === "CEBA");

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createEstudiante(indice)).then(() => {
            setCargando(false);
            navigate('/ceba/estudiantes');
        })
        setIndice(initialValues);
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/ceba/estudiantes'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="md" fontWeight={'black'}>Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'black'}>Agregar Nuevo Estudiante</Text>
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

                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                                <Input
                                    placeholder="Escribe el apellidos"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, apellidos: e.target.value.toUpperCase() })}
                                    textTransform={'uppercase'}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                                <Input
                                    placeholder="Escribe el nombre"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombres: e.target.value.toUpperCase() })}
                                    textTransform={'uppercase'}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>CI</FormLabel>
                                <Input
                                    placeholder="Ejemplo: 70408950"
                                    type="number"
                                    onChange={(e) => setIndice({ ...indice, dni: e.target.value })}
                                />
                                <FormHelperText textColor={'red.500'}>
                                    {
                                        indice.dni?.length > 0 && indice.dni?.length < 8 ? 'El CI debe tener al menos 8 caracteres' : ''
                                    }
                                </FormHelperText>
                            </FormControl>
                        </Stack>

                        <FormControl isRequired>
                            <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                            <Select
                                placeholder="Selecciona una opción"
                                onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                            >
                                {gradosFilter.map((grado) => (
                                    <option key={grado._id} value={grado._id}>
                                        {grado.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel fontWeight={'semibold'}>SEXO</FormLabel>
                            <RadioGroup
                                onChange={(e) => setIndice({ ...indice, sexo: e })}
                            >
                                <Stack direction='row'>
                                    <Radio value={"M"}>MASCULINO</Radio>
                                    <Radio value={"F"}>FEMENINO</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
                            <Input
                                placeholder="Escribe su correo"
                                type="email"
                                onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>CELULAR</FormLabel>
                            <Input
                                placeholder="Escribe su # celular"
                                type="number"
                                onChange={(e) => setIndice({ ...indice, celular: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>DOMICILIO</FormLabel>
                            <Input
                                placeholder="Escribe su domicilio"
                                type="text"
                                onChange={(e) => setIndice({ ...indice, domicilio: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>FECHA DE NACIMIENTO</FormLabel>
                            <Input
                                type="date"
                                onChange={(e) => setIndice({ ...indice, fecha_nacimiento: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>IMAGEN PERFIL</FormLabel>
                            <Input
                                type="text"
                                placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                            />
                        </FormControl>

                    </Stack>

                </Box>

                <Stack spacing={4} direction="row" justifyContent="space-between" py={6}>
                    <Text fontSize="md" fontWeight={'black'}>Más Detalles del estudiante</Text>
                </Stack>

                <Box
                    borderRadius="2xl"
                    boxShadow="base"
                    overflow="hidden"
                    bg="white"
                    _dark={{ bg: "primary.1000" }}
                    p={4}
                >

                    <Stack spacing={4} direction="column" justifyContent="space-between" p={2}>
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>NOMBRES Y APELLIDOS DE LOS PADRE</FormLabel>
                            <Input
                                placeholder='Ejemplo: JUAN'
                                type="text"
                                onChange={(e) => setIndice({ ...indice, nombre_padres: e.target.value.toUpperCase() })}
                                textTransform={'uppercase'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>CELULAR DE LOS PADRES</FormLabel>
                            <Input
                                placeholder='Ejemplo: 987654321'
                                type="text"
                                onChange={(e) => setIndice({ ...indice, celular_padres: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>CORREO DE LOS PADRES</FormLabel>
                            <Input
                                placeholder='Ejemplo: usuario@gmail.com'
                                type="text"
                                onChange={(e) => setIndice({ ...indice, correo_padres: e.target.value })}
                            />
                        </FormControl>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>COLEGIO DE PROCEDENCIA</FormLabel>
                                <Input
                                    placeholder='Ejemplo: HP - ELITEBOOK 840'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, colegio_procedencia: e.target.value.toUpperCase() })}
                                    textTransform={'uppercase'}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>TIPO ESTUDIANTE</FormLabel>
                                <Select
                                    placeholder="Selecciona un tipo de estudiante"
                                    onChange={(e) => setIndice({ ...indice, tipo_estudiante: e.target.value })}>
                                    <option value="RESIDENCIA">RESIDENCIA</option>
                                    <option value="EXTERNA">EXTERNA</option>
                                    <option value="OTRO">OTRO</option>
                                </Select>
                            </FormControl>
                        </Stack>

                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>

                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>MODALIDAD</FormLabel>
                                <RadioGroup
                                    onChange={(e) => setIndice({ ...indice, modalidad: e })}
                                >
                                    <Stack direction='row'>
                                        <Radio value={"PRESENCIAL"}>PRESENCIAL</Radio>
                                        <Radio value={"VIRTUAL"}>VIRTUAL</Radio>
                                        <Radio value={"PERIFERICO"}>PERIFERICO</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>

                            <FormControl hidden={ indice.modalidad !== 'PERIFERICO' }>
                                <FormLabel fontWeight={'semibold'}>UBICACIÓN PERIFÉRICO</FormLabel>
                                <Input
                                    placeholder='Ingrese la ubicación del periférico'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, ubicacion_periferico: e.target.value.toUpperCase() })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={2}>
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
                                            <Radio value={"RETIRADO"}>RETIRADO</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </Stack>

                        </Stack>

                        <Stack spacing={4} direction="row" justifyContent="right">
                            <Button
                                colorScheme="messenger"
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.600" } }}
                                loadingText='Guardando...'
                                spinnerPlacement='start'
                                size="lg"
                                type='submit'
                                isLoading={cargando ? true : false}
                                isDisabled={indice.nombres === '' || indice.apellidos === '' || indice.dni === '' || indice.sexo === '' ? true : false}
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

export default AgregarEstudiante;