import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { algorithmAPI } from "../api";
import { Algorithm } from "../types";
import {
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

interface TopicSectionProps {
  title: string;
  icon: string;
  algorithms: Algorithm[];
  colorScheme: string;
}

const TopicSection: React.FC<TopicSectionProps> = ({
  title,
  icon,
  algorithms,
  colorScheme,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(
    null
  );
  const navigate = useNavigate();

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

  if (algorithms.length === 0) return null;

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary-400 transition-colors">
      {/* Topic Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full ${colorScheme} p-6 flex items-center justify-between hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{icon}</span>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {algorithms.length} algorithm{algorithms.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isExpanded ? (
            <FaChevronDown className="text-2xl text-gray-700" />
          ) : (
            <FaChevronRight className="text-2xl text-gray-700" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-white border-t-2 border-gray-200">
          <div className="divide-y divide-gray-200">
            {algorithms.map((algorithm) => (
              <div key={algorithm.id}>
                {/* Algorithm List Item */}
                <button
                  onClick={() =>
                    setSelectedAlgorithm(
                      selectedAlgorithm?.id === algorithm.id ? null : algorithm
                    )
                  }
                  className="w-full p-6 hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-12 rounded-full ${
                        selectedAlgorithm?.id === algorithm.id
                          ? "bg-primary-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="text-left">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {algorithm.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <FaStar className="text-yellow-500 text-sm" />
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                            algorithm.difficulty
                          )}`}
                        >
                          {algorithm.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedAlgorithm?.id === algorithm.id ? (
                      <FaChevronDown className="text-primary-600" />
                    ) : (
                      <FaChevronRight className="text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Algorithm Details */}
                {selectedAlgorithm?.id === algorithm.id && (
                  <div className="bg-gradient-to-br from-primary-50 to-white border-t border-gray-200">
                    <div className="p-8 max-w-4xl">
                      <div className="mb-6">
                        <h5 className="text-lg font-bold text-gray-900 mb-3">
                          About {algorithm.name}
                        </h5>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {algorithm.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Category</p>
                          <p className="font-semibold text-gray-900">
                            {algorithm.category}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">
                            Difficulty Level
                          </p>
                          <p className="font-semibold text-gray-900">
                            {algorithm.difficulty}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/algorithm/${algorithm.id}`);
                        }}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                      >
                        <span>Start Learning</span>
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const HomeUpdated: React.FC = () => {
  const {
    data: algorithms,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["algorithms"],
    queryFn: algorithmAPI.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-600">Loading algorithms...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-red-600">Error loading algorithms</div>
      </div>
    );
  }

  // Define category metadata
  const categoryMetadata: Record<string, { icon: string; color: string; order: number }> = {
    Sorting: { icon: "🔢", color: "bg-gradient-to-r from-blue-100 to-blue-50", order: 1 },
    Searching: { icon: "🔍", color: "bg-gradient-to-r from-green-100 to-green-50", order: 2 },
    Array: { icon: "📊", color: "bg-gradient-to-r from-purple-100 to-purple-50", order: 3 },
    String: { icon: "📝", color: "bg-gradient-to-r from-yellow-100 to-yellow-50", order: 4 },
    LinkedList: { icon: "🔗", color: "bg-gradient-to-r from-pink-100 to-pink-50", order: 5 },
    Stack: { icon: "📚", color: "bg-gradient-to-r from-indigo-100 to-indigo-50", order: 6 },
    Queue: { icon: "🎫", color: "bg-gradient-to-r from-teal-100 to-teal-50", order: 7 },
    Tree: { icon: "🌳", color: "bg-gradient-to-r from-green-100 to-emerald-50", order: 8 },
    Graph: { icon: "🕸️", color: "bg-gradient-to-r from-cyan-100 to-cyan-50", order: 9 },
    DynamicProgramming: { icon: "⚡", color: "bg-gradient-to-r from-orange-100 to-orange-50", order: 10 },
    Greedy: { icon: "💰", color: "bg-gradient-to-r from-yellow-100 to-amber-50", order: 11 },
    Backtracking: { icon: "↩️", color: "bg-gradient-to-r from-red-100 to-red-50", order: 12 },
    Hashing: { icon: "#️⃣", color: "bg-gradient-to-r from-violet-100 to-violet-50", order: 13 },
    Heap: { icon: "⛰️", color: "bg-gradient-to-r from-rose-100 to-rose-50", order: 14 },
    Trie: { icon: "🌲", color: "bg-gradient-to-r from-lime-100 to-lime-50", order: 15 },
    Math: { icon: "➗", color: "bg-gradient-to-r from-blue-100 to-sky-50", order: 16 },
    BitManipulation: { icon: "1️⃣0️⃣", color: "bg-gradient-to-r from-gray-100 to-gray-50", order: 17 },
  };

  // Group algorithms by category
  const algorithmsByCategory = algorithms?.reduce((acc: Record<string, Algorithm[]>, algo: Algorithm) => {
    if (!acc[algo.category]) {
      acc[algo.category] = [];
    }
    acc[algo.category].push(algo);
    return acc;
  }, {}) || {};

  // Sort categories by order
  const sortedCategories = Object.keys(algorithmsByCategory).sort((a, b) => {
    const orderA = categoryMetadata[a]?.order || 999;
    const orderB = categoryMetadata[b]?.order || 999;
    return orderA - orderB;
  });

  // Calculate stats
  const totalAlgorithms = algorithms?.length || 0;
  const beginnerCount = algorithms?.filter((a: Algorithm) => a.difficulty === "Beginner").length || 0;
  const intermediateCount = algorithms?.filter((a: Algorithm) => a.difficulty === "Intermediate").length || 0;
  const advancedCount = algorithms?.filter((a: Algorithm) => a.difficulty === "Advanced").length || 0;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-primary-50 via-purple-50 to-blue-50 rounded-2xl shadow-lg">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Master 95+ Interview Algorithms
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Complete coverage of all algorithms asked in FAANG and top tech company interviews.
          Learn through interactive visualizations, step-by-step code building, and gamified lessons!
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
            ✓ {beginnerCount} Beginner
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">
            ✓ {intermediateCount} Intermediate
          </span>
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
            ✓ {advancedCount} Advanced
          </span>
        </div>
      </section>

      {/* Topics Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Browse by Category
          </h2>
          <span className="text-gray-600 font-medium">
            {sortedCategories.length} categories • {totalAlgorithms} algorithms
          </span>
        </div>

        {/* Render all categories */}
        {sortedCategories.map((category) => (
          <TopicSection
            key={category}
            title={category.replace(/([A-Z])/g, " $1").trim()} // Add spaces to camelCase
            icon={categoryMetadata[category]?.icon || "📌"}
            algorithms={algorithmsByCategory[category]}
            colorScheme={categoryMetadata[category]?.color || "bg-gradient-to-r from-gray-100 to-gray-50"}
          />
        ))}
      </section>

      {/* Stats Dashboard */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">
            {totalAlgorithms}
          </h3>
          <p className="text-gray-600">Total Algorithms</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <h3 className="text-3xl font-bold text-green-600 mb-2">
            {sortedCategories.length}
          </h3>
          <p className="text-gray-600">Categories</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <h3 className="text-3xl font-bold text-purple-600 mb-2">
            100%
          </h3>
          <p className="text-gray-600">Interview Coverage</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
          <h3 className="text-3xl font-bold text-orange-600 mb-2">
            5+
          </h3>
          <p className="text-gray-600">Lesson Types</p>
        </div>
      </section>
    </div>
  );
};

export default HomeUpdated;
