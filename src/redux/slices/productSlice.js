import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { productAction } from '../../actions/productAction';
import { dispatch } from '../store';
import { ProductApi } from '../../actions/productAction';
// Async Thunks
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    try {
        const result = await ProductApi.getAllProducts();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
});

const initialState = {
    products: [],
    selectedProduct: null,
    error: null,
    loading: false,
};

// Slice Creation
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        //synchronous actions
        //Update product

        updateProduct: (state, action) => {
            const index = state.products.findIndex(
                (product) => product.productid === action.payload.productid,
            );
            if (index !== -1) {
                state.products[index] = { ...state.products[index], ...action.payload }; //... This creates a shallow copy of the state so u're not modifying the original state object directly.
            }
            state.loading = false;
        },

        //Add a new product
        createProduct: (state, action) => {
            const newProduct = action.payload;
            state.products.push(newProduct);
            console.log(newProduct);
            state.loading = false;
        },
        setProduct: (state, action) => {
            state.selectedProduct = action.payload;
            state.loading = false;
        },

        //Remove a product
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.productid !== action.payload,
            );
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
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { updateProduct, addProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;

// Thunk Action Creators
export function getProductById(productId) {
    return async () => {
        dispatch(productSlice.actions.startLoading());
        try {
            const response = await ProductApi.getProductById(productId); // Replace with your API call

            dispatch(productSlice.actions.setProduct(response));
        } catch (error) {
            console.log(error);
            dispatch(productSlice.actions.hasError(error));
        }
    };
}

// thunk for reducers

// Thunk Action Creators
export function updateProductAsync(productId, updatedProduct) {
    return async () => {
        dispatch(productSlice.actions.startLoading());
        try {
            //update the product
            const response = await ProductApi.updateProduct(productId, updatedProduct);

            // Dispatch the synchronous action to update the product in the state
            dispatch(productSlice.actions.updateProduct(response));
        } catch (error) {
            dispatch(productSlice.actions.hasError(error));
        }
    };
}

export function addProductAsync(newProduct) {
    return async (dispatch) => {
        try {
            const response = await ProductApi.createProduct(newProduct);
            console.log(response);
            dispatch(productSlice.actions.createProduct(response));
        } catch (error) {
            console.error(error); // Log any errors to the console
            dispatch(productSlice.actions.hasError(error));
        }
    };
}

export function removeProductAsync(productId) {
    return async () => {
        dispatch(productSlice.actions.startLoading());
        try {
            // Remove the product
            await ProductApi.deleteProduct(productId);

            // Dispatch the synchronous action to remove the product from the state
            dispatch(productSlice.actions.removeProduct(productId));
        } catch (error) {
            console.log(error);
            dispatch(productSlice.actions.hasError(error));
        }
    };
}
