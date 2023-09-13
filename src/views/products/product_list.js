import React, { useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

import { fetchProducts } from '../../redux/slices/productSlice';
import { useSelector, useDispatch } from 'react-redux';

const options = ['Edit'];

const ITEM_HEIGHT = 48;

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
// Check if loading
if (loading) {
  return <div>Loading...</div>;
}

// Check for errors
if (error) {
  return <div>Error: {error}</div>;
}

// Check if products are empty
if (products.length === 0) {
  return (
    <PageContainer title="Table des produits" description="No products available">
      <div>
        <TextField id="outlined-multiline-flexible" label="Recherche" maxRows={4} />
      </div>
      <div style={{ marginBottom: '16px' }}></div>
      <DashboardCard title="Table des produits">
        <Typography variant="subtitle2" fontWeight={600}>
          No products available.
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
}

// If products are available, render the table
  return (
    <PageContainer title="Table des produits" description="This is a Sample page">
      <div>
        <TextField id="outlined-multiline-flexible" label="Recherche" maxRows={4} />
      </div>
      <div style={{ marginBottom: '16px' }}></div>
      <DashboardCard title="Table des produits">
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Produit ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    nom
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Prix
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Quantité
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Disponibilité
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productid}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {product.productid}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: '13px',
                          }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {product.price}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      sx={{
                        px: '4px',
                        backgroundColor: product.isAvailable ? 'success.main' : 'error.main',
                        color: '#fff',
                      }}
                      size="small"
                      label={product.quantity}
                    ></Chip>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">
                      {product.isAvailable ? 'Available' : 'Not Available'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={menuOpen ? 'long-menu' : undefined}
                      aria-expanded={menuOpen ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      {options.map((option) => (
                        <MenuItem key={option} onClick={option === 'Edit' ? handleClose : undefined}>
                          {option === 'Edit' ? (
                            <Link component={Link} to={`/product/edit/${product.productid}`}>
                              Modifier
                            </Link>
                          ) : null}
                        </MenuItem>
                      ))}
                      {/* Delete Confirmation Dialog */}
                      <MenuItem key="Delete" onClick={handleClickOpen}>
                        Supprimer
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
      <div style={{ marginBottom: '16px' }}></div>
      <div style={{ textAlign: 'right' }}>
        <Button variant="contained" color="primary" component={Link} to="/product/add">
          Ajouter un produit
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Suppression d'un produit ! ! "}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Voulez-vous supprimer ce produit?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Non
          </Button>
          <Button onClick={handleClose} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default ProductList;
