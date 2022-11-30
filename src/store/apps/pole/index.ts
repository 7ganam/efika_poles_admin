// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

// ** Fetch Poles
export const fetchData = createAsyncThunk('appPole/fetchData', async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/poles`)
  console.log('response', response)

  return response.data
})

export const appPoleSlice = createSlice({
  name: 'appPole',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
    })
  }
})

export default appPoleSlice.reducer
