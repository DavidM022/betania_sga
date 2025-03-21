import React from 'react';
import Estudiantes from '../../../components/estudiantes/CEBA/Estudiantes';
import AgregarEstudiante from '../../../components/estudiantes/CEBA/AgregarEstudiante';
import DetallesEstudiante from '../../../components/estudiantes/CEBA/DetallesEstudiante';
import EditarEstudiante from '../../../components/estudiantes/CEBA/EditarEstudiante';
import HistorialPagoEstudiantes from '../../../components/estudiantes/CEBA/HistorialPagosEstudiante';
import Layout from '../../../components/layout/Layout';

export const EstudiantesCEBAPage = () => {
    return ( <Layout children={<Estudiantes />} /> )
}

export const EstudiantesCEBAPageAgregar = () => {
    return ( <Layout children={<AgregarEstudiante />} /> )
}

export const EstudiantesCEBAPageDetalles = () => {
    return ( <Layout children={<DetallesEstudiante />} /> )
}

export const EstudiantesCEBAPageEditar = () => {
    return ( <Layout children={<EditarEstudiante />} /> )
}

export const EstudiantesCEBAPageHistorialPagos = () => {
    return ( <Layout children={<HistorialPagoEstudiantes />} /> )
}