import json
from typing import List, Optional
from backend.models.product_model import Product

FILE_PATH = "backend/data/products.json"

def load_products() -> List[Product]:
    """ Load products from a JSON file """
    try:
        with open(FILE_PATH, "r", encoding="utf-8") as file:
            products_data = json.load(file)
            return [Product(**product) for product in products_data]
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []

def save_products(products: List[Product]):
    """ Save products to a JSON file """
    with open(FILE_PATH, "w", encoding="utf-8") as file:
        json.dump([product.dict() for product in products], file, indent=2)

def get_all_products() -> List[Product]:
    """ Get all products """
    return load_products()

def get_product_by_id(product_id: int) -> Optional[Product]:
    """ Get a product by its ID """
    return next((product for product in load_products() if product.id == product_id), None)

def add_product(new_product: Product):
    """ Add a new product """
    products = load_products()
    products.append(new_product)
    save_products(products)

def update_product(product_id: int, updated_product: dict) -> bool:
    """ Update an existing product by its ID """
    products = load_products()
    for index, product in enumerate(products):
        if product.id == product_id:
            update = product.copy(update=updated_product)
            products[index] = update
            save_products(products)
            return True
    return False

def delete_product(product_id: int) -> bool:
    """ Delete a product by its ID """
    products = load_products()
    new_products = [product for product in products if product.id != product_id]
    if len(new_products) == len(products):
        return False
    save_products(new_products)
    return True
