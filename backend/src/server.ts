import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import algorithmRoutes from "./routes/algorithmRoutes";
import lessonRoutes from "./routes/lessonRoutes";
import progressRoutes from "./routes/progressRoutes";
import { db } from "./config/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.getConnection()
  .then((connection) => {
    console.log("✅ Successfully connected to MySQL database");
    connection.release();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL database:", err.message);
    console.error(
      "⚠️  Please ensure MySQL is running and credentials are correct in .env file"
    );
    console.error(
      "📝 Check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT in backend/.env"
    );
  });

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
