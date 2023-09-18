import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import { isValidToken, setSession } from '../utils/jwt';
import axiosInstance from '../utils/axios';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;
        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    REGISTER: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
    children: PropTypes.node,
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken');
                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken);

                    const response = await axiosInstance.get('/auth/profile');
                    const user = response.data;

                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    });
                } else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (email, password) => {
        const response = await axiosInstance.post('/auth', {
            email,
            password,
        });
        const { access_token } = response.data;
        console.log(access_token);
        setSession(access_token);
        const res = await axiosInstance.get('/auth/profile');
        const user = res.data;
        dispatch({
            type: 'LOGIN',
            payload: {
                token: access_token,
                isAuthenticated: true,
                user,
            },
        });
    };

    const register = async (email, password, first_name, last_name, address, phone_number) => {
        const response = await axiosInstance.post('/user', {
            email,
            password,
            first_name,
            last_name,
            address,
            phone_number,
        });
        console.log(response.data);
        const { access_token, user } = response.data;

        window.localStorage.setItem('accessToken', access_token);
        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        });
    };

    const logout = async () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };