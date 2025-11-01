import { db } from "./config/db";

async function addMissingColumns() {
  try {
    console.log("📝 Adding missing columns to algorithms table...\n");

    // Check if columns exist
    const [cols] = await db.query("DESCRIBE algorithms");
    const columnNames = (cols as any[]).map((c) => c.Field);

    const columnsToAdd = [
      { name: "time_complexity", type: "VARCHAR(50)", after: "difficulty" },
      {
        name: "space_complexity",
        type: "VARCHAR(50)",
        after: "time_complexity",
      },
      { name: "use_cases", type: "TEXT", after: "space_complexity" },
    ];

    for (const col of columnsToAdd) {
      if (!columnNames.includes(col.name)) {
        console.log(`Adding column: ${col.name}...`);
        await db.query(
          `ALTER TABLE algorithms ADD COLUMN ${col.name} ${col.type} AFTER ${col.after}`
        );
        console.log(`✅ Added ${col.name}`);
      } else {
        console.log(`⏭️  Column ${col.name} already exists`);
      }
    }

    console.log("\n🎉 Schema update complete!\n");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

addMissingColumns();
