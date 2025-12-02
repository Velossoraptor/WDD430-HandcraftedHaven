-- USERS (Buyers)
CREATE TABLE users (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fname VARCHAR(150) NOT NULL,
    lname VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    account_type account_type NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CATEGORIES
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- PRODUCTS / LISTINGS
CREATE TABLE products (
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   account_id UUID REFERENCES users(id) ON DELETE CASCADE,
   product_image TEXT NOT NULL,
   product_name TEXT NOT NULL,
   description TEXT NOT NULL,
   price NUMERIC(10, 2) NOT NULL,
   stock NUMERIC(10) NOT NULL,
   category categories-type NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- FAVORITES (Wishlists)
CREATE TABLE favorites (
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, product_id)
);
-- ORDERS
CREATE TABLE orders (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending',
    -- pending | paid | shipped | cancelled | delivered
    created_at TIMESTAMP DEFAULT NOW()
);
-- ORDER ITEMS
CREATE TABLE order_items (
    order_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(order_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE
    SET NULL,
        quantity INT NOT NULL,
        price_each NUMERIC(10, 2) NOT NULL
);
-- REVIEWS
CREATE TABLE reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(product_id) ON DELETE CASCADE,
    rating INT CHECK (
        rating >= 1
        AND rating <= 5
    ),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
-- ADDRESSES (For shipping)
CREATE TABLE addresses (
    address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    full_name VARCHAR(150),
    phone VARCHAR(20),
    country VARCHAR(100),
    state VARCHAR(100),
    city VARCHAR(100),
    street TEXT,
    postal_code VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE
);
-- carts
CREATE TABLE carts (
    cart_id UUID default gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) on DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
-- Cart item
CREATE TABLE cart_items(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(cart_id),
    product_name TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    product_image TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    product_id UUID NOT NULL REFERENCES products(product_id)
);