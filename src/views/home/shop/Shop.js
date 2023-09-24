import React, { useEffect } from 'react';

import { AddShoppingCart, Search } from '@material-ui/icons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Item from './item/Item';
import Cart from './cart/Cart';
import {
    Badge,
    Drawer,
    Grid,
    LinearProgress,
    IconButton,
    TextField,
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    useTheme,
    useMediaQuery,
} from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/slices/productSlice';
import { addCartToSession, getCartSession } from 'src/utils/sessionStorage';

export const Wrapper = styled.div`
    margin: 40px;
`;

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 100px;
`;

export default function Shop() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [searchQuery, setSearchQuery] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(getCartSession() || []);

    const handleAddToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.productid === clickedItem.productid);

            if (isItemInCart) {
                return prev.map((item) =>
                    item.productid === clickedItem.productid
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }

            return [...prev, { ...clickedItem, quantity: 1 }];
        });
    };

    const handleRemoveFromCart = (id) => {
        setCartItems((prev) =>
            prev.reduce((acc, item) => {
                if (item.productid === id) {
                    if (item.quantity === 1) return acc;

                    return [...acc, { ...item, quantity: item.quantity - 1 }];
                } else {
                    return [...acc, item];
                }
            }, []),
        );
    };

    useEffect(() => {
        console.log(cartItems);
        if (cartItems.length !== 0) addCartToSession(cartItems);
    }, [cartItems]);

    const calculateTotal = (items) =>
        items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    //  if (isLoading) return <LinearProgress />;
    //  if (error) return <div>Something went wrong</div>;

    return (
        <Wrapper>
            <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>

            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cartItems.length} color="error">
                    <AddShoppingCart />
                </Badge>
            </StyledButton>

            <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div style={{ marginBottom: '30px' }}></div>

            <Grid container spacing={3}>
                {loading ? (
                    <LinearProgress />
                ) : error ? (
                    <Typography variant="h6" color="error">
                        Something went wrong
                    </Typography>
                ) : (
                    products
                        .filter(
                            (product) =>
                                product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                product.isAvailable === true, // Filter products with isAvailable true
                        )
                        .map((product) => (
                            <Grid item key={product.productid} xs={12} sm={4}>
                                <Item product={product} handleAddToCart={handleAddToCart} />
                            </Grid>
                        ))
                )}
            </Grid>
        </Wrapper>
    );
}
