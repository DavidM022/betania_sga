import React, { useState } from 'react'
import { 
    Button,
    FormControl, 
    FormHelperText, 
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
    Textarea, 
    Tooltip
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { createLibro } from '../../features/libroSlice';
import { RiRefreshLine } from 'react-icons/ri';
import ModalAgregarGrado from '../grados/ModalAgregarGrado';

const ModalAgregarLibro = ({ grados }) => {

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const initialValues = {
        titulo: '',
        nombre: '',
        codigo: '',
        descripcion: '',
        editorial: '',
        autor: '',
        cantidad: '',
        grado: '',
        img: '',
        es_obra_literaria: false,
        observaciones: '',
        estado: true,
    }

    const [indice, setIndice] = useState(initialValues);

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
    }

    const handleSave = () => {
        dispatch(createLibro(indice));
        setIsModalOpen(false)
        setIndice(initialValues)
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
            <Button
                colorScheme="purple"
                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" }}}
                aria-label="Agregar"
                leftIcon={<Icon as={VscAdd} fontSize="xl" />}
                variant="solid"
                rounded={'xl'}
                onClick={handleModalOpen}
            >
                Nuevo Registro
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
                <ModalOverlay/>
                    <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="none">
                        <ModalHeader textAlign="center">REGISTRAR NUEVO LIBRO</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Stack spacing={2} mt={-4} direction="column" justifyContent="space-between" p={2}>
                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>TITULO</FormLabel>
                                        <Input
                                            placeholder="Escribe el titulo del libro"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, titulo: e.target.value.toUpperCase() })}
                                            textTransform="uppercase"
                                        />
                                    </FormControl> '
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>NOMBRE</FormLabel>
                                        <Input
                                            placeholder="Nombre del libro"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                            textTransform="uppercase"
                                        />
                                    </FormControl>
                                </Stack>
                                <FormControl hidden={true}>
                                    <FormLabel fontWeight={'semibold'}>CODIGO</FormLabel>
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

                                <Stack spacing={2} direction={{ base: 'column', lg: "row" }}>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>CANTIDAD</FormLabel>
                                        <Input
                                            placeholder="100"
                                            type="number"
                                            onChange={(e) => setIndice({ ...indice, cantidad: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>GRADO</FormLabel>
                                        <Stack direction="row" justifyContent="space-between" w="full">
                                            <Select 
                                                placeholder="Selecciona una opción" 
                                                onChange={(e) => setIndice({ ...indice, grado: e.target.value })}
                                            >
                                                { grados.map((grado) => (
                                                        <option key={grado._id} value={grado._id}>
                                                            {grado.nombre}
                                                        </option>
                                                ))}
                                            </Select>
                                            <ModalAgregarGrado />
                                        </Stack>
                                    </FormControl>
                                </Stack>

                                <FormControl isRequired>
                                    <FormLabel fontWeight={'semibold'}>DESCRIPCIÓN</FormLabel>
                                    <Textarea
                                        placeholder="Escribe la descripcion del libro"
                                        type="text"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                    />
                                </FormControl>

                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="space-between">
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>EDITORIAL</FormLabel>
                                        <Input
                                            placeholder="SANTILLANA"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, editorial: e.target.value })}
                                        />
                                        <FormHelperText textColor={'red.500'}>
                                            {
                                                indice.editorial.length > 0 && indice.editorial.length < 3 ? 'debe tener al menos 3 caracteres' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>AUTOR</FormLabel>
                                        <Input
                                            placeholder="SANTILLANA"
                                            type="text"
                                            onChange={(e) => setIndice({ ...indice, autor: e.target.value })}
                                        />
                                        <FormHelperText textColor={'red.500'}>
                                            {
                                                indice.autor.length > 0 && indice.autor.length < 3 ? 'debe tener al menos 3 caracteres' : ''
                                            }
                                        </FormHelperText>
                                    </FormControl>
                                </Stack>
                                <Stack spacing={2} direction={{ base: 'column', lg: "row"}} justifyContent="stretch">
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>ES UNA OBRA LITERARIA</FormLabel>
                                        <Switch onChange={(e) => setIndice({ ...indice, es_obra_literaria: e.target.checked })} value={indice ? indice?.es_obra_literaria : null} colorScheme="purple" isChecked={indice.es_obra_literaria === true ? true : false} size='lg' />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>ENLACE DE LA IMAGEN</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder='https://images.cdn3.buscalibre.com/fit-in/360x360/e8/61/e86138aef74d9337ab3d571972b3a4ea.jpg'
                                            onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing={2} direction="row">
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                        <Switch onChange={(e) => setIndice({ ...indice, estado: e.target.checked })} value={indice ? indice.estado : null} colorScheme="purple" isChecked={indice.estado === true ? true : false} size='lg' />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>OBSERVACIONES</FormLabel>
                                            <Textarea
                                                defaultValue={indice ? indice.observaciones : ''}
                                                type="text"
                                                onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                                placeholder="Escribe las observaciones acerca del libro"
                                                rows={2}
                                            />
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </ModalBody>
                        <ModalFooter mt={-4}>
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
                                disabled={ indice.titulo === '' || indice.nombre === '' || indice.descripcion === '' || indice.grado === '' }
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

export default ModalAgregarLibro