import { createSlice} from "@reduxjs/toolkit"




const initialState = {
    emailId: "",
    name: "",
    gender: "",
    role: null
}

const loginInfoSlice = createSlice({
    name: "ProfileInfo",
    initialState,
    reducers: {
        emailId: (state, action) => {
            console.log(action.payload,"user")
            state.emailId = (action.payload)
        },
        name: (state, action) => {
            state.name = (action.payload)
        },
        gender: (state, action) => {
            state.gender = (action.payload)
        },
        role: (state, action) => {
            state.role = (action.payload)
        }
    }


})
export default loginInfoSlice.reducer
export const { emailId, name, gender, role } = loginInfoSlice.actions

