"use client";

import { createContext, ReactNode, useContext, useState } from 'react';

interface CartContextType {
    selectedCheckout: ICart[];
    setSelectedCheckout: React.Dispatch<React.SetStateAction<ICart[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCheckout, setSelectedCheckout] = useState<ICart[]>([]);
    return (
        <CartContext.Provider value={{ selectedCheckout, setSelectedCheckout }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("Outside using context.");
    }
    return context;
};