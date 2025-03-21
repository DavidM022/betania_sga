import React, { useEffect } from 'react';
import {
    Badge, 
    Box,
    HStack, 
    Icon,
    IconButton,
    Stack,
    Text,
    Heading,
    useColorModeValue
} from '@chakra-ui/react';
import Moment from 'moment';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { FaArrowLeft } from 'react-icons/fa';
import ModalRegistrarPrestamo from './ModalRegistrarPrestamo';
import DetallesPrestamo from './DetallesPrestamo';
import ModalRegistrarDevolucion from './ModalRegistroDevolucion';
import { getPrestamoMapas, reset } from '../../../features/prestamo_mapaSlice';
import '../../../theme/solarizedTheme';
import { Loading } from '../../../helpers/Loading';

const PrestamoMapas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { prestamo_mapas, isLoading, isError, message } = useSelector((state) => state.prestamo_mapas);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        dispatch(getPrestamoMapas())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const columns = [
        {
            name: 'CODIGO MAPA',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true
        },
        {
            name: 'PRESTADO A',
            selector: row => row.estudiante ? row.estudiante?.nombres + ' ' + row.estudiante?.apellidos : row.docente?.nombres + ' ' + row.docente?.apellidos,
            sortable: true,
            cellExport: row => row.estudiante ? row.estudiante?.nombres + ' ' + row.estudiante?.apellidos : row.docente?.nombres + ' ' + row.docente?.apellidos,
            resizable: true,
            wrap: true,
        },
        {
            name: 'FECHA PRESTAMO',
            selector: row => Moment(row.fecha_prestamo).format('DD-MM-YYYY - hh:mm A'),
            sortable: true,
            cellExport: row => Moment(row.fecha_prestamo).format('DD-MM-YYYY - hh:mm A'),
            resizable: true,
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado },
            sortable: true,
            cellExport: row => row.estado,
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        colorScheme={ row?.estado === 'PRESTADO' ? 'green' : row?.estado === 'DEVUELTO' ? 'blue' : 'green' }
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        { row?.estado }
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            right: true,
            cell : row => (
                <div>
                    { row?.estado !== 'DEVUELTO' ? (
                            <ModalRegistrarDevolucion row = {row} />
                        ) : ( null ) }
                    <DetallesPrestamo mapa_prestamo={row} />
                    <AlertEliminar row={row} />
                </div>
            ),
            width : '220px'
        }
    ]

    const tableData = {
        columns: columns,
        data: prestamo_mapas,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>

            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/mapas'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="md">Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'bold'}>Tabla de Prestamo de Mapas</Text>
                </HStack>
            </Stack>

            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <Heading size="lg">Prestamo de Libros</Heading>
                <ModalRegistrarPrestamo />
            </Stack>
            <Box
                borderRadius="2xl"
                overflow="hidden"
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000" }}
                mt={2}
                pt={2}
                >
                    <DataTableExtensions
                        {...tableData} 
                        print={false}
                        exportHeaders={true}
                        filterPlaceholder="BUSCAR"
                        numberOfColumns={7}
                        fileName={'PRESTAMO_DE_MAPAS' + Moment().format('DD-MM-YYYY - HH:mm:ss')}
                    >
                        <DataTable
                            defaultSortField = "createdAt"
                            defaultSortAsc={false}
                            defaultSortOrder="desc"
                            pagination={true}
                            paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300"}} />}
                            paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300"}} />}
                            paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                            paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                            paginationRowsPerPageOptions={[5 ,10, 25, 50]}
                            paginationPerPage={10}
                            paginationComponentOptions={{
                                rowsPerPageText: 'Filas por pagina:',
                                rangeSeparatorText: 'de',
                                noRowsPerPage: false,
                                selectAllRowsItem: true,
                                selectAllRowsItemText: 'Todos',
                            }}
                            theme={themeTable}
                            customStyles={customStyles}
                            pointerOnHover={true}
                            responsive={true}
                            noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                        />
                    </DataTableExtensions>
            </Box>
        </>
    )
}

export default PrestamoMapas;