import axios from "axios";
import {
  Algorithm,
  AlgorithmWithLessons,
  Lesson,
  UserProgress,
  UserStats,
} from "../types";

const API_BASE_URL = "/api";

// Algorithm API
export const algorithmAPI = {
  getAll: async (): Promise<Algorithm[]> => {
    const response = await axios.get(`${API_BASE_URL}/algorithms`);
    return response.data;
  },

  getById: async (id: number): Promise<AlgorithmWithLessons> => {
    const response = await axios.get(`${API_BASE_URL}/algorithms/${id}`);
    return response.data;
  },

  getByCategory: async (category: string): Promise<Algorithm[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/algorithms/category/${category}`
    );
    return response.data;
  },
};

// Lesson API
export const lessonAPI = {
  getById: async (id: number): Promise<Lesson> => {
    const response = await axios.get(`${API_BASE_URL}/lessons/${id}`);
    return response.data;
  },

  complete: async (id: number, userId: number): Promise<UserProgress> => {
    const response = await axios.post(
      `${API_BASE_URL}/lessons/${id}/complete`,
      {
        user_id: userId,
      }
    );
    return response.data;
  },

  updateProgress: async (
    id: number,
    userId: number,
    status: string
  ): Promise<UserProgress> => {
    const response = await axios.post(
      `${API_BASE_URL}/lessons/${id}/progress`,
      {
        user_id: userId,
        status,
      }
    );
    return response.data;
  },
};

// Progress API
export const progressAPI = {
  getUserProgress: async (userId: number): Promise<UserProgress[]> => {
    const response = await axios.get(`${API_BASE_URL}/progress/${userId}`);
    return response.data;
  },

  getAlgorithmProgress: async (
    userId: number,
    algorithmId: number
  ): Promise<UserProgress[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/progress/${userId}/algorithm/${algorithmId}`
    );
    return response.data;
  },

  getUserStats: async (userId: number): Promise<UserStats> => {
    const response = await axios.get(
      `${API_BASE_URL}/progress/${userId}/stats`
    );
    return response.data;
  },
};
