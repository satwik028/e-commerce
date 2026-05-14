import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Product from './models/product.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing categories and products');

    // Create Categories
    const menCat = await Category.create({ name: 'Men', description: 'Men Clothing' });
    const womenCat = await Category.create({ name: 'Women', description: 'Women Clothing' });
    const kidsCat = await Category.create({ name: 'Kids', description: 'Kids Clothing' });

    console.log('Created categories');

    // Create Products
    const products = [
      {
        name: 'Classic White Shirt',
        description: '100% cotton, regular fit.',
        price: 899,
        sku: 'M-SHIRT-001',
        category: menCat._id,
        subcategory: 'Shirts',
        sizes: ['S', 'M', 'L'],
        colors: ['White'],
        stock: 50,
        images: [{ url: 'https://via.placeholder.com/400x500?text=White+Shirt', public_id: 'white_shirt' }]
      },
      {
        name: 'Slim Fit Chinos',
        description: 'Stretchable, olive green.',
        price: 1099,
        sku: 'M-PANTS-001',
        category: menCat._id,
        subcategory: 'Pants',
        sizes: ['M', 'L', 'XL'],
        colors: ['Olive Green'],
        stock: 30,
        images: [{ url: 'https://via.placeholder.com/400x500?text=Chinos', public_id: 'chinos' }]
      },
      {
        name: 'Floral Lehenga',
        description: 'Hand-embroidered, chiffon.',
        price: 2899,
        sku: 'W-LEH-001',
        category: womenCat._id,
        subcategory: 'Lehengas',
        sizes: ['S', 'M'],
        colors: ['Pink', 'Red'],
        stock: 15,
        images: [{ url: 'https://via.placeholder.com/400x500?text=Floral+Lehenga', public_id: 'lehenga' }]
      },
      {
        name: 'Designer Saree',
        description: 'Contemporary designer style.',
        price: 1599,
        sku: 'W-SAR-001',
        category: womenCat._id,
        subcategory: 'Sarees',
        sizes: ['M'],
        colors: ['Blue', 'Gold'],
        stock: 20,
        images: [{ url: 'https://via.placeholder.com/400x500?text=Designer+Saree', public_id: 'saree' }]
      },
      {
        name: 'Superhero T-shirt',
        description: 'Marvel print, soft cotton.',
        price: 399,
        sku: 'K-TSHIRT-001',
        category: kidsCat._id,
        subcategory: 'Boys Kurtas', // using one of the navbar subcategories for mapping
        sizes: ['S', 'M'],
        colors: ['Red', 'Blue'],
        stock: 100,
        images: [{ url: 'https://via.placeholder.com/400x500?text=Superhero+Tshirt', public_id: 'k_tshirt' }]
      },
      {
        name: 'Princess Frock',
        description: 'Cute design, comfortable material.',
        price: 499,
        sku: 'K-FROCK-001',
        category: kidsCat._id,
        subcategory: 'Girls Lehengas',
        sizes: ['S', 'M', 'L'],
        colors: ['Pink', 'White'],
        stock: 40,
        images: [{ url: 'https://via.placeholder.com/400x500?text=Princess+Frock', public_id: 'k_frock' }]
      }
    ];

    await Product.insertMany(products);
    console.log(`Successfully seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
