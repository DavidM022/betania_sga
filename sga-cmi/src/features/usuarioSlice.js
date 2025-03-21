import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usuarioService from "../services/usuario.service";

const initialState = {
    usuarios: [],
    usuario: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const getAllUsuarios = createAsyncThunk(
    "usuarios/getAll",
    async ({ page, perPage }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const desde = (page - 1) * perPage;
            const hasta = page * perPage;
            return await usuarioService.getAllUsuarios(token, desde, hasta);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getUsuario = createAsyncThunk(
    "usuarios/getUsuario",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await usuarioService.getUser(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createUsuario = createAsyncThunk(
    "usuario/create",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await usuarioService.createUser(data, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateUsuario = createAsyncThunk(
    "usuario/update",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await usuarioService.updateUser(data, token);
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteUsuario = createAsyncThunk(
    "usuario/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await usuarioService.deleteUser(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const usuarioSlice = createSlice({
    name: "usuarios",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsuarios.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllUsuarios.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.usuarios = action.payload.usuarios;
            state.totalRows = action.payload.total
        });
        builder.addCase(getAllUsuarios.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getUsuario.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsuario.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.usuario = action.payload;
        });
        builder.addCase(getUsuario.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(createUsuario.pending, (state) => {
            state.isLoading = false;
        })
        builder.addCase(createUsuario.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.usuarios.push(action.payload);
        })
        builder.addCase(createUsuario.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(updateUsuario.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateUsuario.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.usuarios = state.usuarios.map((data) =>
                data._id === action.payload._id ? action.payload : data);
        })
        builder.addCase(updateUsuario.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(deleteUsuario.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteUsuario.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.usuarios = state.usuarios.filter((usuario) =>
                usuario._id !== action.payload._id);
        })
        builder.addCase(deleteUsuario.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = usuarioSlice.actions;

export default usuarioSlice.reducer;
