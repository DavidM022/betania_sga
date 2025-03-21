import React, { useEffect, useState } from 'react';
import {
    Badge, 
    Box,
    HStack, 
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Text, 
    Tooltip,
    useColorModeValue
} from '@chakra-ui/react';
// import Moment from 'moment';
import { MdFilterList, MdOutlinePublishedWithChanges } from 'react-icons/md';
import { CgExport, CgEyeAlt } from 'react-icons/cg';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getAllPagos, updateEstadoPago, reset } from '../../../features/pagos/CEBA/pagoSlice';
import ModalRegistrarPago from './ModalRegistrarPago';
import '../../../theme/solarizedTheme';
import { Loading } from '../../../helpers/Loading';
import { RiArrowDownSLine } from 'react-icons/ri';
import { FaFileInvoice } from 'react-icons/fa';

const Pagos = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { pagos, isLoading, isError, message, currentPage, totalRows } = useSelector((state) => state.pagos_ceba);

    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        dispatch(getAllPagos({ page: currentPage, perPage }))

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, currentPage, perPage]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const handleUpdateEstado = (data) => {
        dispatch(updateEstadoPago(data));
    }


    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true,
            width: '120px'
        },
        {
            name: 'ESTUDIANTE',
            selector: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            sortable: true,
            cellExport: row => row.estudiante?.nombres + ' ' + row.estudiante?.apellidos,
            resizable: true,
            wrap: true,
            cell: row => (
                <div>
                    <Link
                        to={`/ceba/estudiantes/pagos/${row?.estudiante?._id}`}
                    >
                        <Text 
                            fontSize='xs'
                            color='blue.500'
                            _hover={{
                                textDecoration: 'none',
                                color: 'blue.600'
                            }}
                        >
                            { row.estudiante?.apellidos + ' ' + row.estudiante?.nombres }
                        </Text>
                    </Link>
                </div>
            )
        },
        {
            name: 'MESES',
            selector: row => row.meses?.map(mes => mes).join(', ' ),
            sortable: true,
            cellExport: row => row.meses?.map(mes => mes).join(', ' ),
            resizable: true,
            width: '120px'
        },
        {
            name: 'AÑO',
            selector: row => row.anio,
            sortable: true,
            cellExport: row => row.anio,
            resizable: true,
            width: '120px'
        },
        {
            name: 'IMPORTE',
            selector: row => row.importe,
            sortable: true,
            cellExport: row => row.importe,
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        bg={'messenger.600'}
                        variant="solid"
                        px={4}
                        py={2}
                        textAlign="center"
                        rounded="full"
                        color="white"
                    >
                        S/ {row.importe}
                    </Badge>
                </div>
            ),
            width: '120px'
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
                        colorScheme={row.estado === 'PENDIENTE' ? 'red' : row.estado === 'INCOMPLETO' ? 'orange' : 'green'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado}
                    </Badge>
                </div>
            ),
            width: '120px'
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell: row => (
                <Menu
                    placement="start"
                >
                    <MenuButton
                        as={IconButton}
                        icon={<RiArrowDownSLine fontSize={16} />}
                        variant='ghost'
                        rounded="full"
                        alignSelf="center"
                    />
                    <MenuList>
                        <MenuItem
                            as={Stack}
                            direction="row"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Link to={{
                                pathname: '/ceba/pagos/' + row._id
                            }}>
                                <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                    <IconButton
                                        aria-label="Ver"
                                        icon={<CgEyeAlt />}
                                        fontSize="2xl"
                                        _dark={{ color: "white", bg: 'blue.600', _hover: { bg: "blue.700" } }}
                                        colorScheme="blue"
                                        variant={'solid'}
                                    />
                                </Tooltip>
                            </Link>
                            <Link to={{
                                pathname: '/ceba/pagos/boleta/' + row._id
                            }}>
                                <Tooltip hasArrow label='Ver la Boleta' placement='auto'>
                                    <IconButton
                                        aria-label="Ver"
                                        icon={<FaFileInvoice />}
                                        fontSize="xl"
                                        _dark={{ color: "white", bg: 'purple.600', _hover: { bg: "purple.700" } }}
                                        colorScheme="purple"
                                        variant={'solid'}
                                    />
                                </Tooltip>
                            </Link>
                            {row.estado !== 'CANCELADO' ? (
                                <Tooltip hasArrow label='Actualizar Estado' placement='auto'>
                                    <IconButton
                                        aria-label="Ver"
                                        icon={<MdOutlinePublishedWithChanges />}
                                        onClick={() => handleUpdateEstado(row)}
                                        fontSize="xl"
                                        _dark={{ color: "white", bg: 'green.600', _hover: { bg: "green.700" } }}
                                        colorScheme="green"
                                        variant={'solid'}
                                    />
                                </Tooltip>
                            ) : null}
                            <AlertEliminar row={row} />
                        </MenuItem>
                    </MenuList>
                </Menu>
            ),
        }
    ]

    const handlePageChange = (page) => {
        setPage(page)
        dispatch(getAllPagos({ page, perPage }));
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        dispatch(getAllPagos({ page: 1, perPage: newPerPage }));
    };

    const tableData = {
        columns: columns,
        data: pagos,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <ModalRegistrarPago />
                </HStack>
                <HStack spacing={4} direction="row">
                    <IconButton colorScheme="whatsapp" _dark={{ bg: "whatsapp.600", color: "white", _hover: { bg: "whatsapp.700" } }} aria-label='Filters' icon={<Icon as={MdFilterList} fontSize="2xl" />} variant="ghost" rounded="full" />
                    <IconButton colorScheme="messenger" _dark={{ bg: "messenger.600", color: "white", _hover: { bg: "messenger.700" }}} aria-label='Exports' icon={<Icon as={CgExport} fontSize="xl" />} variant="ghost" rounded="full" />
                </HStack>
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
                        fileName={'PAGO_EBR' + new Date().toLocaleDateString()}
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
                            paginationServer
                            paginationPerPage={perPage}
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
                            paginationDefaultPage={page}
                            paginationTotalRows={totalRows}
                            onChangePage={handlePageChange}
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

export default Pagos;