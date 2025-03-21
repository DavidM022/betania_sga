import React from 'react';
import Pagos from '../../../components/pagos/RESIDENCIA/Pagos';
import DetallesPago from '../../../components/pagos/RESIDENCIA/DetallesPago';
import Layout from '../../../components/layout/Layout';
import BoletaPago from '../../../components/pagos/RESIDENCIA/BoletaPago';

export const PagosRESIDENCIAPage = () => {
    return ( <Layout children={<Pagos />} /> )
}

export const PagosRESIDENCIAPageDetalles = () => {
    return ( <Layout children={<DetallesPago />} /> )
}

export const BoletaPagoRESIDENCIAPage = () => {
    return ( <Layout children={<BoletaPago />} /> )
}