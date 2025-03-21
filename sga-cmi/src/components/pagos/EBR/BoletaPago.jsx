import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPago, reset } from '../../../features/pagos/EBR/pagoSlice';
import { ToastChakra } from '../../../helpers/toast';
import { Box, HStack, Image, IconButton, Stack, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, Text, Heading } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import logoIE from '../../../assets/img/logoColegio.jpg';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Loading } from '../../../helpers/Loading';
import { BsPrinterFill, BsFillCloudDownloadFill, BsFillImageFill, BsPrinter } from 'react-icons/bs';
import { MdAttachEmail } from 'react-icons/md';
// import { renderToString } from 'react-dom/server';
// import { Print } from 'react-print';

const BoletaPago = ({ location }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const componentRef = useRef();

    const { user } = useSelector((state) => state.auth);
    const { pago, isLoading, isError, message } = useSelector((state) => state.pagos_ebr);

    const params = useParams(location);

    const [loadingPrint, setloadingPrint] = useState(false);
    const [loadingDowloadPdf, setloadingDowloadPdf] = useState(false);
    const [loadingDowloadImage, setloadingDowloadImage] = useState(false);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getPago(params.id));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, params.id]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const handlePrint = useReactToPrint(
        {
            content: () => componentRef.current,
            copyStyles: true,
            documentTitle: `Boleta de pago - ${pago.codigo}`,
            documentContent: () => componentRef.current,
            documentContentURL: () => componentRef.current,
            documentHead: () => componentRef.current,
            documentBodyClassName: 'pdf-body',
            onBeforePrint: () => {
                setloadingPrint(true);
            },
            onAfterPrint: () => {
                setloadingPrint(false);
            }
        });

    const handleDownloadPdf = () => {
        setloadingDowloadPdf(true);
        const element = componentRef.current;
        // Configuración de renderizado de html2canvas
        const options = {
            scale: 4, // Aumenta la resolución de la imagen (2x)
            useCORS: true, // Habilita el uso de CORS para imágenes externas
            logging: true, // Habilita el registro de mensajes de html2canvas en la consola
            quality: 0.99, // Calidad de la imagen (0 - 1)
            allowTaint: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            backgroundColor: '#fff',
            foreignObjectRendering: false, // Habilita el renderizado de elementos SVG
            async: true, // Habilita el renderizado asíncrono
            allowTainttaintTest: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            imageTimeout: 15000, // Tiempo máximo de espera para la carga de imágenes, en milisegundos
            id: 'html2canvas', // ID del elemento a renderizar
            svgRendering: false, // Habilita el renderizado de elementos SVG,
        };

        html2canvas(element, options)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4',
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    image: {
                        type: 'png',
                        quality: 0.98
                    },
                    compress: true,
                    precision: 2,
                });
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                setloadingDowloadPdf(false);
                // open pdf in new window
                // window.open(pdf.output('bloburl'), '_blank');
                pdf.save(`${pago?.codigo}.pdf`);
            },
                (error) => {
                    console.log(error);
                });
    };

    // download the image

    const handleDownloadImage = () => {
        setloadingDowloadImage(true);
        const element = componentRef.current;
        // Configuración de renderizado de html2canvas
        const options = {
            id: 'html2canvas', // ID del elemento a renderizar
            scale: 6, // Aumenta la resolución de la imagen (2x)
            useCORS: true, // Habilita el uso de CORS para imágenes externas
            logging: true, // Habilita el registro de mensajes de html2canvas en la consola
            type: 'image/png', // Tipo de imagen a generar
            quality: 0.92, // Calidad de la imagen (0 - 1)
            allowTaint: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            backgroundColor: '#fff', // Color de fondo de la imagen
            removeContainer: true, // Elimina el contenedor generado por html2canvas
            imageTimeout: 15000, // Tiempo máximo de espera para la carga de imágenes, en milisegundos
            foreignObjectRendering: false, // Habilita el renderizado de elementos SVG
            async: true, // Habilita el renderizado asíncrono
            allowTainttaintTest: false, // Habilita el renderizado de elementos sobre los que se ha aplicado estilos
            proxy: null, // URL del proxy a utilizar
            svgRendering: false, // Habilita el renderizado de elementos SVG
        };

        html2canvas(element, options).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${pago?.codigo}.png`;
            setloadingDowloadImage(false);
            link.click();
        });
    };

    const handleSendEmail = () => {
        console.log('enviandocorreo')
    }

    const handlePrintThermal = () => {
        const content = componentRef.current;
        const printWindow = window.open('', '', 'width=600,height=600');
        printWindow.document.open();
        printWindow.document.write(`
            <html>
            <head>
                <style>
                @media print {
                    @page {
                    size: auto;
                    margin: 0;
                    }
                }
                </style>
            </head>
            <body>${content.innerHTML}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };


    // <Print trigger={() => <Button onClick={handlePrintThermal}>Imprimir en impresora térmica</Button>}>
    //     <div ref={componentRef}>
    //         {/* Contenido que deseas imprimir */}
    //     </div>
    // </Print>

    if (isLoading) {
        return <Loading />
    }

    const conceptoEsMensualidad = pago?.concepto?.filter(item => item?.value?.includes('PAGO_MENSUALIDADES'));

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/pagos'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize={{ base: "xs", lg: "md" }} fontWeight={'bold'}>Regresar</Text>
                </HStack>
                <HStack spacing={2} direction="row">
                    <IconButton
                        size='md'
                        isLoading={loadingPrint ? true : false}
                        colorScheme='purple'
                        _dark={{
                            bg: 'purple.500',
                            color: 'white',
                            _hover: {
                                bg: 'purple.700',
                            },
                        }}
                        borderRadius={'xl'}
                        onClick={handlePrint}
                        icon={<BsPrinterFill fontSize={20} />}
                    />
                    <IconButton
                        size='md'
                        isLoading={loadingDowloadPdf ? true : false}
                        colorScheme='green'
                        _dark={{
                            bg: 'green.500',
                            color: 'white',
                            _hover: {
                                bg: 'green.700',
                            },
                        }}
                        borderRadius={'xl'}
                        onClick={handleDownloadPdf}
                        icon={<BsFillCloudDownloadFill fontSize={20} />}
                    />
                    <IconButton
                        size='md'
                        isLoading={loadingDowloadImage ? true : false}
                        colorScheme='messenger'
                        _dark={{
                            bg: 'messenger.500',
                            color: 'white',
                            _hover: {
                                bg: 'messenger.700',
                            },
                        }}
                        borderRadius={'xl'}
                        onClick={handleDownloadImage}
                        icon={<BsFillImageFill fontSize={20} />}
                    />
                    <IconButton
                        size='md'
                        colorScheme='red'
                        _dark={{
                            bg: 'red.500',
                            color: 'white',
                            _hover: {
                                bg: 'red.700',
                            },
                        }}
                        borderRadius={'xl'}
                        onClick={handleSendEmail}
                        icon={<MdAttachEmail fontSize={20} />}
                    />
                    <IconButton
                        size='md'
                        colorScheme='blue'
                        _dark={{
                            bg: 'blue.500',
                            color: 'white',
                            _hover: {
                                bg: 'blue.700',
                            },
                        }}
                        borderRadius={'xl'}
                        onClick={handlePrintThermal}
                        icon={<BsPrinter fontSize={20} />}
                    />
                </HStack>
            </Stack>

            <Box
                ref={componentRef}
                w={'full'}
                h="full"
                bg={'white'}
                color="black"
                overflow={'hidden'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                mt={2}
                p={10}
            >
                <Stack direction="column" w={'full'} justify={'center'}>
                    <Stack direction='column' h={'auto'} w="full" justifyContent="space-evenly" fontFamily={'Arial, Helvetica, sans-serif'} alignItems={'center'} alignSelf={'center'} spacing={4} display={'flex'}>
                        <Stack direction={'row'} justifyContent="space-between" display={'flex'} w="full">
                            <Image objectFit='cover' src={logoIE} maxW={'90px'} fallbackSrc='https://via.placeholder.com/100x100?text=LOGO' alt={pago?.nombre} alignSelf={'center'} />
                            <Stack direction="column" spacing={8} border={'2px solid black'} p={{ base: 3, lg: 4 }} alignItems={'center'}>
                                <Text fontSize={'20px'} fontWeight={'bold'} fontFamily={'Arial, Helvetica, sans-serif'}>BOLETA ELECTRÓNICA</Text>
                                {/* <Text fontSize={'14px'}>RUC: S/N</Text> */}
                                <Text fontSize={'18px'}>N° {pago?.codigo}</Text>
                            </Stack>
                        </Stack>
                        <Stack direction={'column'} spacing={3} w="full" h="full" display={'flex'} fontSize={{ base: '12px', lg: '16px' }}>
                            <Stack direction={'column'} spacing={0}>
                                <Heading size="md" fontFamily={'Arial, Helvetica, sans-serif'}>INSTITUCIÓN EDUCATIVA PRIVADA BETANA</Heading>
                                <Text fontWeight={'light'}>Zona Pto. Mejillones - Av. Franz Tamayo | Bolivia</Text>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" w="full" spacing={6}>
                        <Stack direction="column" spacing={2} w="full">
                            <Stack direction="column" spacing={2} border={'2px solid black'} p={3} w="full">
                                <HStack spacing={2}>
                                    <Text fontWeight="bold" fontFamily={'Arial, Helvetica, sans-serif'}>ESTUDIANTE:</Text>
                                    <Text fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.estudiante?.apellidos + ', ' + pago?.estudiante?.nombres}</Text>
                                </HStack>
                                <HStack spacing={2}>
                                    <Text fontWeight="bold" fontFamily={'Arial, Helvetica, sans-serif'}>DIRECCIÓN:</Text>
                                    <Text fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.estudiante?.domicilio}</Text>
                                </HStack>
                                <Stack direction="row" spacing={2} justifyContent="space-between">
                                    <Stack direction="column" fontSize={'md'}>
                                        <HStack spacing={2}>
                                            <Text fontWeight="bold" fontFamily={'Arial, Helvetica, sans-serif'}>CI:</Text>
                                            <Text fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.estudiante?.dni}</Text>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Text fontWeight="bold" fontFamily={'Arial, Helvetica, sans-serif'}>CONDICIÓN PAGO:</Text>
                                            <Text fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.metodo_pago}</Text>
                                        </HStack>
                                    </Stack>
                                    <Stack direction="column" fontSize={'md'}>
                                        <HStack spacing={2}>
                                            <Text fontWeight="bold" fontFamily={'Arial, Helvetica, sans-serif'}>FECHA DE EMISIÓN:</Text>
                                            <Text fontFamily={'Arial, Helvetica, sans-serif'}>{moment(pago?.createdAt).format('DD-MM-YYYY - HH:mm:ss A')}</Text>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Text fontWeight="bold" fontFamily={'Arial, Helvetica, sans-serif'}>MONEDA:</Text>
                                            <Text fontFamily={'Arial, Helvetica, sans-serif'}>BOLIVIANO</Text>
                                        </HStack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack mt={4}>
                                <Table border={'2px'} mt={2}>
                                    <TableCaption border={'2px'} color={'black'} fontFamily={'Arial, Helvetica, sans-serif'}>El monto de la boleta no incluye el impuesto sobre las ventas.</TableCaption>
                                    <Thead py={2}>
                                        <Tr>
                                            <Th color={'black'} fontSize={'md'} fontWeight={'bold'} fontFamily={'Arial, Helvetica, sans-serif'}>CANTIDAD</Th>
                                            <Th color={'black'} fontSize={'md'} fontWeight={'bold'} fontFamily={'Arial, Helvetica, sans-serif'} >DESCRIPCIÓN</Th>
                                            {
                                                conceptoEsMensualidad?.length > 0 ? (
                                                    <Th color={'black'} fontSize={'md'} fontWeight={'bold'} fontFamily={'Arial, Helvetica, sans-serif'} >MESES</Th>
                                                ) : null
                                            }
                                            <Th color={'black'} fontSize={'md'} fontWeight={'bold'} isNumeric fontFamily={'Arial, Helvetica, sans-serif'} >IMPORTE</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody py={2}>
                                        <Tr textAlign={'right'} border={'2px'}>
                                            <Td fontSize='sm' fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.concepto?.length}.00</Td>
                                            <Td fontSize='sm' fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.concepto?.map(data => data?.label).join(', ')}</Td>
                                            {
                                                conceptoEsMensualidad?.length > 0 ? (
                                                    <Td fontSize='sm' fontFamily={'Arial, Helvetica, sans-serif'} >{pago?.meses?.map(data => data).join(', ')}</Td>
                                                ) : null
                                            }
                                            <Td color={'black'} isNumeric fontSize='sm' fontWeight={'normal'} fontFamily={'Arial, Helvetica, sans-serif'}>Bs/{pago?.importe}.00</Td>
                                        </Tr>
                                    </Tbody>
                                    <Tfoot mt={4}>
                                        <Tr mt={4} border={'2px'}>
                                            {
                                                conceptoEsMensualidad?.length > 0 ? (
                                                    <Th></Th>
                                                ) : null
                                            }
                                            <Th></Th>
                                            <Th color={'black'} fontSize='md' fontWeight={'bold'} fontFamily={'Arial, Helvetica, sans-serif'} > IGV:</Th>
                                            <Th color={'black'} isNumeric fontSize='sm' fontWeight={'normal'} fontFamily={'Arial, Helvetica, sans-serif'}>Bs/0.00</Th>
                                        </Tr>
                                        <Tr mt={4}>
                                            {
                                                conceptoEsMensualidad?.length > 0 ? (
                                                    <Th></Th>
                                                ) : null
                                            }
                                            <Th></Th>
                                            <Th color={'black'} fontSize='md' fontWeight={'bold'} fontFamily={'Arial, Helvetica, sans-serif'}> IMPORTE TOTAL:</Th>
                                            <Th color={'black'} isNumeric fontSize='sm' fontWeight={'normal'} fontFamily={'Arial, Helvetica, sans-serif'}>Bs/{pago?.importe}.00</Th>
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </Stack>
                            {
                                pago?.observaciones ? (
                                    <Stack direction="column" mt={4} spacing={2} w="full" border={'2px solid black'} p={3}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Text fontWeight="bold" fontSize={'md'} alignSelf={'center'} fontFamily={'Arial, Helvetica, sans-serif'}>OBSERVACIONES:</Text>
                                            <Text fontSize={'sm'} fontFamily={'Arial, Helvetica, sans-serif'}>{pago?.observaciones}</Text>
                                        </Stack>
                                    </Stack>
                                ) : null
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default BoletaPago;
