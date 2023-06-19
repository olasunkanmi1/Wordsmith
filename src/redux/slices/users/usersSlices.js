import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const config = {
    headers: {
      "Content-Type": "application/json",
    },
};

// ACTIONS

//Register
export const registerUserAction = createAsyncThunk('users/register', 
    async (user, {rejectWithValue, getState, dispatch}) => {  //user is the value that will be passed from onsubmit
        try {
            //http call
            const { data } = await axiosInstance.post(
            '/api/users/register',
            user,
            config
            );
            return data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Login
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
      try {
        //make http call
        const { data } = await axiosInstance.post(
          '/api/users/login',
          userData,
          config
        );
        //save user into local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
);

//Logout
export const logoutAction = createAsyncThunk(
    "/user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
);

//get user from local storage and place into store
const userLoginFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

// slices
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFromStorage,
    },
    extraReducers: (builder) => {
        // register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        // login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });

        //logout
        builder.addCase(logoutAction.pending, (state, action) => {
            state.loading = false;
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
            state.loading = false;
        });
    }
})

export default usersSlices.reducer;