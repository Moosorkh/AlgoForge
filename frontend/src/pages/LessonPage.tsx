import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { lessonAPI, algorithmAPI } from "../api";
import { FaArrowLeft, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import BubbleSortVisualization from "../components/visualizations/BubbleSortVisualization";
import BinarySearchVisualization from "../components/visualizations/BinarySearchVisualization";
import SortingGame from "../components/games/SortingGame";
import AlgorithmQuiz from "../components/quiz/AlgorithmQuiz";

const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  const { data: lesson, isLoading } = useQuery({
    queryKey: ["lesson", id],
    queryFn: () => lessonAPI.getById(Number(id)),
  });

  const { data: algorithm } = useQuery({
    queryKey: ["algorithm", lesson?.algorithm_id],
    queryFn: () => algorithmAPI.getById(lesson!.algorithm_id),
    enabled: !!lesson,
  });

  const completeMutation = useMutation({
    mutationFn: () => lessonAPI.complete(Number(id), 1), // Using user_id = 1 for demo
    onSuccess: () => {
      setIsCompleted(true);
    },
  });

  if (isLoading || !lesson) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-600">Loading lesson...</div>
      </div>
    );
  }

  const handleComplete = () => {
    completeMutation.mutate();
  };

  const findNextLesson = () => {
    if (!algorithm) return null;
    const currentIndex = algorithm.lessons.findIndex((l) => l.id === lesson.id);
    return algorithm.lessons[currentIndex + 1];
  };

  const nextLesson = findNextLesson();

  const renderVisualization = () => {
    if (lesson.lesson_type !== "Visualization") return null;

    // Determine which visualization to show based on algorithm
    if (algorithm?.name.includes("Bubble Sort")) {
      return <BubbleSortVisualization />;
    } else if (algorithm?.name.includes("Binary Search")) {
      return <BinarySearchVisualization />;
    }

    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-600">
          Visualization component coming soon for {algorithm?.name}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/algorithm/${lesson.algorithm_id}`)}
        className="flex items-center text-primary-600 hover:text-primary-700 mb-6 font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Back to {algorithm?.name}
      </button>

      {/* Lesson Header */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">
              {lesson.lesson_type}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mt-2">
              {lesson.title}
            </h1>
          </div>
          {isCompleted && (
            <div className="flex items-center text-green-600 font-semibold">
              <FaCheckCircle className="mr-2" />
              Completed
            </div>
          )}
        </div>
      </div>

      {/* Lesson Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        {lesson.lesson_type === "Theory" && (
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {lesson.content}
            </div>
          </div>
        )}

        {lesson.lesson_type === "Visualization" && (
          <div className="space-y-6">
            <div className="text-gray-700 mb-4">{lesson.content}</div>
            {renderVisualization()}
          </div>
        )}

        {lesson.lesson_type === "Game" && (
          <div className="space-y-6">
            <div className="text-gray-700 mb-4">{lesson.content}</div>
            <SortingGame algorithmName={algorithm?.name || ""} />
          </div>
        )}

        {lesson.lesson_type === "Quiz" && (
          <div className="space-y-6">
            <div className="text-gray-700 mb-4">{lesson.content}</div>
            <AlgorithmQuiz algorithmName={algorithm?.name || ""} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`${
            isCompleted
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-6 py-3 rounded-lg transition font-medium flex items-center`}
        >
          <FaCheckCircle className="mr-2" />
          {isCompleted ? "Completed" : "Mark as Complete"}
        </button>

        {nextLesson && (
          <button
            onClick={() => navigate(`/lesson/${nextLesson.id}`)}
            className="btn-primary flex items-center"
          >
            Next Lesson
            <FaArrowRight className="ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
