import React from 'react';
import { Box } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import "apexcharts/dist/apexcharts.css";

const SalesChartMonth = ({ data }) => {
    const chartOptions = {
        chart: {
            id: 'column',
            toolbar: {
                show: true,
            },
            sparkline: {
                enabled: false,
            },
        },

        legend: {
            show: true,
            position: "bottom",
        },

        title: {
            text: 'Total Pagos por Mes',
            align: 'center',
        },
        xaxis: {
            categories: data.map((item) => item.mes),
            labels: {
                style: {
                    colors: '#444',
                    fontSize: '12px',
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return 'Bs/' + val;
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ['#444'],
            }
        },
        grid: {
            show: false
        },
        annotations: {
            position: 'top',
            offsetY: -15,
            markers: {
                size: 5,
                offsetX: 0,
                offsetY: 0,
                strokeWidth: -1,
                hover: {
                    size: 7
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                offsetX: 40
            }
        }
    };

    const chartSeries = [
        {
            name: 'Total Recaudado',
            data: data.map((item) => item.total),
        }
    ];

    return (
        <Box bg="white" _dark={{ bg: 'primary.1000', color: 'black' }} borderRadius="2xl" boxShadow="base" p="4" width="full">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={300}
            />
        </Box>
    );
};

export default SalesChartMonth;
