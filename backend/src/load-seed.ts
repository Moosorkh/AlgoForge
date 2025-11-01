import { db } from "./config/db";
import fs from "fs";
import path from "path";

async function loadSeedData() {
  try {
    console.log("🌱 Loading comprehensive seed data...\n");

    // Check current count
    const [beforeCount] = await db.query(
      "SELECT COUNT(*) as count FROM algorithms"
    );
    console.log(
      "Current algorithms in database:",
      (beforeCount as any)[0].count
    );

    // Read seed files
    const seedFile1 = path.join(
      __dirname,
      "database",
      "comprehensive_seed.sql"
    );
    const seedFile2 = path.join(
      __dirname,
      "database",
      "comprehensive_seed_part2.sql"
    );

    const files = [seedFile1, seedFile2].filter((f) => fs.existsSync(f));

    if (files.length === 0) {
      console.error("❌ No seed files found!");
      process.exit(1);
    }

    console.log(`\n📁 Found ${files.length} seed file(s)`);

    for (const file of files) {
      console.log(`\n📥 Loading: ${path.basename(file)}`);
      const sql = fs.readFileSync(file, "utf8");

      // Remove comments first
      const sqlWithoutComments = sql
        .split("\n")
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n");

      // Split by semicolon
      const statements = sqlWithoutComments
        .split(");")
        .map((s) => s.trim() + (s.trim() ? ");" : ""))
        .filter((s) => s.length > 3 && s.toLowerCase().includes("insert"));

      console.log(`   Found ${statements.length} INSERT statements`);

      let inserted = 0;
      let skipped = 0;

      for (const statement of statements) {
        try {
          // Add main_category if not present
          let finalStatement = statement;
          if (!statement.toLowerCase().includes("main_category")) {
            finalStatement = statement
              .replace(
                /INSERT INTO algorithms \(([^)]+)\)/i,
                "INSERT INTO algorithms ($1, main_category)"
              )
              .replace(/VALUES\s*\(/i, "VALUES (");
            // Add 'Algorithms' as default main_category before the closing parenthesis
            finalStatement = finalStatement.replace(/\);$/, ", 'Algorithms');");
          }

          await db.query(finalStatement);
          inserted++;
          if (inserted % 10 === 0) {
            process.stdout.write(`   📝 Inserted ${inserted}...\n`);
          }
        } catch (error: any) {
          // Skip duplicate entries
          if (error.code === "ER_DUP_ENTRY") {
            skipped++;
          } else {
            console.error("   ⚠️  Error:", error.message);
            console.error(
              "   Statement preview:",
              statement.substring(0, 100) + "..."
            );
          }
        }
      }

      console.log(
        `   ✅ Inserted: ${inserted}, Skipped (duplicates): ${skipped}`
      );
    }

    // Check final count
    const [afterCount] = await db.query(
      "SELECT COUNT(*) as count FROM algorithms"
    );
    const finalCount = (afterCount as any)[0].count;
    console.log(`\n✨ Final algorithm count: ${finalCount}`);

    // Show breakdown by category
    const [breakdown] = await db.query(
      "SELECT main_category, category, COUNT(*) as count FROM algorithms GROUP BY main_category, category ORDER BY main_category, category"
    );

    console.log("\n📊 Breakdown by category:");
    (breakdown as any[]).forEach((b) => {
      console.log(
        `   ${b.main_category || "Algorithms"} - ${b.category}: ${b.count}`
      );
    });

    console.log("\n🎉 Seed data loaded successfully!\n");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error loading seed data:", error.message);
    process.exit(1);
  }
}

loadSeedData();
