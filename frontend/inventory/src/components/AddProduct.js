import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

function AddProduct({ onAdd }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newProduct = {
            name: formData.name,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity)
        };

        try {
            const response = await fetch('http://localhost:8000/products/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                throw new Error('Error adding product');
            }
            const data = await response.json();
            console.log('Product added:', data);
            onAdd();
            setFormData({ name: "", price: "", quantity: "" });
            alert('Producto agregado exitosamente');
            handleClose();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al agregar el producto');
        }
    }

    return (
        <div>
            <IconButton edge="end" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Agregar producto</DialogTitle>
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Ingresa los detalles del nuevo producto.
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
                            value={formData.name}
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
                            value={formData.price}
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
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Agregar</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddProduct;
