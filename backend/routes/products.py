from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from backend.models.product_model import Product, ProductCreate
from backend.controllers.product_crud import (
    get_all_products,
    get_product_by_id,
    add_product,
    update_product,
    delete_product
)

router = APIRouter()

@router.get("/", response_model=List[Product])
def get_products():
    """ Get all products """
    products = get_all_products()
    return products

@router.post("/new", response_model=Product, status_code=201)
def create_product(product: ProductCreate):
    """ Create a new product """
    products = get_all_products()
    next_id = max([p.id for p in products], default=0) + 1
    new_product = Product(id=next_id, **product.dict())
    add_product(new_product)
    return new_product

@router.get("/{product_id}", response_model=Product)
def get_product_id(product_id: int):
    """ Get a product by ID """
    product = get_product_by_id(product_id)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.put("/{product_id}", response_model=Product)
def update_product_by_id(product_id: int, product: ProductCreate):
    """ Update an existing product by ID """
    updated = update_product(product_id, product.dict())
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return get_product_by_id(product_id)

@router.delete("/{product_id}", status_code=204)
def delete_product_by_id(product_id: int):
    """ Delete a product by ID """
    deleted = delete_product(product_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
    return
