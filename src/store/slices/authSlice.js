import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Load logged-in user from localStorage
const storedUser = localStorage.getItem("userInfo");
const userFromStorage =
  storedUser && storedUser !== "undefined"
    ? JSON.parse(storedUser)
    : null;

// Initial state
const initialState = {
  user: userFromStorage,
  loading: false,
  error: null,
  otpSent: false, // track OTP step
};

// 1️⃣ Step 1: Register → OTP send
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register`,
        userData
      );

      // Backend OTP send
      if (!response.data.success) {
        return rejectWithValue({ message: response.data.message });
      }

      return response.data.message; // 'Otp send successfully'
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Registration failed" });
    }
  }
);

// 2️⃣ Step 2: Verify Email → Final user creation
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (reqValue, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/register-verify-email`,
        reqValue
      );

      if (!response.data.success) {
        return rejectWithValue({ message: response.data.message });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "OTP verification failed" });
    }
  }
);

// 3️⃣ Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/users/login`,
        userData
      );

      const resData = response.data;
      if (!resData.success) {
        return rejectWithValue({ message: resData.message });
      }

      const user = resData.data.user;
      const token = resData.data.token;

      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("userToken", token);

      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  }
);

// 4️⃣ Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userToken");
  return null;
});

//Reset Password request
export const resetPasswordRequest = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/forget-pass`, userData)
      if (!response.data.success) {
        return rejectWithValue({ message: response.data.message })
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "forget password request send failed" })
    }
  })

//verify email for reset pass
export const verifyResetPassEmail = createAsyncThunk(
  "auth/verifyResetPassEmail",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/forget-pass-verify`, userData)
      if (!response.data.success) {
        return rejectWithValue({ message: response.data.message })
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "forget pass mail verification failed" })
    }
  })

//reset password
export const resetPassword = createAsyncThunk(
  "auth/resetPass",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/users/reset-pass`, userData)
      if (!response.data.success) {
        return rejectWithValue({ message: response.data.message })
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'password reset failed' })
    }
  }
)

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      });

    // VERIFY EMAIL
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "OTP verification failed";
      });

    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });

    // LOGOUT
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });

    //ForgePassRequest
    builder
      .addCase(resetPasswordRequest.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    //Verify reset password mail
    builder
      .addCase(verifyResetPassEmail.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyResetPassEmail.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(verifyResetPassEmail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    //Reset password
    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
});

export default authSlice.reducer;
