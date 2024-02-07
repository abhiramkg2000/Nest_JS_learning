import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type LoginType = {
  user_name: string;
  access_token: string;
  refresh_token: string;
};

const user_login: LoginType = {
  user_name: "",
  access_token: "",
  refresh_token: "",
};

const postLogin = createAsyncThunk(
  "user/getLogin",
  async ({ user_name, password }: { user_name: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // headers: {
        //   "ngrok-skip-browser-warning": "true",
        // },
        body: JSON.stringify({ user_name, password }),
      });
      const formattedResponse = await response.json();
      // console.log(formattedResponse);
      return formattedResponse;
    } catch (error) {
      console.log("Error");
    }
  }
);

const getAccess = async ({
  user_name,
  password,
  refresh,
}: {
  user_name: string;
  password: string;
  refresh: string;
}) => {
  try {
    const response = await fetch("http://localhost:3000/refresh", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ user_name, password, refresh }),
    });
    const formattedResponse = await response.json();
    // console.log(formattedResponse);
    return formattedResponse;
  } catch (error) {
    console.log("Error");
  }
};

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user_login,
  },
  reducers: {
    clearAccessToken: (state) => {
      state.user_login.access_token = "";
      state.user_login.refresh_token = "";
      state.user_login.user_name = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      //   console.log("pending")
    });
    builder.addCase(postLogin.fulfilled, (state, action) => {
      // console.log("fulfilled", action.payload);
      state.user_login = action.payload;
    });
    builder.addCase(postLogin.rejected, (state) => {
      // console.log("rejected");
    });
  },
});

export { postLogin, getAccess };
export const { clearAccessToken } = loginSlice.actions;
export default loginSlice;
