import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons';
import DashboardCard from '../../../components/shared/DashboardCard';

const MonthlyEarnings = ({ data }) => {
    // chart color
    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    const secondarylight = '#f5fcff';
    const errorlight = '#fdede8';
    console.log(data);
    // chart
    const optionscolumnchart = {
        chart: {
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
            height: 60,
            sparkline: {
                enabled: true,
            },
            group: 'sparklines',
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            colors: [secondarylight],
            type: 'solid',
            opacity: 0.05,
        },
        markers: {
            size: 0,
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
        },
    };
    const seriescolumnchart = [
        {
            name: '',
            color: secondary,
            data: [25, 66, 20, 40, 12, 58, 20],
            // data: data,
        },
    ];

    return (
        <DashboardCard
            title="
            Montant total
            "
            action={
                <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
                    <IconCurrencyDollar width={24} />
                </Fab>
            }
            footer={
                <Chart
                    options={optionscolumnchart}
                    series={seriescolumnchart}
                    type="area"
                    height="60px"
                />
            }
        >
            <>
                <Typography variant="h3" fontWeight="700" mt="-20px">
                    ${data?.amount}
                </Typography>
            </>
        </DashboardCard>
    );
};

export default MonthlyEarnings;
