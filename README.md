# AlgoForge

Interactive algorithm learning platform with visualizations, games, and quizzes.

## Features

- 🎯 Interactive algorithm visualizations using D3.js
- 🎮 Gamified learning experiences
- 📚 Comprehensive lessons for sorting and searching algorithms
- 📊 Progress tracking and user statistics
- 🎨 Modern, responsive UI with TailwindCSS

## Algorithms Covered

### Sorting Algorithms

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Counting Sort

### Searching Algorithms

- Binary Search
- Linear Search

## Tech Stack

### Frontend

- React 18 with TypeScript
- Vite for fast development
- TailwindCSS for styling
- D3.js for visualizations
- React Query for state management
- React Router for navigation

### Backend

- Node.js with Express
- TypeScript
- PostgreSQL database
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/AlgoForge.git
cd AlgoForge
```

2. Install root dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

5. Set up the database:

```bash
# Create a PostgreSQL database named 'algoforge'
createdb algoforge

# Copy the environment file
cd ../backend
cp .env.example .env

# Update .env with your database credentials
```

6. Initialize the database:

```bash
# Run the schema
psql -d algoforge -f src/database/schema.sql

# Seed with sample data
psql -d algoforge -f src/database/seed.sql
```

### Running the Application

From the root directory:

```bash
# Run both frontend and backend concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend (runs on port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (runs on port 3000)
cd frontend
npm run dev
```

Access the application at `http://localhost:3000`

## API Endpoints

### Algorithms

- `GET /api/algorithms` - Get all algorithms
- `GET /api/algorithms/:id` - Get algorithm with lessons
- `GET /api/algorithms/category/:category` - Get algorithms by category

### Lessons

- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/:id/complete` - Mark lesson as completed
- `POST /api/lessons/:id/progress` - Update lesson progress

### Progress

- `GET /api/progress/:user_id` - Get user's learning progress
- `GET /api/progress/:user_id/algorithm/:algorithm_id` - Get progress for specific algorithm
- `GET /api/progress/:user_id/stats` - Get user statistics

## Project Structure

```
AlgoForge/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── database/
│   │   │   ├── schema.sql
│   │   │   └── seed.sql
│   │   ├── routes/
│   │   │   ├── algorithmRoutes.ts
│   │   │   ├── lessonRoutes.ts
│   │   │   └── progressRoutes.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── games/
│   │   │   ├── visualizations/
│   │   │   ├── AlgorithmCard.tsx
│   │   │   └── Layout.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── AlgorithmPage.tsx
│   │   │   └── LessonPage.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Algorithm visualizations inspired by VisuAlgo
- UI design inspired by modern educational platforms
