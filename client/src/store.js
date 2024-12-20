import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useStore = create((set) => ({
  // User Authentication State
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),

  // Cart State
  cart: [], // Array to hold book IDs
  addToCart: (bookId) =>
    set((state) => ({
      cart: state.cart.some((id) => id === bookId)
        ? state.cart // Avoid duplicates
        : [...state.cart, bookId],
    })),
  removeFromCart: (bookId) =>
    set((state) => ({
      cart: state.cart.filter((id) => id !== bookId),
    })),
  clearCart: () => set({ cart: [] }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useStore);
}

export default useStore;
