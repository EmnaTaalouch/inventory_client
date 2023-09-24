import React from 'react';
import { Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

import Hero from 'src/components/Hero';
import Section from 'src/components/Section';
import AboutUs from 'src/components/AboutUs';
import Testimonial from 'src/components/Testimonial';
//import ContactUs from 'src/components/ContactUs';

const Home = () => {
    return (
        <PageContainer title="Home" description="this is Home">
            <Box>
                <Hero />
                <Section />
                <AboutUs />
                <Testimonial />
            </Box>
        </PageContainer>
    );
};

export default Home;
