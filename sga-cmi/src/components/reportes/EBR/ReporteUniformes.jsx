import React from 'react';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import CardItems from './CardItems';
import { RiMapPinRangeFill } from 'react-icons/ri';
import Chart from "react-apexcharts";
import { Loading } from '../../../helpers/Loading';

const ReporteUniformes = ({ reportesEBR, isLoading }) => {

    const modalities = reportesEBR?.countUniformesPorArticulo
        ? reportesEBR.countUniformesPorArticulo.map((item) => item._id || 'Articulo')
        : [];

    const count = reportesEBR?.countUniformesPorArticulo
        ? reportesEBR.countUniformesPorArticulo.map((item) => item?.cantidad || 0)
        : [];

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
            <SimpleGrid columns={1} spacing={4}>
                <CardItems
                    total={reportesEBR?.totalCantidadUniformes}
                    textHeader={'Total de Uniformes'}
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
                <Chart options={options} series={options?.series} type="pie" height={400} />;
            </Stack>
        </>
    )
}

export default ReporteUniformes;