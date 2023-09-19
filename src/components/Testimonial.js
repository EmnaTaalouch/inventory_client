import React from 'react';
import { Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import useStyles from 'src/assets/styles/styles';

const Testimonial = () => {
    const classes = useStyles();
    const reviews = [];
    return (
        <Box
            sx={{
                flexGrow: 1,
                padding: '20px',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
            }}
        >
            <Grid container spacing={2}>
                {reviews.map((review) => (
                    <Grid item sm={12} md={4} key={review.id}>
                        <Card className={classes.testimonialCard}>
                            <CardContent>
                                <Typography className={classes.testimonialStatement}>
                                    "{review.statement}"
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Avatar
                                        src={review.image_url}
                                        size="large"
                                        className={classes.avatar}
                                    />
                                    <Box>
                                        <Typography>{review.name}</Typography>
                                        <Typography className={classes.testimonialPosition}>
                                            {review.position}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Testimonial;
