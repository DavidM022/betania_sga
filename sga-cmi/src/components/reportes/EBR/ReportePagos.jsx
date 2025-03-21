import React from 'react';
import { Button, FormControl, Text, Input, SimpleGrid, Stack, Badge, IconButton } from '@chakra-ui/react';
import CardItems from './CardItems';
import { FaUserTie } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TableComponent } from '../../home/TableComponent';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVentasBetweenDates } from '../../../features/reporteSlice';

const ReportePagos = ({ reportesEBR }) => {

    const dispatch = useDispatch();

    const { reporteVentasPorFechas, reporteVentasPorFechasPagos, isLoading } = useSelector((state) => state.reportes);

    const initialValues = {
        desde: '',
        hasta: '',
    }

    const validationSchema = Yup.object({
        desde: Yup.string().required('El campo es requerido'),
        hasta: Yup.string().required('El campo es requerido'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        dispatch(getAllVentasBetweenDates(values));
        setSubmitting(false);
    }

    const getTiempoTranscurrido = (createdAt) => {
        const fechaCreacion = moment(createdAt);
        const fechaActual = moment();
        const tiempoTranscurrido = moment.duration(fechaActual.diff(fechaCreacion));
        return tiempoTranscurrido.humanize();
    };

    const columns = [
        {
            Header: 'CODIGO',
            accessor: 'codigo'
        },
        {
            Header: 'ESTUDIANTE',
            accessor: 'estudiante.nombres',
            Cell: (row) => (
                <Text noOfLines={1}>{row.value} {row.row.original.estudiante.apellidos}</Text>
            )
        },
        {
            Header: 'IMPORTE',
            accessor: 'importe',
            Cell: (row) => (
                <Text noOfLines={1}>Bs/{row.value}</Text>
            ),
        },
        {
            Header: 'TIEMPO',
            accessor: 'updatedAt',
            Cell: (row) => (
                <Text noOfLines={1}>hace {getTiempoTranscurrido(row.value)}</Text>
            )
        },
        {
            Header: 'ESTADO',
            accessor: 'estado',
            Cell: (row) => (
                <Badge colorScheme={row.value === 'CANCELADO' ? 'green' : 'red'}>{row.value}</Badge>
            )
        },
        {
            accessor: "_id",
            Cell: (row) => (
                <Stack direction="row" display={'flex'} spacing={0} justifyContent="center">
                    <Link to={{
                        pathname: '/pagos/boleta/' + row.value
                    }}>
                        <IconButton
                            icon={<FiArrowRight fontSize={22} />}
                            variant="ghost"
                            rounded="full"
                            colorScheme="gray"
                            onClick={() => console.log(row.value)}
                        />
                    </Link>
                </Stack>
            ),
            disableSortBy: true,
            disableFilters: true,
            disableGroupBy: true,
        },
    ];

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4}>
                <CardItems
                    total={ reporteVentasPorFechas.length !== 0 ? reporteVentasPorFechasPagos.length : reportesEBR?.pagos}
                    textHeader={'Cantidada de Pagos'}
                    icon={FaUserTie}
                />
                <CardItems
                    total={reporteVentasPorFechas.length !== 0 ? 'Bs/' + reporteVentasPorFechas?.totalVentas : 'Bs/' + 0}
                    textHeader={'Total Recaudado en Bolivianos'}
                    icon={FaUserTie}
                />
            </SimpleGrid>

            {/* Form desde hasta */}

            <Stack
                boxShadow={'base'}
                bg="white"
                _dark={{ bg: "primary.1000" }}
                rounded={'2xl'}
                py={8}
                px={6}
                mt={4}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <Stack spacing={4} direction={'row'}>
                                <Field name="desde">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.desde && form.touched.desde}>
                                            <Input
                                                {...field}
                                                type="date"
                                                size="lg"
                                                value={values.desde}
                                                _focus={{
                                                    borderColor: 'purple.600',
                                                    boxShadow: 'none',
                                                }}
                                                defaultValue={form.touched.desde}
                                            />
                                            <ErrorMessage name="desde" component={Text} color="red.500" fontSize="sm" mt={1} />
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="hasta">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.hasta && form.touched.hasta}>
                                            <Input
                                                {...field}
                                                type={"date"}
                                                size="lg"
                                                value={values.hasta}
                                                _focus={{
                                                    borderColor: 'purple.600',
                                                    boxShadow: 'none',
                                                }}
                                                placeholder="Ingrese su contraseña"
                                            />
                                            <ErrorMessage name="hasta" component={Text} color="red.500" fontSize="sm" mt={1} />
                                        </FormControl>
                                    )}
                                </Field>
                                <Button
                                    colorScheme="purple"
                                    _dark={{
                                        bg: 'purple.600',
                                        color: 'white',
                                        _hover: {
                                            bg: 'purple.700',
                                        },
                                    }}
                                    fontSize="lg"
                                    fontWeight="bold"
                                    w="md"
                                    size="lg"
                                    borderRadius={'xl'}
                                    type="submit"
                                    isLoading={ isLoading ? true : false }
                                    disabled={isSubmitting}
                                    loadingText="Consultando..."
                                    spinnerPlacement="end"
                                >
                                    Consultar
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
                {
                    reporteVentasPorFechasPagos.length === 0 ? null : (
                        <TableComponent data={reporteVentasPorFechasPagos} columns={columns} />
                    )
                }
            </Stack>
        </>
    )

}

export default ReportePagos;