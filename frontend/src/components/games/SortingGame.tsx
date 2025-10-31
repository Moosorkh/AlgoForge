import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface SortingGameProps {
  algorithmName: string;
}

const SortingGame: React.FC<SortingGameProps> = ({ algorithmName }) => {
  const [array, setArray] = useState<number[]>([]);
  const [userArray, setUserArray] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const generateArray = () => {
    const newArray = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 50) + 10
    );
    setArray(newArray);
    setUserArray([...newArray]);
    setSelectedIndex(null);
    setIsComplete(false);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const handleSwap = (index: number) => {
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else {
      if (selectedIndex !== index) {
        const newArray = [...userArray];
        [newArray[selectedIndex], newArray[index]] = [
          newArray[index],
          newArray[selectedIndex],
        ];
        setUserArray(newArray);
        setAttempts(attempts + 1);
      }
      setSelectedIndex(null);
    }
  };

  const checkSolution = () => {
    const sortedArray = [...array].sort((a, b) => a - b);
    const isCorrect = JSON.stringify(userArray) === JSON.stringify(sortedArray);

    if (isCorrect) {
      setScore(score + 1);
      setIsComplete(true);
    } else {
      alert("Not quite right! Try again or reset the puzzle.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Sorting Challenge
            </h3>
            <p className="text-gray-600">Click two elements to swap them</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">{score}</div>
            <div className="text-sm text-gray-600">Score</div>
          </div>
        </div>

        {/* Original Array */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Original:</p>
          <div className="flex space-x-2">
            {array.map((value, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-700"
              >
                {value}
              </div>
            ))}
          </div>
        </div>

        {/* User Array */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Your Solution:
          </p>
          <div className="flex space-x-2">
            {userArray.map((value, index) => (
              <div
                key={index}
                onClick={() => !isComplete && handleSwap(index)}
                className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold cursor-pointer transition-all transform hover:scale-110 ${
                  selectedIndex === index
                    ? "bg-yellow-400 text-yellow-900 ring-4 ring-yellow-300"
                    : isComplete
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {value}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Attempts: {attempts}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={checkSolution}
            disabled={isComplete}
            className="btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            <FaCheckCircle className="mr-2" />
            Check Solution
          </button>
          <button onClick={generateArray} className="btn-secondary">
            New Puzzle
          </button>
        </div>

        {isComplete && (
          <div className="mt-4 bg-green-100 border-2 border-green-500 rounded-lg p-4 flex items-center">
            <FaCheckCircle className="text-green-600 text-2xl mr-3" />
            <div>
              <p className="font-bold text-green-900">Perfect! 🎉</p>
              <p className="text-green-700">
                You sorted the array in {attempts} swaps!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Game Instructions:</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Click on an element to select it (it will turn yellow)</li>
          <li>Click on another element to swap them</li>
          <li>Try to sort the array in ascending order</li>
          <li>Click "Check Solution" when you think you're done</li>
        </ul>
      </div>
    </div>
  );
};

export default SortingGame;
