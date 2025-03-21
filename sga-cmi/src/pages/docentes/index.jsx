import React from 'react';
import Docentes from '../../components/docentes/Docentes';
import AgregarDocente from '../../components/docentes/AgregarDocente';
import DetallesDocente from '../../components/docentes/DetallesDocente';
import Layout from '../../components/layout/Layout';

export const DocentesPage = () => {
    return ( <Layout children={<Docentes />} /> )
}

export const DocentesPageDetalles = () => {
    return ( <Layout children={<DetallesDocente />} /> )
}

export const DocentesPageAgregar = () => {
    return ( <Layout children={<AgregarDocente />} /> )
}