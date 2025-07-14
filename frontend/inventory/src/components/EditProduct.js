import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditProduct({ productId, productName, productPrice, productQuantity }) {
    const [open, setOpen] = useState(false);
    const [formEditData, setFormEditData] = useState({
        name: "",
        price: "",
        quantity: ""
    });

    const handleClickOpen = () => {
        setFormEditData({
            name: productName,
            price: productPrice,
            quantity: productQuantity
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormEditData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedProduct = {
            name: formEditData.name,
            price: parseFloat(formEditData.price),
            quantity: parseInt(formEditData.quantity)
        };

        try {
            const response = await fetch(`http://localhost:8000/products/${productId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            })
            if (!response.ok) {
                throw new Error('Error updating product');
            }
            const data = await response.json();
            console.log('Product updated:', data);
            handleClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar producto</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Ingresa los nuevos detalles del producto.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Nombre del producto"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={formEditData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="price"
                            name="price"
                            label="Precio"
                            type="number"
                            fullWidth
                            variant="standard"
                            inputProps={{ step: "0.01" }}
                            value={formEditData.price}
                            onChange={handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="quantity"
                            name="quantity"
                            label="Cantidad"
                            type="number"
                            fullWidth
                            variant="standard"
                            inputProps={{ step: "1", min: "0" }}
                            value={formEditData.quantity}
                            onChange={handleChange}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Editar</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default EditProduct;
