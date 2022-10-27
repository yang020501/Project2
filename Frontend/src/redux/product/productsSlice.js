import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";


export const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/product`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)
export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.value = action.payload
        })
      
    }


})
export default productsSlice.reducer