/* Replace with your SQL commands */
CREATE TYPE status_of_order AS ENUM ('active','complete');

CREATE TABlE orders(
    id SERIAL PRIMARY KEY,
    users_id integer NOT NULL,
    products_id integer NOT NULL,
    status_of_orders status_of_order NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (users_id)
      REFERENCES users (id),
    FOREIGN KEY (products_id)
      REFERENCES products (id)
    );