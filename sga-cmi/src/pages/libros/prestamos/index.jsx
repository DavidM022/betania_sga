import React from 'react';
import PrestamoLibros from '../../../components/libros/prestamos/Prestamos';
import RegistrarPrestamoLibro from '../../../components/libros/prestamos/RegistrarPrestamoLibro';
import Layout from '../../../components/layout/Layout';

export const PrestamoLibrosPage = () => {
    return ( <Layout children={<PrestamoLibros />} /> )
}

export const PrestamoLibrosPageRegistro = () => {
    return ( <Layout children={<RegistrarPrestamoLibro />} /> )
}