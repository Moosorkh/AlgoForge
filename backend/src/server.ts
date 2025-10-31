import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import algorithmRoutes from "./routes/algorithmRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import progressRoutes from "./routes/progressRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/algorithms", algorithmRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "AlgoForge API is running" });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
