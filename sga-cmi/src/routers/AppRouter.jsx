import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomeContent from '../pages/home';
import SettingsPage from '../pages/settings';
import PersonasPage from '../pages/personas';
import LoginPage from '../pages/auth/Login';
import NotFoundPage from '../pages/404/NotFoundPage';
import PrivateRoutes from './PrivateRoutes';
import PublicRoute from './PublicRoute';
import LibrosPage from '../pages/libros';
import GradosPage from '../pages/grados';
import UniformesPage from '../pages/uniformes';
import CarpetasPage from '../pages/carpetas';
import { ActivosPage, AgregarActivoPage, DetallesActivosPage, EditarActivoPage } from '../pages/activos';
import MiPerfilPage from '../pages/perfil';
import { EstudiantesPage, EstudiantesPageAgregar, EstudiantesPageDetalles, EstudiantesPageEditar, EstudiantesPageHistorialPagos } from '../pages/estudiantes/EBR';
import CategoriasEquipoPage from '../pages/activos/categorias';
import { DocentesPage, DocentesPageDetalles, DocentesPageAgregar } from '../pages/docentes';
import CategoriasUniformePage from '../pages/uniformes/categorias';
import { PrestamoLibrosPage, PrestamoLibrosPageRegistro } from '../pages/libros/prestamos';
import { MapasPage, MapasPageAgregar } from '../pages/mapas';
import { LaboratoriosPage, LaboratoriosPageAgregar, LaboratoriosPageDetalles, LaboratoriosPageEditar } from '../pages/laboratorios';
import { PrestamoMapasPage } from '../pages/mapas/prestamos';
import { BoletaPagoPage, PagosPage, PagosPageDetalles } from '../pages/pagos/EBR';
import { ReportesEBRPage } from '../pages/reportes';
import '../styles/globals.css';
import ForgotPasswordPage from '../pages/auth/ForgotPassword';
import ResetPasswordPage from '../pages/auth/ResetPassword';
import PrivateTokenRoutes from './PrivateRoutesToken';

export default function AppRouter() {

    return (
        <Routes>
            <Route element={<PrivateRoutes />} >
                <Route path="/" element={<HomeContent />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/perfil' element={<MiPerfilPage />} />
                <Route path='/usuarios' element={<PersonasPage />} />
                <Route path="/grados" element={<GradosPage />} />

                {/* Routes EBR */}

                <Route path='/libros/' element={<LibrosPage />} />
                <Route path='/libros/prestamos' element={<PrestamoLibrosPage />} />
                <Route path='/libros/prestamos/agregar' element={<PrestamoLibrosPageRegistro />} />

                <Route path='/uniformes/' element={<UniformesPage />} />

                <Route path='/inmobiliarios/' element={<CarpetasPage />} />
                
                <Route path='/equipos/' element={<ActivosPage />} />
                <Route path='/equipos/:id' element={<DetallesActivosPage />} />
                <Route path='/equipos/agregar' element={<AgregarActivoPage />} />
                <Route path='/equipos/editar/:id' element={<EditarActivoPage />} />
                <Route path='/equipos/categorias' element={<CategoriasEquipoPage />} />
                
                <Route path='/estudiantes/' element={<EstudiantesPage />} />
                <Route path='/estudiantes/agregar' element={<EstudiantesPageAgregar />} />
                <Route path='/estudiantes/:id' element={<EstudiantesPageDetalles />} />
                <Route path='/estudiantes/editar/:id' element={<EstudiantesPageEditar />} />
                <Route path='/estudiantes/pagos/:id' element={<EstudiantesPageHistorialPagos />} />


                <Route path='/profesores/' element={<DocentesPage />} />
                <Route path='/profesores/agregar' element={<DocentesPageAgregar />} />
                <Route path='/profesores/:id' element={<DocentesPageDetalles />} />
                
                <Route path='/uniformes/categorias' element={<CategoriasUniformePage />} />
                <Route path='/pagos/' element={<PagosPage />} />
                <Route path='/pagos/:id' element={<PagosPageDetalles />} />
                <Route path='/pagos/boleta/:id' element={<BoletaPagoPage />} />
                
                <Route path='/mapas/' element={<MapasPage />} />
                <Route path='/mapas/agregar' element={<MapasPageAgregar />} />
                <Route path='/mapas/prestamos' element={<PrestamoMapasPage />} />

                <Route path='/laboratorios' element={<LaboratoriosPage />} />
                <Route path='/laboratorios/agregar' element={<LaboratoriosPageAgregar />} />
                <Route path='/laboratorios/editar/:id' element={<LaboratoriosPageEditar />} />
                <Route path='/laboratorios/:id' element={<LaboratoriosPageDetalles />} />

                <Route path='/reportes' element={<ReportesEBRPage />} />
            </Route>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:email/:token" element={<PrivateTokenRoutes />}>
                    <Route path="/reset-password/:email/:token" element={<ResetPasswordPage />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}