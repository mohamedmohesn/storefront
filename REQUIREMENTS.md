# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

- [API Requirements](#api-requirements)
- [after](#after)
  - [API Endpoints](#api-endpoints)
    - [user](#user)
    - [product](#product)
    - [order](#order)
    - [order_product](#order_product)
  - [Data Shapes](#data-shapes)
    - [typeScript](#typescript)
      - [user](#user-1)
      - [product](#product-1)
      - [order](#order-1)
      - [order_product](#order_product-1)
    - [postgres tables](#postgres-tables)
      - [user](#user-2)
      - [product](#product-2)
      - [order](#order-2)
      - [order_product](#order_product-2)
    - [table relation](#table-relation)
      - [user to product](#user-to-product)
      - [order to product](#order-to-product)
- [Before](#before)
  - [API Endpoints](#api-endpoints-1)
      - [Products](#products)
      - [Users](#users)
      - [Orders](#orders)
  - [Data Shapes](#data-shapes-1)
      - [Product](#product-3)
      - [User](#user-3)
      - [Orders](#orders-1)

# after
## API Endpoints
the endpoint to main page is ('/')
### user
the endpoint user table to get all user      ('/user'),[token required]
the endpoint user table to get one user      ('/user/:id')[token required]
the endpoint user table to post create user  ('/user/signup')
the endpoint user table to post login user   ('/user/login')
the endpoint user table to delete user       ('/user/:id')[token required]
### product
the endpoint product table to get all product          ('/product'),
the endpoint product table to get one product          ('/product/:id')
the endpoint product table to get product by category  ('/product/category/:category')[token required]
the endpoint product table to post create product      ('/product/login')[token required]
the endpoint product table to delete product           ('/product/:id')[token required]
### order
the endpoint order table to get all order       ('/order'),[token required]
the endpoint order table to get one order       ('/order/:id')[token required]
the endpoint order table to get current order   ('/order/current')[token required]
the endpoint order table to get completed order ('/order/completed')[token required]
the endpoint order table to post create order   ('/order')[token required]
the endpoint order table to delete order        ('/order/:id')[token required]
### order_product
the endpoint order table to get all orderproduct       ('/orderproduct'),[token required]
the endpoint order table to get one orderproduct       ('/orderproduct/:id')[token required]
the endpoint order table to post create orderproduct   ('/orderproduct')[token required]
the endpoint order table to delete orderproduct        ('/orderproduct/:id')[token required]
## Data Shapes

### typeScript

#### user
    id?: string|number;
    firstname: string;
    lastname: string;
    password?: string;
#### product
    id?: string|number;
    name: string;
    category?: string;
    price: number;
#### order
    id?: string|number;
    users_id: string|number;
    products_id: string|number;
    status_of_orders: 'active'|'complete',
    quantity: number,  
#### order_product
    id?: string|number;
    order_id: string|number;
    products_id: string|number;
    quantity: number,  

### postgres tables

#### user
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
#### product
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(200) NULL
#### order
    id SERIAL PRIMARY KEY,
    users_id integer NOT NULL,
    products_id integer NOT NULL,
    status_of_orders status_of_order NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (users_id)
      REFERENCES users (id),
    FOREIGN KEY (products_id)
      REFERENCES products (id)
#### order_product
    id SERIAL PRIMARY KEY,
    order_id integer NOT NULL,
    products_id integer NOT NULL,
    quantity integer NOT NULL,
    FOREIGN KEY (order_id)
      REFERENCES orders (id),
    FOREIGN KEY (products_id)
      REFERENCES products (id)
### table relation 
#### user to product
that many to many relationship in orders table  at (users_id) and (products_id) that REFERENCES users table column (id) and products table column (id)
#### order to product
that many to many relationship in order_products table  at (order_id) and (products_id) that REFERENCES orders table column (id) and products table column (id)

# Before
## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders 
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

