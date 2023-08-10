import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "../../services";
import toast from "react-hot-toast";

// --------------- signup ------------------------ //
export const signup = createAsyncThunk(
    "auth/signup",
    async ({name, email, password}, {rejectWithValue}) => {
        try {
           await axiosInstance.post('/register', {
                name: name,
                email: email,
                password: password,
            })
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }

    }
);

// --------------- Login ------------------------ //
export const login = createAsyncThunk(
    "auth/login",
    async ({email, password}, {rejectWithValue}) => {
        try {
            const res = await axiosInstance.put(
                `/login`, {email, password}
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }

    }
);

// --------------- Logout ------------------------ //
export const logout = createAsyncThunk(
    "auth/logout",
    async ({rejectWithValue}) => {
        try {
            const res = await axiosInstance.get(
                `/logout`
            );
            return res.data;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

// --------------- forget password ------------------------ //
export const forgotPassword = createAsyncThunk(
    "auth/forgot-password",
    async ({email},{rejectWithValue}) => {
        try {
          await axiosInstance.put(
                `/forget_password`, {email}
            );
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

// --------------- reset password ------------------------ //
export const resetPassword = createAsyncThunk(
    "auth/reset-password",
    async ({email, password},{rejectWithValue}) => {
        try {
            await axiosInstance.post(
                `/reset_password`, {email, password}
            );
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

// --------------- get user details ------------------------ //
export const getUser = createAsyncThunk(
    "auth/get-user",
    async ({token},{rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(
                `/get_user/${token}`,
            );
            return response.data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);



const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        isLoadingUserDetails: false,
        isAuthenticated: JSON.parse(localStorage.getItem('auth'))?.isAuthenticated || false,
        user: {}
    },
    reducers: {},
    extraReducers: {
        [login.pending]: (state) => {
            state.isLoading = true
        },
        [login.fulfilled]: (state) => {
            state.isLoading = false;
            localStorage.setItem('auth', JSON.stringify({isAuthenticated: true}))
            state.isAuthenticated = true;
        },
        [login.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload?.response?.data?.message ? payload?.response?.data?.message  : "Something went wrong")
        },
        [signup.pending]: (state) => {
            state.isLoading = true
        },
        [signup.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [signup.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload?.response?.data?.message ? payload?.response?.data?.message  : "Something went wrong")
        },
        [logout.pending]: (state) => {
            state.isLoading = true
        },
        [logout.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [logout.rejected]: (state, { payload }) => {
            state.isLoading = false;
            localStorage.setItem('auth', JSON.stringify({isAuthenticated: false}))
            toast.error(payload?.response?.data?.message ? payload?.response?.data?.message  : "Something went wrong")
        },
        [forgotPassword.pending]: (state) => {
            state.isLoading = true
        },
        [forgotPassword.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [forgotPassword.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload?.response?.data?.message ? payload?.response?.data?.message  : "Something went wrong")
        },
        [resetPassword.pending]: (state) => {
            state.isLoading = true
        },
        [resetPassword.fulfilled]: (state) => {
            state.isLoading = false;
        },
        [resetPassword.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload?.response?.data?.message ? payload?.response?.data?.message  : "Something went wrong")
        },
        [getUser.pending]: (state) => {
            state.isLoadingUserDetails = true
        },
        [getUser.fulfilled]: (state, {payload}) => {
            state.isLoadingUserDetails = false;
            state.user = payload
        },
        [getUser.rejected]: (state, { payload }) => {
            state.isLoadingUserDetails = false;
            toast.error(payload?.response?.data?.message ? payload?.response?.data?.message  : "Something went wrong")
        }
    }
})

export default authSlice.reducer;