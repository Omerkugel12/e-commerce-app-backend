import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db";
import User from "./models/user.model";
import Product from "./models/product.model";
import Cart from "./models/cart.model";

const SALT_ROUNDS = 10; // Number of rounds to generate salt. 10 is recommended value

dotenv.config(); // Load environment variables

const users = [
  {
    username: "john_doe",
    password: "password123",
  },
  {
    username: "jane_doe",
    password: "password456",
  },
];

const products = [
  {
    name: "Product 1",
    description: "Description for product 1",
    price: 10.99,
  },
  {
    name: "Product 2",
    description: "Description for product 2",
    price: 19.99,
  },
  {
    name: "Product 3",
    description: "Description for product 3",
    price: 25.99,
  },
];

async function seedDB() {
  try {
    await connectDB(); // Connect to the database
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});

    const createdUsers = await Promise.all(
      users.map(async (u) => {
        const hashedPassword = await bcrypt.hash(u.password, SALT_ROUNDS); // Hash password
        const user = new User({ ...u, password: hashedPassword }); // Create new user object
        await user.save(); // Save user to database
        return user; // Return the saved user object
      })
    );

    const createdProducts = await Product.insertMany(products);

    // Assign products to users and create carts
    const carts = createdUsers.map((user, index) => {
      const userProducts = createdProducts
        .slice(index, index + 2)
        .map((p) => p._id);
      return new Cart({
        user: user._id,
        products: userProducts,
      });
    });

    await Promise.all(carts.map((cart) => cart.save()));

    console.log("Database seeded successfully");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
