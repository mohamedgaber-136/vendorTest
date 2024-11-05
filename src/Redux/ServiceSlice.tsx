import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface ChosenService {
  data: any | null;
}

// Initial state with type
const initialState: ChosenService = {
  data: null,
};

const serviceSlice= createSlice({
  name: 'service',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ data: ChosenService }>) => {
      state.data = action.payload.data;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
 
});

// Export actions to be used in components or middleware
const { setData, clearData } = serviceSlice.actions;
export { setData, clearData };

// Export the reducer to be used in the store
export default serviceSlice.reducer;
