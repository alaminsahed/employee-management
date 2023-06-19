import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: any = {
  email: "",
  loading: false,
  error: null,
  isAdmin: false,
  token: "",
  employeeExists: {},
};
const baseUrl = "http://localhost:5000";

export const postLogin: any = createAsyncThunk<any>(
  "postLogin",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/login`, postData);
      const { data } = response;
      // socket?.emit("newUser", data.employeeExists.name);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.employeeExists));
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const loginSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
  extraReducers: {
    [postLogin.pending]: (state, action) => {
      state.loading = true;
    },
    [postLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
      state.isAdmin = action.payload?.employeeExists?.role;
      state.token = action.payload.token;
      state.employeeExists = action.payload.employeeExists;
      state.error = null;
    },
    [postLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { loginUser } = loginSlice.actions;

export default loginSlice.reducer;
