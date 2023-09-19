import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import useStyles from 'src/assets/styles/styles';

const Footer = () => {
    const date = new Date().getFullYear();
    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
            <div className={classes.footerColumn}>
                <Typography variant="h6" className={classes.footerText}>
                    À propos de nous
                </Typography>
                <Typography className={classes.footerText}>
                    Chez [Nom de votre entreprise], nous sommes passionnés par l'idée de vous offrir
                    les meilleurs produits alimentaires directement à votre porte. Nous comprenons
                    l'importance de la qualité, du goût et de la commodité en ce qui concerne vos
                    choix alimentaires, c'est pourquoi nous avons sélectionné avec soin une vaste
                    gamme de produits gastronomiques et de produits essentiels pour répondre à vos
                    besoins culinaires.
                </Typography>
                <Typography variant="h6" className={classes.footerText}>
                    Notre mission
                </Typography>
                <Typography className={classes.footerText}>
                    Notre mission est simple mais profonde : vous fournir les meilleurs produits
                    alimentaires, provenant de producteurs de confiance et livrés avec soin. Nous
                    croyons que chacun devrait avoir accès à une alimentation de haute qualité,
                    délicieuse et saine, où qu'il se trouve.
                </Typography>
            </div>
            <div className={classes.footerColumn}>
                <Typography variant="h6" className={classes.footerText}>
                    More Info:
                    <Link
                        href="https://www.facebook.com/yourfacebookpage"
                        target="_blank"
                        underline="none"
                    >
                        Facebook
                    </Link>
                    {' | '}
                    <Link
                        href="https://www.instagram.com/yourinstagrampage"
                        target="_blank"
                        underline="none"
                    >
                        Instagram
                    </Link>
                    {' | '}
                    Phone: +216 (123) 456-7890
                    {' | '}
                    Address: 1234 Main St, hammamet TUNISIA
                </Typography>
            </div>
        </Box>
    );
};

export default Footer;
