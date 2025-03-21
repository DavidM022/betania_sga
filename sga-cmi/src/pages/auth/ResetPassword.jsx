import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, HStack, Heading, IconButton, Input, InputGroup, InputRightElement, Link, PinInput, PinInputField, Stack, Text } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import bgGradient from '../../assets/img/gradient-bg.svg';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/authSlice";
import { ToastChakra } from "../../helpers/toast";

const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email } = useParams();

    const initialValues = {
        code: '',
        correo: '',
        newPassword: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object({
        code: Yup.string().required('El código es requerido').min(6, 'El código debe tener 6 caracteres'),
        newPassword: Yup.string().required('La nueva contraseña es requerida'),
        confirmPassword: Yup.string()
            .required('Confirma la contraseña')
            .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas deben coincidir'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const data = {
                codigoRecuperacion: values.code,
                correo: email,
                newPassword: values.newPassword,
            }
            const response = await dispatch(resetPassword(data));
            if (response?.payload?.ok === true) {
                navigate('/login');
            } else {
                ToastChakra('CONTRASEÑA NO CAMBIADA', response?.payload?.msg, 'error', 2500, 'bottom');
            }

        } catch (error) {
            console.error(error);
        }
        setSubmitting(false);
    };

    const [showPassword1, setShowPassword1] = useState(false);
    const handleShowClick1 = () => setShowPassword1(!showPassword1);

    const [showPassword2, setShowPassword2] = useState(false);
    const handleShowClick2 = () => setShowPassword2(!showPassword2);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
        >
            {({ isSubmitting, values }) => (
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
                            py={10}
                            rounded="3xl"
                            shadow="lg"
                            maxW="xl"
                            w="full"
                        >
                            <Stack spacing={6}>
                                <Box textAlign="start">
                                    <Heading fontSize={'2xl'} fontWeight="black">Reset Password</Heading>
                                    <Text fontSize={'md'}>
                                        Sistema De Gestion Administrativa{" "}
                                    </Text>
                                </Box>
                                <Stack spacing={3}>
                                    <FormControl isReadOnly>
                                        <FormLabel>Correo</FormLabel>
                                        <Input
                                            type="email"
                                            value={email}
                                            _focus={{
                                                borderColor: 'purple.600',
                                                boxShadow: 'none',
                                            }}
                                        />
                                        <ErrorMessage name="correo" component={Text} color="red.500" fontSize="sm" mt={1} />
                                    </FormControl>
                                    <Field name="code">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.code && form.touched.code}>
                                                <FormLabel>Código de verificación</FormLabel>
                                                <HStack spacing={2} justifyContent="space-between" w="full">
                                                    <PinInput
                                                        {...field}
                                                        type="alphanumeric"
                                                        size={'lg'}
                                                        colorScheme="purple"
                                                        _focus={{
                                                            borderColor: 'purple.600',
                                                            boxShadow: 'none',
                                                        }}
                                                        focusBorderColor="purple.500"
                                                        onChange={(e) => form.setFieldValue("code", e.toUpperCase())}
                                                    >
                                                        <PinInputField textTransform="uppercase" />
                                                        <PinInputField textTransform="uppercase" />
                                                        <PinInputField textTransform="uppercase" />
                                                        <PinInputField textTransform="uppercase" />
                                                        <PinInputField textTransform="uppercase" />
                                                        <PinInputField textTransform="uppercase" />
                                                    </PinInput>
                                                </HStack>
                                                <ErrorMessage name="code" component={FormErrorMessage} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="newPassword">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.newPassword && form.touched.newPassword}>
                                                <InputGroup>
                                                    <Input
                                                        {...field}
                                                        type={showPassword1 ? "text" : "password"}
                                                        value={values.newPassword}
                                                        _focus={{
                                                            borderColor: 'purple.600',
                                                            boxShadow: 'none',
                                                        }}
                                                        placeholder="Nueva Contraseña"
                                                    />
                                                    <InputRightElement w={'3.5rem'}>
                                                        <IconButton
                                                            h="1.75rem"
                                                            alignSelf={'center'}
                                                            color={'white'}
                                                            bg="purple.600"
                                                            _hover={{ bg: 'purple.700' }}
                                                            onClick={handleShowClick1}
                                                            icon={showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <ErrorMessage name="newPassword" component={FormErrorMessage} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Field name="confirmPassword">
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                                <InputGroup>
                                                    <Input
                                                        {...field}
                                                        type={showPassword2 ? "text" : "password"}
                                                        value={values.confirmPassword}
                                                        _focus={{
                                                            borderColor: 'purple.600',
                                                            boxShadow: 'none',
                                                        }}
                                                        placeholder="Confirmar Contraseña"
                                                    />
                                                    <InputRightElement w={'3.5rem'}>
                                                        <IconButton
                                                            h="1.75rem"
                                                            alignSelf={'center'}
                                                            color={'white'}
                                                            bg="purple.600"
                                                            _hover={{ bg: 'purple.700' }}
                                                            onClick={handleShowClick2}
                                                            icon={showPassword2 ? <ViewIcon /> : <ViewOffIcon />}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <ErrorMessage name="confirmPassword" component={FormErrorMessage} />
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
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
                                    borderRadius={'xl'}
                                    type="submit"
                                    isLoading={isSubmitting ? true : false}
                                    disabled={isSubmitting}
                                    loadingText="Modificando su contraseña..."
                                    spinnerPlacement="end"
                                >
                                    Cambiar Contraseña
                                </Button>
                                <Stack direction="row" justify="center" fontSize="md">
                                    <Link as={NavLink} to={'/forgot-password'} fontWeight={'semibold'} color="purple.600" textDecoration="none" textAlign={'center'}>
                                        ¿No ha recibido el código?
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

export default ResetPasswordPage;