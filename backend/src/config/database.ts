import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool | null = null;

try {
  pool = new Pool({
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    database: process.env.DATABASE_NAME || "algoforge",
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASSWORD || "postgres",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  pool.on("connect", () => {
    console.log("✅ Connected to PostgreSQL database");
  });

  pool.on("error", (err: any) => {
    console.error("⚠️ Database connection error:", err.message);
  });
} catch (err) {
  console.error("⚠️ Failed to initialize database pool");
}

export default pool as Pool;
