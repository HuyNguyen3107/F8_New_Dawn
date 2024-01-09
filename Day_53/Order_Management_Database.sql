Database: database_02_manhhuy

DROP DATABASE IF EXISTS database_02_manhhuy;

CREATE DATABASE database_02_manhhuy
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

CREATE TABLE public.customers
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(15) NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT customers_id_primary PRIMARY KEY (id),
    CONSTRAINT customers_name_email_phone_unique UNIQUE (name, email, phone_number)
);

ALTER TABLE IF EXISTS public.customers
    OWNER to postgres;

CREATE TABLE public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name character varying(100) NOT NULL,
    product_code character varying(100) NOT NULL,
    price real NOT NULL,
    quantity bigint NOT NULL,
    status boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT products_id_primary PRIMARY KEY (id),
    CONSTRAINT products_name_product_code_unique UNIQUE (name, product_code)
);

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

CREATE TABLE public.customers_products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    customer_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity bigint NOT NULL,
    status boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    CONSTRAINT customers_products_id_primary PRIMARY KEY (id),
    CONSTRAINT customers_products_customer_id_foreign FOREIGN KEY (customer_id)
        REFERENCES public.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT customers_products_product_id_foreign FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE IF EXISTS public.customers_products
    OWNER to postgres;

INSERT INTO customers(name, email, phone_number)
VALUES ('Ta Hoang An', 'hoangan@gmail.com', '0987654321');

INSERT INTO customers(name, email, phone_number)
VALUES ('Dang Ngoc Son', 'sondn@gmail.com', '0987654322');

INSERT INTO customers(name, email, phone_number)
VALUES ('Luu Anh Quan', 'anhquan2211@gmail.com', '0987654323');

INSERT INTO customers(name, email, phone_number)
VALUES ('Nguyen Minh Nhat Duong', 'duongnguyen@gmail.com', '0987654324');

INSERT INTO customers(name, email, phone_number)
VALUES ('Le Duc Nam', 'leducnam@gmail.com', '0987654325');

INSERT INTO customers(name, email, phone_number)
VALUES ('Dang Ngoc Khai', 'namdinhquetoi@gmail.com', '0987654326');

INSERT INTO customers(name, email, phone_number)
VALUES ('Nguyen Trung Nguyen', 'nguyenjs@gmail.com', '0987654327');

INSERT INTO customers(name, email, phone_number)
VALUES ('Nguyen Manh Huy', 'huyne@gmail.com', '0987654328');

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 1', 'rztmdjcve1ebunye', 1000, 300000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 2', 'FJKZDXkNWw0qK09Z', 2000, 200000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 3', 'XSOhd5PeqfDTNCHP', 3000, 100000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 4', '3pBLAagR2AwpuNhi', 1000, 300000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 5', '6SgE8vDmtVKycaBQ', 5000, 400000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 6', 'fpF2sOKZ3RLfneNW', 1000, 500000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 7', 'RuZDzF6ieR6lH0nt', 3000, 400000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 8', 'yM43h8bY9So255L1', 2000, 600000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 9', 'n2DoZNpDl8QmNIJm', 5000, 100000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 10', 'JA1OKSdnwvQGbbQy', 1000, 300000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 11', 'qq3HVMxa7Z1oLeCh', 3300, 250000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 12', 'YjDapXwuJqRusj0o', 1400, 306000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 13', 'Sf2InU6OqqExwhry', 4200, 240000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 14', 'RrjvgybLtd32L9JX', 3100, 304000, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 15', 'S2IVBCScoJXqLryV', 1050, 300600, true);

INSERT INTO products(name, product_code, price, quantity, status)
VALUES ('Product 16', 'e2Mugs0DhEaTEBKY', 5600, 110000, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 1, 3, 5, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 2, 5, 10, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 3, 3, 8, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 4, 8, 7, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 5, 2, 15, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 6, 7, 8, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 7, 8, 9, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 8, 9, 10, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 1, 7, 4, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 1, 12, 50, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 1, 2, 6, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 2, 3, 8, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 2, 6, 7, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 3, 1, 9, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 4, 1, 20, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 5, 5, 5, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 6, 6, 8, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 7, 9, 15, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 8, 14, 10, true);

INSERT INTO customers_products(customer_id, product_id, quantity, status)
VALUES ( 8, 16, 12, true);

SELECT customers.name, customers.email, customers.phone_number, 
SUM(customers_products.quantity) AS total_product,
SUM(customers_products.quantity * products.price) AS total_price,
customers_products.status,
MAX(customers_products.created_at) AS order_time
FROM customers 
INNER JOIN customers_products
ON customers.id = customers_products.customer_id
INNER JOIN products
ON products.id = customers_products.product_id
GROUP BY customers.name, customers.email, customers.phone_number, customers_products.status
ORDER BY name ASC

SELECT customers.name, customers.email, customers.phone_number, 
products.name AS product_name, products.product_code, products.price,
SUM(customers_products.quantity) AS total_product,
SUM(customers_products.quantity * products.price) AS total_price,
customers_products.status, customers_products.created_at, customers_products.updated_at
FROM customers 
INNER JOIN customers_products
ON customers.id = customers_products.customer_id
INNER JOIN products
ON products.id = customers_products.product_id
GROUP BY customers.name, customers.email, customers.phone_number, 
products.name, products.product_code, products.price,
customers_products.status, customers_products.created_at, customers_products.updated_at
ORDER BY name ASC