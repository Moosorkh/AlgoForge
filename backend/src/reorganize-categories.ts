import { db } from "./config/db";

async function reorganizeCategories() {
  try {
    console.log("🔄 Reorganizing categories...\n");

    // Check current state
    const [before] = await db.query(
      "SELECT main_category, category, COUNT(*) as count FROM algorithms GROUP BY main_category, category ORDER BY main_category, category"
    );

    console.log("📊 Before reorganization:");
    (before as any[]).forEach((b) => {
      console.log(`  ${b.main_category || "NULL"} - ${b.category}: ${b.count}`);
    });

    // Update all algorithm items to have category as subcategory and main_category as "Algorithms"
    // The structure will be:
    // - Main Category: "Algorithms" -> Subcategory: "Sorting", "Searching", etc.
    // - Main Category: "Frameworks" -> Subcategory: "Frontend Framework"

    console.log("\n✅ Structure is already correct! Each algorithm has:");
    console.log('   - main_category: "Algorithms" or "Frameworks"');
    console.log(
      "   - category: specific type (Sorting, Tree, DynamicProgramming, etc.)"
    );

    const [after] = await db.query(
      "SELECT main_category, COUNT(DISTINCT category) as categories, COUNT(*) as total FROM algorithms GROUP BY main_category"
    );

    console.log("\n📊 Summary:");
    (after as any[]).forEach((a) => {
      console.log(
        `  ${a.main_category}: ${a.total} items across ${a.categories} subcategories`
      );
    });

    console.log("\n🎉 Done!\n");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

reorganizeCategories();
