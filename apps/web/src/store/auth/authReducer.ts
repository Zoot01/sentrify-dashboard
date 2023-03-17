import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import instance from "config/axios"
import isAxiosError from "services/api/axiosError"
import { LoginAPI, LogoutAPI, RestoreSessionAPI } from "types"

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
  profile_img?: string
}

export interface AuthState {
  user: User | null
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  loading: true,
}

export const restoreSessionThunk = createAsyncThunk(
  "restoreSession",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await instance.get<RestoreSessionAPI.RestoreSessionResponse>(
        "/auth/restoresession",
        {
          withCredentials: true,
        },
      )
      return fulfillWithValue(data)
    } catch (err) {
      if (isAxiosError<string>(err) && err.response) {
        return rejectWithValue(err.response.data)
      }
      return rejectWithValue(err)
    }
  },
)

export const loginThunk = createAsyncThunk(
  "login",
  async (payload: LoginAPI.LoginRequest, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await instance.post<LoginAPI.LoginResponse>("/auth/login", payload)
      return fulfillWithValue(data)
    } catch (err) {
      if (isAxiosError<string>(err) && err.response) {
        return rejectWithValue(err.response.data)
      }
      return rejectWithValue(err)
    }
  },
)

export const logoutThunk = createAsyncThunk(
  "logout",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await instance.get<LogoutAPI.LogoutResponse>("/auth/logout", {
        withCredentials: true,
      })
      return fulfillWithValue(data)
    } catch (err) {
      if (isAxiosError<string>(err) && err.response) {
        return rejectWithValue(err.response.data)
      }
      return rejectWithValue(err)
    }
  },
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      restoreSessionThunk.fulfilled,
      (state, action: PayloadAction<RestoreSessionAPI.RestoreSessionResponse>) => {
        return { ...state, user: action.payload.meta, loading: false }
      },
    )
    builder.addCase(restoreSessionThunk.rejected, (state) => {
      return { ...state, loading: false }
    })
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<LoginAPI.LoginResponse>) => {
        return { ...state, user: action.payload.meta, loading: false }
      },
    )
    builder.addCase(loginThunk.rejected, (state) => {
      return { ...state, loading: false }
    })
    builder.addCase(logoutThunk.fulfilled, (state) => {
      return { ...state, user: null }
    })
  },
})

export default authSlice.reducer
