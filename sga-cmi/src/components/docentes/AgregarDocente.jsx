import React, { useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    Radio,
    RadioGroup,
    Stack,
    Text,
    Textarea,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { createDocente } from '../../features/docenteSlice';

const AgregarDocente = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = {
        nombres: '',
        apellidos: '',
        dni: '',
        correo: '',
        celular: '',
        fecha_nacimiento: '',
        fecha_contratacion: '',
        fecha_termino: '',
        direccion: '',
        observacion: '',
        estado: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [cargando, setCargando] = useState(false);

    const handleSave = (e) => {
        setCargando(true);
        e.preventDefault();
        dispatch(createDocente(indice)).then(() => {
            setCargando(false);
            navigate('/profesores');
        })
        setIndice(initialValues);
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/profesores'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="md">Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'bold'}>Agregar Nuevo Profesor</Text>
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

                    <Stack spacing={6} direction="column" justifyContent="space-between" p={2}>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>NOMBRES</FormLabel>
                                <Input
                                    placeholder="Escribe los nombres"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombres: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>APELLIDOS</FormLabel>
                                <Input
                                    placeholder="Escribe los apellidos"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, apellidos: e.target.value.toUpperCase() })}
                                    textTransform="uppercase"
                                />
                            </FormControl>
                        </Stack>


                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl isRequired>
                                <FormLabel fontWeight={'semibold'}>CI</FormLabel>
                                <Input
                                    placeholder='Ejemplo: 71499918'
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, dni: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>CORREO</FormLabel>
                                <Input
                                    placeholder='Ejemplo: usuario@gmail.com'
                                    type="email"
                                    onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                />
                            </FormControl>
                        </Stack>


                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
                            <FormControl fontWeight={'semibold'}>
                                <FormLabel>CELULAR</FormLabel>
                                <InputGroup>
                                    <InputLeftAddon children='+591' />
                                    <Input
                                        placeholder="Escribe el celular"
                                        type="tel"
                                        onChange={(e) => setIndice({ ...indice, celular: '+591' + e.target.value })}
                                    />
                                </InputGroup>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight={'semibold'}>FECHA DE NACIMIENTO</FormLabel>
                                <Input
                                    type="date"
                                    onChange={(e) => setIndice({ ...indice, fecha_nacimiento: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        
                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>FECHA DE CONTRATACIÓN</FormLabel>
                            <Input
                                type="date"
                                onChange={(e) => setIndice({ ...indice, fecha_contratacion: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>DIRECCIÓN</FormLabel>
                            <Input
                                placeholder="Escribe la dirección"
                                type="text"
                                onChange={(e) => setIndice({ ...indice, direccion: e.target.value })}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={'semibold'}>OBSERVACIÓN</FormLabel>
                            <Textarea
                                placeholder="Escribe una observación"
                                type="text"
                                onChange={(e) => setIndice({ ...indice, observacion: e.target.value })}
                            />
                        </FormControl>
                        <Stack spacing={2} direction={{ base: 'column', lg: "row" }} justifyContent="space-between">
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
                            <FormControl hidden = { indice.estado !== "RETIRADO"}>
                                    <FormLabel fontWeight={'semibold'}>FECHA DE TÉRMINO / RETIRO</FormLabel>
                                    <Input
                                        type="date"
                                        onChange={(e) => setIndice({ ...indice, fecha_termino: e.target.value })}
                                    />
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Stack spacing={4} direction="row" justifyContent="right">
                        <Button
                            colorScheme="primary"
                            _dark={{ bg: "primary.500", color: "white", _hover: { bg: "primary.600" } }}
                            loadingText='Guardando...'
                            spinnerPlacement='start'
                            size="lg"
                            type='submit'
                            isLoading={cargando ? true : false}
                            disabled={ indice.nombres === '' || indice.apellidos === '' || indice.dni === '' ? true : false }
                            borderRadius="xl"
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Box>
            </form>

        </>
    )
}

export default AgregarDocente;