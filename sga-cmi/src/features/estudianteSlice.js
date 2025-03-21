import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import estudianteService from "../services/estudiante.service";

const initialState = {
    estudiantes: [],
    estudiante: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const getEstudiantes = createAsyncThunk(
    "estudiantes/get",
    async ({ page, perPage }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const desde = (page - 1) * perPage;
            const hasta = page * perPage;
            return await estudianteService.getAllEstudiantes(token, desde, hasta);
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

export const getEstudiante = createAsyncThunk(
    "estudiante/get",
    async (id, thunkAPI) => {
        try {
            return await estudianteService.getEstudiante(id);
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

export const createEstudiante = createAsyncThunk(
    "estudiante/create",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.createEstudiante(data, token);
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

export const getEstudianteByDni = createAsyncThunk(
    "estudiante/dni/get",
    async (dni, thunkAPI) => {
        try {
            return await estudianteService.getEstudianteByDni(dni);
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

export const getEstudianteSearch = createAsyncThunk(
    "estudiante_ebr/search/get",
    async (search, thunkAPI) => {
        try {
            return await estudianteService.getEstudianteSearch(search);
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

export const updateEstudiante = createAsyncThunk(
    "estudiante/update",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.updateEstudiante(data, token);
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteEstudiante = createAsyncThunk(
    "estudiante/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await estudianteService.deleteEstudiante(id, token);
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

export const estudianteSlice = createSlice({
    name: "estudiantes",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getEstudiantes.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEstudiantes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.estudiantes = action.payload.estudiantes;
            state.totalRows = action.payload.total;
        });
        builder.addCase(getEstudiantes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getEstudiante.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEstudiante.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.estudiante = action.payload;
        });
        builder.addCase(getEstudiante.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(createEstudiante.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createEstudiante.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.estudiantes.push(action.payload);
        });
        builder.addCase(createEstudiante.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(updateEstudiante.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateEstudiante.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.estudiantes = state.estudiantes.map((student) =>
                student._id === action.payload._id ? action.payload : student);
        })
        builder.addCase(updateEstudiante.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        builder.addCase(deleteEstudiante.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(deleteEstudiante.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.estudiantes = state.estudiantes.filter((student) =>
                student._id !== action.payload._id);
        })
        builder.addCase(deleteEstudiante.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const { reset } = estudianteSlice.actions;
export default estudianteSlice.reducer;