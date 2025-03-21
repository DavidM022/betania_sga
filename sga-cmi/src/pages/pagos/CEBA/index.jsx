import React from 'react';
import Pagos from '../../../components/pagos/CEBA/Pagos';
import DetallesPago from '../../../components/pagos/CEBA/DetallesPago';
import Layout from '../../../components/layout/Layout';
import BoletaPago from '../../../components/pagos/CEBA/BoletaPago';

export const PagosCEBAPage = () => {
    return ( <Layout children={<Pagos />} /> )
}

export const PagosCEBAPageDetalles = () => {
    return ( <Layout children={<DetallesPago />} /> )
}

export const BoletaPagoCEBAPage = () => {
    return ( <Layout children={<BoletaPago />} /> )
}