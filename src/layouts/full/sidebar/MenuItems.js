import {
    IconAperture,
    IconCopy,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconTypography,
    IconUserPlus,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
    {
        navlabel: true,
        subheader: 'Home',
    },

    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconLayoutDashboard,
        href: '/dashboard',
    },
    {
        navlabel: true,
        subheader: 'User Management',
    },
    {
        id: uniqueId(),
        title: 'User List',
        icon: IconTypography,
        href: '/user/list',
    },
    {
        navlabel: true,
        subheader: 'Product Management',
    },
    {
        id: uniqueId(),
        title: 'Product List',
        icon: IconTypography,
        href: '/dashboard/product/list',
    },
    {
        navlabel: true,
        subheader: 'Order Management',
    },
    {
        id: uniqueId(),
        title: 'Order List',
        icon: IconTypography,
        href: '/dashboard/order/list',
    },
    {
        navlabel: true,
        subheader: 'Invoice Management',
    },
    {
        id: uniqueId(),
        title: 'Liste des factures',
        icon: IconTypography,
        href: '/dashboard/invoice/list',
    },

    {
        navlabel: true,
        subheader: 'Auth',
    },
    {
        id: uniqueId(),
        title: 'Login',
        icon: IconLogin,
        href: '/auth/login',
    },
    {
        id: uniqueId(),
        title: 'Register',
        icon: IconUserPlus,
        href: '/auth/register',
    },
];

export default Menuitems;
