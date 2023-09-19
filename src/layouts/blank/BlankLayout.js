import { Outlet } from 'react-router-dom';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import { Container, Box } from '@mui/material';

const BlankLayout = () => (
    <>
        <Header />
        <Container
            sx={{
                paddingTop: '20px',
            }}
        >
            <Outlet />
        </Container>
        <Footer />
    </>
);

export default BlankLayout;
