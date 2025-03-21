import React from 'react';
import Categorias from '../../components/categorias/Categorias';
import Layout from '../../components/layout/Layout';

const CategoriasPage = () => {
  return ( <Layout children={<Categorias />} /> )
}

export default CategoriasPage