import {
    AppBar,
    Typography,
    Link as MuiLink,
    Box,
    Toolbar,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Drawer,
} from '@mui/material';
import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from 'src/assets/styles/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import ArtEase from '../assets/images/logos/ArtEase.png';

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
const links = [
    { id: 1, route: 'Shop', url: '/shop' },
    { id: 2, route: 'About', url: '#about' },
];

const Header = (props) => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {links.map((link) => (
                    <ListItem button key={link.id}>
                        <ListItemText primary={link.route} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    return (
        <Box sx={{ marginBottom: '70px' }}>
            <ElevationScroll {...props}>
                <AppBar>
                    <Toolbar className={classes.toolBar}>
                        <Toolbar className={classes.toolBar}>
                            <a href="/" underline="none">
                                <img
                                    src={ArtEase}
                                    alt="ArtEase"
                                    style={{ width: '200px', height: 'auto' }}
                                />
                            </a>
                        </Toolbar>

                        {matches ? (
                            <Box>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={toggleDrawer('right', true)}
                                >
                                    <MenuIcon className={classes.menuIcon} fontSize="" />
                                </IconButton>

                                <Drawer
                                    anchor="right"
                                    open={state['right']}
                                    onClose={toggleDrawer('right', false)}
                                >
                                    {list('right')}
                                </Drawer>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexGrow: '0.1',
                                }}
                            >
                                <a href={'/shop'}>
                                    <Typography className={classes.link}>Shop</Typography>
                                </a>
                                <a href={'/About'}>
                                    <Typography className={classes.link}>About</Typography>
                                </a>
                                {isAuthenticated ? (
                                    <Typography
                                        className={classes.link}
                                        onClick={async () => {
                                            await logout();
                                            navigate('/auth/login', { replace: true });
                                        }}
                                    >
                                        LogOut
                                    </Typography>
                                ) : (
                                    <Typography
                                        component={Link}
                                        to="/auth/login"
                                        className={classes.link}
                                    >
                                        Login
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </Box>
    );
};

export default Header;
