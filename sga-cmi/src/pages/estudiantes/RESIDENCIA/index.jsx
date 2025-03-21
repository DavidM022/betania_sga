import React from 'react';
import Estudiantes from '../../../components/estudiantes/RESIDENCIA/Estudiantes';
import AgregarEstudiante from '../../../components/estudiantes/RESIDENCIA/AgregarEstudiante';
import DetallesEstudiante from '../../../components/estudiantes/RESIDENCIA/DetallesEstudiante';
import EditarEstudiante from '../../../components/estudiantes/RESIDENCIA/EditarEstudiante';
import HistorialPagoEstudiantes from '../../../components/estudiantes/RESIDENCIA/HistorialPagosEstudiante';
import Layout from '../../../components/layout/Layout';

export const EstudiantesRESIDENCIAPage = () => {
    return ( <Layout children={<Estudiantes />} /> )
}

export const EstudiantesRESIDENCIAPageAgregar = () => {
    return ( <Layout children={<AgregarEstudiante />} /> )
}

export const EstudiantesRESIDENCIAPageDetalles = () => {
    return ( <Layout children={<DetallesEstudiante />} /> )
}

export const EstudiantesRESIDENCIAPageEditar = () => {
    return ( <Layout children={<EditarEstudiante />} /> )
}

export const EstudiantesRESIDENCIAPageHistorialPagos = () => {
    return ( <Layout children={<HistorialPagoEstudiantes />} /> )
}
