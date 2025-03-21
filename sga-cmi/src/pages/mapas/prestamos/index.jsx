import React from 'react';
// import RegistrarPrestamoLibro from '../../../components/libros/prestamos/RegistrarPrestamoLibro';
import PrestamoMapas from '../../../components/mapas/prestamos/Prestamos';
import Layout from '../../../components/layout/Layout';

export const PrestamoMapasPage = () => {
    return ( <Layout children={<PrestamoMapas />} /> )
}

// export const PrestamoMapasPageRegistro = () => {
//     return ( <Layout componente={<RegistrarPrestamoLibro />} /> )
// }