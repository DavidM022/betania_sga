import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Badge, 
    Box,
    HStack, 
    Icon,
    IconButton,
    Select,
    Stack,
    Tag,
    Text, 
    Tooltip, 
    useColorModeValue
} from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastChakra } from '../../../helpers/toast';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
import { customStyles } from '../../../helpers/customStyles';
import { getPagoByStudent, reset } from '../../../features/pagos/RESIDENCIA/pagoSlice';
import moment from 'moment';
import { FaArrowLeft } from 'react-icons/fa';
import { CgEyeAlt } from 'react-icons/cg';
import '../../../theme/solarizedTheme';
import { Loading } from '../../../helpers/Loading';

const HisotorialPagoEstudiantes = ({ location }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const themeTable = useColorModeValue('default', 'solarized');

    const { user } = useSelector((state) => state.auth);

    const { pagos_by_student, isLoading, isError, message, currentPage, totalRows } = useSelector((state) => state.pagos_ebr);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const [tableRowsData, setTableRowsData] = useState(pagos_by_student);

    const params = useParams(location);

    const listAnios = [
        { value: '2021', label: '2021' },
        { value: '2022', label: '2022' },
        { value: '2023', label: '2023' },
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: 'all', label: 'TODOS' }
    ];

    const handleClickFilterAnio = async (data) => {
        console.log(data);
        if(data === 'all') {
            setTableRowsData(pagos_by_student);
        }else{
            const dataFilter = pagos_by_student.filter(row => row.anio === data);
            setTableRowsData(dataFilter);
        }
    }

    useEffect(() => {
        
        if (!user) {
            navigate("/login");
        }

        dispatch(getPagoByStudent({ id: params.id, page: currentPage, perPage })).then((data) => {
            setTableRowsData(data.payload.pagos_by_student);
        })

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, params.id, currentPage, perPage]);
    
    if(isError) {
        console.log(message);
        ToastChakra('Error', message, 'error', 1500);
    }

    const columns = [
        {
            name: 'ESTUDIANTE',
            selector: row => row.estudiante?.apellidos + ' ' + row.estudiante?.nombres,
            sortable: true,
            cellExport: row => row.estudiante?.apellidos + ' ' + row.estudiante?.nombres,
            resizable: true,
            cell : row => (
                <div>
                    <Stack spacing={2} direction="row">
                        <Avatar
                            size="sm" 
                            name={row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}
                            src={row?.estudiante?.img}
                            fontWeight="bold"
                            fontSize="sm"
                            color="white"
                            display = {{ base: "none", lg: "flex"}}
                            alignSelf={'center'}
                        />
                        <Text ml={1} fontSize="12px" alignSelf={'center'}>{row.estudiante?.apellidos + ' ' + row.estudiante?.nombres}</Text>
                    </Stack>
                </div>
            )
        },
        {
            name: 'MES',
            selector: row => row.meses.map(row => row).join(', '),
            sortable: true,
            cellExport: row => row.meses.map(row => row).join(', '),
            resizable: true
        },
        {
            name: 'AÑO',
            selector: row => row.anio,
            sortable: true,
            cellExport: row => row.anio,
            resizable: true
        },
        {
            name: 'IMPORTE',
            selector: row => `S/${row.importe}`,
            sortable: true,
            cellExport: row => `S/${row.importe}`,
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
                        S/ {row?.importe}
                    </Badge>
                </div>
            )
        },
        {
            name: 'FECHA',
            selector: row => moment(row.createdAt).format('DD/MM/YYYY'),
            sortable: true,
            cellExport: row => moment(row.createdAt).format('DD/MM/YYYY'),
            center: true,
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
                        colorScheme={row.estado === 'PENDIENTE' ? 'red' : row.estado === 'CANCELADO' ? 'green' : 'orange'}
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
                            pathname: '/residencia/pagos/' + row._id
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
                </div>
            ),
        }
    ]

    const handlePageChange = (page) => {
        setPage(page)
        dispatch(getPagoByStudent({ id: params.id, page, perPage })).then((data) => {
            setTableRowsData(data.payload.pagos_by_student);
        })
    };

    const handleRowsPerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        dispatch(getPagoByStudent({ id: params.id, page: 1, perPage: newPerPage })).then((data) => {
            setTableRowsData(data.payload.pagos_by_student);
        })
    };

    const tableData = {
        columns: columns,
        data: tableRowsData,
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Link to={'/residencia/estudiantes'}>
                        <IconButton icon={<FaArrowLeft />} colorScheme="gray" rounded="full" />
                    </Link>
                    <Text fontSize="md">Regresar</Text>
                </HStack>
                <HStack spacing={4} direction="row">
                    <Text fontSize="lg" fontWeight={'bold'}>Historial de Pagos del Estudiante Seleccionado</Text>
                </HStack>
            </Stack>

            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <HStack spacing={4} direction="row">
                    <Select 
                        placeholder="Seleccionar Año" 
                        onChange={(e) => handleClickFilterAnio(e.target.value)}
                        defaultValue={ listAnios[5].value }
                        _focus={{
                            boderColor: 'blue.700',
                            boxShadow: 'none'
                        }}
                    >
                        {
                            listAnios.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))
                        }
                    </Select>
                </HStack>
                <HStack direction="row">
                    <Text fontSize="md" fontWeight={'black'}>Total de Pagos: </Text>
                    <Tag variant='solid' rounded={'full'} colorScheme='yellow' fontSize={'md'}>
                        {tableRowsData.length}
                    </Tag>
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
                        fileName={'HISTORIAL_PAGOS_RESIDENCIA' + moment().format('DD_MM_YYYY HH:mm:ss')}
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

export default HisotorialPagoEstudiantes;