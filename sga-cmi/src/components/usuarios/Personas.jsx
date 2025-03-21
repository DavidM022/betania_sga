import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Badge,
    Box,
    Icon,
    Heading,
    Stack,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsuarios, reset } from '../../features/usuarioSlice';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { ModalAgregarPersona } from './ModalAgregarPersona';
import { ModalDetallesPersona } from './ModalDetallesPersona';
import { ModalEditarPersona } from './ModalEditarPersona';
import { AlertEliminarPersona } from './AlertEliminarPersona';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';

const Personas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { usuarios, isError, isLoading, message, currentPage, totalRows } = useSelector((state) => state.usuarios);

    const [perPage, setPerPage] = useState(10);

    const [page, setPage] = useState(1);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        dispatch(getAllUsuarios({ page: currentPage, perPage }));

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, currentPage, perPage]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const columns = [
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            cellExport: row => row.nombre,
            cell: row => (
                <Stack spacing={2} direction={{ base: "column", lg: "row" }}>
                    <Avatar
                        size="sm"
                        name={row?.nombre}
                        src={row?.img}
                        fontWeight="bold"
                        fontSize="sm"
                        color="white"
                        alignSelf={'center'}
                        display={{
                            base: "none",
                            md: "none",
                            lg: "flex",
                        }}
                    />
                    <Text ml={2} alignSelf={'center'} fontSize="13px">{row?.nombre}</Text>
                </Stack>
            )
        },
        {
            name: 'CORREO',
            selector: row => row.correo,
            sortable: true,
            cellExport: row => row.correo,
            resizable: true
        },
        {
            name: 'ROL',
            selector: row => row.rol === 'ADMIN_ROLE' ? 'ADMIN' : 'ADMINISTRATIVE_ASSISTANT_ROLE' ? 'ASISTENTE ADMINISTRATIVO' : 'SECRETARIA',
            sortable: true,
            cellExport: row => row.estado,
            center: true,
            cell: row => (
                <div>
                    <Badge
                        bg={row.rol === 'ADMIN_ROLE' ? 'messenger.600' : row.rol === 'ADMINISTRATIVE_ASSISTANT_ROLE' ? 'purple.600' : row.rol === 'CASHIER_ROLE' ? 'pink.600' : 'red.600'}
                        variant="solid"
                        w={44}
                        textAlign="center"
                        py={2}
                        rounded="full"
                        color="white"
                        fontSize="10px"
                    >
                        {row.rol === 'ADMIN_ROLE' ? 'ADMIN' : row.rol === 'ADMINISTRATIVE_ASSISTANT_ROLE' ? 'ASISTENTE ADMINISTRATIVO' : 'CAJERO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ESTADO',
            selector: row => { return row.estado === true ? 'ACTIVO' : 'INACTIVO' },
            sortable: true,
            cellExport: row => row.estado === true ? 'ACTIVO' : 'INACTIVO',
            center: true,
            cell: row => (
                <div>
                    <Badge
                        colorScheme={row.estado === true ? 'green' : 'red'}
                        variant="solid"
                        w={24}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado === true ? 'ACTIVO' : 'INACTIVO'}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            export: false,
            center: true,
            cell: row => (
                <div>
                    <ModalDetallesPersona persona={row} />
                    <ModalEditarPersona row={row} />
                    <AlertEliminarPersona row={row} />
                </div>
            ),
            width: '220px'
        }
    ]

    const handlePageChange = (page) => {
        setPage(page)
        dispatch(getAllUsuarios({ page, perPage }));
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        dispatch(getAllUsuarios({ page: 1, perPage: newPerPage }));
    };

    const tableData = {
        columns: columns,
        data: usuarios,
    }

    if(isLoading) {
        return <Loading />
    }

    return (
        <>

            <Stack spacing={4} direction="row" justifyContent="space-between" py={4} px={0}>
                    <Heading size="lg">Usuarios</Heading>
                    <ModalAgregarPersona />
            </Stack>
            <Box
                overflow="hidden"
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000" }}
                mt={2}
                pt={2}
                rounded="2xl"
            >
                <DataTableExtensions
                    {...tableData}
                    print={false}
                    exportHeaders={true}
                    filterPlaceholder="BUSCAR"
                    numberOfColumns={columns.length}
                    fileName={'PERSONAS' + new Date().toLocaleDateString()}
                >
                    <DataTable
                        defaultSortField="createdAt"
                        defaultSortAsc={false}
                        defaultSortOrder="desc"
                        pagination
                        paginationIconFirstPage={<Icon as={FiChevronsLeft} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconLastPage={<Icon as={FiChevronsRight} boxSize={6} _dark={{ color: "gray.300" }} />}
                        paginationIconPrevious={<Icon as={FiChevronLeft} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationIconNext={<Icon as={FiChevronRight} boxSize={6} _dark={{ color: "gray.300", _hover: { color: "white" } }} />}
                        paginationServer
                        paginationPerPage={perPage}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                        paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50]}
                        paginationDefaultPage={page}
                        paginationTotalRows={totalRows}
                        onChangePage={handlePageChange}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Filas por página:',
                            rangeSeparatorText: 'de',
                            noRowsPerPage: false,
                            selectAllRowsItem: true,
                            selectAllRowsItemText: 'Todos',
                        }}
                        theme={themeTable}
                        customStyles={customStyles}
                        pointerOnHover={true}
                        responsive={true}
                        noDataComponent={<Text mb={4} fontSize="lg">NO SE ENCONTRARON DATOS</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Personas;