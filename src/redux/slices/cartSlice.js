import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { cartAction } from '../../actions/cartAction'; 
import { dispatch } from '../store'; 

// Async Thunks
export const fetchCarts = createAsyncThunk('cart/fetchCarts', async () => {
  try {
    const result = await cartAction.getAllCarts(); 
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
});

const initialState = {
  carts: [],
  selectedCart: null,
  error: null,
  loading: false,
};

// Slice Creation
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //synchronous actions 
    //Update cart 
   
    updateCart: (state, action) => {
      const { cartId, updatedCart } = action.payload;
      const index = state.carts.findIndex((cart) => cart.id === cartId);
      if (index !== -1) {
        state.carts[index] = { ...state.carts[index], ...updatedCart }; //... This creates a shallow copy of the state so u're not modifying the original state object directly.
      }
      state.loading = false;
    },
    

    //Add a new cart
    addCart: (state, action) => {
      const newCart = action.payload;
      state.carts.push(newCart);
      state.loading = false;
    },

    //Remove a cart
    removeCart: (state, action) => {
      const cartIdToRemove = action.payload;
      state.carts = state.carts.filter((cart) => cart.id !== cartIdToRemove);
      state.loading = false;
    },

    // START LOADING
    startLoading(state) {
      state.loading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {updateCart , addCart , removeCart } = cartSlice.actions;

export default cartSlice.reducer;



// Thunk Action Creators
export function getCartById(cartId) {
    return async () => {
      dispatch(cartSlice.actions.startLoading());
      try {
        const response = await cartAction.getCartById(cartId); // Replace with your API call
        dispatch(cartSlice.actions.setCart(response));
      } catch (error) {
        dispatch(cartSlice.actions.hasError(error));
      }
    };
  }
  
  // thunk for reducers 

  // Thunk Action Creators
export function updateCartAsync(cartId, updatedCart) {
  return async (dispatch) => {
    dispatch(cartSlice.actions.startLoading());
    try {
      //update the cart
      const response = await cartAction.updateCart(cartId, updatedCart);

      // Dispatch the synchronous action to update the cart in the state
      dispatch(cartSlice.actions.updateCart(response));
    } catch (error) {
      dispatch(cartSlice.actions.hasError(error));
    }
  };
}

export function addCartAsync(newCart) {
  return async (dispatch) => {
    dispatch(cartSlice.actions.startLoading());
    try {
      //add the new cart
      const response = await cartAction.addCart(newCart);

      // Dispatch the synchronous action to add the new cart to the state
      dispatch(cartSlice.actions.addCart(response));
    } catch (error) {
      dispatch(cartSlice.actions.hasError(error));
    }
  };
}

export function removeCartAsync(cartId) {
  return async (dispatch) => {
    dispatch(cartSlice.actions.startLoading());
    try {
      //remove the cart 
      await cartAction.removeCart(cartId);

      // Dispatch the synchronous action to remove the cart from the state
      dispatch(cartSlice.actions.removeCart(cartId));
    } catch (error) {
      dispatch(cartSlice.actions.hasError(error));
    }
  };
}

  