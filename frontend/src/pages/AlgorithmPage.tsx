import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { algorithmAPI } from "../api";
import {
  FaBook,
  FaEye,
  FaGamepad,
  FaQuestionCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { Lesson } from "../types";

const AlgorithmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const {
    data: algorithm,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["algorithm", id],
    queryFn: () => algorithmAPI.getById(Number(id)),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-600">Loading algorithm...</div>
      </div>
    );
  }

  if (error || !algorithm) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-red-600">Algorithm not found</div>
      </div>
    );
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "Theory":
        return <FaBook className="text-blue-600" />;
      case "Visualization":
        return <FaEye className="text-purple-600" />;
      case "Game":
        return <FaGamepad className="text-green-600" />;
      case "Quiz":
        return <FaQuestionCircle className="text-orange-600" />;
      default:
        return null;
    }
  };

  const sortedLessons =
    algorithm.lessons?.sort(
      (a: Lesson, b: Lesson) => a.order_index - b.order_index
    ) || [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Back to Algorithms
      </button>

      {/* Algorithm Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-gray-900">{algorithm.name}</h1>
          <div className="flex gap-3">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                algorithm.category === "Sorting"
                  ? "bg-primary-100 text-primary-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {algorithm.category}
            </span>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                algorithm.difficulty === "Beginner"
                  ? "bg-green-100 text-green-700"
                  : algorithm.difficulty === "Intermediate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {algorithm.difficulty}
            </span>
          </div>
        </div>
        <p className="text-gray-700 text-lg">{algorithm.description}</p>
      </div>

      {/* Lessons Section */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Path</h2>
        <div className="space-y-4">
          {sortedLessons.map((lesson: Lesson, index: number) => (
            <div
              key={lesson.id}
              onClick={() => navigate(`/lesson/${lesson.id}`)}
              className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center font-bold text-gray-700">
                  {index + 1}
                </div>
                <div className="flex items-center space-x-3">
                  {getLessonIcon(lesson.lesson_type)}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lesson.lesson_type}
                    </p>
                  </div>
                </div>
              </div>
              <button className="btn-primary">Start</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
