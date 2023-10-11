
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  searchQuery: string;
}

interface User {
  user_id: string,
  useremail: string;
  
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  searchQuery: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setUser, clearUser,setSearchQuery } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectSearchQuery = (state: RootState) => state.user.searchQuery;

export default userSlice.reducer;
