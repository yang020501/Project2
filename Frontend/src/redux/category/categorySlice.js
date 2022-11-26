import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { apiUrl } from "../../utils/constant";


export const getAllCategory = createAsyncThunk(
    'category/getAllCategory',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/category/getAll`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)
export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
            state.value = action.payload
        })
      
    }
})
export default categorySlice.reducer