import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

async function setupDatabase() {
  let connection;

  try {
    console.log("🔌 Connecting to MySQL...");

    // First connect without database to create it if it doesn't exist
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      port: Number(process.env.DB_PORT) || 3306,
    });

    console.log("✅ Connected to MySQL server");

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || "algoforge";
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Switch to the database
    await connection.query(`USE ${dbName}`);
    console.log(`✅ Using database '${dbName}'`);

    // Read and execute schema
    const schemaPath = path.join(__dirname, "database", "schema_mysql.sql");
    if (fs.existsSync(schemaPath)) {
      console.log("📋 Running schema...");
      const schema = fs.readFileSync(schemaPath, "utf8");

      // Split by semicolon and execute each statement
      const statements = schema
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
        await connection.query(statement);
      }

      console.log("✅ Schema created successfully");
    } else {
      console.log("⚠️  Schema file not found, skipping...");
    }

    // Check if we have any data
    const [rows] = await connection.query(
      "SELECT COUNT(*) as count FROM algorithms"
    );
    const count = (rows as any)[0].count;

    console.log(`📊 Current algorithm count: ${count}`);

    if (count === 0) {
      console.log(
        "⚠️  No algorithms found in database. Please run your seed scripts to populate data."
      );
    } else {
      console.log("✅ Database has data!");
    }

    console.log("\n🎉 Database setup completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("   1. Make sure MySQL server is running");
    console.log("   2. Run 'npm run dev' to start the application");
    console.log("   3. If you need to seed data, run your seed scripts\n");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
