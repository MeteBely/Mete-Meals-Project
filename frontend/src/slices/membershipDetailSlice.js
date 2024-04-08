import { createSlice } from '@reduxjs/toolkit';
const initialState = localStorage.getItem('membershipDetails') ? JSON.parse(localStorage.getItem('membershipDetails')) : { plan: {}, preference: '' };

const membershipDetailSlice = createSlice({
  name: 'membershipDetail',
  initialState,
  reducers: {
    savePreference: (state, action) => {
      state.preference = action.payload;
      localStorage.setItem('membershipDetails', JSON.stringify(state));
    },
    savePlan: (state, action) => {
      state.plan = action.payload;
      localStorage.setItem('membershipDetails', JSON.stringify(state));
    },
    clearMembershipDetails: (state) => {
      state.plan = {};
      state.preference = '';
      localStorage.setItem('membershipDetails', JSON.stringify(state));
    },
  },
});

export const { savePreference, savePlan, clearMembershipDetails } = membershipDetailSlice.actions;

export default membershipDetailSlice.reducer;
