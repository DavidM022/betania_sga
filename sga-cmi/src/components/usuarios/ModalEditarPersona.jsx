import React, { useState } from 'react'
import {
    Button,
    FormControl,
    FormLabel,
    Icon,
    IconButton,
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
    Switch,
    Tooltip,
} from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';
import { updateUsuario } from '../../features/usuarioSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const ModalEditarPersona = ({ row }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        uid: null,
        nombre: '',
        correo: '',
        password: '',
        rol: '',
        estado: null,
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = (data) => {
        setIsModalOpen(true);
        setIndice(data);
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleUpdate = () => {
        dispatch(updateUsuario(indice));
        setIsModalOpen(false)
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <>
            <Tooltip hasArrow label='Editar' placement='auto'>
                <IconButton
                    colorScheme="blackAlpha"
                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" } }}
                    aria-label="Editar"
                    icon={<Icon as={VscEdit}
                        fontSize="2xl" />}
                    variant="ghost"
                    onClick={() => handleModalOpen(row)}
                    ml={2}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="5xl" isCentered>
                <ModalOverlay
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="2xl">
                    <ModalHeader textAlign="center">ACTUALIZAR PERSONA</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                            <FormControl>
                                <FormLabel fontWeight="semibold">NOMBRES</FormLabel>
                                <Input
                                    defaultValue={indice ? indice.nombre : ''}
                                    placeholder="Escribe los nombres"
                                    type="text"
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                            <Stack spacing={4} direction={{ base: "column", md: "row", lg: "row" }} mt={4}>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">CORREO</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.correo : ''}
                                        placeholder="Escribe el correo"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">CONTRASEÑA</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder='Si desea, puede modificar el password'
                                            onChange={(e) => setIndice({ ...indice, password: e.target.value })}
                                        />
                                        <InputRightElement width="3rem">
                                            <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                                {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            </Stack>
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} alignItems="center" mt={4}>
                                {
                                    user?.usuario?.rol === 'ADMIN_ROLE' ? (
                                        <>
                                            <FormControl>
                                                <FormLabel fontWeight="semibold">ROL</FormLabel>
                                                <Select
                                                    defaultValue={indice ? indice.rol : ''}
                                                    onChange={(e) => setIndice({ ...indice, rol: e.target.value })}
                                                >
                                                    <option value={'ADMIN_ROLE'}>ADMINISTRADOR</option>
                                                    <option value={'ADMINISTRATIVE_ASSISTANT_ROLE'}>ASISTENTE ADMINISTRATIVO</option>
                                                    <option value={'CASHIER_ROLE'}>CAJERO</option>
                                                </Select>
                                            </FormControl>

                                            <FormControl>
                                                <FormLabel fontWeight="semibold">ESTADO</FormLabel>
                                                <Switch
                                                    onChange={(e) => setIndice({ ...indice, estado: e.target.checked })}
                                                    value={indice ? indice.estado : null}
                                                    colorScheme="purple"
                                                    isChecked={indice.estado === true ? true : false}
                                                    size='lg'

                                                />
                                            </FormControl>
                                        </>
                                    ) : null
                                }
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="red"
                            _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" } }}
                            size="lg"
                            mr={3}
                            onClick={handleModalClose}
                            borderRadius="xl"
                        >
                            CANCELAR
                        </Button>
                        <Button
                            colorScheme="green"
                            _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" } }}
                            size="lg"
                            mr={3}
                            onClick={handleUpdate}
                            borderRadius="xl"
                        >
                            ACTUALIZAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
