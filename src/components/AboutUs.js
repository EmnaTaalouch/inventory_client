import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
import bestTeams from 'src/assets/images/bestTeams.png';
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
                        <Typography variant="h2" fontWeight={600} className={classes.title}>
                            Quality Products Within Your Reach.
                        </Typography>
                        <Typography className={classes.aboutUsSubtitle}>
                            We ensure to provide you with the finest products in Tunisia at the best
                            prices. Feel free to reach out to us for any inquiries
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ width: '200px', fontSize: '16px', backgroundColor: '#81CAE7' }}
                            href="#num"
                        >
                            CONTACT US
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default AboutUs;
