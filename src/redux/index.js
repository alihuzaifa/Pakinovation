import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    load: false,
};
const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setLoad: state => {
            state.load = !state.load;
        },
    },
});
export const { setLoad } = globalSlice.actions;
export default globalSlice.reducer;