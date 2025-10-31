import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Algorithm } from "../types";

interface AlgorithmCardProps {
  algorithm: Algorithm;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "Advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryColor = (category: string) => {
    return category === "Sorting"
      ? "bg-primary-100 text-primary-700"
      : "bg-green-100 text-green-700";
  };

  return (
    <Link to={`/algorithm/${algorithm.id}`}>
      <div className="card hover:scale-105 transform transition-all duration-200 cursor-pointer h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{algorithm.name}</h3>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                algorithm.category
              )}`}
            >
              {algorithm.category}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {algorithm.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                algorithm.difficulty
              )}`}
            >
              {algorithm.difficulty}
            </span>
          </div>

          <div className="flex items-center text-primary-600 font-semibold">
            <span>Learn More</span>
            <FaArrowRight className="ml-2" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AlgorithmCard;
