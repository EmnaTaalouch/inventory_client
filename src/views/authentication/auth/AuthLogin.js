import React from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import useAuth from '../../../hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const { login } = useAuth();
    const navigate = useNavigate();

    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });

    // Initialize Formik with initial values and validation schema
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values.username);
            console.log(values.password);
            await login(values.username, values.password);
            navigate('/dashboard');
        },
    });

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}
            <form onSubmit={formik.handleSubmit}>
                <Stack>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="username"
                            mb="5px"
                        >
                            Username
                        </Typography>
                        <CustomTextField
                            id="username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </Box>
                    <Box mt="25px">
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px"
                        >
                            Password
                        </Typography>
                        <CustomTextField
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </Box>
                    <Stack
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                        my={2}
                    >
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox defaultChecked />}
                                label="Remember this Device"
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
