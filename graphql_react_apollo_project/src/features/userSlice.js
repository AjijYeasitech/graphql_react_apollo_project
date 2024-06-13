import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  async ({ loading, error, data }, { rejectWithValue }) => {
    try {
      return { loading, error, data };
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
        // state.status = action.meta.arg.loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data.createUser.data; // user from backend
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("active.reject", action);
        state.status = "failed";
        state.error = action.payload.error;
      })
      // login user
      .addCase(loginUser.fulfilled, (state, action) => {
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
