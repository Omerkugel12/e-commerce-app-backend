import app from "./app";
import connectDB from "./config/db";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
  dotenv.config();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
