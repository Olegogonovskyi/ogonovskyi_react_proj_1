import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPaginationModel} from "../../Models/IPaginationModel";
import {moviesApiService} from "../../services/movies.api.service";
import {AxiosError} from "axios";

const initialState: IPaginationModel = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

const loadAllMovies = createAsyncThunk(
    'moviesSlice/loadAllMovies',
    async (arg: string, thunkAPI) => {
        try {
            const response = await moviesApiService.getAllMovies(arg)
            return thunkAPI.fulfillWithValue(response)
        } catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response?.data)
        }


    }
)

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(loadAllMovies.fulfilled, (state, action: PayloadAction<IPaginationModel>) => {
            return {...state, ...action.payload};
        })

})

const {reducer: moviesReducer, actions} = moviesSlice

const moviesActions = {
    ...actions,
    loadAllMovies
}

export {moviesActions, moviesReducer}