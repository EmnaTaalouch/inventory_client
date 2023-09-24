import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { Wrapper } from './Cart.styles';
import CartItem from '../cartItem/CartItem';
import useAuth from 'src/hooks/useAuth';

const Cart = ({ cartItems, addToCart, removeFromCart }) => {
    const { isAuthenticated } = useAuth();
    const calculateTotal = (products) =>
        products.reduce((acc, product) => acc + product.quantity * product.price, 0);

    const navigate = useNavigate(); // Use useNavigate for programmatic navigation

    const handleProceedToCheckout = () => {
        // Check if the user is logged in
        if (isAuthenticated) {
            // If logged in, navigate to the order page
            navigate('/checkout');
        } else {
            // If not logged in, navigate to the login page
            navigate('/auth/login', { replace: true });
        }
    };
    return (
        <Wrapper>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
            {cartItems.map((product) => (
                <CartItem
                    key={product.productid}
                    product={product}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>Total: {calculateTotal(cartItems).toFixed(2)} dt</h2>

            {/* "Proceed to Checkout" Button */}
            <button
                onClick={handleProceedToCheckout} // Call the function to handle navigation
                style={{
                    backgroundColor: '#70F2F9',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}
            >
                Proceed to Checkout
            </button>
        </Wrapper>
    );
};

export default Cart;
