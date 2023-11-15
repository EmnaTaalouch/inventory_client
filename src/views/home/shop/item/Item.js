import React from 'react';
import { Link } from 'react-router-dom';
import { CardContent, Typography, Grid, Rating, Tooltip, Fab } from '@mui/material';
import img1 from 'src/assets/images/products/s4.jpg';

import { IconBasket } from '@tabler/icons';
import BlankCard from 'src/components/shared/BlankCard';
const Item = ({ product, handleAddToCart }) => {
    return (
        <Grid container spacing={1}>
            <Grid product sm={4} md={20} lg={17}>
                <BlankCard style={{ width: '80%', height: '50%', padding: '20px' }}>
                    <Typography component={Link} to="/">
                        <img
                            src={`http://localhost:5000/products/product_image/${product.image}`}
                            alt={product.name}
                            style={{
                                maxWidth: '100%',
                                width: '100%', // Add this line
                                height: '300px', // Adjust the height as per your preference
                                objectFit: 'cover', // This will maintain the aspect ratio and fill the container
                            }}
                        />
                    </Typography>
                    <Tooltip title="Add To Cart">
                        <Fab
                            size="small"
                            color="primary"
                            style={{ position: 'absolute', bottom: '15px', right: '15px' }}
                        >
                            <IconBasket size="16" onClick={() => handleAddToCart(product)} />
                        </Fab>
                    </Tooltip>
                    <CardContent sx={{ p: 3, pt: 2, width: '100%' }}>
                        <Typography variant="h6" style={{ fontSize: '18px' }}>
                            {product.name}
                        </Typography>{' '}
                        <Typography variant="h6" style={{ fontSize: '16px' }}>
                            {product.price} dt
                        </Typography>{' '}
                    </CardContent>
                </BlankCard>
            </Grid>
        </Grid>
    );
};

export default Item;
