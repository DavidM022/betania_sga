import React from 'react';
import Libros from '../../components/libros/Libros';
import Layout from '../../components/layout/Layout';

const LibrosPage = () => {
  return ( <Layout children={<Libros />} /> )
}

export default LibrosPage