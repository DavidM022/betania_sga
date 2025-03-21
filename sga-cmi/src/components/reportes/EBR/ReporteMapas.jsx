import React from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import CardItems from './CardItems';
import { RiMapPinRangeFill } from 'react-icons/ri';
import Chart from "react-apexcharts";
import { Loading } from '../../../helpers/Loading';

const ReporteMapas = ({ reportesEBR, isLoading }) => {

    const modalities = ["PRESTADO", "DEVUELTOS"];
    const count = [reportesEBR?.countMapasPrestados, reportesEBR?.countMapasDevueltos];

    // Configuración del gráfico
    const options = {
        chart: {
            type: "pie",
            toolbar: {
                show: true,
            },
        },
        series: count,
        labels: modalities,
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: "top",
                    },
                },
            },
        ],
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 1, lg: 3 }} spacing={4}>
                <CardItems
                    total={reportesEBR?.totalCantidadMapas}
                    textHeader={'Total de Mapas'}
                    textButton={'Ver más'}
                    icon={RiMapPinRangeFill}
                />
                <CardItems
                    total={reportesEBR?.countMapasPrestados}
                    textHeader={'Mapas Prestados'}
                    textButton={'Ver más'}
                    icon={RiMapPinRangeFill}
                />
                <CardItems
                    total={reportesEBR?.countMapasDevueltos}
                    textHeader={'Mapas Devueltos'}
                    textButton={'Ver más'}
                    icon={RiMapPinRangeFill}
                />
            </SimpleGrid>
            <Stack
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000", color: 'black' }}
                rounded={'2xl'}
                p={6}
                mt={4}
            >
                <Chart options={options} series={options?.series || []} type={options?.chart?.type || 'pie'} height={400} />
            </Stack>
        </>
    )
}

export default ReporteMapas