import React, { useState } from 'react';
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { createUsuario } from '../../features/usuarioSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const ModalAgregarPersona = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        nombre: '',
        correo: '',
        password: '',
        rol: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const handleSave = () => {
        dispatch(createUsuario(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <>
            <Button
                colorScheme="purple"
                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" }}}
                aria-label="Agregar"
                leftIcon={<Icon as={VscAdd} fontSize="lg" />}
                variant="solid"
                rounded={'xl'}
                onClick={handleModalOpen}
            >
                Nuevo Registro
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="5xl" isCentered>
                <ModalOverlay 
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="2xl">
                    <ModalHeader textAlign="center">AGREGAR NUEVO USUARIO</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4} direction={{ base: "column", lg: "row"}} justifyContent="space-between" p={4}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">NOMBRES Y APELLIDOS</FormLabel>
                                <Input
                                    placeholder="Ingrese los nombres y apellidos"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack spacing={4} direction={{ base: "column", lg: "row"}} justifyContent="space-between" p={4}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">CORREO</FormLabel>
                                <Input
                                    placeholder="Ingrese el correo"
                                    defaultValue={'@gmail.com'}
                                    type="email"
                                    onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                />
                                <FormHelperText textColor={'red.500'}>
                                    {
                                        indice.correo.includes("@") ? '' : indice.correo.length > 0 ? 'El correo debe contener el caracter @' : ''
                                    }
                                </FormHelperText>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight="semibold">CONTRASEÑA</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={ showPassword ? "text" : "password" }
                                        placeholder='Ingrese la contraseña'
                                        onChange={(e) => setIndice({ ...indice, password: e.target.value })}
                                    />
                                    <InputRightElement width="3rem">
                                    <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                        {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                    </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormHelperText textColor={'red.500'}>
                                    {
                                        indice.password.length > 0 && indice.password.length < 6 ? 'debe tener al menos 6 caracteres' : ''
                                    }
                                </FormHelperText>
                            </FormControl>
                        </Stack>
                        <Stack spacing={4} direction={{ base: "column", lg: "row"}} justifyContent="space-between" p={4}>
                            <FormControl isRequired>
                                <FormLabel fontWeight="semibold">ROL</FormLabel>
                                <Select
                                    onChange={(e) => setIndice({ ...indice, rol: e.target.value })}
                                    placeholder="SELECCIONE TIPO DE USUARIO"
                                >
                                    <option value={'ADMIN_ROLE'}>ADMINISTRADOR</option>
                                    <option value={'ADMINISTRATIVE_ASSISTANT_ROLE'}>ASISTENTE ADMINISTRATIVO</option>
                                    <option value={'CASHIER_ROLE'}>CAJERO</option>
                                </Select>
                            </FormControl>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }} size="lg" mr={3} onClick={handleModalClose} borderRadius="xl">
                            CANCELAR
                        </Button>
                        <Button
                            colorScheme="purple"
                            _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                            size="lg"
                            mr={3}
                            onClick={handleSave}
                            borderRadius="xl"
                            disabled={indice.nombre === '' || indice.correo === '' || indice.password === '' || indice.rol === ''}
                        >
                            GUARDAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
