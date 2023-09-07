import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderAction } from '../../actions/orderAction'; 
import { dispatch } from '../store'; 

// Async Thunks
export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  try {
    const result = await orderAction.getAllOrders(); 
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
});

const initialState = {
  orders: [],
  selectedOrder: null,
  error: null,
  loading: false,
};

// Slice Creation
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    //synchronous actions 
    //Update order 
   
    updateOrder: (state, action) => {
      const { orderId, updatedOrder } = action.payload;
      const index = state.orders.findIndex((order) => order.id === orderId);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedOrder }; //... This creates a shallow copy of the state so u're not modifying the original state object directly.
      }
      state.loading = false;
    },
    

    //Add a new order
    addOrder: (state, action) => {
      const newOrder = action.payload;
      state.orders.push(newOrder);
      state.loading = false;
    },

    //Remove a order
    removeOrder: (state, action) => {
      const orderIdToRemove = action.payload;
      state.orders = state.orders.filter((order) => order.id !== orderIdToRemove);
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
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {updateOrder , addOrder , removeOrder } = orderSlice.actions;

export default orderSlice.reducer;



// Thunk Action Creators
export function getOrderById(orderId) {
    return async () => {
      dispatch(orderSlice.actions.startLoading());
      try {
        const response = await orderAction.getOrderById(orderId); // Replace with your API call
        dispatch(orderSlice.actions.setOrder(response));
      } catch (error) {
        dispatch(orderSlice.actions.hasError(error));
      }
    };
  }
  
  // thunk for reducers 

  // Thunk Action Creators
export function updateOrderAsync(orderId, updatedOrder) {
  return async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      //update the order
      const response = await orderAction.updateOrder(orderId, updatedOrder);

      // Dispatch the synchronous action to update the order in the state
      dispatch(orderSlice.actions.updateOrder(response));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
}

export function addOrderAsync(newOrder) {
  return async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      //add the new order
      const response = await orderAction.addOrder(newOrder);

      // Dispatch the synchronous action to add the new order to the state
      dispatch(orderSlice.actions.addOrder(response));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
}

export function removeOrderAsync(orderId) {
  return async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      //remove the order 
      await orderAction.removeOrder(orderId);

      // Dispatch the synchronous action to remove the order from the state
      dispatch(orderSlice.actions.removeOrder(orderId));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
}

  