import { db } from "./config/db";

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT NOW() AS now");
    console.log("✅ Database connected successfully:", rows);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  } finally {
    process.exit();
  }
}

testConnection();
