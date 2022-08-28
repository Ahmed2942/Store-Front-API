# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

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

# API Implementation

## Routes

### Products
- INDEX route: '/products' [GET] 
- SHOW route: '/products/:id' [GET] 
- CREATE route: '/products' [POST] {name, price, category}

### Users
- INDEX route: '/users' [GET] 
- SHOW route: '/users/:id' [GET] 
- CREATE route: '/users' [POST] {firstName,  lastName, password}

### Orders
- INDEX route: '/orders' [GET] 
- SHOW route: '/orders/:id' [GET] 
- CREATE route: '/orders' [POST] {userId, status}
- CURRENT ORDER: '/orders/users/:userid/active'
- COMPLETED ORDER: '/orders/users/:userid/completed'

## Database Tables & Schema
Table: products (id:, name:varchar(100), price:number, category:varchar(100))
Table: users (id:bigint, first_name:varchar(100), last_name:varchar(100), password_digest:varchar)
Table: orders (id:bigint, user_id:bigint[foreign key to users table], status:varchar(100))
Table: order_products (id:bigint, order_id:bigint, product_id:bigint, product_quantity:number)


