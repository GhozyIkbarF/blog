import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  userEmail: string;
  userId: number;
  username: string;
  // photoProfile: string;
}

interface StateSlice {
  userData: UserData | null;
  isLogin: boolean;
  accessToken: string;
}

const initialState: StateSlice = {
  userData: null,
  isLogin: false,
  accessToken: "",
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
});

export const { setUserData, setIsLogin } = stateSlice.actions;

export default stateSlice.reducer;
