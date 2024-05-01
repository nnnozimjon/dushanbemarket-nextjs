"use client"
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


// Get initial city value from cookies or set default value

let initialCity = Cookies.get('city');

if (!initialCity) {
    initialCity = 'Душанбе';
    Cookies.set('city', initialCity);
}

const initialState = {
    city: initialCity,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload; // Set the city state to the payload value
            Cookies.set('city', state.city)
        },
    },
});

export const { setCity } = locationSlice.actions;

export const locationReducer = locationSlice.reducer;
