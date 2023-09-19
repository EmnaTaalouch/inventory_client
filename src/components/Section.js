import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import useStyles from 'src/assets/styles/styles';

const Section = () => {
    const classes = useStyles();

    const sectionItems = [
        {
            id: 1,
            icon: <EngineeringOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
            sentence: 'Les meilleurs produits des meilleurs producteurs',
        },
        {
            id: 2,
            icon: <AllInclusiveIcon sx={{ fontSize: 100 }} color="primary" />,
            sentence: 'Qualité de travail exceptionnelle garantie',
        },
        {
            id: 3,
            icon: <PaidOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
            sentence: 'Prix et offres exceptionnels',
        },
    ];
    return (
        <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
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
                        <Typography>{item.sentence}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Section;
