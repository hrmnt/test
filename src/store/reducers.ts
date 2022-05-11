import { createSlice } from '@reduxjs/toolkit'

interface MineState {
    board: { key: number; value: number; }[][]
}

const initialState: MineState = {
    board: [],
}

export const mineSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        fetchBoard: (state, action) => {
            return {
                board: action.payload
            };
        }
    }
})


export const { fetchBoard } = mineSlice.actions;


export default mineSlice.reducer