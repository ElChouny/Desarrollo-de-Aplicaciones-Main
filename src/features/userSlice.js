import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
    name: "shop",
    initialState: {
        email: "",
        idToken: "",
    },
    reducers: {
        setUser: (state, actions) => {
            state.email = actions.payload.email
            state.idToken = actions.payload.idToken
        }
    }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer