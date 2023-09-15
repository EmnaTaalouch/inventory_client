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
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUsers, removeUserAsync } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
const ITEM_HEIGHT = 48;
const UserList = () => {
    //const [users, setUsers] = useState(initialUsers);
    const [selectedUserId, setSelectedUserId] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const users = useSelector((state) => state.user.users);
    const handleClickOpen = (id) => {
        setOpen(true);
        setSelectedUserId(id); // Set the selected order ID here
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        console.log(users); // This will log the updated users array when it changes.
    }, [users]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteUser = async (id) => {
        console.log(id);

        if (selectedUserId) {
            try {
                // Make the delete request
                await dispatch(removeUserAsync(selectedUserId));

                // Log the success message
                console.log('User deleted successfully');
                handleClose(); // Close the dialog
            } catch (error) {
                // Log any errors
                console.error('Error deleting user:', error);
            }
        }
    };
    console.log(users);
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Liste des clients
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Nom du client
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Email du client
                                </Typography>
                            </TableCell>
                            <TableCell>Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {user.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {user.first_name} {user.last_name}{' '}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {user.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        color="secondary"
                                        onClick={() => handleClickOpen(user.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    {"Suppression d'un utilisateur ! ! "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Voulez-vous supprimer cet utilisateur?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        annuler
                    </Button>
                    <Button onClick={() => handleDeleteUser(selectedUserId)} autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserList;
