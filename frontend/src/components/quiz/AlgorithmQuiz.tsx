import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  algorithmName: string;
}

const bubbleSortQuestions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of Bubble Sort in the worst case?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: 2,
    explanation:
      "Bubble Sort has O(n²) time complexity in the worst case because it uses nested loops to compare and swap elements.",
  },
  {
    id: 2,
    question: "What does Bubble Sort do in each pass?",
    options: [
      "Divides the array in half",
      "Moves the largest unsorted element to its correct position",
      "Finds the minimum element",
      "Randomly shuffles elements",
    ],
    correctAnswer: 1,
    explanation:
      'In each pass, Bubble Sort compares adjacent elements and swaps them if needed, causing the largest element to "bubble up" to the end.',
  },
  {
    id: 3,
    question: "Is Bubble Sort a stable sorting algorithm?",
    options: ["Yes", "No", "Sometimes", "Depends on implementation"],
    correctAnswer: 0,
    explanation:
      "Yes, Bubble Sort is stable because it only swaps elements when they are out of order, preserving the relative order of equal elements.",
  },
];

const binarySearchQuestions: Question[] = [
  {
    id: 1,
    question: "What is a prerequisite for Binary Search to work?",
    options: [
      "Array must be unsorted",
      "Array must be sorted",
      "Array must have unique elements",
      "Array must be large",
    ],
    correctAnswer: 1,
    explanation:
      "Binary Search requires the array to be sorted so it can eliminate half of the remaining elements in each step.",
  },
  {
    id: 2,
    question: "What is the time complexity of Binary Search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: 2,
    explanation:
      "Binary Search has O(log n) time complexity because it divides the search space in half with each comparison.",
  },
  {
    id: 3,
    question:
      "In Binary Search, what happens if the target is less than the middle element?",
    options: [
      "Search the right half",
      "Search the left half",
      "Search both halves",
      "Element not found",
    ],
    correctAnswer: 1,
    explanation:
      "If the target is less than the middle element, we search the left half because the array is sorted.",
  },
];

const AlgorithmQuiz: React.FC<QuizProps> = ({ algorithmName }) => {
  const questions = algorithmName.includes("Bubble")
    ? bubbleSortQuestions
    : algorithmName.includes("Binary")
    ? binarySearchQuestions
    : bubbleSortQuestions; // Default

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? "🎉" : percentage >= 60 ? "😊" : "📚"}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quiz Complete!
          </h2>
          <div className="text-5xl font-bold text-primary-600 mb-4">
            {score} / {questions.length}
          </div>
          <p className="text-xl text-gray-700 mb-6">You scored {percentage}%</p>
          <button onClick={handleRestart} className="btn-primary">
            Restart Quiz
          </button>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Performance:</h3>
          <ul className="list-disc list-inside text-blue-800">
            {percentage >= 80 && (
              <li>
                Excellent! You have a strong understanding of {algorithmName}!
              </li>
            )}
            {percentage >= 60 && percentage < 80 && (
              <li>Good job! Review the lessons to improve further.</li>
            )}
            {percentage < 60 && (
              <li>
                Keep practicing! Review the theory and visualization lessons.
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-primary-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = showExplanation;

            let buttonClass =
              "w-full text-left p-4 rounded-lg border-2 transition-all ";

            if (showResult) {
              if (isCorrect) {
                buttonClass += "border-green-500 bg-green-50";
              } else if (isSelected && !isCorrect) {
                buttonClass += "border-red-500 bg-red-50";
              } else {
                buttonClass += "border-gray-200 bg-gray-50";
              }
            } else {
              buttonClass += isSelected
                ? "border-primary-500 bg-primary-50"
                : "border-gray-300 hover:border-primary-300 hover:bg-gray-50";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && (
                    <span>
                      {isCorrect && (
                        <FaCheckCircle className="text-green-600 text-xl" />
                      )}
                      {isSelected && !isCorrect && (
                        <FaTimesCircle className="text-red-600 text-xl" />
                      )}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-50 border-2 border-green-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <h4
              className={`font-bold mb-2 ${
                selectedAnswer === question.correctAnswer
                  ? "text-green-900"
                  : "text-red-900"
              }`}
            >
              {selectedAnswer === question.correctAnswer
                ? "✓ Correct!"
                : "✗ Incorrect"}
            </h4>
            <p
              className={
                selectedAnswer === question.correctAnswer
                  ? "text-green-800"
                  : "text-red-800"
              }
            >
              {question.explanation}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNext} className="btn-primary">
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmQuiz;
