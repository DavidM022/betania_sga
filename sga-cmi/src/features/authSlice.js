import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

// Get user from local storage

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    codigoRecuperacion: null,
    emailToken: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    ROLE: null,
}

// Register user

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    })

// Login user

export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
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

export const updateProfile = createAsyncThunk(
    "auth/update_profile",
    async (userData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await authService.updateProfile(userData, token);
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

// forgot password

export const forgotPassword = createAsyncThunk(
    "auth/forgot_password",
    async (data, thunkAPI) => {
        try {
            return await authService.forgotPassword(data);
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

// reset password

export const resetPassword = createAsyncThunk(
    "auth/reset_password",
    async (data, thunkAPI) => {
        try {
            return await authService.resetPassword(data);
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

// Logout user

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.ROLE = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.usuario.rol;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.ROLE = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.usuario.rol;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || 'Error en el inicio de sesión';
                state.user = null;
                state.ROLE = null;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.ROLE = action.payload.usuario.rol;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
                state.ROLE = null;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.codigoRecuperacion = action.payload.codigoRecuperacion;
                state.emailToken = action.payload.emailToken;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.codigoRecuperacion = null;
                state.emailToken = null;
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.user = null;
            })
    }

});

export const { reset } = authSlice.actions;
export default authSlice.reducer;