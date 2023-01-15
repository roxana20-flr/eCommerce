import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    // addToCart(state, action) {
    //   state.quantity += 1;
    //   state.total += action.payload.price * action.payload.quantity;
    // },

    addToCart(state, action) {
      const existingIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          quantity: state.products[existingIndex].quantity + 1,
        };
        // toast.info("Increased product quantity", {
        //   position: "bottom-left",
        // });
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        state.products.push(tempProductItem);
        // toast.success("Product added to cart", {
        //   position: "bottom-left",
        // });
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    decreaseCart(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;

        // toast.info("Decreased product quantity", {
        //   position: "bottom-left",
        // });
      } else if (state.products[itemIndex].quantity === 1) {
        const nextCartItems = state.products.filter(
          (item) => item.id !== action.payload.id
        );

        state.products = nextCartItems;

        // toast.error("Product removed from cart", {
        //   position: "bottom-left",
        // });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    getTotals(state, action) {
      let { total, quantity } = state.products.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.quantity = quantity;
      state.total = total;
    },

  },
});

export const { addProduct, addToCart, decreaseCart, getTotals } = cartSlice.actions;
export default cartSlice.reducer;