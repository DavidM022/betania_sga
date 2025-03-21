import React, { useState } from 'react'
import { 
    Button, 
    FormControl, 
    FormLabel, 
    Icon, 
    IconButton, 
    Input, 
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
    Text, 
    Textarea, 
    Tooltip
} from '@chakra-ui/react'
import { VscEdit } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { updateGrado } from '../../features/gradoSlice';

const ModalEditarGrado = ({ row }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        _id: null,
        nombre: '',
        descripcion: '',
        nivel: '',
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
        dispatch(updateGrado(indice));
        setIsModalOpen(false)
    }

    return (
        <>
            <Tooltip hasArrow label='Editar' placement='auto'>
                <IconButton 
                    colorScheme="blackAlpha" 
                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" }}}
                    aria-label="Editar" 
                    icon={<Icon as={VscEdit} 
                    fontSize="2xl" />} 
                    variant={'ghost'}
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
                        <ModalHeader textAlign="center">ACTUALIZAR GRADO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">NOMBRE</FormLabel>
                                    <Input
                                        defaultValue={indice ? indice.nombre : ''}
                                        placeholder="Escribe el nombre de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        defaultValue={indice ? indice.descripcion : ''}
                                        placeholder="Escribe la descripcion de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <Stack spacing={4} direction="row" justifyContent="space-between">
                                    <FormControl
                                    >
                                        <FormLabel fontWeight="semibold">NIVEL EDUCATIVO</FormLabel>
                                        <Select
                                            placeholder='SELECCIONE UN NIVEL EDUCATIVO'
                                            defaultValue={indice? indice.nivel : ''}
                                            onChange={(e) => setIndice({ ...indice, nivel: e.target.value })}
                                        >
                                            <option value="INICIAL">NIVEL INICIAL</option>
                                            <option value="PRIMARIA">NIVEL PRIMARIA</option>
                                            <option value="SECUNDARIA">NIVEL SECUNDARIA</option>
                                            <option value="OTRO">OTRO</option>
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" w="full">
                                    <Text fontWeight="semibold">ESTADO</Text>
                                    <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={ indice ? indice.estado : null } colorScheme="purple" isChecked = { indice.estado === true ? true : false } size='lg' />
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                colorScheme="red" 
                                _dark={{ bg: "red.500", color: "white", _hover: { bg: "red.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleModalClose}
                                borderRadius="xl"
                            >
                                CANCELAR
                            </Button>
                            <Button 
                                colorScheme="green" 
                                _dark={{ bg: "green.600", color: "white", _hover: { bg: "green.800" }}} 
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

export default ModalEditarGrado