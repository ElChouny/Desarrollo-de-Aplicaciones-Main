import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: {
            email: null,
            idToken: null,
            localId: "",
            profilePicture: "",
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        clearUser: (state) => {
            state.value = {
                email: null,
                idToken: null,
                localId: "",
                profilePicture: "",
            }
        },
        setProfilePicture: (state, action) => {
            state.value.profilePicture = action.payload
        },
    },
})

export const { setUser, clearUser, setProfilePicture } = userSlice.actions
export default userSlice.reducer

