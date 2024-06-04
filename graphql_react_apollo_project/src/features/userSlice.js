import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useQuery, useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../dataFetchQuery/user.query";
import { useEffect } from "react";

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "Ajij Seikh",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

// Api call by using createAsyncThunk & useMutation hook:
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ loading, userError, data }, { rejectWithValue }) => {
    try {
      if (loading == false && data) return data;
      // console.log("loading, userError, data ", loading, userError, data);
    } catch (error) {
      console.log("error");
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ loading, userError, data }, { rejectWithValue }) => {
    try {
      if (loading == false && data) return data;
    } catch (error) {
      console.log(userError);
      return rejectWithValue(error);
    }
  }
);

// userSlice :
export const userSlice = createSlice({
  name: "user", // optional name for debugging
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // for register user
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.createUser.data; // user from backend
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // login user
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("action", action);
        state.status = "succeeded";
        state.user = action.payload.userSignIn; // user from backend
        // state.user.token=action.payload.access_token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // login
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      });
  },
});
export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
