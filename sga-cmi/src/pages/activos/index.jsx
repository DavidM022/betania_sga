import React from 'react';
import Activos from '../../components/activos/Activos';
import DetallesActivo from '../../components/activos/DetallesActivo';
import AgregarActivo from '../../components/activos/AgregarActivo';
import EditarActivo from '../../components/activos/EditarActivo';
import Layout from '../../components/layout/Layout';

export const ActivosPage = () => {
    return ( <Layout children={<Activos />} /> )
}

export const DetallesActivosPage = () => {
    return ( <Layout children={< DetallesActivo /> } />)
}

export const AgregarActivoPage = () => {
    return ( <Layout children={< AgregarActivo /> } />)
}

export const EditarActivoPage = () => {
    return ( <Layout children={< EditarActivo /> } />)
}
