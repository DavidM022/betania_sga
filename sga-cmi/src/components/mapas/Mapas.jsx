import React, { useEffect } from 'react'
import { Badge, Box, Button, HStack, Icon,IconButton,Stack,Text, useColorModeValue } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getGrados } from '../../features/gradoSlice';
import { RiContactsBookUploadFill } from 'react-icons/ri';
import { getMapas, reset } from '../../features/mapaSlice';
import { VscAdd } from 'react-icons/vsc';
import ModalDetallesMapa from './ModalDetallesMapa';
import { ModalEditarMapa } from './ModalEditarMapa';
import moment from 'moment';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';

const Mapas = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { mapas, isLoading, isError, message } = useSelector((state) => state.mapas);

    const { grados } = useSelector((state) => state.grados);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getMapas());
        dispatch(getGrados());

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
            name: 'CODIGO',
            selector: row => row.codigo,
            sortable: true,
            cellExport: row => row.codigo,
            resizable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            cellExport: row => row.nombre,
            resizable: true,
            wrap: true
        },
        {
            name: 'GRADO',
            selector: row => row.grado?.nombre,
            sortable: true,
            cellExport: row => row.grado?.nombre,
            resizable: true,
            wrap: true
        },
        {
            name: 'CANTIDAD',
            selector: row => !row?.cantidad ? 0 : row.cantidad,
            sortable: true,
            cellExport: row => !row.cantidad ? 0 : row.cantidad,
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
            selector: row => row.estado,
            sortable: true,
            cellExport: row => row.estado,
            center: true,
            cell: row => (
                <div>
                    <Badge 
                        colorScheme={row.estado === 'ACTIVO' ? 'green' : 'red'}
                        variant="solid"
                        w={28}
                        textAlign="center"
                        py={2}
                        rounded="full"
                    >
                        {row.estado}
                    </Badge>
                </div>
            )
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            center: true,
            cell : row => (
                <div>
                    <ModalDetallesMapa mapa={row}/>
                    {/* <ModalDetallesLibro libro={row}/>*/}
                    <ModalEditarMapa row={row} grados = { grados } /> 
                    <AlertEliminar row={row} /> 
                </div>
            ),
            width : '180px'
        }
    ]

    const tableData = {
        columns: columns,
        data: mapas,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={{ pathname : '/mapas/agregar' }}>
                        <Button
                            colorScheme="purple"
                            _dark={{ bg: "purple.500", color: "white", _hover: { bg: "purple.600" } }}
                            aria-label="Agregar"
                            leftIcon={<Icon as={VscAdd} fontSize="xl" />}
                            variant="solid"
                            rounded={'xl'}
                        >
                            Nuevo Registro
                        </Button>
                    </Link>
                </HStack>
                <HStack direction="row">
                    <Link
                        to={{
                            pathname : '/mapas/prestamos'
                        }}
                    >
                        <Button
                            colorScheme="orange" 
                            _dark={{ bg: "orange.600", color: "white", _hover: { bg: "orange.700" } }}
                            rightIcon={<Icon as={RiContactsBookUploadFill} fontSize="2xl" />}
                            variant="solid"
                            rounded={'xl'}
                            display={{ base: 'none', lg: 'flex' }}
                        >
                            Prestamos
                        </Button>
                    </Link>
                    <Link
                        to={{
                            pathname : '/mapas/prestamos'
                        }}
                    >
                        <IconButton
                            colorScheme="orange" 
                            _dark={{ bg: "orange.600", color: "white", _hover: { bg: "orange.700" } }}
                            icon={<Icon as={RiContactsBookUploadFill} fontSize="2xl" />}
                            variant="solid"
                            rounded={'xl'}
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
                        filterPlaceholder="BUSCAR MAPAS"
                        numberOfColumns={7}
                        fileName={'MAPAS' + moment().format('DD-MM-YYYY - HH:mm:ss')}
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

export default Mapas;