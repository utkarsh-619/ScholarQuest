import { createSlice } from '@reduxjs/toolkit';


const teacherSlice = createSlice({
  name: 'teacher',
  initialState:{
    teacher: {},
    temp: 0
  },
  reducers: {
    setTeacherData : (state, action) => {
      state.teacherData = action.payload;
    },
    setTemp: (state, action) => {
        state.temp = action.payload;
    },
    clearTeacherData(state) {
      state.teacherData = null;
    },
  },
});

export const { setTeacherData, clearTeacherData } = teacherSlice.actions;

export default teacherSlice.reducer;
