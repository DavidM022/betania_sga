import React from 'react';
import Laboratorios from '../../components/laboratorios/Laboratorios';
import AgregarLaboratorio from '../../components/laboratorios/AgregarLaboratorio';
import EditarLaboratorio from '../../components/laboratorios/EditarLaboratorio';
import DetallesLaboratorio from '../../components/laboratorios/DetallesLaboratorio';
import Layout from '../../components/layout/Layout';

export const LaboratoriosPage = () => {
    return ( <Layout children={<Laboratorios />} /> )
}

export const LaboratoriosPageAgregar = () => {
    return ( <Layout children={<AgregarLaboratorio />} /> )
}

export const LaboratoriosPageEditar = () => {
    return ( <Layout children={<EditarLaboratorio />} /> )
}

export const LaboratoriosPageDetalles = () => {
    return ( <Layout children={<DetallesLaboratorio />} /> )
}