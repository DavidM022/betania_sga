import React, { useEffect } from 'react'
import { Badge, Box, HStack, Icon, Heading, IconButton,Stack,Text, useColorModeValue } from '@chakra-ui/react'
import Moment from 'moment';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ModalAgregarCategoria from './ModalAgregarCategoria';
import ModalEditarCategoria from './ModalEditarCategoria';
import ModalDetallesCategoria from './ModalDetallesCategoria';
import { ToastChakra } from '../../../helpers/toast';
import { AlertEliminar } from './AlertEliminar';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../../helpers/customStyles';
import { FaArrowLeft } from 'react-icons/fa';
import { getCategoriasUniforme, reset } from '../../../features/categoriaUniformeSlice';
import '../../../theme/solarizedTheme';
import { Loading } from '../../../helpers/Loading';

const CategoriasUniforme = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { categoria_uniformes, isLoading, isError, message } = useSelector((state) => state.categoria_uniformes);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        } else if (!user.token) {
            navigate("/login");
        }

        dispatch(getCategoriasUniforme())

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
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            cellExport: row => row.nombre,
            resizable: true
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
                        w={28}
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
            name: 'FECHA CREACIÓN',
            selector: row => Moment(row.createdAt).format('DD/MM/YY hh:mm:ss A'),
            sortable: true,
            cellExport: row => Moment(row.createdAt).format('DD/MM/YY hh:mm:ss A'),
            resizable: true,
            right: true,
        },
        {
            name: 'ACCIONES',
            sortable: true,
            export: false,
            center: true,
            cell : row => (
                <div>
                    <ModalDetallesCategoria categoria={row}/>
                    <ModalEditarCategoria row={row} />
                    <AlertEliminar row={row} />
                </div>
            ),
            width : '180px' 
        }
    ]

    const tableData = {
        columns: columns,
        data: categoria_uniformes,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/uniformes'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="md">Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'bold'}>Gestión de Categorias de Uniformes</Text>
                </HStack>
            </Stack>

            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <Heading size="lg">Categorias</Heading>
                <ModalAgregarCategoria />
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
                        fileName={'CATEGORIAS_UNIFORMES' + new Date().toLocaleDateString()}
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

export default CategoriasUniforme;