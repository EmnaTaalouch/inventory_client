import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useAuth from 'src/hooks/useAuth';

export default function AddressForm() {
    const { user } = useAuth();
    console.log(user);
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="first_name"
                        name="first_name"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        value={user?.first_name}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="last_name"
                        name="last_name"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        value={user?.last_name}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        label="Address précise"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={user?.address}
                        disabled
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="phone_number"
                        name="phone_number"
                        label="phone number"
                        fullWidth
                        autoComplete="shipping address-line1"
                        variant="standard"
                        value={user?.phone_number}
                        disabled
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
