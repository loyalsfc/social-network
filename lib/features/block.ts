import { createSlice } from "@reduxjs/toolkit";

interface BlockList {
    blocks: string[]
}

const initialState: BlockList = {
    blocks: []
}

const blockSlice = createSlice({
    name: "blocks",
    initialState,
    reducers: {
        initBlocks: (state, action) => {
            state.blocks = action.payload
        },
        addBlocks: (state, action) => {
            state.blocks.push(action.payload)
        },
        removeBlocks: (state, action) => {
            state.blocks = state.blocks.filter(item => item != action.payload)
        }
    }
})

export const {initBlocks, addBlocks, removeBlocks} = blockSlice.actions
export default blockSlice.reducer