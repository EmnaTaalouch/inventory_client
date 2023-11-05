import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import myteam from 'src/assets/images/myteam.png';
import useStyles from 'src/assets/styles/styles';
import { Link, useNavigate } from 'react-router-dom';

const Hero = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleGoToShop = () => {
        navigate('/shop');
    };

    return (
        <Box className={classes.heroBox}>
            <div
                className={classes.heroImageContainer}
                style={{
                    backgroundImage: `url(${myteam})`,
                    backgroundSize: 'cover',
                    height: '600px',
                }}
            >
                <Grid container spacing={6} className={classes.gridContainer}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h5" className={classes.subtitle} color="#EBF4F5">
                            HANDMADE PRODUCTS TUNISIA
                        </Typography>

                        <Typography
                            variant="h3"
                            fontWeight={700}
                            className={classes.subtitle}
                            color="#EBF4F5"
                        >
                            Each product is crafted with love and passion
                        </Typography>
                    </Grid>
                </Grid>
                <div style={{ marginBottom: '400px' }}></div>
                <Grid container spacing={6} className={classes.gridContainer}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h3" fontWeight={700} className={classes.title}>
                            Experience quality in every piece
                        </Typography>
                        <Typography variant="h5" className={classes.subtitle}>
                            Discover quality in every piece. Explore our exceptional selection of
                            decorative elements and dream catchers. We offer a variety of unique
                            pieces to adorn your space. With our dedication to quality
                            craftsmanship, we are your trusted destination for delightful and
                            authentic decor items
                        </Typography>
                        <Button
                            onClick={handleGoToShop}
                            variant="contained"
                            color="primary"
                            sx={{
                                width: '200px',
                                fontSize: '16px',
                                backgroundColor: '#F0A676',
                            }}
                        >
                            Browse Products
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </Box>
    );
};

export default Hero;
