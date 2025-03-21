import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Badge, 
    Box,
    Button,
    HStack, 
    Icon,
    IconButton,
    Stack,
    Text, 
    Tooltip, 
    useColorModeValue
} from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';
import { CgExport, CgEyeAlt } from 'react-icons/cg';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getEstudiantes, reset } from '../../../features/estudiantes/RESIDENCIA/estudianteSlice';
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { FaFileInvoice } from 'react-icons/fa';
import '../../../theme/solarizedTheme';
import { Loading } from '../../../helpers/Loading';

const Estudiantes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { estudiantes, isLoading, isError, message, currentPage, totalRows } = useSelector((state) => state.estudiantes_residencia);

    const [perPage, setPerPage] = useState(10);

    const [page, setPage] = useState(1);

    useEffect(() => {
        
        if (!user) {
            navigate("/login");
        }

        dispatch(getEstudiantes({ page: currentPage, perPage }))

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, currentPage, perPage]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const columns = [
        {
            name: 'APELLIDOS, NOMBRES',
            selector: row => row.apellidos + ' ' + row.nombres,
            sortable: true,
            cellExport: row => row.apellidos + ' ' + row.nombres,
            resizable: true,
            cell : row => (
                <div>
                    <Stack spacing={2} direction="row" alignSelf="center">
                        <Avatar
                            size="sm" 
                            name={row.apellidos + ' ' + row.nombres}
                            src={row?.img}
                            fontWeight="bold"
                            fontSize="sm"
                            color="white"
                            display = {{ base: "none", lg: "flex"}}
                            alignSelf={'center'}
                        />
                        <Text ml={2} fontSize="13px" alignSelf={'center'}>{row.apellidos + ', ' + row.nombres}</Text>
                    </Stack>
                </div>
            )
        },
        {
            name: 'DNI',
            selector: row => row.dni,
            sortable: true,
            cellExport: row => row.dni,
            resizable: true
        },
        {
            name: 'TURNO',
            selector: row => row.turno,
            sortable: true,
            cellExport: row => row.turno,
            resizable: true
        },
        {
            name: 'GRADO/SECCIÓN',
            selector: row => row.grado?.nombre,
            sortable: true,
            cellExport: row => row.grado?.nombre,
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        bg={'cyan.700'}
                        variant="solid"
                        py={2}
                        w={36}
                        textAlign="center"
                        rounded="full"
                        color="white"
                    >
                        {row.grado?.nombre}
                    </Badge>
                </div>
            )
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
                        colorScheme={row.estado === 'ACTIVO' ? 'green' : row.estado === 'RETIRADO' ? 'blue' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        { row.estado }
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell : row => (
                <div>
                    <Link to={{
                            pathname: '/residencia/estudiantes/pagos/' + row._id
                        }}>
                            <Tooltip hasArrow label='Ver Historial de Pagos' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<FaFileInvoice />}
                                    fontSize="2xl"
                                    colorScheme="yellow"
                                    variant={'ghost'}
                                />
                            </Tooltip>
                    </Link>
                    <Link to={{
                            pathname: '/residencia/estudiantes/' + row._id
                        }}>
                            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<CgEyeAlt />}
                                    fontSize="2xl"
                                    colorScheme="blue"
                                    variant={'ghost'}
                                    ml={2}
                                />
                            </Tooltip>
                    </Link>
                    <Link to={{
                            pathname: '/residencia/estudiantes/editar/' + row._id,
                            state: { row }
                        }}>
                            <Tooltip hasArrow label='Editar' placement='auto'>
                                <IconButton
                                    aria-label="Editar"
                                    colorScheme="blackAlpha" 
                                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" }}}
                                    icon={<Icon as={VscEdit} fontSize="2xl" />}
                                    variant="ghost"
                                    ml={2}
                                />
                            </Tooltip>
                    </Link>
                    <AlertEliminar row={row} />
                </div>
            ),
            width : '240px'
        }
    ]

    const handlePageChange = (page) => {
        setPage(page)
        dispatch(getEstudiantes({ page, perPage }));
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        dispatch(getEstudiantes({ page: 1, perPage: newPerPage }));
    };

    const tableData = {
        columns: columns,
        data: estudiantes,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                <Link
                    to={{
                        pathname : '/residencia/estudiantes/agregar'
                    }}
                >
                    <Button
                        colorScheme="purple"
                        _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.600" } }}
                        aria-label="Agregar"
                        leftIcon={<Icon as={VscAdd} fontSize="2xl" />}
                        variant="solid"
                        rounded={'xl'}
                    >
                        Nuevo Registro
                    </Button>
                </Link>
                    {/* <IconButton colorScheme="red" _dark={{ bg: "red.600", color: "white", _hover: { bg: "red.700" }}} aria-label='Eliminar' icon={<Icon as={MdDelete} fontSize="2xl" />} variant="solid" rounded="full" /> */}
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
                        fileName={'ESTUDIANTES_RESIDENCIA'}
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

export default Estudiantes;