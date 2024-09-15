import { create } from "zustand";

const useKorpaSkladiste = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.uniqueId === product.uniqueId
      );
      if (existingProductIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = { ...product };
        return { cart: updatedCart };
      } else {
        // Add new product
        return { cart: [...state.cart, product] };
      }
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((product) => product.uniqueId !== productId),
    })),

  clearCart: () => set((state) => ({ cart: [] })),
  getTotalQuantity: () =>
    set((state) => ({
      totalQuantity: state.cart.reduce(
        (total, item) => total + item.kolicina,
        0
      ),
    })),
}));

export default useKorpaSkladiste;
