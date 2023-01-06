import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { auth } from "../../firebase";

export interface UserProps {
  id: string;
  name: string;
}

interface UsersState {
  users: UserProps[];
}

const initialState: UsersState = {
  users: [{ id: auth.currentUser?.uid!, name: auth.currentUser?.displayName! }],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
