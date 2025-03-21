import React, { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getReportesRESIDENCIA, reset } from '../../../features/reporteSlice';
import { ToastChakra } from '../../../helpers/toast';
import { Loading } from '../../../helpers/Loading';
import CardItems from '../CEBA/CardItems';
import { FaUserTie } from 'react-icons/fa';

const IndexReportesRESIDENCIA = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    const { reportesRESIDENCIA, isLoading, message, isError } = useSelector((state) => state.reportes);

    useEffect(() => {
        if(!user){
            navigate('/login');
        }

        if(!user.token){
            navigate('/login');
        }

        dispatch(getReportesRESIDENCIA());

        return () => {
            dispatch(reset());
        }
    }, [dispatch, navigate, user]);

    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    // const hasErrorRef = useRef(false);

    // useEffect(() => {

    //     let isMounted = true;

    //     async function fetchData() {
    //         try {
    //             if (!user || !user.token) {
    //                 navigate('/login');
    //                 return;
    //             }

    //             if (isError && !hasErrorRef.current) {
    //                 ToastChakra('Error', message, 'error', 1500);
    //                 console.log(message);
    //                 hasErrorRef.current = true;
    //             }

    //             if (!hasErrorRef.current && isMounted) {
    //                 await dispatch(getReportesRESIDENCIA());
    //             }
    //         } catch (error) {
    //             console.log(error);
    //             ToastChakra('Error al obtener los reportes', error?.message, 'error', 1500);
    //         } finally {
    //             if (isMounted) {
    //                 dispatch(reset());
    //             }
    //         }
    //     }

    //     fetchData();

    //     return () => {
    //         isMounted = false;
    //     };
    // }, [dispatch, isError, message, navigate, user]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
            <CardItems
                total={reportesRESIDENCIA?.estudiantes?.totalEstudiantesRESIDENCIA}
                textHeader={'Total Estudiantes'}
                textButton={'Ver más'}
                icon={FaUserTie}
            />
            <CardItems
                total={reportesRESIDENCIA?.pagos?.totalPagosRESIDENCIA}
                textHeader={'Cantidad de Pagos'}
                textButton={'Ver más'}
                icon={FaUserTie}
            />
        </SimpleGrid>
    )
}

export default IndexReportesRESIDENCIA;