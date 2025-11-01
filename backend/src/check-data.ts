import { db } from "./config/db";

async function checkData() {
  try {
    console.log("🔍 Checking database content...\n");

    // Total count
    const [rows] = await db.query("SELECT COUNT(*) as count FROM algorithms");
    console.log("Total algorithms:", (rows as any)[0].count);

    // By category
    const [cats] = await db.query(
      "SELECT category, main_category, COUNT(*) as count FROM algorithms GROUP BY category, main_category ORDER BY main_category, category"
    );

    console.log("\n📊 By category:");
    (cats as any[]).forEach((c) => {
      console.log(`  ${c.main_category || "NULL"} - ${c.category}: ${c.count}`);
    });

    // Sample data
    const [samples] = await db.query(
      "SELECT id, name, category, main_category FROM algorithms LIMIT 5"
    );
    console.log("\n📝 Sample data:");
    (samples as any[]).forEach((s) => {
      console.log(
        `  ${s.id}. ${s.name} (${s.main_category || "NULL"} / ${s.category})`
      );
    });

    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

checkData();
