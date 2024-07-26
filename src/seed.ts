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
    name: "Apple",
    description: "Fresh red apples",
    price: 1.99,
  },
  {
    name: "Banana",
    description: "Ripe yellow bananas",
    price: 0.99,
  },
  {
    name: "Orange",
    description: "Juicy oranges",
    price: 1.49,
  },
  {
    name: "Milk",
    description: "1 liter of whole milk",
    price: 1.29,
  },
  {
    name: "Bread",
    description: "Whole grain bread",
    price: 2.49,
  },
  {
    name: "Eggs",
    description: "Dozen of organic eggs",
    price: 3.49,
  },
  {
    name: "Chicken Breast",
    description: "Boneless chicken breast",
    price: 5.99,
  },
  {
    name: "Rice",
    description: "1 kg of basmati rice",
    price: 2.99,
  },
  {
    name: "Broccoli",
    description: "Fresh broccoli",
    price: 1.89,
  },
  {
    name: "Carrots",
    description: "1 kg of carrots",
    price: 1.49,
  },
  {
    name: "Tomatoes",
    description: "Fresh tomatoes",
    price: 2.99,
  },
  {
    name: "Potatoes",
    description: "1 kg of potatoes",
    price: 1.99,
  },
  {
    name: "Cheese",
    description: "Cheddar cheese",
    price: 4.49,
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
