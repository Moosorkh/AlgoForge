import { db } from "./config/db";
import fs from "fs";
import path from "path";

async function runMigrations() {
  try {
    console.log("Running database migrations...");

    // Add categories column
    const addCategoriesSql = fs.readFileSync(
      path.join(__dirname, "./database/add_categories.sql"),
      "utf8"
    );

    const statements = addCategoriesSql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    for (const statement of statements) {
      try {
        await db.query(statement);
        console.log("✅ Executed:", statement.substring(0, 50) + "...");
      } catch (error: any) {
        if (error.code === "ER_DUP_FIELDNAME") {
          console.log("⚠️ Column already exists, skipping...");
        } else {
          console.error("Error:", error.message);
        }
      }
    }

    // Add React content
    const addReactSql = fs.readFileSync(
      path.join(__dirname, "./database/add_react_content.sql"),
      "utf8"
    );

    const reactStatements = addReactSql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    for (const statement of reactStatements) {
      try {
        if (statement.toLowerCase().includes("set @")) {
          // Skip variable assignments for now - we'll handle this differently
          continue;
        }
        await db.query(statement);
        console.log("✅ Executed React content statement");
      } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
          console.log("⚠️ Content already exists, skipping...");
        } else {
          console.error("Error:", error.message);
        }
      }
    }

    console.log("✅ Migrations completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

runMigrations();
