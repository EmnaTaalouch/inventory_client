import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiamondIcon from '@mui/icons-material/Diamond';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import useStyles from 'src/assets/styles/styles';

const Section = () => {
    const classes = useStyles();

    const sectionItems = [
        {
            id: 1,
            icon: <LocalShippingIcon sx={{ fontSize: 100 }} color="#F0A676" />,
            title: 'Delivery',
            paragraph: 'Stay at home, we provide home delivery across Tunisia.',
        },
        {
            id: 2,
            icon: <DiamondIcon sx={{ fontSize: 100 }} color="#F0A676" />,
            title: 'Unique Items',
            paragraph: 'Our items are authentic and unique.',
        },
        {
            id: 3,
            icon: <ShoppingBasketIcon sx={{ fontSize: 100 }} color="#F0A676" />,
            title: 'Order',
            paragraph: 'Place orders to support Tunisian artisans.',
        },
    ];
    return (
        <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
            <div style={{ marginBottom: '300px' }}></div>
            <Grid container className={classes.sectionGridContainer}>
                {sectionItems.map((item) => (
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        key={item.id}
                        className={classes.sectionGridItem}
                    >
                        {item.icon}
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography>{item.paragraph}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Section;
