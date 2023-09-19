import { Badge, Drawer, Grid, LinearProgress } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Item from './item/Item';
import Cart from './cart/Cart';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: 40px;
`;

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 100px;
`;

const getProducts = async () => await (await fetch('https://fakestoreapi.com/products')).json();

export default function Shop() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const { data, isLoading, error } = useQuery('products', getProducts);

    const getTotalItems = (items) => items.reduce((acc, item) => acc + item.amount, 0);

    const handleAddToCart = (clickedItem) => {
        setCartItems((prev) => {
            const isItemInCart = prev.find((item) => item.id === clickedItem.id);

            if (isItemInCart) {
                return prev.map((item) =>
                    item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item,
                );
            }

            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id) => {
        setCartItems((prev) =>
            prev.reduce((acc, item) => {
                if (item.id === id) {
                    if (item.amount === 1) return acc;
                    return [...acc, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...acc, item];
                }
            }, []),
        );
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong</div>;

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
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCart />
                </Badge>
            </StyledButton>

            <Grid container spacing={3}>
                {data?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}
