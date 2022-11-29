import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constant";

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/order/`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        },
        remove: (state) => {
            state.value = null
        }
    }
})
export const { set, remove } = orderSlice.actions
export default orderSlice.reducer