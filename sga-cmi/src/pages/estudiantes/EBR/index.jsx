import React from 'react';
import AgregarEstudiante from '../../../components/estudiantes/EBR/AgregarEstudiante';
import DetallesEstudiante from '../../../components/estudiantes/EBR/DetallesEstudiante';
import EditarEstudiante from '../../../components/estudiantes/EBR/EditarEstudiante';
import HisotorialPagoEstudiantes from '../../../components/estudiantes/EBR/HistorialPagosEstudiante';
// import HomeEstudiantes from '../../../components/estudiantes/EBR/HomeEstudiantes';
import Layout from '../../../components/layout/Layout';
import Estudiantes from '../../../components/estudiantes/EBR/Estudiantes';

export const EstudiantesPage = () => {
    return ( <Layout children={<Estudiantes />} /> )
}

export const EstudiantesPageAgregar = () => {
    return ( <Layout children={<AgregarEstudiante />} /> )
}

export const EstudiantesPageDetalles = () => {
    return ( <Layout children={<DetallesEstudiante />} /> )
}

export const EstudiantesPageEditar = () => {
    return ( <Layout children={<EditarEstudiante />} /> )
}

export const EstudiantesPageHistorialPagos = () => {
    return ( <Layout children={<HisotorialPagoEstudiantes />} /> )
}
