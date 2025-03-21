import React from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import CardItems from './CardItems';
import { FaBook } from 'react-icons/fa';
import Chart from "react-apexcharts";
import { Loading } from '../../../helpers/Loading';

const ReporteLibros = ({ reportesEBR, isLoading }) => {

    const modalities = ["PRESTADOS", "DEVUELTOS"];
    const count = [reportesEBR?.countLibrosPrestados, reportesEBR?.countLibrosDevueltos];

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
                    total={reportesEBR?.totalCantidadLibros}
                    textHeader={'Total Libros'}
                    textButton={'Ver más'}
                    icon={FaBook}
                />
                <CardItems
                    total={reportesEBR?.countLibrosPrestados}
                    textHeader={'Libros Prestados'}
                    textButton={'Ver más'}
                    icon={FaBook}
                />
                <CardItems
                    total={reportesEBR?.countLibrosDevueltos}
                    textHeader={'Libros Devueltos'}
                    textButton={'Ver más'}
                    icon={FaBook}
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

export default ReporteLibros