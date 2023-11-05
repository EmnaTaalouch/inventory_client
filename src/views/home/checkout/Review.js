import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { getCartSession } from 'src/utils/sessionStorage';

export default function Review() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {getCartSession()?.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText primary={product.name} secondary={product.description} />
                        <Typography variant="body2">{product.price} TND</Typography>
                    </ListItem>
                ))}
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={'frais livraison'} />
                    <Typography variant="body2">7 TND</Typography>
                </ListItem>
                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {getCartSession()?.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0,
                        ) + 7}{' '}
                        TND
                    </Typography>
                </ListItem>
            </List>
        </React.Fragment>
    );
}
