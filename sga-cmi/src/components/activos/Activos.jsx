import React, { useEffect } from 'react'
import { Badge, Box, Button, HStack, Icon, IconButton, Stack, Text, Tooltip, useColorModeValue } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { getActivos, reset } from '../../features/activoSlice';
import { AlertEliminar } from './AlertEliminar';
import { VscAdd, VscEdit } from 'react-icons/vsc';
import { MdCategory } from 'react-icons/md';
import { CgEyeAlt } from 'react-icons/cg';
import moment from 'moment';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';

const Activos = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { activos, isLoading, isError, message } = useSelector((state) => state.activos);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user?.token) {
            navigate("/login");
        }

        dispatch(getActivos());

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true,
            wrap: true
        },
        {
            name: 'MODELO',
            selector: row => row.modelo,
            sortable: true,
            cellExport: row => row.modelo,
            resizable: true,
            wrap: true
        },
        {
            name: 'MARCA',
            selector: row => row.marca,
            sortable: true,
            cellExport: row => row.marca,
            resizable: true,
            wrap: true
        },
        {
            name: 'TIPO',
            selector: row => row.tipo_activo?.nombre,
            sortable: true,
            cellExport: row => row.tipo_activo?.nombre,
            resizable: true,
            wrap: true
        },
        {
            name: 'CANTIDAD',
            selector: row => row.cantidad !== null ? row.cantidad : 0,
            sortable: true,
            cellExport: row => row.cantidad !== null ? row.cantidad : 0,
            resizable: true,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={'purple'}
                        variant="solid"
                        w={20}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.cantidad !== null ? row.cantidad : 0}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado === 'activo' ? 'ACTIVO' : 'INACTIVO' },
            sortable: true,
            cellExport: row => row.estado === 'activo' ? 'ACTIVO' : 'INACTIVO',
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.estado === 'activo' ? 'green' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado === 'activo' ? 'ACTIVO' : 'INACTIVO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            center: true,
            cell: row => (
                <div>
                    <Link to={{
                            pathname: '/equipos/' + row._id
                        }}>
                            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<CgEyeAlt />}
                                    fontSize="xl"
                                    _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                                    colorScheme="blue"
                                    variant="ghost"
                                />
                            </Tooltip>
                    </Link>

                    <Link to={{
                            pathname: '/equipos/editar/' + row._id,
                            state: { row }
                        }}>
                            <Tooltip hasArrow label='Editar' placement='auto'>
                                <IconButton
                                    aria-label="Editar"
                                    colorScheme="blackAlpha" 
                                    _dark={{ color: "white", _hover: { bg: "whiteAlpha.200" }}}
                                    icon={<Icon as={VscEdit}
                                    fontSize="2xl" />}
                                    variant="ghost"
                                    ml={2}
                                />
                            </Tooltip>
                    </Link>
                    
                    <AlertEliminar row={row} />
                </div>
            ),
            width: '180px'
        }
    ]

    const tableData = {
        columns: columns,
        data: activos,
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
                            pathname : '/equipos/agregar'
                        }}
                    >
                        <Button
                            colorScheme="purple"
                            _dark={{ bg: "purple.600", color: "white", _hover: { bg: "purple.600" } }}
                            aria-label="Agregar"
                            leftIcon={<Icon as={VscAdd} fontSize="xl" />}
                            variant="solid"
                            rounded={'xl'}
                        >
                            Nuevo Registro
                        </Button>
                    </Link>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Link
                        to={{
                            pathname : '/equipos/categorias'
                        }}
                    >
                        <Button
                            colorScheme="whatsapp" 
                            _dark={{ bg: "whatsapp.600", 
                            color: "white", _hover: { bg: "whatsapp.700" } }}
                            leftIcon={<Icon as={MdCategory} fontSize="xl" />}
                            variant="solid"
                            rounded={'xl'}
                        >
                            Gestionar Categorias
                        </Button>
                    </Link>
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
                    fileName={'EQUIPOS' + moment().format('DD-MM-YYYY')}
                >
                    <DataTable
                        defaultSortField="createdAt"
                        defaultSortAsc={false}
                        defaultSortOrder="desc"
                        pagination={true}
                        paginationIconFirstPage={< Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconLastPage={< Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconPrevious={< Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationIconNext={< Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationRowsPerPageOptions={[5, 10, 25, 50]}
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
                        noDataComponent={<Text mb={4} fontSize="lg">NO HAY DATOS PARA MOSTRAR</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Activos;