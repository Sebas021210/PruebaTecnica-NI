import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from "@mui/material/Box";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

function Product_List() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8000/products/');
            if (!response.ok) {
                throw new Error('Error fetching products');
            }
            const data = await response.json();
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 4, mb: 2, px: 2 }}>
                <Box sx={{ width: 40 }} />
                <Typography variant="h5" component="div" align="center">
                    Lista de productos
                </Typography>
                < AddProduct />
            </Box>

            <Box sx={{ px: 5 }}>
                <List>
                    {products.map((product) => (
                        <ListItem
                            key={product.id}
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <EditProduct productId={product.id} productName={product.name} productPrice={product.price} productQuantity={product.quantity} />
                                    < DeleteProduct productId={product.id} onDeleted={fetchProducts} />
                                </Box>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <ShoppingCartIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={`Precio: $${product.price.toFixed(2)} | Cantidad: ${product.quantity}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </div>
    );
}

export default Product_List;
