CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    product_quantity integer
);