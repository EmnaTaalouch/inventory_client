import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import useStyles from 'src/assets/styles/styles';
import EmailIcon from '@mui/icons-material/Email';
const Footer = () => {
    const date = new Date().getFullYear();
    const classes = useStyles();

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: '#333',
                color: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
            }}
            className={classes.footerContainer}
        >
            <div className={classes.footerColumn}>
                <Link href="/About" target="_blank" underline="none" sx={{ marginRight: 150 }}>
                    À propos de nous
                </Link>
                <br />
                <div style={{ marginBottom: '25px' }}></div>
                <span>
                    <EmailIcon fontSize="small" sx={{ marginRight: 1 }} /> your@email.com
                </span>
            </div>
            <div className={classes.footerColumn}>
                <Typography variant="body1" className={classes.footerText}>
                    More Info:
                    <div className={classes.footerColumn}>
                        {' '}
                        <Link
                            href="https://www.facebook.com/yourfacebookpage"
                            target="_blank"
                            underline="none"
                        >
                            Facebook
                        </Link>
                    </div>
                    <div className={classes.footerColumn}>
                        {' '}
                        <Link
                            href="https://www.instagram.com/yourinstagrampage"
                            target="_blank"
                            underline="none"
                        >
                            Instagram
                        </Link>{' '}
                    </div>
                    <div id="num" className={classes.footerColumn}>
                        {' '}
                        Phone: +216 (123) 456-7890{' '}
                    </div>
                    <div className={classes.footerColumn}>
                        {' '}
                        Address: 1234 Main St, hammamet TUNISIA
                    </div>
                </Typography>
            </div>
        </Box>
    );
};

export default Footer;
