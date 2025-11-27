
-- Vendor table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY default gen_random_uuid(),
  fname character varying NOT NULL,
  lname character varying NOT NULL,
  email character varying NOT NULL,
  account_type account_type NOT null,
  pword character varying not null,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Listings table
CREATE TABLE IF NOT EXISTS public.listings (
  id UUID PRIMARY KEY default gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES users(id),
  product_image character varying not null,
  product_name character varying NOT NULL,
  description character varying NOT NULL,
  price NUMERIC NOT NULL,
  stock NUMERIC NOT NULL,
  category character varying not null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

-- carts
CREATE TABLE carts (
   cart_id UUID default gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES users(id) on DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Cart item
CREATE TABLE cart_items(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID NOT NULL REFERENCES public.carts(cart_id),
    product_name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    product_image TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    lsiting_id UUID NOT NULL REFERENCES listings(id)
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (listing_id, customer_id)  
);