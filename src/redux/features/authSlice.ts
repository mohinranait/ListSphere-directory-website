import { IUser } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type TInitialState = {
    user: IUser | null;
    authenticated: boolean;
}

const initialState  : TInitialState = {
    user: null,
    authenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
            state.authenticated = true;
        }
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;