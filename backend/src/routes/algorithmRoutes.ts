import { Router, Request, Response } from 'express';
import { db } from '../config/db';

const router = Router();

// GET /api/algorithms - Get all algorithms
router.get('/', async (req: Request, res: Response) => {
  try {
    const [algorithms] = await db.query('SELECT * FROM algorithms ORDER BY id');
    res.json(algorithms);
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    res.status(500).json({ error: 'Failed to fetch algorithms' });
  }
});

// GET /api/algorithms/:id - Get algorithm details with lessons
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [algorithms] = await db.query('SELECT * FROM algorithms WHERE id = ?', [id]);
    
    if (!algorithms || (Array.isArray(algorithms) && algorithms.length === 0)) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }

    const algorithm = Array.isArray(algorithms) ? algorithms[0] : algorithms;
    const [lessons] = await db.query('SELECT * FROM lessons WHERE algorithm_id = ? ORDER BY order_index', [id]);

    const algorithmWithLessons = {
      ...algorithm,
      lessons: lessons || [],
    };
    
    res.json(algorithmWithLessons);
  } catch (error) {
    console.error('Error fetching algorithm:', error);
    res.status(500).json({ error: 'Failed to fetch algorithm' });
  }
});

// GET /api/algorithms/category/:category - Get algorithms by category
router.get('/category/:category', async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const [algorithms] = await db.query('SELECT * FROM algorithms WHERE category = ? ORDER BY id', [category]);
    res.json(algorithms);
  } catch (error) {
    console.error('Error fetching algorithms by category:', error);
    res.status(500).json({ error: 'Failed to fetch algorithms' });
  }
});

export default router;
