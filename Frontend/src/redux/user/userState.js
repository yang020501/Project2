
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { apiUrl, apiUrlML } from "../../utils/constant";


const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null
const token = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')) : null
const CF = localStorage.getItem('CF') !== null ? JSON.parse(localStorage.getItem('CF')) : []

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
export const getRatings = createAsyncThunk(
    'user/getRatings',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/rate/user-rating/${user.id}`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }
)
export const getCFRecommends = createAsyncThunk(
    'user/getCFRecommends',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrlML}/load-old/CF/${data}`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }
)
export const getWRecommends = createAsyncThunk(
    'user/getWRecommends',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrlML}/begin`)
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
        token: token,
        errorMess: null,
        cart: [],
        CF: CF,
        ratings: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.errorMess = null;
            state.token = null;
            state.CF = [];
            state.ratings= null;
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('CF')
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
        },
        setCF: (state, action) => {
            state.CF = action.payload
 
        },
        setW: (state, action) => {
            state.CF = []
            state.W = action.payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(login.pending, state => {
            state.loading = true;

        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.user = { ...action.payload.user, role: action.payload.role }
            state.token = action.payload.jwt
            state.errorMess = null
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('token', JSON.stringify(action.payload.jwt))
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.errorMess = "Login failed"
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
        })
        builder.addCase(getRatings.pending, state => {
            state.loading = true;

        })
        builder.addCase(getRatings.fulfilled, (state, action) => {
            state.loading = false
            state.ratings = action.payload
 
        })
        builder.addCase(getRatings.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(getCFRecommends.pending, state => {          

        })
        builder.addCase(getCFRecommends.fulfilled, (state, action) => {      
            state.CF = action.payload
            localStorage.setItem('CF', JSON.stringify(action.payload))
        })
        builder.addCase(getCFRecommends.rejected, (state, action) => {
        })
        builder.addCase(getWRecommends.pending, state => {          

        })
        builder.addCase(getWRecommends.fulfilled, (state, action) => {      
            state.CF = action.payload
        })
        builder.addCase(getWRecommends.rejected, (state, action) => {
        })

    }



})
export const { logout, updateUser, updateUserPart, setCF, setW } = userState.actions
export default userState.reducer