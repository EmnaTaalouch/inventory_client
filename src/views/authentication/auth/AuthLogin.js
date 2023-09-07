import React,{useState} from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import axios from 'axios';


const handleLogin = async (username, password) => {
        try {
            const response = await axios.post('https://localhost:7173/api/Auth/login', { username, password });
            // Handle successful login response
            console.log(response.data); // Assuming the API returns some data
          } catch (error) {
            // Handle login error
            console.error(error);
          }
};

const AuthLogin = ({ title, subtitle, subtext }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("entered handleFormSubmit"+username+" "+password)
    handleLogin(username, password);
  };

    return(
    <>

        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}
 <form onSubmit={handleFormSubmit} >
        <Stack>
            <Box>
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='username' mb="5px">Username</Typography>
                <CustomTextField id="username" value={username}  onChange={(e) => setUsername(e.target.value)} variant="outlined" fullWidth />
            </Box>
            <Box mt="25px">
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" >Password</Typography>
                <CustomTextField id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" fullWidth />
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack>
        </Stack>
        <Box>
        <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        >
        Sign In
        </Button>
        </Box>
        </form>
        {subtitle}
    </>
);
};
export default AuthLogin;
