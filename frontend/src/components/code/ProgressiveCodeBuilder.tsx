import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaCheckCircle,
  FaLightbulb,
  FaCode,
  FaTrophy,
} from "react-icons/fa";
import CodeSnippet from "./CodeSnippet";
import { CodeStep } from "../../types";

interface ProgressiveCodeBuilderProps {
  steps: CodeStep[];
  language?: string;
  onComplete?: () => void;
}

const ProgressiveCodeBuilder: React.FC<ProgressiveCodeBuilderProps> = ({
  steps,
  language = "javascript",
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [accumulatedCode, setAccumulatedCode] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const allStepsCompleted = completedSteps.size === steps.length;

  useEffect(() => {
    // Build accumulated code from all completed steps
    let code = "";
    for (let i = 0; i <= currentStepIndex; i++) {
      if (i > 0) code += "\n\n";
      code += steps[i].code;
    }
    setAccumulatedCode(code);
  }, [currentStepIndex, steps]);

  const handleNext = () => {
    if (!isLastStep) {
      markStepComplete(currentStepIndex);
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const markStepComplete = (stepIndex: number) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepIndex);
    setCompletedSteps(newCompleted);

    if (newCompleted.size === steps.length && !allStepsCompleted) {
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        onComplete?.();
      }, 3000);
    }
  };

  const handleStepClick = (index: number) => {
    // Allow navigation to any step
    setCurrentStepIndex(index);
  };

  const handleCompleteAll = () => {
    markStepComplete(currentStepIndex);
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      onComplete?.();
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center transform animate-bounce-slow shadow-2xl">
            <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4 animate-float" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Code Complete! 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              You've successfully built the entire algorithm!
            </p>
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-700">+200 XP</p>
              <p className="text-sm text-gray-600">Code Master Achievement</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <FaCode className="text-primary-600" />
            Building the Algorithm
          </h3>
          <span className="text-sm text-gray-600">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Step Indicators */}
        <div className="flex gap-2 mb-3">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`flex-1 h-2 rounded-full transition-all ${
                index === currentStepIndex
                  ? "bg-primary-600 h-3"
                  : completedSteps.has(index)
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
              title={`Step ${index + 1}: ${step.title}`}
            />
          ))}
        </div>

        <div className="text-xs text-gray-500 text-center">
          {completedSteps.size} of {steps.length} steps completed
        </div>
      </div>

      {/* Step Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Explanation */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {currentStepIndex + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {currentStep.title}
              </h3>
            </div>

            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <FaLightbulb className="text-yellow-500 text-2xl mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">
                  {currentStep.explanation}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isFirstStep
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
            >
              <FaChevronLeft />
              Previous
            </button>

            {!isLastStep ? (
              <button
                onClick={handleNext}
                className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Next Step
                <FaChevronRight />
              </button>
            ) : (
              <button
                onClick={handleCompleteAll}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors animate-pulse"
              >
                <FaCheckCircle />
                Complete!
              </button>
            )}
          </div>
        </div>

        {/* Right: Code */}
        <div className="space-y-4">
          {/* Current Step Code */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                New Code for Step {currentStepIndex + 1}
              </h4>
              {completedSteps.has(currentStepIndex) && (
                <span className="text-green-600 text-sm flex items-center gap-1">
                  <FaCheckCircle /> Completed
                </span>
              )}
            </div>
            <CodeSnippet
              code={currentStep.code}
              language={currentStep.language || language}
              highlightLines={currentStep.highlight}
              title={currentStep.title}
            />
          </div>

          {/* Accumulated Code Preview */}
          {currentStepIndex > 0 && (
            <div>
              <div className="mb-2">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                  <FaPlay className="text-green-600" />
                  Full Code So Far
                </h4>
              </div>
              <div className="relative">
                <div className="absolute top-2 right-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  {currentStepIndex + 1} / {steps.length} steps
                </div>
                <CodeSnippet
                  code={accumulatedCode}
                  language={language}
                  title="Complete Code"
                  copyable={true}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Step Navigation Pills */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Quick Navigation
        </h4>
        <div className="flex flex-wrap gap-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                index === currentStepIndex
                  ? "bg-primary-600 text-white shadow-md"
                  : completedSteps.has(index)
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {completedSteps.has(index) && index !== currentStepIndex && (
                <FaCheckCircle className="inline mr-1" />
              )}
              {index + 1}. {step.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressiveCodeBuilder;
