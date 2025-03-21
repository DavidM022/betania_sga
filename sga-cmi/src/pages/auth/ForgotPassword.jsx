import { Box, Button, Flex, FormControl, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastChakra } from "../../helpers/toast";
import { useState } from "react";
import bgGradient from '../../assets/img/gradient-bg.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/authSlice";

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        correo: '',
    };

    const validationSchema = Yup.object({
        correo: Yup.string().email('Ingrese un correo válido').required('El correo es requerido'),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRecuperarContraseña = async (values) => {
        setIsSubmitting(true);
        try {
            const data = {
                correo: values.correo,
            }
            const response = await dispatch(forgotPassword(data));
            console.log(response);
            if (response?.payload?.ok === true) {
                navigate(`/reset-password/${response.payload.correo}/${response.payload.emailToken}`);
            } else {
                console.log("error")
                ToastChakra('Mensaje', response?.payload?.msg, 'error', 2500, 'bottom');
            }
        } catch (error) {
            console.error(error);
            ToastChakra('Info', 'Error al enviar el correo de recuperación', 'error', 2500, 'bottom');
        }
        setIsSubmitting(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRecuperarContraseña}
            enableReinitialize={true}
        >
            {() => (
                <Form>
                    <Flex
                        align="center"
                        justify="center"
                        minHeight="100vh"
                        bgImage={bgGradient}
                        bgSize="cover"
                        bgPosition="center"
                        bgRepeat="no-repeat"
                    >
                        <Box
                            bg="white"
                            _dark={{
                                bg: "gray.800",
                                borderWidth: '1px',
                                borderColor: 'gray.700',
                            }}
                            px={8}
                            py={10}
                            rounded="3xl"
                            shadow="lg"
                            maxW="xl"
                            w="full"
                        >
                            <Stack spacing={6}>
                                <Box textAlign="start">
                                    <Heading fontSize="2xl" fontWeight="black">Recuperar Contraseña</Heading>
                                    <Text fontSize="md">Sistema de Gestión Administrativa</Text>
                                </Box>
                                <Field name="correo">
                                    {({ field, form }) => (
                                        <FormControl isInvalid={form.errors.correo && form.touched.correo}>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="Ingrese su correo electrónico"
                                                _focus={{
                                                    borderColor: 'purple.600',
                                                    boxShadow: 'none',
                                                }}
                                            />
                                            <ErrorMessage name="correo" component={Text} color="red.500" fontSize="sm" mt={1} />
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
                                    fontSize="md"
                                    fontWeight="bold"
                                    w="full"
                                    borderRadius="xl"
                                    type="submit"
                                    isLoading={isSubmitting}
                                    disabled={isSubmitting}
                                    loadingText="Enviando..."
                                    spinnerPlacement="end"
                                >
                                    Enviar Correo de Recuperación
                                </Button>
                                <Box textAlign="center">
                                    <Link as={NavLink} to="/login" color="purple.600" fontWeight="bold">Iniciar Sesión</Link>
                                </Box>
                            </Stack>
                        </Box>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default ForgotPasswordPage;
