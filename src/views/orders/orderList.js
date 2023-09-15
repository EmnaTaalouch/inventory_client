import React, { useState, useEffect } from 'react';
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
    InputLabel,
    Select,
    FormControl,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { fetchOrders, removeOrderAsync, updateOrderAsync } from '../../redux/slices/orderSlice';

import { useDispatch, useSelector } from 'react-redux';
const ITEM_HEIGHT = 48;

function OrderList() {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [menuOpen, setMenuOpen] = React.useState(false);
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    const handleClick = (event, id) => {
        console.log(id);
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
        setSelectedOrderId(id); // Add this line to set the selectedOrderId
    };
    const [selectedOrderId, setSelectedOrderId] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    //const [selectedStatus, setSelectedStatus] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    //const menuOpen = Boolean(anchorEl);
    //const [orders, setOrders] = useState([]);
    const orders = useSelector((state) => state.order.orders);
    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedOrderId(id); // Set the selected order ID here
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmOrder = async (id) => {
        console.log(id);

        if (id) {
            // Dispatch the action to update the order status to 'Paid'
            dispatch(updateOrderAsync(id, { status: 'Paid' }));
            handleClose();
        }
    };
    //const filteredOrders = selectedStatus === 'All' ? orders : orders.filter((order) => order.status.toLowerCase() === selectedStatus.toLowerCase());

    // Access user data from the Redux store
    console.log(orders);
    const users = useSelector((state) => state.user.users);

    console.log(users);
    const filteredOrders =
        selectedStatus === 'All'
            ? orders
            : orders.filter((order) => order.status.toLowerCase() === selectedStatus.toLowerCase());

    const handleDeleteOrder = async (id) => {
        console.log(id);

        if (selectedOrderId) {
            dispatch(removeOrderAsync(selectedOrderId));
            handleClose(); // Close the dialog
        }
    };

    return (
        <PageContainer title="Table des commandes" description="this is Sample page">
            <div style={{ marginBottom: '16px' }}></div>
            <DashboardCard title="Table des commandes">
                <div style={{ position: 'relative' }}>
                    <FormControl
                        variant="outlined"
                        size="medium"
                        style={{ width: '200px', position: 'absolute', top: '0', right: '0' }}
                    >
                        <InputLabel id="demo-simple-select-label">Statut</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="All">Tous</MenuItem>
                            <MenuItem value="Pending">En attente</MenuItem>
                            <MenuItem value="Paid">payé</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ marginBottom: '60px' }}></div>
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <div style={{ marginBottom: '40px' }}></div>
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
                                        Commande ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Client
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Date de la commande
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Adresse de livraison
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Montant total
                                    </Typography>
                                </TableCell>
                                <TableCell></TableCell>
                                {/* Add more table cells for other attributes as needed */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.orderid}>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {order.orderid}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {/* Access the user data and display the username */}
                                            {order.user
                                                ? order.user.id // Assuming users are stored in an object with IDs as keys
                                                    ? order.user.first_name +
                                                      ' ' +
                                                      order.user.last_name
                                                    : 'N/A'
                                                : 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {order.date_order
                                                ? new Date(order.date_order).toLocaleDateString()
                                                : 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {order.user ? order.user.address || 'N/A' : 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" fontWeight={600}>
                                            {order.total || 'N/A'}
                                        </Typography>
                                    </TableCell>
                                    {/* Add more table cells for other attributes as needed */}

                                    {order.status.toLowerCase() === 'pending' ? (
                                        <TableCell align="right" style={{ width: '200px' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ backgroundColor: '#8BD464' }}
                                                onClick={() => handleConfirmOrder(order.orderid)} // Call handleConfirmOrder with the order ID
                                            >
                                                Confirmer
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                style={{
                                                    backgroundColor: '#E14B34',
                                                    marginLeft: '10px',
                                                }}
                                                key="Delete"
                                                onClick={() => handleClickOpen(order.orderid)} // This is where you open the delete confirmation dialog
                                            >
                                                Supprimer
                                            </Button>
                                        </TableCell>
                                    ) : (
                                        <TableCell
                                            align="right"
                                            style={{ width: '247px' }}
                                        ></TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>
            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {"Suppression d'un produit ! ! "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Voulez-vous supprimer cette comande?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Non
                    </Button>
                    <Button onClick={() => handleDeleteOrder(selectedOrderId)} autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </PageContainer>
    );
}

export default OrderList;
