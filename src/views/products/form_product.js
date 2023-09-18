import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Grid,
    Box,
    Card,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Switch,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { addProductAsync } from '../../redux/slices/productSlice';

const Container = styled(Box)(({ theme }) => ({
    position: 'relative',
    '&:before': {
        content: '""',
        background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
        backgroundSize: '400% 400%',
        animation: 'gradient 15s ease infinite',
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: '0.3',
    },
}));

const CardStyled = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    zIndex: 1,
    width: '80%',
    maxWidth: '500px',
    margin: '0 auto',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const FormStyled = styled('form')(({ theme }) => ({
    '& .MuiTextField-root': {
        marginBottom: theme.spacing(2),
    },
}));

const SubmitButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
}));

function FormProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required'),
        quantity: Yup.number().required('Quantity is required'),
        description: Yup.string().required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            price: 0,
            quantity: 0,
            description: '',
            isAvailable: false,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(addProductAsync(values));
                navigate('/product/list');
            } catch (error) {
                console.error('Error adding product:', error);
            }
        },
    });

    const handleReturnToList = () => {
        navigate('/product/list');
    };

    return (
        <PageContainer title="Ajouter un produit" description="Ajouter un nouveau produit">
            <Container>
                <Grid
                    container
                    spacing={0}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ height: '100vh' }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        lg={4}
                        xl={5}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <CardStyled elevation={4}>
                            <ArrowBackIcon
                                sx={{
                                    position: 'absolute',
                                    top: '16px',
                                    left: '16px',
                                    cursor: 'pointer',
                                }}
                                onClick={handleReturnToList}
                            />
                            <LogoContainer>
                                <Logo />
                            </LogoContainer>
                            <FormStyled onSubmit={formik.handleSubmit}>
                                <TextField
                                    label="Nom du produit"
                                    variant="outlined"
                                    fullWidth
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <TextField
                                    label="Prix du produit"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                                <TextField
                                    label="Quantité du produit"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    name="quantity"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.quantity && Boolean(formik.errors.quantity)
                                    }
                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.description &&
                                        Boolean(formik.errors.description)
                                    }
                                    helperText={
                                        formik.touched.description && formik.errors.description
                                    }
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formik.values.isAvailable}
                                            onChange={formik.handleChange}
                                            name="isAvailable"
                                        />
                                    }
                                    label="Disponible"
                                    labelPlacement="start"
                                />
                                <SubmitButtonContainer>
                                    <Button type="submit" variant="contained" color="primary">
                                        Ajouter
                                    </Button>
                                </SubmitButtonContainer>
                            </FormStyled>
                        </CardStyled>
                    </Grid>
                </Grid>
            </Container>
        </PageContainer>
    );
}

export default FormProduct;
