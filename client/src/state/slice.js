import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsLoggedIn: (state,action)=>{
            state.isLoggedIn = action.payload;
        }
    }
})

export const { setIsLoggedIn } = appSlice.actions;
export default appSlice.reducer;