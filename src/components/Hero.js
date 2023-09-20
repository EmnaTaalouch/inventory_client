import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import myteam from 'src/assets/images/myteam.jpg';
import useStyles from 'src/assets/styles/styles';

const Hero = () => {
    const classes = useStyles();

    return (
        <Box className={classes.heroBox}>
            <Grid container spacing={6} className={classes.gridContainer}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h2" fontWeight={700} className={classes.title}>
                        Découvrez la qualité dans chaque bouchée
                    </Typography>
                    <Typography variant="h5" className={classes.subtitle}>
                        Parcourez notre sélection exceptionnelle de produits alimentaires de
                        première qualité. Nous mettons à votre disposition une variété de délices
                        pour satisfaire votre palais. Avec notre passion pour la nourriture de
                        qualité, nous sommes votre destination de confiance pour des produits
                        alimentaires délicieux et authentiques.
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: '200px', fontSize: '16px', backgroundColor: '#9FD26A' }}
                    >
                        Consulter Nos Produits
                    </Button>
                </Grid>
                <Grid item xs={12} md={5}>
                    <img src={myteam} alt="My Team" className={classes.largeImage} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;
