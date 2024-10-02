export type Product = {
    id: number;
    name: string;
    category: string;
    price: number; // Price in CFA
    brand?: string;
    size?: string;
    color?: string;
    material?: string;
    author?: string;
    ageRange?: string;
    image: string;
  };
  
  export const categories = ['Clothing', 'Electronics', 'Home', 'Books', 'Beauty', 'Toys'];
  
  export const products: Product[] = [
    { id: 1, name: 'Nike Air Max 270', category: 'Clothing', price: 97500, brand: 'Nike', size: 'M', color: 'Red', image: 'https://images.unsplash.com/photo-1614138052320-2ca6d5ecba00?auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Apple iPhone 13', category: 'Electronics', price: 649350, brand: 'Apple', image: 'https://images.unsplash.com/photo-1633844827890-46b60ae4a5ab?auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Samsung 4K UHD TV', category: 'Electronics', price: 422500, brand: 'Samsung', image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Ikea Ektorp Sofa', category: 'Home', price: 195000, brand: 'Ikea', material: 'Wood', image: 'https://images.unsplash.com/photo-1578898886487-98cdbef052f2?auto=format&fit=crop&w=500&q=60' },
    { id: 5, name: 'Levi’s 501 Original Jeans', category: 'Clothing', price: 45500, brand: 'Levi’s', size: 'L', color: 'Blue', image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=60' },
    { id: 6, name: 'The Great Gatsby', category: 'Books', price: 9750, author: 'F. Scott Fitzgerald', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=60' },
    { id: 7, name: 'L’Oreal Paris Revitalift Cream', category: 'Beauty', price: 16250, brand: 'L’Oreal', image: 'https://images.unsplash.com/photo-1612831666605-4bc61b5fcf58?auto=format&fit=crop&w=500&q=60' },
    { id: 8, name: 'Lego City Police Station', category: 'Toys', price: 65000, ageRange: '6-8', image: 'https://images.unsplash.com/photo-1610991044439-7044f64bca4e?auto=format&fit=crop&w=500&q=60' },
    { id: 9, name: 'Sony WH-1000XM4', category: 'Electronics', price: 192500, brand: 'Sony', image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=500&q=60' },
    { id: 10, name: 'Amazon Echo Dot', category: 'Electronics', price: 35500, brand: 'Amazon', image: 'https://images.unsplash.com/photo-1614850522907-4e1b57b3478e?auto=format&fit=crop&w=500&q=60' },
    // ...continue adding more products up to 50
    // Fill more products from multiple categories to make a total of 50
  ];
  