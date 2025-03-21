import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sendEmailService from "../services/sendEmail.service";

const initialState = {
    emailsEnviados: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    currentPage: 1,
    totalRows: 0,
};

export const handleSendEmail = createAsyncThunk(
    "sendEmail/send",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await sendEmailService.sendEmail(data, token);
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

export const sendEmailSlice = createSlice({
    name: "sendEmail",
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(handleSendEmail.pending, (state) => {
            state.isLoading = false;
        })
        builder.addCase(handleSendEmail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.emailsEnviados.push(action.payload);
        })
        builder.addCase(handleSendEmail.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
});

export const { reset } = sendEmailSlice.actions;

export default sendEmailSlice.reducer;
