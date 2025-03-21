import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import pagoService from "../../../services/pago_ebr.service";

const initialState = {
    pagos: [],
    pago: [],
    pagos_by_student: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const getAllPagos = createAsyncThunk(
    "pagos_ebr/getAll",
    async ({ page, perPage }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const desde = (page - 1) * perPage;
            const hasta = page * perPage;
            return await pagoService.getAllPagos(token, desde, hasta);
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

export const getPago = createAsyncThunk(
    "pago_ebr/get",
    async (id, thunkAPI) => {
        try {
            return await pagoService.getPago(id);
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

export const getPagoByStudent = createAsyncThunk(
    "pago_ebr/get_by_student",
    async ({id, page, perPage }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const desde = (page - 1) * perPage;
            const hasta = page * perPage;
            return await pagoService.getPagoByStudent(id, token, desde, hasta);
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

export const createPago = createAsyncThunk(
    "pago_ebr/create",
    async ( data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await pagoService.createPago(data, token);
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

export const updatePago = createAsyncThunk(
    "pagos_ebr/update",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await pagoService.updatePago(data, token);
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

export const updateEstadoPago = createAsyncThunk(
    "pagos_ebr/updateEstadoPago",
    async (data, thunkAPI ) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await pagoService.updateEstadoPago(data, token);
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

export const deletePago = createAsyncThunk(
    "pago_ebr/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await pagoService.deletePago(id, token);
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

export const pagoSlice = createSlice({
    name: "pagos",
    initialState,
    reducers: {
        reset : () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPagos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPagos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pagos = action.payload.pagos;
                state.totalRows = action.payload.total
            })
            .addCase(getAllPagos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPago.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPago.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pago = action.payload;
            })
            .addCase(getPago.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPagoByStudent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPagoByStudent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pagos_by_student = action.payload.pagos_by_student;
                state.totalRows = action.payload.total_pagos_by_student
            })
            .addCase(getPagoByStudent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createPago.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPago.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pagos.push(action.payload);
            })
            .addCase(createPago.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updatePago.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePago.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pagos = state.pagos.map((pay) => pay._id === action.payload._id ? action.payload : pay);
            })
            .addCase(updatePago.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateEstadoPago.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateEstadoPago.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pagos = state.pagos.map((pay) => pay._id === action.payload._id ? action.payload : pay);
            })
            .addCase(updateEstadoPago.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deletePago.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePago.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.pagos = state.pagos.filter((pay) => 
                    pay._id !== action.payload._id);
            })
            .addCase(deletePago.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = pagoSlice.actions;
export default pagoSlice.reducer;