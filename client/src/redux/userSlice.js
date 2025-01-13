import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        temp: 0
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTemp: (state, action) => {
            state.temp = action.payload;
        }
    },
});

export const { setUser, setTemp } = userSlice.actions;
export default userSlice.reducer;