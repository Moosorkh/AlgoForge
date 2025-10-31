import { Router, Request, Response } from "express";
import { db } from "../config/db";

const router = Router();

// GET /api/lessons/:id - Get specific lesson
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [lessons] = await db.query("SELECT * FROM lessons WHERE id = ?", [
      id,
    ]);

    if (!lessons || (Array.isArray(lessons) && lessons.length === 0)) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lesson = Array.isArray(lessons) ? lessons[0] : lessons;
    res.json(lesson);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
});

// POST /api/lessons/:id/complete - Mark lesson as completed
router.post("/:id/complete", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
    }

    // Get lesson details to find algorithm_id
    const [lessons] = await db.query(
      "SELECT algorithm_id FROM lessons WHERE id = ?",
      [id]
    );

    if (!lessons || (Array.isArray(lessons) && lessons.length === 0)) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lesson = Array.isArray(lessons) ? lessons[0] : lessons;
    const algorithm_id = (lesson as any).algorithm_id;

    // Insert or update user progress
    await db.query(
      "INSERT INTO user_progress (user_id, algorithm_id, lesson_id, status, last_accessed) VALUES (?, ?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE status = VALUES(status), last_accessed = NOW()",
      [user_id, algorithm_id, id, "Completed"]
    );

    res.json({ success: true, message: "Lesson marked as completed" });
  } catch (error) {
    console.error("Error completing lesson:", error);
    res.status(500).json({ error: "Failed to complete lesson" });
  }
});

// POST /api/lessons/:id/progress - Update lesson progress
router.post("/:id/progress", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { user_id, status } = req.body;

    if (!user_id || !status) {
      return res.status(400).json({ error: "user_id and status are required" });
    }

    // Get lesson details
    const [lessons] = await db.query(
      "SELECT algorithm_id FROM lessons WHERE id = ?",
      [id]
    );

    if (!lessons || (Array.isArray(lessons) && lessons.length === 0)) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    const lesson = Array.isArray(lessons) ? lessons[0] : lessons;
    const algorithm_id = (lesson as any).algorithm_id;

    // Insert or update user progress
    await db.query(
      "INSERT INTO user_progress (user_id, algorithm_id, lesson_id, status, last_accessed) VALUES (?, ?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE status = VALUES(status), last_accessed = NOW()",
      [user_id, algorithm_id, id, status]
    );

    res.json({ success: true, message: "Progress updated" });
  } catch (error) {
    console.error("Error updating lesson progress:", error);
    res.status(500).json({ error: "Failed to update lesson progress" });
  }
});

export default router;
