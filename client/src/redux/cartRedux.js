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
      // console.log("state prod ")
      // console.log(state)
      // console.log("action prod ")
      // console.log(action)
      state.quantity += 1;
      // console.log("state.quantity prod ")
      // console.log(state.quantity)
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    addToCart(state, action) {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          quantity: state.products[existingIndex].quantity + 1,
        };
      } else {
        let tempProductItem = { ...action.payload, quantity: 1 };
        state.products.push(tempProductItem);
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
    decreaseCart(state, action) {
      // console.log("state")
      // console.log(state)
      // console.log("action")
      // console.log(action)
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      // console.log("state.products")
      // console.log(state.products)
      // console.log("itemIndex")
      //   console.log(itemIndex)

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        // console.log("state.products[itemIndex].quantity")
        // console.log(state.products[itemIndex].quantity)

      } else if (state.products[itemIndex].quantity === 1) {
        const nextCartItems = state.products.filter(
          (item) => item._id !== action.payload._id
        );

        state.products = nextCartItems;

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