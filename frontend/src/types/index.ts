export interface Algorithm {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  main_category?: string;
  created_at: string;
}

export interface Lesson {
  id: number;
  algorithm_id: number;
  title: string;
  content: string;
  lesson_type: "Theory" | "Visualization" | "Game" | "Quiz";
  order_index: number;
  created_at: string;
}

export interface AlgorithmWithLessons extends Algorithm {
  lessons: Lesson[];
}

export interface UserProgress {
  id: number;
  user_id: number;
  algorithm_id: number;
  lesson_id: number;
  status: "Not Started" | "In Progress" | "Completed";
  last_accessed: string;
  algorithm_name?: string;
  category?: string;
  lesson_title?: string;
  lesson_type?: string;
}

export interface UserStats {
  algorithms_started: number;
  lessons_completed: number;
  lessons_in_progress: number;
  total_lessons_accessed: number;
}
