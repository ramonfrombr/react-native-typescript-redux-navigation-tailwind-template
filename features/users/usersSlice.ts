import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface UserProps {
  id: string;
  name: string;
}

interface UsersState {
  users: UserProps[];
}

const initialState: UsersState = {
  users: [
    { id: "0", name: "Dude Smith" },
    { id: "1", name: "Fred Smith" },
    { id: "2", name: "John Smith" },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
