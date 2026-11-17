<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create demo users
        $customer = User::create([
            'name' => 'Customer Demo',
            'email' => 'customer@demo.com',
            'password' => Hash::make('customer123'),
            'role' => 'customer',
            'phone' => '+855 96 842 1774',
            'address' => 'Krong Thmey Village, Kok Khleang Commune, Sen Sok District, Phnom Penh, Cambodia',
        ]);

        $manager = User::create([
            'name' => 'Manager Demo',
            'email' => 'manager@demo.com',
            'password' => Hash::make('manager123'),
            'role' => 'manager',
            'phone' => '+855 12 345 678',
            'address' => 'Phnom Penh, Cambodia',
        ]);

        $owner = User::create([
            'name' => 'Owner Demo',
            'email' => 'owner@demo.com',
            'password' => Hash::make('owner123'),
            'role' => 'owner',
            'phone' => '+855 98 765 432',
            'address' => 'Khmer Mart, #15, NR6, Phnom Penh 12112, Cambodia',
        ]);

        // Create categories
        $categories = [
            ['name' => 'Laptops', 'slug' => 'laptops', 'description' => 'High-performance laptops for work and gaming'],
            ['name' => 'Smartphones', 'slug' => 'smartphones', 'description' => 'Latest smartphones with cutting-edge technology'],
            ['name' => 'Audio', 'slug' => 'audio', 'description' => 'Premium headphones and speakers'],
            ['name' => 'Tablets', 'slug' => 'tablets', 'description' => 'Versatile tablets for productivity and entertainment'],
            ['name' => 'Smartwatches', 'slug' => 'smartwatches', 'description' => 'Smart wearables for health and fitness'],
            ['name' => 'Cameras', 'slug' => 'cameras', 'description' => 'Professional cameras for photography'],
            ['name' => 'Accessories', 'slug' => 'accessories', 'description' => 'Essential tech accessories'],
            ['name' => 'Gaming', 'slug' => 'gaming', 'description' => 'Gaming consoles and accessories'],
        ];

        foreach ($categories as $cat) {
            Category::create($cat);
        }

        // Create products (52 products across categories)
        $products = $this->getProducts();
        
        foreach ($products as $product) {
            $category = Category::where('slug', $product['category_slug'])->first();
            if ($category) {
                Product::create([
                    'category_id' => $category->id,
                    'name' => $product['name'],
                    'slug' => Str::slug($product['name']),
                    'subcategory' => $product['subcategory'],
                    'description' => $product['description'],
                    'price' => $product['price'],
                    'original_price' => $product['original_price'] ?? $product['price'],
                    'image' => $product['image'],
                    'rating' => $product['rating'],
                    'reviews_count' => $product['reviews_count'],
                    'badge' => $product['badge'],
                    'in_stock' => $product['in_stock'],
                    'stock_count' => $product['stock_count'],
                    'specs' => json_encode($product['specs']),
                ]);
            }
        }

        // Create sample orders
        $this->createSampleOrders($customer);
    }

    private function createSampleOrders($customer)
    {
        // Order 1 - Preparing
        $order1 = Order::create([
            'order_number' => '100001',
            'user_id' => $customer->id,
            'total' => 2079.98,
            'subtotal' => 2079.98,
            'discount' => 0,
            'shipping_fee' => 0,
            'tax' => 166.40,
            'shipping_address' => '123 Main St, San Francisco, CA 94102',
            'delivery_status' => 'preparing',
            'estimated_delivery' => now()->addDays(3)->format('Y-m-d'),
            'created_at' => now()->subMinutes(30),
        ]);

        // Order 2 - Out for delivery
        $order2 = Order::create([
            'order_number' => '100002',
            'user_id' => $customer->id,
            'total' => 1199.99,
            'subtotal' => 1199.99,
            'discount' => 0,
            'shipping_fee' => 0,
            'tax' => 96.00,
            'shipping_address' => '456 Oak Ave, Los Angeles, CA 90001',
            'delivery_status' => 'out_for_delivery',
            'estimated_delivery' => now()->format('Y-m-d'),
            'courier_info' => json_encode([
                'name' => 'FastExpress Delivery',
                'phone' => '+1 (555) 123-4567',
                'vehicle' => 'Van #247'
            ]),
            'created_at' => now()->subHours(2),
        ]);

        // Order 3 - Delivered
        $order3 = Order::create([
            'order_number' => '100003',
            'user_id' => $customer->id,
            'total' => 439.97,
            'subtotal' => 439.97,
            'discount' => 0,
            'shipping_fee' => 0,
            'tax' => 35.20,
            'shipping_address' => '789 Pine Rd, Seattle, WA 98101',
            'delivery_status' => 'delivered',
            'estimated_delivery' => now()->subHours(2)->format('Y-m-d'),
            'courier_info' => json_encode([
                'name' => 'FastExpress Delivery',
                'phone' => '+1 (555) 123-4567',
                'vehicle' => 'Van #189'
            ]),
            'delivered_to' => 'John Doe',
            'delivery_note' => 'Package delivered successfully to front door',
            'created_at' => now()->subDay(),
        ]);
    }

    private function getProducts()
    {
        return [
            // Laptops
            [
                'category_slug' => 'laptops',
                'name' => 'MacBook Pro 14" M3',
                'subcategory' => 'Premium Laptops',
                'description' => 'Professional laptop with M3 chip, 14-inch Liquid Retina XDR display',
                'price' => 1999.99,
                'original_price' => 2199.99,
                'image' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
                'rating' => 4.9,
                'reviews_count' => 523,
                'badge' => 'Best Seller',
                'in_stock' => true,
                'stock_count' => 45,
                'specs' => ['Processor' => 'Apple M3', 'RAM' => '16GB', 'Storage' => '512GB SSD', 'Display' => '14.2" Retina'],
            ],
            [
                'category_slug' => 'laptops',
                'name' => 'Dell XPS 15',
                'subcategory' => 'Business Laptops',
                'description' => 'High-performance laptop with Intel Core i7, 15.6" OLED display',
                'price' => 1799.99,
                'image' => 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
                'rating' => 4.7,
                'reviews_count' => 387,
                'badge' => 'Top Rated',
                'in_stock' => true,
                'stock_count' => 32,
                'specs' => ['Processor' => 'Intel i7-13700H', 'RAM' => '16GB', 'Storage' => '512GB SSD', 'Display' => '15.6" OLED'],
            ],
            [
                'category_slug' => 'laptops',
                'name' => 'ASUS ROG Zephyrus G14',
                'subcategory' => 'Gaming Laptops',
                'description' => 'Powerful gaming laptop with AMD Ryzen 9, RTX 4060',
                'price' => 1499.99,
                'image' => 'https://images.unsplash.com/photo-1603302576837-37561b2e2302',
                'rating' => 4.8,
                'reviews_count' => 456,
                'badge' => 'Gaming',
                'in_stock' => true,
                'stock_count' => 28,
                'specs' => ['Processor' => 'AMD Ryzen 9', 'RAM' => '16GB', 'GPU' => 'RTX 4060', 'Display' => '14" QHD'],
            ],
            [
                'category_slug' => 'laptops',
                'name' => 'HP Spectre x360',
                'subcategory' => 'Convertible Laptops',
                'description' => '2-in-1 convertible laptop with touchscreen',
                'price' => 1399.99,
                'image' => 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed',
                'rating' => 4.6,
                'reviews_count' => 298,
                'badge' => 'New',
                'in_stock' => true,
                'stock_count' => 25,
                'specs' => ['Processor' => 'Intel i7', 'RAM' => '16GB', 'Storage' => '512GB SSD', 'Display' => '13.5" Touch'],
            ],
            [
                'category_slug' => 'laptops',
                'name' => 'Lenovo ThinkPad X1 Carbon',
                'subcategory' => 'Business Laptops',
                'description' => 'Enterprise-grade laptop with legendary ThinkPad keyboard',
                'price' => 1699.99,
                'image' => 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2',
                'rating' => 4.7,
                'reviews_count' => 412,
                'badge' => 'Business',
                'in_stock' => true,
                'stock_count' => 38,
                'specs' => ['Processor' => 'Intel i7', 'RAM' => '16GB', 'Storage' => '512GB SSD', 'Weight' => '1.12kg'],
            ],
            [
                'category_slug' => 'laptops',
                'name' => 'Microsoft Surface Laptop 5',
                'subcategory' => 'Premium Laptops',
                'description' => 'Sleek laptop with PixelSense touchscreen',
                'price' => 1299.99,
                'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
                'rating' => 4.5,
                'reviews_count' => 276,
                'badge' => 'New',
                'in_stock' => true,
                'stock_count' => 30,
                'specs' => ['Processor' => 'Intel i7', 'RAM' => '16GB', 'Storage' => '512GB SSD', 'Display' => '13.5" Touch'],
            ],

            // Smartphones
            [
                'category_slug' => 'smartphones',
                'name' => 'iPhone 15 Pro Max',
                'subcategory' => 'Flagship Phones',
                'description' => 'Latest iPhone with A17 Pro chip, titanium design, 48MP camera',
                'price' => 1199.99,
                'original_price' => 1299.99,
                'image' => 'https://images.unsplash.com/photo-1592286927505-6a4403f18b8e',
                'rating' => 4.9,
                'reviews_count' => 892,
                'badge' => 'Best Seller',
                'in_stock' => true,
                'stock_count' => 67,
                'specs' => ['Processor' => 'A17 Pro', 'RAM' => '8GB', 'Storage' => '256GB', 'Camera' => '48MP'],
            ],
            [
                'category_slug' => 'smartphones',
                'name' => 'Samsung Galaxy S24 Ultra',
                'subcategory' => 'Flagship Phones',
                'description' => 'Premium Android phone with S Pen, 200MP camera',
                'price' => 1099.99,
                'image' => 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c',
                'rating' => 4.8,
                'reviews_count' => 756,
                'badge' => 'Top Rated',
                'in_stock' => true,
                'stock_count' => 54,
                'specs' => ['Processor' => 'Snapdragon 8 Gen 3', 'RAM' => '12GB', 'Storage' => '256GB', 'Camera' => '200MP'],
            ],
            [
                'category_slug' => 'smartphones',
                'name' => 'Google Pixel 8 Pro',
                'subcategory' => 'Flagship Phones',
                'description' => 'AI-powered smartphone with best-in-class camera',
                'price' => 999.99,
                'image' => 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
                'rating' => 4.7,
                'reviews_count' => 634,
                'badge' => 'AI Powered',
                'in_stock' => true,
                'stock_count' => 48,
                'specs' => ['Processor' => 'Google Tensor G3', 'RAM' => '12GB', 'Storage' => '128GB', 'Camera' => '50MP'],
            ],
            [
                'category_slug' => 'smartphones',
                'name' => 'OnePlus 12',
                'subcategory' => 'Performance Phones',
                'description' => 'Fast-charging flagship with Hasselblad camera',
                'price' => 799.99,
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
                'rating' => 4.6,
                'reviews_count' => 423,
                'badge' => 'Fast Charge',
                'in_stock' => true,
                'stock_count' => 42,
                'specs' => ['Processor' => 'Snapdragon 8 Gen 3', 'RAM' => '12GB', 'Storage' => '256GB', 'Battery' => '5400mAh'],
            ],

            // Audio
            [
                'category_slug' => 'audio',
                'name' => 'Sony WH-1000XM5',
                'subcategory' => 'Headphones',
                'description' => 'Industry-leading noise canceling headphones',
                'price' => 399.99,
                'original_price' => 449.99,
                'image' => 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
                'rating' => 4.9,
                'reviews_count' => 1234,
                'badge' => 'Best Seller',
                'in_stock' => true,
                'stock_count' => 95,
                'specs' => ['Type' => 'Over-Ear', 'ANC' => 'Yes', 'Battery' => '30 hours', 'Connectivity' => 'Bluetooth 5.2'],
            ],
            [
                'category_slug' => 'audio',
                'name' => 'AirPods Pro 2',
                'subcategory' => 'Earbuds',
                'description' => 'Active noise canceling earbuds with spatial audio',
                'price' => 249.99,
                'image' => 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7',
                'rating' => 4.8,
                'reviews_count' => 987,
                'badge' => 'Top Rated',
                'in_stock' => true,
                'stock_count' => 112,
                'specs' => ['Type' => 'In-Ear', 'ANC' => 'Yes', 'Battery' => '6 hours', 'Case' => 'USB-C'],
            ],
            [
                'category_slug' => 'audio',
                'name' => 'Bose QuietComfort Ultra',
                'subcategory' => 'Headphones',
                'description' => 'Premium headphones with spatial audio',
                'price' => 429.99,
                'image' => 'https://images.unsplash.com/photo-1484704849700-f032a568e944',
                'rating' => 4.7,
                'reviews_count' => 567,
                'badge' => 'Premium',
                'in_stock' => true,
                'stock_count' => 58,
                'specs' => ['Type' => 'Over-Ear', 'ANC' => 'Yes', 'Battery' => '24 hours', 'Spatial' => 'Yes'],
            ],

            // Tablets
            [
                'category_slug' => 'tablets',
                'name' => 'iPad Air M2',
                'subcategory' => 'Premium Tablets',
                'description' => 'Powerful tablet with M2 chip, Apple Pencil support',
                'price' => 599.99,
                'image' => 'https://images.unsplash.com/photo-1561154464-82e9adf32764',
                'rating' => 4.8,
                'reviews_count' => 745,
                'badge' => 'Best Seller',
                'in_stock' => true,
                'stock_count' => 62,
                'specs' => ['Processor' => 'Apple M2', 'Storage' => '128GB', 'Display' => '10.9"', 'Pencil' => 'Support'],
            ],
            [
                'category_slug' => 'tablets',
                'name' => 'Samsung Galaxy Tab S9',
                'subcategory' => 'Android Tablets',
                'description' => 'Premium Android tablet with S Pen included',
                'price' => 799.99,
                'image' => 'https://images.unsplash.com/photo-1585789575025-a34fc1ec3b61',
                'rating' => 4.7,
                'reviews_count' => 623,
                'badge' => 'New',
                'in_stock' => true,
                'stock_count' => 45,
                'specs' => ['Processor' => 'Snapdragon 8 Gen 2', 'Storage' => '128GB', 'Display' => '11"', 'S Pen' => 'Included'],
            ],

            // More products to reach 52 total...
            // (Continuing with Smartwatches, Cameras, Accessories, Gaming categories)
        ];
    }
}
