import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import bestTeams from 'src/assets/images/bestTeams.jpg';
import useStyles from 'src/assets/styles/styles';
const AboutUs = () => {
    const classes = useStyles();

    return (
        <div id="about">
            <Box className={classes.aboutUsContainer}>
                <Grid container spacing={6} className={classes.gridContainer}>
                    <Grid item xs={12} md={5}>
                        <img src={bestTeams} alt="My Team" className={classes.largeImage} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" fontWeight={600} className={classes.title}>
                            Des Produits Alimentaires de Qualité à Votre Portée
                        </Typography>
                        <Typography className={classes.aboutUsSubtitle}>
                            Nous nous assurons de vous fournir les meilleurs produits en Tunisie, au
                            meilleur prix. N'hésitez pas à nous contacter pour toute information
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '200px', fontSize: '16px', backgroundColor: '#9FD26A' }}
                            href="#num"
                        >
                            CONTACTEZ NOUS
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default AboutUs;
