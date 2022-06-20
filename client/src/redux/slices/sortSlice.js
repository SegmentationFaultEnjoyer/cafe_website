import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  label: '▼ Сортування за популярністю'
}

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setLabel(state, action) {
        state.label = action.payload;
    }
  }
})

export const { setLabel } = sortSlice.actions

export default sortSlice.reducer;