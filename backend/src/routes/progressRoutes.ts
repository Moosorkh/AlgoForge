import { Router, Request, Response } from "express";
import { db } from "../config/db";

const router = Router();

// GET /api/progress/:user_id - Get user's learning progress
router.get("/:user_id", async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const [results] = await db.query(
      `SELECT 
        up.*,
        a.name as algorithm_name,
        a.category,
        l.title as lesson_title,
        l.lesson_type
       FROM user_progress up
       JOIN algorithms a ON up.algorithm_id = a.id
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = ?
       ORDER BY up.last_accessed DESC`,
      [user_id]
    );

    res.json(results || []);
  } catch (error) {
    console.error("Error fetching user progress:", error);
    res.status(500).json({ error: "Failed to fetch user progress" });
  }
});

// GET /api/progress/:user_id/algorithm/:algorithm_id - Get progress for specific algorithm
router.get(
  "/:user_id/algorithm/:algorithm_id",
  async (req: Request, res: Response) => {
    try {
      const { user_id, algorithm_id } = req.params;

      const [results] = await db.query(
        `SELECT 
        up.*,
        l.title as lesson_title,
        l.lesson_type,
        l.order_index
       FROM user_progress up
       JOIN lessons l ON up.lesson_id = l.id
       WHERE up.user_id = ? AND up.algorithm_id = ?
       ORDER BY l.order_index`,
        [user_id, algorithm_id]
      );

      res.json(results || []);
    } catch (error) {
      console.error("Error fetching algorithm progress:", error);
      res.status(500).json({ error: "Failed to fetch algorithm progress" });
    }
  }
);

// GET /api/progress/:user_id/stats - Get overall statistics
router.get("/:user_id/stats", async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const [results] = await db.query(
      `SELECT 
        COUNT(DISTINCT algorithm_id) as algorithms_started,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as lessons_completed,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as lessons_in_progress,
        COUNT(*) as total_lessons_accessed
       FROM user_progress
       WHERE user_id = ?`,
      [user_id]
    );

    res.json(results && Array.isArray(results) && results.length > 0 ? results[0] : {});
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
});

export default router;
