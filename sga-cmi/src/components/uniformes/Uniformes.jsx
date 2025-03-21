import React, { useEffect } from 'react'
import { Badge, Box, Button, HStack, Icon, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getUniformes, reset } from '../../features/uniformeSlice';
import ModalDetallesUniforme from './ModalDetallesUniforme';
import ModalAgregarUniforme from './ModalAgregarUniforme';
import { getCategoriasUniforme } from '../../features/categoriaUniformeSlice';
import { ModalEditarUniforme } from './ModalEditarUniforme';
import { MdCategory } from 'react-icons/md';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';

const Uniformes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { uniformes, isLoading, isError, message } = useSelector((state) => state.uniformes);

    const { categoria_uniformes } = useSelector((state) => state.categoria_uniformes);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getUniformes());
        dispatch(getCategoriasUniforme());

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
            resizable: true
        },
        {
            name: 'ARTICULO',
            selector: row => row.articulo,
            sortable: true,
            cellExport: row => row.articulo,
            resizable: true,
            wrap: true
        },
        {
            name: 'CATEGORIA',
            selector: row => row.categoria?.nombre,
            sortable: true,
            cellExport: row => row.categoria?.nombre,
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
            sortable: true,
            export: false,
            center: true,
            cell: row => (
                <div>
                    <ModalDetallesUniforme uniforme={row} />
                    <ModalEditarUniforme row={row} categorias = { categoria_uniformes } />
                    <AlertEliminar row={row} />
                </div>
            ),
            width: '180px'
        }
    ]

    const tableData = {
        columns: columns,
        data: uniformes,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <ModalAgregarUniforme categorias = { categoria_uniformes } />
                </HStack>
                <HStack direction="row">
                    <Link
                        to={{
                            pathname : '/uniformes/categorias'
                        }}
                    >
                        <Button
                            colorScheme="whatsapp" 
                            _dark={{ bg: "whatsapp.600", 
                            color: "white", _hover: { bg: "whatsapp.700" } }}
                            leftIcon={<Icon as={MdCategory} fontSize="2xl" />}
                            variant="solid"
                            rounded={'xl'}
                            display={{ base: 'none', lg: 'flex' }}
                        >
                            Gestionar Categorias
                        </Button>
                    </Link>
                    <Link
                        to={{
                            pathname : '/uniformes/categorias'
                        }}
                    >
                        <IconButton
                            colorScheme="whatsapp" 
                            _dark={{ bg: "whatsapp.600", color: "white", _hover: { bg: "whatsapp.700" } }}
                            icon={<Icon as={MdCategory} fontSize="2xl" />}
                            variant="solid"
                            rounded={'none'}
                            display={{ base: 'flex', lg: 'none' }}
                        />
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
                    fileName={'UNIFORMES' + new Date().toLocaleDateString()}
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
                        noDataComponent={<Text mb={4} fontSize="lg">NO DATA FOUND</Text>}
                    />
                </DataTableExtensions>
            </Box>
        </>
    )
}

export default Uniformes;