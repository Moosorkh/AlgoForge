import React from "react";
import { useQuery } from "@tanstack/react-query";
import { algorithmAPI } from "../api";
import AlgorithmCard from "../components/AlgorithmCard";
import { Algorithm } from "../types";

const Home: React.FC = () => {
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

  // Group by main category first, then by subcategory
  const algorithmItems =
    algorithms?.filter((algo: Algorithm) => algo.main_category === "Algorithms" || !algo.main_category) || [];
  const frameworkItems =
    algorithms?.filter((algo: Algorithm) => algo.main_category === "Frameworks") || [];

  const sortingAlgorithms = algorithmItems.filter((algo: Algorithm) => algo.category === "Sorting");
  const searchingAlgorithms = algorithmItems.filter((algo: Algorithm) => algo.category === "Searching");

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Master Algorithms & Frameworks Through Interactive Learning
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore algorithms, frameworks, and technologies with visualizations, interactive lessons,
          and quizzes. Learn by doing and become an expert!
        </p>
      </section>

      {/* Algorithms Section */}
      <section className="space-y-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-4 border-primary-500 pb-2">
          📚 Algorithms
        </h2>

        {/* Sorting Algorithms */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg">
              Sorting Algorithms
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortingAlgorithms.map((algorithm: Algorithm) => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        </div>

        {/* Searching Algorithms */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg">
              Searching Algorithms
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchingAlgorithms.map((algorithm: Algorithm) => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      {frameworkItems.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-2">
            ⚛️ Frameworks & Libraries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworkItems.map((algorithm: Algorithm) => (
              <AlgorithmCard key={algorithm.id} algorithm={algorithm} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
