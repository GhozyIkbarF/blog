import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  author: { name: string, username: string; email: string, photo_profile: string };
  username: string;
  authorId: number;
  category: string;
  content: string;
  createdAt: string;
  id: number;
  image: string;
  published: boolean;
  title: string;
  updatedAt: string;
}

interface UserData {
  name: string;
  userEmail: string;
  userId: number;
  username: string;
  photoProfile: string;
}

interface StateSlice {
  utils: any;
  userData: UserData | null;
  isLogin: boolean;
  accessToken: string;
  posts: Post[];
  editPost: []
}

const initialState: StateSlice = {
  utils: null,
  userData: null,
  isLogin: false,
  accessToken: "",
  posts: [],
  editPost: [],
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
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setEditPost: (state, action) => {
      state.editPost = action.payload;
    }
  },
});

export const { setUserData, setIsLogin, setAccessToken, setPosts, setEditPost } = stateSlice.actions;

export default stateSlice.reducer;
