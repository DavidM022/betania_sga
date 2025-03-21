import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReportesCEBA, reset } from '../../../features/reporteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { Loading } from '../../../helpers/Loading';
import CardItems from './CardItems';
import { FaUserTie } from 'react-icons/fa';

const IndexReportesCEBA = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { reportesCEBA, isLoading, message, isError } = useSelector((state) => state.reportes);

    useEffect(() => {

        if (!user) {
            navigate('/login');
        }

        if (!user.token) {
            navigate('/login');
        }

        dispatch(getReportesCEBA());

        return () => {
            dispatch(reset());
        }

    }, [dispatch, navigate, user]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
                <CardItems
                    total={reportesCEBA?.estudiantes?.totalEstudiantesCEBA}
                    textHeader={'Total Estudiantes'}
                    textButton={'Ver más'}
                    icon={FaUserTie}
                />
                <CardItems
                    total={reportesCEBA?.pagos?.totalPagosCEBA}
                    textHeader={'Cantidad de Pagos'}
                    textButton={'Ver más'}
                    icon={FaUserTie}
                />
            </SimpleGrid>
        </>
    )
}

export default IndexReportesCEBA;