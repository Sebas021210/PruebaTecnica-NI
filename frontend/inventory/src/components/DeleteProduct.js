import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteProduct({ productId, onDeleted }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/products/${productId}/`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting product');
            }
            console.log('Product deleted successfully');
            onDeleted();
            alert('Producto eliminado correctamente');
            handleClose();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el producto');
        }
    }

    return (
        <div>
            <IconButton edge="end" aria-label="edit" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Eliminar producto
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteProduct;
