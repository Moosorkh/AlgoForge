import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function setupDatabase() {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 3306,
    });

    console.log("✅ Connected to MySQL");

    // Create database
    const dbName = process.env.DB_NAME || "algoforge";
    console.log(`Creating database ${dbName}...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database ${dbName} created or already exists`);

    // Switch to the database
    await connection.query(`USE ${dbName}`);

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, "./database/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    console.log("Creating tables...");
    // Split by semicolon and execute each statement
    const statements = schema
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      await connection.query(statement);
    }
    console.log("✅ Tables created");

    // Read and execute seed.sql
    const seedPath = path.join(__dirname, "./database/seed.sql");
    const seed = fs.readFileSync(seedPath, "utf8");

    console.log("Seeding database...");
    const seedStatements = seed
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of seedStatements) {
      await connection.query(statement);
    }
    console.log("✅ Database seeded");

    await connection.end();
    console.log("✅ Database setup complete!");
    process.exit(0);
  } catch (error) {
    console.error(
      "❌ Error setting up database:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
}

setupDatabase();
