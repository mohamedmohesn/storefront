/* Replace with your SQL commands */
CREATE TABlE order_products(
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL,
    products_id integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (order_id)
      REFERENCES orders (id),
    FOREIGN KEY (products_id)
      REFERENCES products (id)
    );