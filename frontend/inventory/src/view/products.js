import React from "react";
import ProductList from "../components/ProductList";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Products() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 800,
                        height: 600,
                    },
                }}
            >
                <Paper elevation={3}>
                    <Box sx={{ height: '90%', overflowY: 'auto', p: 2 }}>
                        <ProductList />
                    </Box>
                </Paper>
            </Box>
        </Box>

    );
}

export default Products;
