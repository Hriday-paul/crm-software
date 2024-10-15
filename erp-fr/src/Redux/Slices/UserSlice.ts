import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userType = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    id : number | null,
    isAuthonicated: boolean,
    isVerified: boolean,
    local : string,
    isAdmin : boolean,
}

const initState: userType = {
    fullName: '',
    userName: '',
    email: '',
    phone: '',
    id : null,
    isAuthonicated: false,
    isVerified: false,
    local : 'zh-cn',
    isAdmin : false
}

type addUserDetailsPayload = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    id : number
}

type updateVerified = {
    fullName: string,
    userName: string,
    email: string,
    phone: string,
    id : number,
    isVerified: boolean,
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        addUserDetails: (state, { payload }: PayloadAction<addUserDetailsPayload>) => {
            state.fullName = payload.fullName;
            state.userName = payload.userName;
            state.email = payload.email;
            state.phone = payload.phone;
            state.id = payload.id;
        },
        updateUserVerified: (state, { payload }: PayloadAction<updateVerified>) => {
            state.fullName = payload.fullName;
            state.userName = payload.userName;
            state.email = payload.email;
            state.phone = payload.phone;
            state.id = payload.id
            state.isAuthonicated = true;
            state.isVerified = payload.isVerified;
        },
        resetUser : (state)=>{
            state.fullName = '';
            state.userName = '';
            state.email = "";
            state.phone = "";
            state.id = null
            state.isAuthonicated = false;
            state.isVerified = false;
            state.isAdmin = false
        },
        editLocal : (state, { payload }: PayloadAction<{local : string}>)=>{
            state.local = payload?.local;
        },
        updateAdminVerified: (state, { payload }: PayloadAction<updateVerified>) => {
            state.fullName = payload.fullName;
            state.userName = payload.userName;
            state.email = payload.email;
            state.phone = payload.phone;
            state.id = payload.id
            state.isAuthonicated = true;
            state.isVerified = payload.isVerified;
            state.isAdmin = true;
        },
    }
});

export const { addUserDetails, updateUserVerified, resetUser, editLocal, updateAdminVerified } = UserSlice.actions
export default UserSlice.reducer;

