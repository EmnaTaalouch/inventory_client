import { combineReducers } from 'redux';

import storage from 'redux-persist/lib/storage';
// slices

import productSlice from './slices/productSlice';
import orderSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';



// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};



const rootReducer = combineReducers({
    cart : cartSlice,
    order : orderSlice,
    user: userSlice,
    product : productSlice,

});

export { rootPersistConfig, rootReducer };