import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
    user_name: string,
    isAuthonicated: boolean,
    isVerified: boolean,
    local : string,
    role : 'admin' | 'user',
}

const initState: userType = {
    user_name: '',
    isAuthonicated: false,
    isVerified: false,
    local : 'zh-cn',
    role : 'user'
}

type addUserDetailsPayload = {
    user_name: string,
    role : 'admin' | 'user'
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        addUserDetails: (state, { payload }: PayloadAction<addUserDetailsPayload>) => {
            state.user_name = payload.user_name;
            state.isVerified = true;
            state.isAuthonicated = (payload.user_name && payload.role) ? true : false;
            state.role = payload.role;
        },
        
        resetUser : (state)=>{
            state.user_name = '';
            state.isAuthonicated = false;
            state.isVerified = false;
            state.role = 'user'
        },
        editLocal : (state, { payload }: PayloadAction<{local : string}>)=>{
            state.local = payload?.local;
        },
        
    }
});

export const { addUserDetails, resetUser, editLocal, } = UserSlice.actions
export default UserSlice.reducer;

