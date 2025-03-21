import React from 'react';
import Mapas from '../../components/mapas/Mapas';
import AgregarMapa from '../../components/mapas/AgregarMapa';
import Layout from '../../components/layout/Layout';

export const MapasPage = () => {
    return (<Layout children={<Mapas />} />)
}

export const MapasPageAgregar = () => {
    return (<Layout children={<AgregarMapa />} />)
}
