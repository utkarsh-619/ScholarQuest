// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         user: {},
//         temp: 0
//     },
//     reducers: {
//         setUser: (state, action) => {
//             state.user = action.payload;
//         },
//         setTemp: (state, action) => {
//             state.temp = action.payload;
//         }
//     },
// });

// export const { setUser, setTemp } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    temp: 0
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setTemp: (state, action) => {
            state.temp = action.payload;
        },
        logoutUser: () => initialState // Reset state on logout
    },
});

export const { setUser, setTemp, logoutUser } = userSlice.actions;
export default userSlice.reducer;
