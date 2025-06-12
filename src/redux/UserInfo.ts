import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

const initialState = {
    name:"",
    profileImage: "",
    given_name:"",
    family_name:""
}

export const UserInfo = createSlice({
    name: 'UserInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action) =>{
            state.name = action.payload.name
            state.profileImage = action.payload.profileImage
            state.given_name = action.payload.given_name
            state.family_name = action.payload.family_name
        },
    }
})

export const {
    setUserInfo,
} = UserInfo.actions

export const getUserInfo = (state: RootState) => state.userInfo

export default UserInfo.reducer