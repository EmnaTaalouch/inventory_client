import React, { useState } from 'react';
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
  TextField, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MonthlyEarnings from '../dashboard/components/MonthlyEarnings';
// Sample invoice data
const initialInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-001',
    dueDate: '2023-08-31',
    status: 'Pending',
    totalAmount: 100.0,
  },
  {
    id: 2,
    invoiceNumber: 'INV-002',
    dueDate: '2023-09-15',
    status: 'Paid',
    totalAmount: 250.0,
  },
  {
    id: 3,
    invoiceNumber: 'INV-003',
    dueDate: '2023-09-30',
    status: 'Pending',
    totalAmount: 75.0,
  },
];

const InvoiceList = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Function to delete an invoice
  const deleteInvoice = (invoiceId) => {
    const updatedInvoices = invoices.filter((invoice) => invoice.id !== invoiceId);
    setInvoices(updatedInvoices);
  };

  // Function to filter invoices by status
  const filterInvoices = () => {
    if (filterStatus === 'All') {
      return invoices;
    }
    return invoices.filter((invoice) => invoice.status === filterStatus);
  };

  // Function to search invoices by invoice number
  const searchInvoices = () => {
    return invoices.filter(
      (invoice) =>
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="All">Tous</MenuItem>
            <MenuItem value="Pending">En attente</MenuItem>
            <MenuItem value="Paid">payé</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchInvoices().map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.invoiceNumber}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>${invoice.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteInvoice(invoice.id)}
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
                <MonthlyEarnings />
              </Grid>
    </div>
  );
};

export default InvoiceList;
