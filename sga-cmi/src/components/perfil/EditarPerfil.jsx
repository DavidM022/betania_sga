import { Box, Button, Card, FormControl, FormLabel, Input, Icon, InputGroup, InputRightElement, Stack, Avatar, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastChakra } from '../../helpers/toast';
import { getUsuario } from '../../features/usuarioSlice';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { updateProfile, reset } from '../../features/authSlice';
import { Loading } from '../../helpers/Loading';

const EditarPerfil = ({ userData }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { isLoading, isError, message } = useSelector((state) => state.usuarios);

    const initialValues = {
        _id: null,
        nombre: '',
        correo: '',
        brand_color: '',
        password: '',
        modalidad: '',
        img: '',
    }

    const [indice, setIndice] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (!user) {
            navigate("/login");
        }

        dispatch(getUsuario(userData.id)).then((res) => {
            setIndice({
                _id: res.payload._id,
                nombre: res.payload.nombre,
                correo: res.payload.correo,
                password: res.payload.password,
                brand_color: res.payload.brand_color,
                modalidad: user?.usuario?.modalidad,
                img: res.payload.img,
            })
        });

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch, userData.id]);
    
    if(isError) {
        ToastChakra('Error', message, 'error', 1500);
        console.log(message);
    }

    const handleUpdate = () => {
        setLoading(true);
        dispatch(updateProfile(indice)).then(() => {
            navigate("/perfil");
            setLoading(false);
        });
        setIndice(initialValues);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <Box w="full" h="full">
            <Stack direction="column" spacing={4} justifyContent="stretch">
                <Stack direction={"row"} spacing={4} justifyContent="center" minW={"420px"}>
                    <Avatar
                        rounded={'full'}
                        size={'2xl'}
                        color="white"
                        alignSelf="center"
                        name={indice?.nombre}
                        src={indice?.img} 
                        border={'1px'}
                        borderColor="gray.200"
                        // fallbackSrc='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                    />

                    <Input
                        alignSelf={'center'}
                        type="text"
                        placeholder="https://usuario/perfil.png"
                        value={indice?.img}
                        onChange={(e) => setIndice({ ...indice, img: e.target.value })}
                    />
                </Stack>

                <Card w="full" h="full" boxShadow="base" p={8} borderRadius="2xl" _dark={{ bg: "primary.1000" }}>
                    <Stack direction="column" spacing={4} justifyContent="stretch">
                        <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>Nombres</FormLabel>
                                <Input 
                                    type="text" 
                                    placeholder="Nombre"
                                    defaultValue={indice?.nombre}
                                    onChange={(e) => setIndice({ ...indice, nombre: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>Correo Electronico</FormLabel>
                                <Input 
                                    type="email" 
                                    placeholder="Email"
                                    defaultValue={indice?.correo}
                                    onChange={(e) => setIndice({ ...indice, correo: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={["column", "row"]} spacing={4} justifyContent="space-between">
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>Contraseña Nueva</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={ showPassword ? "text" : "password" }
                                        placeholder='Ingrese su contraseña nueva'
                                        autoComplete='off'
                                        value={initialValues.password}
                                        onChange={(e) => setIndice({ ...indice, password: e.target.value })}
                                    />
                                    <InputRightElement width="3rem">
                                    <Button h="1.75rem" color={'white'} bg="messenger.600" _hover={{ bg: 'messenger.700' }} size="sm" onClick={handleShowClick} >
                                        {showPassword ? <Icon as={ViewIcon} /> : <Icon as={ViewOffIcon} />}
                                    </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontWeight={'bold'}>BRAND COLOR</FormLabel>
                                <Input
                                    type="color"
                                    defaultValue={user?.usuario?.brand_color ? user?.usuario?.brand_color : '#000000'}
                                    onChange={(e) => setIndice({ ...indice, brand_color: e.target.value })}
                                />
                            </FormControl>
                        </Stack>
                        <FormControl>
                            <FormLabel>MODALIDAD</FormLabel>
                            <Select
                                placeholder="Seleccione una modalidad"
                                defaultValue={user?.usuario?.modalidad ? user?.usuario?.modalidad : ''}
                                onChange={(e) => setIndice({ ...indice, modalidad: e.target.value })}
                            >
                                <option value="EBR">EBR</option>
                                <option value="CEBA">CEBA</option>
                                <option value="RESIDENCIA">RESIDENCIA</option>
                            </Select>
                        </FormControl>
                        <Stack direction="row" spacing={4} w="full">
                            <Button 
                                colorScheme="purple"
                                borderRadius={'lg'}
                                w="full"
                                _dark={{
                                    bg: 'purple.600',
                                    color: 'whiteAlpha.900',
                                    _hover: {
                                        bg: 'purple.700',
                                    },
                                }}
                                onClick={handleUpdate}
                                isLoading={loading ? true : false}
                                loadingText='Actualizando sus datos...'
                                isDisabled={indice.modalidad === ''}
                            >
                                Guardar Cambios
                            </Button>
                        </Stack>
                    </Stack>
                </Card>
            </Stack>
        </Box>
    )
}

export default EditarPerfil