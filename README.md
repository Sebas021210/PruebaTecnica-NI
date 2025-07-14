# Inventario de Productos – FastAPI + React
Este proyecto simula un inventario de productos usando FastAPI (Python) en el backend y React en el frontend. Permite listar, agregar, editar y eliminar productos, con almacenamiento en un archivo .json

## Estructura
- /backend         → API REST con FastAPI
- /frontend        → Interfaz web con React

## ¿Cómo ejecutar el proyecto?

### Backend – FastAPI
```bash
uvicorn main:app --reload
```
Accede a la documentación automática en: http://localhost:8000/docs

## Frontend – React
```bash
cd frontend/inventory
npm install
npm start
```
La app se abre en http://localhost:3000

## Funcionalidades
- GET /products: Ver lista de productos
- POST /products/new: Agregar producto
- PUT /products/{id}: Editar producto
- DELETE /products/{id}: Eliminar producto
