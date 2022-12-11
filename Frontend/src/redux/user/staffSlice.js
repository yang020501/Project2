import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constant";

export const getAllUsers = createAsyncThunk(
    'user/getAllUsers',
    async (data, { rejectWithValue }) => {
        const rs = await axios.get(`${apiUrl}/user/get-all-user`)
        if (rs.status < 200 || rs.status >= 300) {
            return rejectWithValue(rs.data)
        }
        return rs.data
    }

)

export const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        value: []
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.value = action.payload
        })
      
    }
})
export const { } = staffSlice.actions
export default staffSlice.reducer