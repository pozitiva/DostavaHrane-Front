import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== productId),
    })), //zadrzavamo sve elemente koji nemaju isti id

  clearCart: () => set((state) => ({ cart: [] })),
}));

export default useCartStore;
