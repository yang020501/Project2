import { configureStore } from "@reduxjs/toolkit";
import productModalSlice from "./product-modal/productModalSlice";
import cartItemsSlice from "./shopping-cart/cartItemsSlice";
import loginSlice from "./login-sign_modal/loginSlice";
import signSlice from "./login-sign_modal/signSlice";
import alertMessage from "./alert-message/alertMessage";
import productSlice from "./product/productSlice";
import userState from "./user/userState";
import accessoriesSlice from "./product/accessoriesSlice";
import clothesSlice from "./product/clothesSlice";
import saleSlice from "./product/saleSlice";

export const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cartItems: cartItemsSlice,
        loginModal: loginSlice,
        signModal: signSlice,
        alertMessage: alertMessage,
        productSlice: productSlice,
        userState: userState,
        accessoriesSlice: accessoriesSlice,
        clothesSlice: clothesSlice,
        saleSlice: saleSlice

    },
    devTools: true
})