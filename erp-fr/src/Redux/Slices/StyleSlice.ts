import { createSlice } from "@reduxjs/toolkit";

type stylePrps = {
    sidebarBgPrimary : string,
    sidebarBgSecondary : string,
    sidebarText : string;
    sidebarTabHoverBg : string;

    rootBg: string;
    submenuBg: string;
    textColor: string,
    hoverBg: string,
    textSizePrim: string,
    textSizeSec: string,
    fontPrimary: string,
    fontSecon: string,
    inputBgColor : string,
    inputBorderColor : string,
    inputTextColor : string,
    inputPlaceholderColor : string,
    inputRounded : number;
    hoverTextColor : string;
    buttonBg : string;
    buttonColor : string;
    buttonHoverBg : string;
    inputBorderColorFull : string;
}

const initialState: stylePrps = {

    sidebarBgPrimary : '#2C3136',
    sidebarBgSecondary : '#1C1F22',
    sidebarText : '#fff',
    sidebarTabHoverBg : '#33383E',

    rootBg: 'bg-[#fff]',
    submenuBg: 'bg-[#f1f5f9]',
    hoverBg: "bg-[#e5e7eb]",
    hoverTextColor : "text-[#000000]",
    textColor: 'text-[#000000]',
    textSizePrim: "text-[20px]",
    textSizeSec: "text[14px]",
    fontPrimary: 'font-[800]',
    fontSecon: 'font-[400]',

    inputBgColor : '#f1f5f9',
    inputBorderColor : '#898989',
    inputBorderColorFull : 'border-[#898989]',
    inputTextColor : '#000',
    inputPlaceholderColor : "#a0a0a0",
    inputRounded : 4,
    
    buttonBg : 'bg-[#3B82F6]',
    buttonColor : 'text-[#fff]',
    buttonHoverBg : `hover:bg-[#2563EB]`
};

const styleSlice = createSlice({
    name: 'styles',
    initialState: initialState,
    reducers: {
        
    }
});

export default styleSlice.reducer;