import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, TextField, Button , FormControlLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Switch from '@mui/material/Switch';
// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

function FormProduct() {
  return (
    <PageContainer title="Form" description="This is a form page">
      <Box
        sx={{
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
        }}
      >
        <Grid item spacing={0} justifyContent="center" sx={{ height: '100vh'  }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={4} sx={{ p: 4, zIndex: 1, width: '100%' }} style={{ maxWidth: '700px' }}>

              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <form>
                <TextField label="Nom du produit" variant="outlined" fullWidth margin="normal"  />
                <TextField
                  label="Prix du produit"
                  variant="outlined"
                  fullWidth
                  type="number"
                  margin="normal"
                  InputProps={{
                  endAdornment: (
                <InputAdornment position="end">
              <MonetizationOnIcon />
            </InputAdornment>
    ),
  }}
/>
                <TextField label="quantité du produit" type="number" variant="outlined" fullWidth margin="normal" />
                

                
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline 
                  rows={4} 
                />

            <input type="file" accept="image/*" />
                <FormControlLabel
                  control={<Switch />}
                  label="Disponible"
                  labelPlacement="start" 
                />
                
              </form>
              <div style={{ marginBottom: '16px' }}></div>
      <div style={{ textAlign: 'right' }}>
              <Button type="submit" variant="contained" color="primary">
                  Ajouter
                </Button>
                </div>

            </Card>

          </Grid>

        </Grid>
        
      </Box>
    </PageContainer>
  );
}

export default FormProduct;
