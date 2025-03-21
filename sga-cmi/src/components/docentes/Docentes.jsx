import React, { useEffect } from 'react';
import {
    Avatar,
    Badge, 
    Box,
    Button,
    Heading, 
    Icon,
    IconButton,
    Stack,
    Text, 
    Tooltip, 
    useColorModeValue
} from '@chakra-ui/react';
import { CgEyeAlt } from 'react-icons/cg';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../helpers/customStyles';
import { AlertEliminar } from './AlertEliminar';
import { getDocentes, reset } from '../../features/docenteSlice';
import { VscAdd } from 'react-icons/vsc';
import ModalEditarDocente from './ModalEditarDocente';
import moment from 'moment';
import '../../theme/solarizedTheme';
import { Loading } from '../../helpers/Loading';

const Estudiantes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { docentes, isLoading, isError, message } = useSelector((state) => state.docentes);

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        dispatch(getDocentes())

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
            name: 'NOMBRES',
            selector: row => row.apellidos + ' ' + row.nombres,
            sortable: true,
            cellExport: row => row.apellidos + ' ' + row.nombres,
            resizable: true,
            cell : row => (
                <div>
                    <Stack spacing={2} direction="row" align={'center'}>
                        <Avatar
                            size="sm" 
                            name={row.nombres}
                            fontWeight="bold"
                            src={row?.img}
                            fontSize="sm"
                            color="white"
                            display = {{ base: "none", lg: "flex"}}
                        />
                        <Text ml={1} fontSize="12px">{row.apellidos + ' ' + row.nombres}</Text>
                    </Stack>
                </div>
            )
        },
        {
            name: 'CI',
            selector: row => row.dni,
            sortable: true,
            cellExport: row => row.dni,
            resizable: true
        },
        {
            name: 'CORREO',
            selector: row => row.correo,
            sortable: true,
            cellExport: row => row.correo,
            resizable: true
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
                        colorScheme={row.estado === 'ACTIVO' ? 'green' : row.estado === 'RETIRADO' ? 'gray' : 'red'}
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
                            pathname: '/profesores/' + row._id,
                            state: { activos: row }
                        }}>
                            <Tooltip hasArrow label='Ver Detalles' placement='auto'>
                                <IconButton
                                    aria-label="Ver"
                                    icon={<CgEyeAlt />}
                                    fontSize="2xl"
                                    _dark={{ color: "white", _hover: { bg: "blue.800" } }}
                                    colorScheme="blue"
                                    variant={'ghost'}
                                />
                            </Tooltip>
                    </Link>
                    <ModalEditarDocente row={row} /> 
                    <AlertEliminar row={row} />
                </div>
            ),
            width : '220px'
        }
    ]

    const tableData = {
        columns: columns,
        data: docentes,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <Heading size="lg">Profesores</Heading>
                <Link
                    to={{
                        pathname : '/profesores/agregar'
                    }}
                >
                    <Button
                        colorScheme="primary"
                        _dark={{ bg: "primary.600", color: "white", _hover: { bg: "primary.600" } }}
                        aria-label="Agregar"
                        leftIcon={<Icon as={VscAdd} fontSize="lg" />}
                        variant="solid"
                        rounded={'xl'}
                    >
                        Nuevo Registro
                    </Button>
                </Link>
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
                        fileName={'PROFESORES' + moment().format('DD-MM-YYYY')}
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

export default Estudiantes;