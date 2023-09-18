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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'src/hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        first_name: Yup.string().required('First Name is required'),
        last_name: Yup.string().required('Last Name is required'),
        phone_number: Yup.string().required('Mobile is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        address: Yup.string().required('Address is required'),
    });

    const formik = useFormik({
        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            phone_number: user.phone_number,
            email: user.email,
            address: user.address,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(updateUserAsync(user.id, values));

                window.location.href = '/dashboard';
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        },
    });

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
                    <form onSubmit={formik.handleSubmit}>
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
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.first_name && Boolean(formik.errors.first_name)
                                }
                                helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Mobile"
                                variant="outlined"
                                fullWidth
                                name="phone_number"
                                value={formik.values.phone_number}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.phone_number &&
                                    Boolean(formik.errors.phone_number)
                                }
                                helperText={
                                    formik.touched.phone_number && formik.errors.phone_number
                                }
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <div style={{ marginBottom: '16px' }}></div>
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
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
