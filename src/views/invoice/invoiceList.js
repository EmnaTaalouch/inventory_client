import React, { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    TextField,
    Grid,
    Button,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MonthlyEarnings from '../dashboard/components/MonthlyEarnings';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// Define your API base URL
const API_BASE_URL = 'http://localhost:5000';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = React.useState(false);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    const [selectedInvoiceId, setSelectedInvoiceId] = React.useState(null); // Added selectedInvoiceId state

    //const [filterStatus, setFilterStatus] = useState('All');

    const handleClose = () => {
        setOpen(false);
    };
    // Define your invoices API endpoint
    const INVOICES_ENDPOINT = `${API_BASE_URL}/invoice`;
    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedInvoiceId(id); // Set the selected order ID here
    };
    useEffect(() => {
        axios
            .get(INVOICES_ENDPOINT)
            .then((response) => {
                setInvoices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching invoices:', error);
            });
    }, []);

    // Function to delete an invoice
    const deleteInvoice = (invoiceId) => {
        // Set the selected invoice ID before opening the dialog

        axios
            .delete(`${INVOICES_ENDPOINT}/${invoiceId}`)
            .then(() => {
                setInvoices((prevInvoices) =>
                    prevInvoices.filter((invoice) => invoice.id !== invoiceId),
                );
                setOpen(false); // Close the delete confirmation dialog
            })
            .catch((error) => {
                console.error('Error deleting invoice:', error);
            });
    };

    const handleOpenDeleteDialog = (id) => {
        setSelectedInvoiceId(id);
        // Open the delete confirmation dialog
        setOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpen(false); // Close the delete confirmation dialog
    };
    const dispatch = useDispatch();

    // Function to filter invoices by status
    const filterInvoices =
        selectedStatus === 'All'
            ? invoices
            : invoices.filter(
                  (invoice) => invoice.status.toLowerCase() === selectedStatus.toLowerCase(),
              );

    // Function to filter invoices by search term
    const searchInvoices = () => {
        const filtered = invoices.filter((invoice) =>
            invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredInvoices(filtered); // Update the filteredInvoices state
    };
    useEffect(() => {
        searchInvoices();
    }, [searchTerm]);
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Liste des factures
            </Typography>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
                <TextField
                    label="Recherche"
                    variant="outlined"
                    size="medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginLeft: '0px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearchTerm('')} size="small">
                                    <DeleteIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl variant="outlined" size="medium" style={{ marginLeft: '8px' }}>
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
            </Box>
            <div style={{ marginBottom: '50px' }}></div>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Facture</TableCell>
                            <TableCell>numéro de la facture</TableCell>
                            <TableCell>Date d'échéance</TableCell>
                            <TableCell>Statut</TableCell>
                            <TableCell>Montant </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchTerm // Use filteredInvoices only when searchTerm is not empty
                            ? filteredInvoices.map((invoice) => (
                                  <TableRow key={invoice.id}>
                                      <TableCell>{invoice.id}</TableCell>
                                      <TableCell>{invoice.invoiceNumber}</TableCell>
                                      <TableCell>{invoice.dueDate}</TableCell>
                                      <TableCell>{invoice.status}</TableCell>
                                      <TableCell>${invoice.totalAmount}</TableCell>
                                      <TableCell>
                                          <IconButton
                                              color="secondary"
                                              onClick={() => handleClickOpen(invoice.id)}
                                          >
                                              <DeleteIcon />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))
                            : // Use filterInvoices when searchTerm is empty
                              filterInvoices.map((invoice) => (
                                  <TableRow key={invoice.id}>
                                      <TableCell>{invoice.id}</TableCell>
                                      <TableCell>{invoice.invoiceNumber}</TableCell>
                                      <TableCell>{invoice.dueDate}</TableCell>
                                      <TableCell>{invoice.status}</TableCell>
                                      <TableCell>${invoice.totalAmount}</TableCell>
                                      <TableCell>
                                          <IconButton
                                              color="secondary"
                                              onClick={() => handleClickOpen(invoice.id)}
                                          >
                                              <DeleteIcon />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))}
                    </TableBody>
                </Table>
            </Paper>
            <div style={{ marginBottom: '30px' }}></div>

            <Grid item xs={12} size="medium" style={{ marginLeft: '840px' }}>
                <MonthlyEarnings
                    data={{ amount: invoices.reduce((a, b) => a + parseInt(b.totalAmount), 0) }}
                />
            </Grid>
            {/* Delete Confirmation Dialog */}
            <Dialog
                open={open}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Suppression d'une facture"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous vraiment supprimer cette facture ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDeleteDialog}>
                        Non
                    </Button>
                    <Button onClick={() => deleteInvoice(selectedInvoiceId)} color="secondary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default InvoiceList;
