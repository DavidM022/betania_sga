import React from 'react';
import Personas from '../../components/usuarios/Personas';
import Layout from '../../components/layout/Layout';

const PersonasPage = () => {
    return ( <Layout children={<Personas />} /> )
}

export default PersonasPage