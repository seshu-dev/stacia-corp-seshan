import { configureStore } from "@reduxjs/toolkit"
import  loginReducer  from "../reducer/loginReducer"

const store = configureStore({
    reducer: {
        loginReducer:loginReducer
    }
})
export default store

