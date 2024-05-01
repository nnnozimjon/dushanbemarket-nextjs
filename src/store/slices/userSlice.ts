import { createSlice } from '@reduxjs/toolkit';
import { decryptToken } from '../../utils';

interface User {
    user_role: string;
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
    // Check if localStorage is available (in the client-side environment)
    if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('access_token');

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
                console.error('Error parsing decrypted token:', error);
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
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            // Save the access token to localStorage (in the client-side environment)
            if (typeof window !== 'undefined') {
                localStorage.setItem('access_token', action.payload.access_token);
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            // Remove the access token from localStorage (in the client-side environment)
            if (typeof window !== 'undefined') {
                localStorage.removeItem('access_token');
            }
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
