import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
                {/* ... (rest of your table head cells) ... */}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productid}>
                  <TableCell>
                    {/* ... (table cell content) ... */}
                  </TableCell>
                  {/* ... (rest of your table cells) ... */}
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
