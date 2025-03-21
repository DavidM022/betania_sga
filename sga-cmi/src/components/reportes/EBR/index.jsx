import React, { useEffect } from 'react';
import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Stack,
    Heading,
    TabIndicator,
} from '@chakra-ui/react'
import ReporteEstudiantesEBR from './ReporteEstudiantes'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllReportesEBR, reset } from '../../../features/reporteSlice';
import { ToastChakra } from '../../../helpers/toast';
import ReportePagos from './ReportePagos';
import ReporteLibros from './ReporteLibros';
import ReporteUniformes from './ReporteUniformes';

const ReporteIndex = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { reportesEBR, isLoading, message, isError } = useSelector((state) => state.reportes);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        if (!user.token) {
            navigate('/login');
        }

        dispatch(getAllReportesEBR());

        return () => {
            dispatch(reset());
        }

    }, [dispatch, navigate, user]);

    if (isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    return (
        <>
            <Stack spacing={4} direction="row" justifyContent="space-between" py={4}>
                <Heading size="lg">Reportes</Heading>
            </Stack>
            <Tabs variant="unstyled" position="relative" p={0}>
                <TabList>
                    <Tab
                        _selected={{
                            color: 'purple.500',
                        }}
                    >
                        Estudiantes
                    </Tab>
                    <Tab
                        _selected={{
                            color: 'purple.500',
                        }}
                    >
                        Pagos
                    </Tab>
                    <Tab
                        _selected={{
                            color: 'purple.500',
                        }}
                    >
                        Libros
                    </Tab>
                    <Tab
                        _selected={{
                            color: 'purple.500',
                        }}
                    >
                        Uniformes
                    </Tab>
                </TabList>
                <TabIndicator
                    mt="-1.5px"
                    height="2px"
                    bg="purple.500"
                    borderRadius="2px"
                />
                <TabPanels>
                    <TabPanel px={0}>
                        <ReporteEstudiantesEBR isLoading={isLoading} reportesEBR={reportesEBR?.estudiantes} />
                    </TabPanel>
                    <TabPanel px={0}>
                        <ReportePagos isLoading={isLoading} reportesEBR={reportesEBR} />
                    </TabPanel>
                    <TabPanel px={0}>
                        <ReporteLibros isLoading={isLoading} reportesEBR={reportesEBR?.libros} />
                    </TabPanel>
                    <TabPanel px={0}>
                        <ReporteUniformes isLoading={isLoading} reportesEBR={reportesEBR?.uniformes} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ReporteIndex;