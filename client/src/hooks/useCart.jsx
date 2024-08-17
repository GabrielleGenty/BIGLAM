// import { useContext } from "react";
// import  { Context } from "../store/cart/Context";

// //dans ce hook, on récupère le context et on le retourne
// export const useCart = () => useContext(Context);

import { useContext } from "react";
import { Context } from "../store/cart/Context";  // Assurez-vous que le chemin est correct

export function useCart() {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
