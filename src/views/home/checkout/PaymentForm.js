import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export default function PaymentForm() {
    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow:
            theme.palette.mode === 'dark'
                ? '0 0 0 1px rgb(16 22 26 / 40%)'
                : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
                : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background:
                theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
        },
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    });

    function BpRadio(props) {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
                {...props}
            />
        );
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Expédition
            </Typography>
            <FormControl>
                <RadioGroup
                    defaultValue="frais_de_livraison"
                    aria-labelledby="demo-customized-radios"
                    name="customized-radios"
                >
                    <FormControlLabel
                        value="frais_de_livraison"
                        control={<BpRadio checked />} // Use the checked prop here
                        label="Frais de livraison: 7 dt"
                    />
                    {/* Add other radio buttons here */}
                </RadioGroup>
            </FormControl>
            <div style={{ marginBottom: '20px' }}></div>
            <Grid container spacing={3} alignItems="flex-start">
                <Grid item xs={12} md={10}>
                    <Chip icon={<LocalShippingIcon />} label="Paiement à la livraison " />
                </Grid>

                <Grid item xs={12}>
                    <p style={{ color: 'grey' }}>
                        Vos données personnelles seront utilisées pour traiter votre commande,
                        soutenir votre expérience sur ce site Web et à d'autres fins décrites dans
                        notre politique de confidentialité.
                    </p>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
