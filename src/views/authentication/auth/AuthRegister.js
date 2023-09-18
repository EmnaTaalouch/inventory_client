import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import useAuth from 'src/hooks/useAuth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthRegister = ({ title, subtitle, subtext }) => {
    const { register } = useAuth();

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                await register(values.email, values.password, values.first_name, values.last_name);

                window.location.href = '/auth/login';
            } catch (error) {
                console.error('Error updating profile:', error);
            }
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

            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <Stack mb={3}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="name"
                            mb="5px"
                        >
                            firstName
                        </Typography>
                        <CustomTextField
                            id="first"
                            variant="outlined"
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                            helperText={formik.touched.first_name && formik.errors.first_name}
                            fullWidth
                        />

                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="name"
                            mb="5px"
                        >
                            lastName
                        </Typography>
                        <CustomTextField
                            id="last"
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                            helperText={formik.touched.last_name && formik.errors.last_name}
                            variant="outlined"
                            fullWidth
                        />

                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="email"
                            mb="5px"
                            mt="25px"
                        >
                            Email Address
                        </Typography>
                        <CustomTextField
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            variant="outlined"
                            fullWidth
                        />

                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px"
                            mt="25px"
                        >
                            Password
                        </Typography>
                        <CustomTextField
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            variant="outlined"
                            fullWidth
                        />
                    </Stack>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
            {subtitle}
        </>
    );
};
export default AuthRegister;
