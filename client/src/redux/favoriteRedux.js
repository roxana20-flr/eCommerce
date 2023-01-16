import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
    },
    
    removeFromFavorite(state, action) {
      // console.log("1.state removeFromFavorite")
      // console.log(state)
      // console.log("2.action removeFromFavorite")
      // console.log(action)
      // console.log("state.products removeFromFavorite")
          // console.log(state.products)
      state.products.map((product) => {
        // console.log("3.product.id removeFromFavorite")
        //   console.log(product._id)
        //   console.log("4.action.payload.id removeFromFavorite")
        //   console.log(action.payload._id)
        if (product._id === action.payload._id) {
          const nextProducts = state.products.filter(
            (item) => item._id !== product._id
          );
          // console.log("5. state.products removeFromFavorite")
          // console.log(state.products)

          state.products = nextProducts;
          state.quantity -= 1;

          
        }
        localStorage.setItem("nextProducts", JSON.stringify(state.nextProducts));
        return state;
      });
    },

  },
});

export const { addProduct,addToFav,removeFromFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;