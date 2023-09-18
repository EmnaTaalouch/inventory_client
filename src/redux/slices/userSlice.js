import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserApi } from '../../actions/userAction';
import { dispatch } from '../store';

//export const userRegister = createAsyncThunk(
//   'user/register',
// async (user) => await UserApi.register(user),
//);
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    try {
        const result = await UserApi.getAllUsers();
        console.log(result);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
});

const initialState = {
    users: [],
    loading: false,
    step: false,
    error: null,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUserList: (state, action) => {
            state.users.push(action.payload);
        },
        addUserList: (state, action) => {
            state.users = action.payload;
        },
        updateUserFromList: (state, action) => {
            state.users = state.users.map((item) =>
                item._id === action.payload._id ? action.payload : item,
            );
        },

        startLoading(state) {
            state.step = true;
        },
        hasError(state, action) {
            state.step = false;
            state.error = action.payload;
        },
        removeUserFromList: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);

            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //      .addCase(userRegister.pending, (state) => (state.loading = true))
            //    .addCase(userRegister.fulfilled, (state) => (state.loading = false))
            //.addCase(fetchUsers.pending, (state) => (state.loading = true))
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            });
        // .addCase(updateCurrentUser, (state, action) => {
        //    state.currentUser = action.payload;
        // });
    },
});

export const { createUserList, updateUserFromList, removeUserFromList, addUserList } =
    userSlice.actions;
export default userSlice.reducer;

// ---------------------------------------------------------------------- thunks

export function removeUserAsync(id) {
    return async () => {
        dispatch(userSlice.actions.startLoading());
        try {
            //remove the order
            await UserApi.deleteUser(id);

            // Dispatch the synchronous action to remove the user from the state
            dispatch(userSlice.actions.removeUserFromList(id));
        } catch (error) {
            dispatch(userSlice.actions.hasError(error.message));
        }
    };
}

export function updateUserAsync(id, updatedUser) {
    return async () => {
        dispatch(userSlice.actions.startLoading());
        try {
            const response = await UserApi.updateUser(id, updatedUser);
            console.log(response);
        } catch (error) {
            dispatch(userSlice.actions.hasError(error));
        }
    };
}
