import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton,
} from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system'; // Import styled function from @mui/system

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

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
  padding: theme.spacing(3), // Add padding to the card
  zIndex: 1,
  width: '80%', // Reduce the width of the card
  maxWidth: '500px', // Set a maximum width
  margin: '0 auto', // Center the card horizontally
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

const FileInput = styled('input')(({ theme }) => ({
  display: 'none',
}));

const FileInputLabel = styled('label')(({ theme }) => ({
  display: 'block',
  textAlign: 'center',
  cursor: 'pointer',
  color: theme.palette.primary.main,
}));

const SubmitButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2), // Add margin at the top
}));

function FormProduct() {
  const navigate = useNavigate();

  const handleReturnToList = () => {
    navigate('/product/list');
  };

  return (
    <PageContainer title="Ajouter un produit" description="Ajouter un nouveau produit">
      <Container>
        <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item xs={12} sm={12} lg={4} xl={5} display="flex" justifyContent="center" alignItems="center">
            <CardStyled elevation={4}>
              <IconButton sx={{ position: 'absolute', top: '16px', left: '16px', cursor: 'pointer' }} onClick={handleReturnToList}>
                <ArrowBackIcon />
              </IconButton>
              <LogoContainer>
                <Logo />
              </LogoContainer>
              <FormStyled>
                <TextField label="Nom du produit" variant="outlined" fullWidth />
                <TextField label="Prix du produit" variant="outlined" fullWidth type="number" />
                <TextField label="Quantité du produit" variant="outlined" fullWidth type="number" />
                <TextField label="Description" variant="outlined" fullWidth multiline rows={4} />
                <FileInput type="file" accept="image/*" id="fileInput" />
                <FileInputLabel htmlFor="fileInput">Choisir un fichier</FileInputLabel>
                <FormControlLabel control={<Switch />} label="Disponible" labelPlacement="start" />
              </FormStyled>
              <SubmitButtonContainer>
                <Button type="submit" variant="contained" color="primary">
                  Ajouter
                </Button>
              </SubmitButtonContainer>
            </CardStyled>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}

export default FormProduct;
