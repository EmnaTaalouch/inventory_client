import PropTypes from 'prop-types';
import React, { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
import Login2 from 'src/views/authentication/Login';
// pages

// ----------------------------------------------------------------------

const AuthGuard = ({ children }) => {
    const { isAuthenticated, isInitialized } = useAuth();
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState(null);

    if (!isInitialized) {
        return <>Loading ....</>;
    }

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login2 />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
};

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default AuthGuard;
