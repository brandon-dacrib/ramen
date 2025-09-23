"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./utils/database");
const Product_1 = __importDefault(require("./models/Product"));
const User_1 = __importDefault(require("./models/User"));
const auth_1 = require("./utils/auth");
dotenv_1.default.config();
const sampleProducts = [
    {
        name: 'Shin Ramyun Spicy',
        description: 'Authentic Korean spicy ramen with rich beef flavor and vegetables. A perfect blend of spicy gochugaru and savory broth.',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
        category: 'Korean',
        stock: 50,
        featured: true,
    },
    {
        name: 'Tonkotsu Ramen Premium',
        description: 'Rich pork bone broth ramen with authentic Japanese flavors. Creamy, hearty, and incredibly satisfying.',
        price: 3.49,
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
        category: 'Japanese',
        stock: 30,
        featured: true,
    },
    {
        name: 'Miso Ramen Classic',
        description: 'Traditional miso-based ramen with corn and green onions. A comforting bowl of umami goodness.',
        price: 2.89,
        image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop',
        category: 'Japanese',
        stock: 40,
        featured: false,
    },
    {
        name: 'Thai Tom Yum',
        description: 'Spicy and sour Thai-style instant noodles with lemongrass, lime leaves, and aromatic herbs.',
        price: 2.79,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
        category: 'Thai',
        stock: 25,
        featured: true,
    },
    {
        name: 'Shoyu Ramen Traditional',
        description: 'Light soy sauce-based broth with a delicate flavor profile. Perfect for those who prefer subtle tastes.',
        price: 2.69,
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
        category: 'Japanese',
        stock: 35,
        featured: false,
    },
    {
        name: 'Kimchi Ramen Fusion',
        description: 'Spicy Korean kimchi ramen with fermented vegetables and a tangy, spicy kick.',
        price: 3.19,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop',
        category: 'Korean',
        stock: 28,
        featured: true,
    },
    {
        name: 'Beef Pho Inspired',
        description: 'Vietnamese-inspired beef noodle soup with aromatic herbs and spices.',
        price: 3.29,
        image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop',
        category: 'Vietnamese',
        stock: 22,
        featured: false,
    },
    {
        name: 'Vegetarian Miso',
        description: 'Plant-based miso ramen with tofu and vegetables. Delicious and cruelty-free.',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop',
        category: 'Vegetarian',
        stock: 45,
        featured: false,
    },
];
async function seedDatabase() {
    try {
        console.log('🌱 Connecting to database...');
        await (0, database_1.connectToDatabase)();
        console.log('🗑️  Clearing existing data...');
        await Product_1.default.deleteMany({});
        await User_1.default.deleteMany({});
        console.log('📦 Creating products...');
        await Product_1.default.insertMany(sampleProducts);
        console.log('👤 Creating admin user...');
        const adminPassword = await (0, auth_1.hashPassword)('admin123');
        const adminUser = new User_1.default({
            email: 'admin@ramenshop.com',
            password: adminPassword,
            name: 'Ramen Admin',
            role: 'admin',
        });
        await adminUser.save();
        console.log('👤 Creating test customer...');
        const customerPassword = await (0, auth_1.hashPassword)('customer123');
        const customerUser = new User_1.default({
            email: 'customer@test.com',
            password: customerPassword,
            name: 'Test Customer',
            role: 'customer',
        });
        await customerUser.save();
        console.log('✅ Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   Products: ${sampleProducts.length}`);
        console.log(`   Admin User: admin@ramenshop.com / admin123`);
        console.log(`   Test Customer: customer@test.com / customer123`);
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}
seedDatabase();
//# sourceMappingURL=seed.js.map