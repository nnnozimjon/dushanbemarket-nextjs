import { createSlice } from "@reduxjs/toolkit";
import { decryptToken } from "../../utils";


type UserRole = 'admin' | 'merchant' | 'client';

interface User {
  user_role: UserRole;
  access_token: string;
  id: number;
  phone_number: number;
  email: string;
  fio: string;
}

interface InitialState {
  user: User | null;
  isAuthenticated: boolean;
}

const getInitialState = (): InitialState => {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken) {
      const decryptedToken: any = decryptToken(storedToken);

      try {
        const { id, phone_number, fio, user_role, email } = decryptedToken;
        return {
          user: {
            fio,
            id,
            phone_number,
            access_token: storedToken,
            user_role,
            email,
          },
          isAuthenticated: true,
        };
      } catch (error) {
        console.error("Error parsing decrypted token:", error);
      }
    }
  }

  return {
    user: null,
    isAuthenticated: false,
  };
};

const initialState = getInitialState();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    logout: (state) => {
      if (typeof window !== "undefined") {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("access_token");
      }
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
