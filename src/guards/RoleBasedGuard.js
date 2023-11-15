import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import useAuth from '../hooks/useAuth';
// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
    accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
    children: PropTypes.node,
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
    const { user } = useAuth();

    if (!accessibleRoles.includes(user.role)) {
        return (
            <Container
                style={{
                    height: '800px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Alert severity="error">
                    <AlertTitle>Permission Denied</AlertTitle>
                    You do not have permission to access this page
                </Alert>
            </Container>
        );
    }

    return <>{children}</>;
}
