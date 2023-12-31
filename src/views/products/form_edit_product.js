import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { getProductById, updateProductAsync } from '../../redux/slices/productSlice';
import { fetchOrders } from 'src/redux/slices/orderSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ProductApi } from 'src/actions/productAction';

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png', 'image/gif'];
const FILE_SIZE = 1024 * 1024; // 1 MB

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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

function FormEditProduct() {
    const { productId } = useParams();
    console.log(productId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [uploadedImage, setUploadedImage] = useState(null);
    const { selectedProduct, products } = useSelector((state) => state.product);
    // Initialize state for form fields

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };
    const [formData, setFormData] = useState({
        productName: '',
        productPrice: 0,
        productQuantity: 0,
        productDescription: '',
        isAvailable: false,
        image: ''
    });
    console.log(selectedProduct);
    console.log(formData);
    useEffect(() => {
        dispatch(fetchOrders());
        const p = products.find((product) => product.productid == productId);
        setFormData({
            productName: p?.name,
            productPrice: p?.price,
            productQuantity: p?.quantity,
            productDescription: p?.description,
            isAvailable: p?.isAvailable,
            image: p?.image,
        });
    }, [dispatch]);

    const handleReturnToList = () => {
        navigate('/product/list');
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Create an updated product object with the form data
        const updatedProduct = {
            id: productId,
            name: formData.productName,
            price: formData.productPrice,
            quantity: formData.productQuantity,
            description: formData.productDescription,
            isAvailable: formData.isAvailable,
            image: formData.image,
        };
        if (uploadedImage) {
            const formData = new FormData();
            formData.append('file', uploadedImage);
            const response = await ProductApi.uploadImage(formData);
            updatedProduct.image = response.data;
        }
        // Dispatch the updateProductAsync action
        dispatch(updateProductAsync(productId, updatedProduct));
        navigate('/product/list');
    };

    const handleChange = (e) => {
        // Update the form state when form fields change
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <PageContainer title="Modifier le produit" description="Modifier un produit existant">
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
                            <FormStyled onSubmit={handleSubmit}>
                                <TextField
                                    label="Nom du produit"
                                    variant="outlined"
                                    fullWidth
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Prix du produit"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    name="productPrice"
                                    value={formData.productPrice}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Quantité du produit"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    name="productQuantity"
                                    value={formData.productQuantity}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.isAvailable}
                                            onChange={handleChange}
                                            name="isAvailable"
                                        />
                                    }
                                    label="Disponible"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    control={
                                        <Button
                                            component="label"
                                            variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload file
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </Button>
                                    }
                                    label={<>Image: &nbsp;</>}
                                    labelPlacement="start"
                                />
                                <SubmitButtonContainer>
                                    <Button type="submit" variant="contained" color="primary">
                                        Modifier
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

export default FormEditProduct;
