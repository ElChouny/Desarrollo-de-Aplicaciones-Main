import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, actions) => {
            state.email = actions.payload.email;
            state.idToken = actions.payload.idToken;
            state.localId = actions.payload.localId
        },
        removeUser: (state) => {
            state.email = "";
            state.idToken = "";
            state.localId = "";
        },
        deleteUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;