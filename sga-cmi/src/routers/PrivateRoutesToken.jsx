import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PrivateTokenRoutes = () => {

    const { emailToken } = useSelector(state => state.auth);

    const location = useLocation();

    const validateToken = (token) => {
        try {
            // Decodificar el token
            const decodedToken = jwtDecode(token);

            // Obtener la fecha de expiración del token
            const expirationDate = new Date(decodedToken.exp * 1000);

            // Verificar si el token ha expirado
            const isTokenExpired = expirationDate < new Date();

            // Retornar true si el token no ha expirado
            return !isTokenExpired;
        } catch (error) {
            // Si hay un error al decodificar el token, se considera inválido
            return false;
        }
    };

    const isValidToken = validateToken(emailToken);

    return (
        isValidToken ? (
            <Outlet />
        ) : (
            <Navigate to="/forgot-password" state={{ from: location }} replace />
        )
    );
};

export default PrivateTokenRoutes;