import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const productsWithQuantity = response.data.map((product) => ({
    ...product,
    quantity: 20,
  }));
  return productsWithQuantity;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    decrementStock: (state, action) => {
      const { id, amount } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && product.quantity >= amount) {
        product.quantity -= amount;
      }
    },
    adjustStock: (state, action) => {
      const { id, stockChange } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity += stockChange;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { decrementStock, adjustStock } = productSlice.actions;
export default productSlice.reducer;