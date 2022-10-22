import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constant";

const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const rs = await axios.post(`${apiUrl}/user/login`, data)
            return rs.data
        }
        catch (error) {
            return rejectWithValue(
                error.response.data
            )
        }
    }
)
export const getCart = createAsyncThunk(
    'user/getCart',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/cart/${user.id}`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }
)
export const userState = createSlice({
    name: 'userState',
    initialState: {
        loading: false,
        user: user,
        errorMess: "",
        cart: []
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.errorMess = "";
            localStorage.removeItem('user')
        },
        updateUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        updateUserPart: (state, action) => {
            state.user = {
                ...state.user,
                [action.payload.name]: action.payload.value
            }
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    },

    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload
            state.errorMess = ""
            localStorage.setItem('user', JSON.stringify(action.payload))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.errorMess = action.payload


        })
        builder.addCase(getCart.pending, state => {
            state.loading = true;

        })
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload
            /*    localStorage.setItem('user', JSON.stringify(state.value)) */
        })
        builder.addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.errorMess = action.payload;


        })

    }



})
export const { logout, updateUser,updateUserPart } = userState.actions
export default userState.reducer