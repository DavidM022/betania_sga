import React from 'react';
import Pagos from '../../../components/pagos/EBR/Pagos';
import DetallesPago from '../../../components/pagos/EBR/DetallesPago';
import Layout from '../../../components/layout/Layout';
import BoletaPago from '../../../components/pagos/EBR/BoletaPago';

export const PagosPage = () => {
    return ( <Layout children={<Pagos />} /> )
}

export const PagosPageDetalles = () => {
    return ( <Layout children={<DetallesPago />} /> )
}

export const BoletaPagoPage = () => {
    return ( <Layout children={<BoletaPago />} /> )
}
