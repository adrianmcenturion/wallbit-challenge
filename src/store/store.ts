import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Product {
  id: number | string;
  title: string;
  price: number;
  image: string;
}

export type CartItem = Product & {
  quantity: number;
  totalPrice: number;
};

type State = {
  cart: CartItem[];
  totalCart: number;
  totalCartItems: number;
  cartDate: Date | null
};

type Actions = {
  addToCart: (product: Product, quantity: number) => void;
  clearCart: () => void;
  getCart: () => State & Actions;
  removeFromCart: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  calculateTotals: () => void;
};

const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: [],
      totalCart: 0,
      totalCartItems: 0,
      cartDate: null,

      addToCart: (product: Product, quantity: number) => {
        set((state) => {
          const existingProduct = state.cart.find((item) => item.id === product.id);
          let updatedCart;

          if(state.cart.length === 0) {
            set(() => ({
              cartDate: new Date()
            }))
          }

          if (existingProduct) {
            updatedCart = state.cart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + quantity,
                    totalPrice: (item.quantity + quantity) * item.price,
                  }
                : item
            );
          } else {
            updatedCart = [
              ...state.cart,
              {
                ...product,
                quantity,
                totalPrice: quantity * product.price,
              },
            ];
          }

          return { cart: updatedCart };
        });

        get().calculateTotals();
      },

      clearCart: () => {
        set(() => ({
          cart: [],
          totalCart: 0,
          totalCartItems: 0,
          cartDate: null
        }));
      },

      getCart: () => get(),

      removeFromCart: (productId: number) => {
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== productId);

          return { cart: updatedCart };
        });
        

        get().calculateTotals();
        get().cart.length === 0 && get().clearCart()
        
      },

      updateProductQuantity: (productId: number, quantity: number) => {
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity,
                  totalPrice: quantity * item.price,
                }
              : item
          );
          return { cart: updatedCart };
        });

        get().calculateTotals();
      },

      calculateTotals: () => {
        const { cart } = get();
        const totalCart = cart.reduce((total, item) => total + item.totalPrice, 0);
        const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

        set(() => ({
          totalCart,
          totalCartItems,
        }));
      },
    }),
    {
      name: 'cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart, totalCart: state.totalCart, totalCartItems: state.totalCartItems, cartDate: state.cartDate }),
      onRehydrateStorage: () => (state) => {
        if (state?.cartDate) {
          state.cartDate = new Date(state.cartDate);
        }
      },
    }
  )
);
  
  export default useStore;
  