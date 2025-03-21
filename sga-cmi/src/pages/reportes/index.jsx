import React from 'react';
import ReporteChartCEBA from '../../components/reportes/CEBA/IndexReportesCEBA';
import ReportesIndex from '../../components/reportes/EBR/index';
import IndexReportesRESIDENCIA from '../../components/reportes/RESIDENCIA/IndexReportesRESIDENCIA';
import Layout from '../../components/layout/Layout';

export const ReportesEBRPage = () => {
    return ( <Layout children={<ReportesIndex />} /> )
}

export const ReportesCEBAPage = () => {
    return ( <Layout children={<ReporteChartCEBA />} /> )
}

export const ReportesRESIDENCIAPage = () => {
    return ( <Layout children={<IndexReportesRESIDENCIA />} /> )
}
