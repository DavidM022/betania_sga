import React, { useEffect, useState, useRef } from 'react'
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
    Radio,
    RadioGroup,
    Select as SelectChakra,
    Stack,
    Textarea,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react'
import { VscAdd } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux';
import { Search2Icon } from '@chakra-ui/icons';
import { getEstudianteSearch } from '../../../features/estudianteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { createPago } from '../../../features/pagos/EBR/pagoSlice';
import { Select } from "chakra-react-select";
import { useNavigate } from 'react-router-dom';
import { getUniformes, reset } from '../../../features/uniformeSlice';
import { handleSendEmail } from '../../../features/sendEmailSlice';

const ModalRegistrarPago = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalSearch, setOpenModalSearch] = useState(false);
    const { uniformes, isError, message } = useSelector((state) => state.uniformes);
    const { user } = useSelector((state) => state.auth);

    const uniformesFilter = uniformes.filter(
        (uniforme) => (uniforme.cantidad !== 0 && uniforme.estado === true)
    );

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getUniformes());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const initialValues = {
        estudiante: '',
        concepto: [],
        uniforme: [],
        meses: [],
        anio: new Date().getFullYear().toString(),
        importe: '',
        metodo_pago: '',
        descripcion: '',
        estado: '',
        observaciones: '',
    }

    const [indice, setIndice] = useState(initialValues);

    const [dataSearch, setDataSearch] = useState('');
    const [datosEstudiante, setDatosEstudiante] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState([]);
    const bg = useColorModeValue('white', 'primary.1000');

    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIndice(initialValues);
        setDatosEstudiante([]);
        setEstudianteSeleccionado([]);
    }

    const handleCloseModalSearch = () => {
        setOpenModalSearch(false);
        setDataSearch('');
    }

    const handleSearchEstudianteByDni = () => {
        dispatch(getEstudianteSearch(dataSearch)).then((res) => {
            if (res.payload.length > 0) {
                setOpenModalSearch(true);
                setDatosEstudiante(res.payload);
            } else {
                ToastChakra('NO SE ENCONTRARON REGISTROS', 'No se encontró registros con los datos ingresados', 'error', 1500, 'bottom');
                setDatosEstudiante([]);
            }
        });
    }// Reemplaza 'some-ui-library' con la biblioteca de interfaz de usuario que estés utilizando

    const MyComponent = ({ data }) => {

        const conceptoEsMensualidad = data?.concepto?.filter(item => item?.value?.includes('PAGO_MENSUALIDADES'));

        const tableRows = data?.concepto?.map((concepto, index) => (
            `<tr>
            <td style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">${index + 1}.00</td>
            <td style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">${concepto.label}</td>
            ${conceptoEsMensualidad?.length > 0 ? `<td>${data?.meses?.[index]}</td>` : ''}
            <td style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">S/${data?.importe}.00</td>
          </tr>`
        )).join('');

        const html = `
          <div>
            <h4 style="font-size: 13px; margin-top: 0;">Estimado cliente,</h4>
            <p>Por presente comunicamos que la Institución Educativa María Inmaculada de Arequipa, emisora de comprobantes electrónicos, le ha emitido el siguiente comprobante:</p>
            <p>Boleta de Pago N°: <span style="font-weight: bold;">${data?.codigo}</span></p>
            <p>CI del cliente N°: <span style="font-weight: bold;">${data?.estudiante?.dni}</span></p>
            <p>Nombre del cliente: <span style="font-weight: bold;">${data?.estudiante?.nombres} ${data?.estudiante?.apellidos}</span></p>
            <table style="border-collapse: collapse; width: 100%; margin-top: 1rem;">
                <thead>
                    <tr>
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">CANTIDAD</th>
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">DESCRIPCIÓN</th>
                        ${conceptoEsMensualidad?.length > 0 ? `<th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">MESES</th>` : ''}
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">IMPORTE</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
                <tfoot>
                    <tr>
                        ${conceptoEsMensualidad?.length > 0 ? `<th></th>` : ''}
                        <th></th>
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">IGV:</th>
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">S/0.00</th>
                    </tr>
                    <tr>
                        ${conceptoEsMensualidad?.length > 0 ? `<th></th>` : ''}
                        <th></th>
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif; font-weight: bold;">IMPORTE TOTAL:</th>
                        <th style="border: 2px solid black; padding: 0.5rem; text-align: center; font-family: Arial, Helvetica, sans-serif;">S/${data?.importe}.00</th>
                    </tr>
                </tfoot>
            </table>
            <p>Fecha de emisión: ${data?.createdAt}</p>
            <p>Para ver el comprobante, haga clic en el siguiente enlace:</p>
            <p><a href="https://sga-cmi.vercel.app/">Ver comprobante</a></p>
            <p>Atentamente,</p>
            <p>Institución Educativa María Inmaculada de Arequipa</p>
            </div>
            `;
        return html;
    };

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(createPago(indice)).then((data) => {
            const detallePago = data?.payload;
            const htmlString = MyComponent({ data: detallePago });
            if (detallePago?.estudiante?.correo !== '') {
                const dataSendEmail = {
                    to: detallePago?.estudiante?.correo,
                    subject: 'SGA BOLETA DE PAGO - #' + detallePago?.codigo,
                    html: htmlString,
                }
                dispatch(handleSendEmail(dataSendEmail));
            }
        })
        setIsModalOpen(false);
        setIndice(initialValues);
        setDatosEstudiante([{}]);
    }

    const ChakraStyle = {
        option: (provided) => ({
            ...provided,
            bg: bg,
            cursor: "pointer",
            borderRadius: "xs",
            fontWeight: 'semibold',
            _hover: {
                bg: 'purple.500',
                color: 'white',
                fontWeight: 'semibold',
            },
        }),
        multiValue: (provided) => ({
            ...provided,
            bg: '#0078ff1c',
            borderColor: 'purple.500',
            fontSize: '10px',
            size: "small",
            color: 'purple.500',
            borderWidth: "1px",
            fontWeight: 'semibold',
        }),
        placeholder: (provided) => ({
            ...provided,
            bg: "none",
            fontSize: "14px",
            cursor: "inherit"
        }),
    }

    const meses = [
        { value: 'ENERO', label: 'ENERO' },
        { value: 'FEBRERO', label: 'FEBRERO' },
        { value: 'MARZO', label: 'MARZO' },
        { value: 'ABRIL', label: 'ABRIL' },
        { value: 'MAYO', label: 'MAYO' },
        { value: 'JUNIO', label: 'JUNIO' },
        { value: 'JULIO', label: 'JULIO' },
        { value: 'AGOSTO', label: 'AGOSTO' },
        { value: 'SEPTIEMBRE', label: 'SEPTIEMBRE' },
        { value: 'OCTUBRE', label: 'OCTUBRE' },
        { value: 'NOVIEMBRE', label: 'NOVIEMBRE' },
        { value: 'DICIEMBRE', label: 'DICIEMBRE' },
    ]

    const handleSelectMeses = (data) => {
        setIndice({ ...indice, meses: data.map((item) => item.value) });
    }

    const handleSelectConcepto = (data) => {
        if (!data) {
            setIndice({ ...indice, concepto: '' });
        } else {
            setIndice({ ...indice, concepto: data.map((item) => item) });
        }
    }

    const handleSelectUniforme = (data) => {
        if (data) {
            const selectedUniformes = data.map((item) => {
                return { _id: item.value._id };
            });
            setIndice({ ...indice, uniforme: selectedUniformes });
        }
    };

    const handleSelectEstudiante = (data) => {
        if (data) {
            setIndice({ ...indice, estudiante: data.value });
            setEstudianteSeleccionado(data);
        } else {
            setIndice({ ...indice, estudiante: '' });
            setEstudianteSeleccionado([]);
        }
    }

    const anio = new Date().getFullYear();

    const anios = [
        { value: anio - 2, label: anio - 2 },
        { value: anio - 1, label: anio - 1 },
        { value: anio, label: anio },
        { value: anio + 1, label: anio + 1 },
        { value: anio + 2, label: anio + 2 },
        { value: anio + 3, label: anio + 3 },
        { value: anio + 4, label: anio + 4 },
    ]

    const conceptos = [
        { value: 'PAGO_CONSTANCIA', label: 'PAGO DE CONSTANCIA', articulo: false },
        { value: 'PAGO_RATIFICACION', label: 'PAGO DE RATIFICACION', articulo: false },
        { value: 'PAGO_ESCUELA_PADRES', label: 'PAGO DE ESCUELA DE PADRES', articulo: false },
        { value: 'PAGO_BAPES', label: 'PAGO BAPES', articulo: false },
        { value: 'PAGO_CERTIFICADO', label: 'PAGO DE CERTIFICADO', articulo: false },
        { value: 'PAGO_GASTOS_OPERATIVOS', label: 'PAGO DE GASTOS OPERATIVOS', articulo: false },
        { value: 'PAGO_MENSUALIDADES', label: 'PAGO DE MENSUALIDADES', articulo: false },
        { value: 'PAGO_LIBROS', label: 'PAGO DE LIBROS', articulo: false },
        { value: 'PAGO_AGENDA', label: 'PAGO DE AGENDA', articulo: false },
        { value: 'PAGO_CHOMPAS', label: 'PAGO DE CHOMPAS', articulo: true },
        { value: 'PAGO_CHALECOS', label: 'PAGO DE CHALECOS', articulo: true },
        { value: 'PAGO_FALDAS', label: 'PAGO DE FALDAS', articulo: true },
        { value: 'PAGO_CORBATAS', label: 'PAGO DE CORBATAS', articulo: true },
        { value: 'PAGO_MEDIAS', label: 'PAGO DE MEDIAS', articulo: true },
        { value: 'PAGO_BUZOS', label: 'PAGO DE BUZOS', articulo: true },
        { value: 'OTROS', label: 'OTROS', articulo: false },
    ]

    const estudianteOptions = datosEstudiante.map((item) => {
        return {
            value: item._id,
            label: `🧑‍🎓${ item.apellidos }, ${ item.nombres } 🎴 ${ item.dni } `
        }
    });

    const buttonRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === "Return") {
            event.preventDefault();
            buttonRef.current.click();
        }
    };

    return (
        <>
            <Button
                colorScheme="purple"
                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                aria-label="Agregar"
                leftIcon={<Icon as={VscAdd} fontSize="lg" />}
                variant="solid"
                rounded={'xl'}
                onClick={handleModalOpen}
            >
                Nuevo Registro de Pago
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} size="full">
                <ModalOverlay />
                <form onSubmit={handleSave}>
                    <ModalContent _dark={{ bg: "primary.1000" }} borderRadius="none">
                        <ModalHeader textAlign="center">REGISTRAR NUEVO PAGO DE UN ESTUDIANTE</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {/* <MyComponent /> */}
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between">
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">ESTUDIANTE</FormLabel>
                                    <InputGroup size='md'>
                                        <Input
                                            type={'text'}
                                            placeholder='Buscar por CI, nombres y apellidos del estudiante'
                                            defaultValue={dataSearch}
                                            onChange={(e) => setDataSearch(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <InputRightElement width='2.5rem'>
                                            <Tooltip hasArrow label='Buscar por CI' placement='auto'>
                                                <IconButton
                                                    ref={buttonRef}
                                                    aria-label="Buscar"
                                                    icon={<Icon as={Search2Icon} fontSize="md" />}
                                                    colorScheme={'green'}
                                                    _dark={{ bg: "green.500", color: "white", _hover: { bg: "green.600" } }}
                                                    variant="solid"
                                                    isDisabled={dataSearch.length <= 3 ? true : false}
                                                    onClick={handleSearchEstudianteByDni}
                                                />
                                            </Tooltip>
                                            <Modal isOpen={openModalSearch} onClose={handleCloseModalSearch} size={'4xl'}>
                                                <ModalOverlay />
                                                <ModalContent _dark={{ bg: 'primary.1000' }} borderRadius="2xl">
                                                    <ModalHeader>SELECCIONE EL ESTUDIANTE</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        <Select
                                                            placeholder="Seleccione el estudiante"
                                                            size="md"
                                                            onChange={handleSelectEstudiante}
                                                            options={estudianteOptions}
                                                            isClearable
                                                            isSearchable
                                                            colorScheme="pink"
                                                            className="chakra-react-select"
                                                            classNamePrefix="chakra-react-select"
                                                            variant="fulled"
                                                        />
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button
                                                            colorScheme="purple"
                                                            _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                                                            rounded="xl"
                                                            onClick={handleCloseModalSearch}
                                                        >
                                                            ACEPTAR
                                                        </Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                        </InputRightElement>
                                    </InputGroup>
                                    {
                                        !estudianteSeleccionado?.value ? null : <FormHelperText>
                                            El estudiante Seleccionado es : <span style={{ color: 'purple', fontWeight: "bold" }}>{estudianteSeleccionado?.label}</span>
                                        </FormHelperText>
                                    }
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">CONCEPTO DE PAGO</FormLabel>
                                    <Select
                                        placeholder="Seleccione el concepto de pago"
                                        onChange={handleSelectConcepto}
                                        options={conceptos}
                                        isClearable
                                        isSearchable
                                        colorScheme="purple"
                                        className="chakra-react-select"
                                        classNamePrefix="chakra-react-select"
                                        variant="fulled"
                                        chakraStyles={ChakraStyle}
                                        isMulti
                                    />
                                </FormControl>
                            </Stack>
                            <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between" mt={4}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="semibold">IMPORTE EN BOLIVIANOS (Bs/.)</FormLabel>
                                    <Input
                                        type={'number'}
                                        placeholder='Ingrese el importe'
                                        onChange={(e) => setIndice({ ...indice, importe: e.target.value })}
                                    />
                                </FormControl>
                                {!indice?.concepto?.length > 0 || !indice?.concepto.filter(value => value.articulo === false)?.length > 0 ? null : (
                                    <>
                                        <FormControl>
                                            <FormLabel fontWeight="semibold">AÑO</FormLabel>
                                            <SelectChakra
                                                defaultValue={indice?.anio}
                                                onChange={(e) => setIndice({ ...indice, anio: e.target.value })}
                                            >
                                                {
                                                    anios.map((item, index) => (
                                                        <option key={index} value={item.value}>{item.label}</option>
                                                    ))
                                                }
                                            </SelectChakra>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel fontWeight="semibold">MES</FormLabel>
                                            <Select
                                                placeholder="Seleccione el mes"
                                                options={meses}
                                                onChange={handleSelectMeses}
                                                isClearable
                                                isSearchable
                                                colorScheme="purple"
                                                className="chakra-react-select"
                                                classNamePrefix="chakra-react-select"
                                                variant="fulled"
                                                chakraStyles={ChakraStyle}
                                                isMulti
                                            />
                                        </FormControl>
                                    </>
                                )
                                }
                            </Stack>
                            {
                                !indice?.concepto?.length > 0 || !indice?.concepto.filter(value => value.articulo === true)?.length > 0 ? null : (
                                    <Stack spacing={2} direction={{ base: 'column', lg: "row" }} mt={4}>
                                        <FormControl>
                                            <FormLabel fontWeight={'semibold'}>UNIFORME</FormLabel>
                                            <Select
                                                options={
                                                    uniformesFilter.map((uniforme) => (
                                                        { value: uniforme, label: uniforme.articulo }
                                                    ))
                                                }
                                                placeholder="Selecciona los uniformes"
                                                onChange={handleSelectUniforme}
                                                isSearchable={true}
                                                isMulti
                                            />
                                        </FormControl>
                                    </Stack>
                                )
                            }
                            <Stack spacing={4} direction="column" justifyContent="space-between" mt={4}>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">DESCRIPCION DEL PAGO</FormLabel>
                                    <Textarea
                                        placeholder="Descripcion del pago"
                                        onChange={(e) => setIndice({ ...indice, descripcion: e.target.value })}
                                        rows={2}
                                    />
                                </FormControl>
                                <Stack spacing={4} direction={{ base: "column", lg: "row" }} justifyContent="space-between" mt={4}>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight={'semibold'}>ESTADO</FormLabel>
                                        <RadioGroup
                                            onChange={(e) => setIndice({ ...indice, estado: e })}
                                        >
                                            <Stack direction='row'>
                                                <Radio value={"PENDIENTE"}>PENDIENTE</Radio>
                                                <Radio value={"CANCELADO"}>CANCELADO</Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontWeight={'semibold'}>METODO DE PAGO</FormLabel>
                                        <SelectChakra
                                            placeholder="Selecciona una opción"
                                            onChange={(e) => setIndice({ ...indice, metodo_pago: e.target.value })}
                                        >
                                            <option value="EFECTIVO">EFECTIVO</option>
                                            <option value="TARJETA DE CREDITO">TARJETA DE CREDITO</option>
                                            <option value="TRANSFERENCIA BANCARIA">TRANSFERENCIA BANCARIA</option>
                                            <option value="YAPE">YAPE</option>
                                            <option value="OTRO">OTRO</option>
                                        </SelectChakra>
                                    </FormControl>
                                </Stack>
                                <FormControl>
                                    <FormLabel fontWeight="semibold">OBSERVACIONES</FormLabel>
                                    <Textarea
                                        placeholder="Observaciones adicionales de la entrega"
                                        onChange={(e) => setIndice({ ...indice, observaciones: e.target.value })}
                                        rows={2}
                                    />
                                </FormControl>
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
                                colorScheme="purple"
                                _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                                size="lg"
                                mr={3}
                                type='submit'
                                isDisabled={!indice.estudiante || !indice?.importe || !indice?.estado || !indice?.concepto?.length > 0}
                                borderRadius="xl"
                            >
                                REGISTRAR PAGO
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    )
}

export default ModalRegistrarPago;