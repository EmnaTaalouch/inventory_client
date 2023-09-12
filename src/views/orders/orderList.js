

import React, { useState } from 'react';
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
  InputLabel,Select,FormControl
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const products = [
  {
    id: "1",
    name: "Sunil ",
    post: "Web ",
    pname: "Elite ",
    priority: "Low",
    pbg: "primary",
    budget: "3.9",
  },
  {
    id: "2",
    name: "Andrew ",
    post: "Project ",
    pname: "Real ",
    priority: "Medium",
    pbg: "secondary",
    budget: "24.5",
  },
  {
    id: "3",
    name: "Christopher ",
    post: "Project ",
    pname: "MedicalPro ",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
  },
  {
    id: "4",
    name: "Nirav ",
    post: "Frontend ",
    pname: "Hosting ",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
  },
];

const options = ['Edit'];

const ITEM_HEIGHT = 48;

function OrderList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedStatus, setSelectedStatus] = useState('');


  return (
    <PageContainer title="Table des commandes" description="this is Sample page">
      <div>
        <TextField id="outlined-multiline-flexible" label="Recherche" maxRows={4} />
      </div>
      <div style={{ marginBottom: '16px' }}></div>
      <DashboardCard title="Table des commandes">
      <div style={{ position: 'relative' }}>
      
      <FormControl variant="outlined" size="medium" style={{ width: '200px' , position: 'absolute', top: '0', right: '0' }}>
          <InputLabel id="demo-simple-select-label">Statut</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedStatus}
            
          >
            <MenuItem value="All">Tous</MenuItem>
            <MenuItem value="Pending">En attente</MenuItem>
            <MenuItem value="Paid">payé</MenuItem>
          </Select>
        </FormControl></div>
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
                    Commande
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
                
                
                
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {product.id}
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
                        
                        <Typography
                          color="textSecondary"
                          sx={{
                            fontSize: '13px',
                          }}
                        >
                          {product.post}
                        </Typography>
                      </Box>
                    </Box>
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
                          {product.post}
                        </Typography>
                      </Box>
                    </Box>
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
                          {product.post}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  
                  <TableCell >
                    <Typography variant="h6">${product.budget}k</Typography>
                  </TableCell>
                  <TableCell align="right">
                 
        {/*  {product.status === 'pending' && (  */}
   
        <>
          <Button
            variant="contained"
            color="primary"
            
          >
            Confirmer
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: '10px' }}
          >
            Supprimer
          </Button>
        </>
      {/*  )}  */}
    </TableCell>

                   
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
      

      
    </PageContainer>
  );
};

export default OrderList;

  