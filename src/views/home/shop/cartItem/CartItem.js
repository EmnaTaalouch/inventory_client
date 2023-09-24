import { Button } from '@material-ui/core';
import { Wrapper } from './CartItem.styles';
import React from 'react';
const CartItem = ({ product, addToCart, removeFromCart }) => {
    return (
        <Wrapper>
            <div>
                <h3>{product.name}</h3>
                <div className="information">
                    <p>Price: {product.price} dt</p>
                    <p>Total: {(product.quantity * product.price).toFixed(2)} dt</p>
                </div>
                <div className="buttons">
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => removeFromCart(product.productid)}
                    >
                        -
                    </Button>
                    <p>{product.quantity}</p>
                    <Button
                        size="small"
                        disableElevation
                        variant="contained"
                        onClick={() => addToCart(product)}
                    >
                        +
                    </Button>
                </div>
            </div>
            <img src={product.image} alt={product.name} />
        </Wrapper>
    );
};

export default CartItem;
