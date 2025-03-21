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
    Stack,
    Textarea,
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { createCategoriaUniforme } from '../../../features/categoriaUniformeSlice';

const ModalAgregarCategoria = () => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        nombre: '',
        descripcion: '',
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
        dispatch(createCategoriaUniforme(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
    }

    return (
        <>
            <Tooltip hasArrow label='Agregar Nuevo Registro' placement='auto'>
                <IconButton
                    colorScheme="purple"
                    _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" }}}
                    aria-label="Agregar"
                    icon={<Icon as={VscAdd} fontSize="2xl" />}
                    variant="solid"
                    rounded="xl"
                    onClick={handleModalOpen}
                />
            </Tooltip>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="4xl" isCentered>
                <ModalOverlay
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                    <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="2xl">
                        <ModalHeader textAlign="center">AGREGAR NUEVA CATEGORIA PARA UNIFORMES</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={4} direction="column" justifyContent="space-between" p={4}>
                                <FormControl isRequired>
                                    <FormLabel>NOMBRE</FormLabel>
                                    <Input
                                        placeholder="ESCRIBE EL NOMBRE DE LA CATEGORIA"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, nombre: e.target.value.toUpperCase() })}
                                        textTransform="uppercase"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion de la categoria"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                    />
                                </FormControl>
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
                                colorScheme="purple" 
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" }}} 
                                size="lg" 
                                mr={3} 
                                onClick={handleSave}
                                disabled={ indice.codigo === '' || indice.nombre === '' }
                                borderRadius="xl"
                            >
                                GUARDAR
                            </Button>
                        </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAgregarCategoria