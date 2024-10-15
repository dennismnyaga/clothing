/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../getApiUrl";


interface Cart {
  id: number;
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  product: {
    id: number;
    product: {
      id: number;
      name: string;
    };
    color: {
      id: number;
      name: string;
    }
    material: {
      id: number;
      name: string;
    };
    num_of_rolls: number;
    size: number;
    extrasize: number;
    total: number;
    date_stocked: string;
    date_added: string;
  };
  mode_of_payment: string;
  delivered: boolean;
  quantity: number;
  to_be_delivered_to: string;
  no_to_be_delivered: number;
  fully_payed: boolean;
  deposited: number;
  due_date: string;
  date: string
  last_updated: string;
}


interface cartState {
  cart: Cart[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  orderCount: number;
}

const apiUrl = getApiUrl();

const initialState: cartState = {
  cart: [],
  status: "idle",
  error: null,
  orderCount: 0,
};



export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get<Cart[]>(`${apiUrl}/cart/`);
  return response.data;
});



export const deliveredSet = createAsyncThunk(
  "delivered/delivered",
  async ({
    cartId,
    delivered
  }: {
    cartId: number
     delivered: boolean
    
  }) => {
    const response = await axios.put(`${apiUrl}/updatecart/${cartId}/`, {
      delivered
    })
    return response.data
  },
)


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAdded: (state, action: PayloadAction<Cart>) => {
      state.cart.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
        state.orderCount = action.payload.length;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deliveredSet.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(deliveredSet.fulfilled, (state, action) => {
        state.status = "succeeded"
        // state.products.push(action.payload);
        state.cart = state.cart.map((car) => {
          if (car.id === action.payload.id) {
            return action.payload
          } else {
            return car
          }
        })
      })
      .addCase(deliveredSet.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
});

export const selectAllCart = (state: { cart: cartState }) => state.cart.cart;
export const getCartStatus = (state: { cart: cartState }) => state.cart.status;
export const getCartError = (state: { cart: cartState }) => state.cart.error;
export const getOrderCount = (state: { cart: cartState }) => state.cart.orderCount;


export const { cartAdded } = cartSlice.actions;
export default cartSlice.reducer;
