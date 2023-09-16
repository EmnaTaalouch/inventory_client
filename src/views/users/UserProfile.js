import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Avatar,
    Box,
    Card,
    Button,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    TextField,
    Typography,
    FormControlLabel,
    Switch,
    Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardCard from '../../components/shared/DashboardCard';
import { IconListCheck, IconMail, IconUser } from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/system';
import { getUserById, updateUserAsync } from '../../redux/slices/userSlice';
import { fetchUsers } from 'src/redux/slices/userSlice';

const UserProfile = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedUser, users } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
    });
    const [anchorEl2, setAnchorEl2] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers());
        const u = users.find((user) => user.id == id);
        setFormData({
            first_name: u?.first_name,
            last_name: u?.last_name,
            phone_number: u?.phone_number,
            email: u?.email,
            address: u?.address,
        });
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            id: id,
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            email: formData.email,
            address: formData.address,
        };

        dispatch(updateUserAsync(id, updatedUser));
        navigate('/dashboard');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const [file, setFile] = useState(null);

    // File input change handler
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        // Handle the selected file, e.g., store it in state
        setFile(selectedFile);
    };
    return (
        <PageContainer title="Mon profil" description="This is a Sample page">
            <div style={{ marginBottom: '16px' }}></div>
            <DashboardCard title="Mon profil">
                <Container>
                    {/* Profile Form */}
                    <form onSubmit={handleSubmit}>
                        <div
                            className="profile"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <label htmlFor="profile" style={{ cursor: 'pointer' }}>
                                <img
                                    src={file ? URL.createObjectURL(file) : ProfileImg}
                                    alt="Profile"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                    }}
                                />
                                <input
                                    type="file"
                                    id="profile"
                                    name="profile"
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                        <div style={{ marginBottom: '25px' }}></div>

                        <div className="textbox">
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Mobile"
                                variant="outlined"
                                fullWidth
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                vname="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                            <div style={{ marginBottom: '20px' }}></div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                style={{
                                    backgroundColor: '#8144AE',
                                    marginLeft: 'auto',
                                    display: 'block',
                                }}
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Container>
            </DashboardCard>
        </PageContainer>
    );
};

export default UserProfile;
