import { Box, Button, Flex, FormControl, Heading, IconButton, Input, InputGroup, InputRightElement, Link, Stack, Text } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastChakra } from "../../helpers/toast";
import { login, reset } from "../../features/authSlice";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import bgGradient from '../../assets/img/gradient-bg.svg';

const Login = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        correo: '',
        password: '',
        modalidad: '',
    };

    const validationSchema = Yup.object({
        correo: Yup.string().email('Ingrese un correo válido').required('El correo es requerido'),
        password: Yup.string().required('La contraseña es requerida'),
    });

    const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {

        if (isError) {
            ToastChakra('Mensaje', message, 'error', 2500, 'bottom');
        }

        dispatch(reset());

    }, [dispatch, isSuccess, isError, message, navigate]);

    const handleLogin = (values, { setSubmitting }) => {
        const userData = {
            correo: values.correo,
            password: values.password
        };
        dispatch(login(userData));
        setSubmitting(false);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            enableReinitialize={true}
        >
            {({ isSubmitting, values, handleChange }) => (
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
                            px={6}
                            py={14}
                            rounded="3xl"
                            shadow="lg"
                            maxW="xl"
                            w="full"
                        >
                            <Stack spacing={6}>
                                <Box textAlign="start">
                                    <Heading fontSize={'2xl'} fontWeight="black">Log in</Heading>
                                    <Text fontSize={'md'}>
                                        Sistema De Gestion Administrativa{" "}
                                        <Link as={NavLink} to={'/register'} fontWeight={'semibold'} color="primary.600" textDecoration="none">
                                            SGA
                                        </Link>
                                    </Text>
                                </Box>
                                <Stack spacing={4}>
                                    <Field name="correo">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.correo && form.touched.correo}>
                                                <Input
                                                    {...field}
                                                    type="email"
                                                    placeholder="Ingrese su correo"
                                                    value={values.correo}
                                                    _focus={{
                                                        borderColor: 'primary.600',
                                                        boxShadow: 'none',
                                                    }}
                                                    defaultValue={form.touched.correo}
                                                />
                                                <ErrorMessage name="correo" component={Text} color="red.500" fontSize="sm" mt={1} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="password">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                                <InputGroup>
                                                    <Input
                                                        {...field}
                                                        type={showPassword ? "text" : "password"}
                                                        value={values.password}
                                                        _focus={{
                                                            borderColor: 'primary.600',
                                                            boxShadow: 'none',
                                                        }}
                                                        placeholder="Ingrese su contraseña"
                                                    />
                                                    <InputRightElement w={'3.5rem'}>
                                                        <IconButton
                                                            h="1.75rem"
                                                            alignSelf={'center'}
                                                            color={'white'}
                                                            bg="primary.600"
                                                            _hover={{ bg: 'primary.700' }}
                                                            onClick={handleShowClick}
                                                            icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <ErrorMessage name="password" component={Text} color="red.500" fontSize="sm" mt={1} />
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Button
                                    colorScheme="primary"
                                    _dark={{
                                        bg: 'primary.600',
                                        color: 'white',
                                        _hover: {
                                            bg: 'primary.700',
                                        },
                                    }}
                                    fontSize="md"
                                    fontWeight="bold"
                                    w="full"
                                    borderRadius={'xl'}
                                    type="submit"
                                    isLoading={isLoading ? true : false}
                                    disabled={isSubmitting}
                                    loadingText="Ingresando..."
                                    spinnerPlacement="end"
                                >
                                    Iniciar sesión
                                </Button>
                                <Stack direction="row" justify="center" fontSize="md">
                                    <Link as={NavLink} to={'/forgot-password'} fontWeight={'semibold'} color="primary.600" textDecoration="none" textAlign={'center'}>
                                        Olvidé mi contraseña
                                    </Link>
                                </Stack>
                            </Stack>
                        </Box>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
};

export default Login;


