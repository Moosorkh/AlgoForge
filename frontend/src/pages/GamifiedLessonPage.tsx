import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { lessonAPI, algorithmAPI } from "../api";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaTrophy,
  FaFire,
  FaBook,
  FaEye,
  FaGamepad,
  FaQuestionCircle,
  FaLock,
  FaPlay,
} from "react-icons/fa";
import BubbleSortVisualization from "../components/visualizations/BubbleSortVisualization";
import BinarySearchVisualization from "../components/visualizations/BinarySearchVisualization";
import SortingGame from "../components/games/SortingGame";
import AlgorithmQuiz from "../components/quiz/AlgorithmQuiz";
import ProgressBar from "../components/gamification/ProgressBar";
import PointsDisplay from "../components/gamification/PointsDisplay";
import AchievementBadge from "../components/gamification/AchievementBadge";
import AchievementPopup from "../components/gamification/AchievementPopup";
import LevelDisplay from "../components/gamification/LevelDisplay";
import StreakCounter from "../components/gamification/StreakCounter";
import ProgressiveCodeBuilder from "../components/code/ProgressiveCodeBuilder";
import { Achievement } from "../types";
import { codeLessons } from "../data/codeLessons";

const GamifiedLessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Gamification State
  const [isCompleted, setIsCompleted] = useState(false);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(5);
  const [currentXP, setCurrentXP] = useState(150);
  const [xpToNextLevel] = useState(500);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(
    null
  );
  const [unlockedAchievements, setUnlockedAchievements] = useState<
    Achievement[]
  >([
    {
      id: "first_lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: true,
      unlockedAt: new Date().toISOString(),
    },
  ]);

  const allAchievements: Achievement[] = [
    {
      id: "first_lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      unlocked: true,
      unlockedAt: new Date().toISOString(),
    },
    {
      id: "streak_7",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "🔥",
      unlocked: false,
    },
    {
      id: "perfect_quiz",
      title: "Quiz Master",
      description: "Get 100% on a quiz",
      icon: "🎓",
      unlocked: false,
    },
    {
      id: "speed_demon",
      title: "Speed Demon",
      description: "Complete a visualization in under 30 seconds",
      icon: "⚡",
      unlocked: false,
    },
    {
      id: "game_champion",
      title: "Game Champion",
      description: "Win 10 games",
      icon: "🏆",
      unlocked: false,
    },
  ];

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
    mutationFn: () => lessonAPI.complete(Number(id), 1),
    onSuccess: () => {
      handleLessonComplete();
    },
  });

  const handleLessonComplete = () => {
    setIsCompleted(true);

    // Award points
    const pointsEarned = lesson?.lesson_type === "Quiz" ? 100 :
                        lesson?.lesson_type === "Game" ? 150 :
                        lesson?.lesson_type === "Visualization" ? 75 : 50;

    setPoints((prev) => prev + pointsEarned);
    setCurrentXP((prev) => prev + pointsEarned);
    setShowPointsAnimation(true);

    // Check for new achievements
    setTimeout(() => {
      const achievement = {
        id: "lesson_complete",
        title: "Lesson Master",
        description: `Completed ${lesson?.title}`,
        icon: "✅",
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      };
      setNewAchievement(achievement);
      setUnlockedAchievements((prev) => [...prev, achievement]);
    }, 1000);
  };

  const findNextLesson = () => {
    if (!algorithm) return null;
    const currentIndex = algorithm.lessons.findIndex((l) => l.id === lesson.id);
    return algorithm.lessons[currentIndex + 1];
  };

  const findPreviousLesson = () => {
    if (!algorithm) return null;
    const currentIndex = algorithm.lessons.findIndex((l) => l.id === lesson.id);
    return algorithm.lessons[currentIndex - 1];
  };

  const getCurrentProgress = () => {
    if (!algorithm || !lesson) return { current: 0, total: 0 };
    const currentIndex = algorithm.lessons.findIndex((l) => l.id === lesson.id);
    return { current: currentIndex + 1, total: algorithm.lessons.length };
  };

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

  const nextLesson = findNextLesson();
  const previousLesson = findPreviousLesson();
  const progress = getCurrentProgress();

  if (isLoading || !lesson) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500"></div>
      </div>
    );
  }

  const renderVisualization = () => {
    if (lesson.lesson_type !== "Visualization") return null;

    if (algorithm?.name.includes("Bubble Sort")) {
      return <BubbleSortVisualization />;
    } else if (algorithm?.name.includes("Binary Search")) {
      return <BinarySearchVisualization />;
    }

    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-12 text-center">
        <FaPlay className="text-6xl text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">
          Visualization coming soon for {algorithm?.name}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Achievement Popup */}
        <AchievementPopup
          achievement={newAchievement}
          onClose={() => setNewAchievement(null)}
        />

        {/* Header with Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Progress & Back Button */}
          <div className="lg:col-span-2">
            <button
              onClick={() => navigate(`/algorithm/${lesson.algorithm_id}`)}
              className="flex items-center text-primary-600 hover:text-primary-700 mb-4 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to {algorithm?.name}
            </button>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  Course Progress
                </h2>
                <span className="text-sm text-gray-600">
                  Lesson {progress.current} of {progress.total}
                </span>
              </div>
              <ProgressBar
                current={progress.current}
                total={progress.total}
                color="bg-gradient-to-r from-primary-500 to-purple-500"
              />
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <PointsDisplay
                points={points}
                showAnimation={showPointsAnimation}
                onAnimationComplete={() => setShowPointsAnimation(false)}
              />
            </div>
            <StreakCounter streak={streak} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lesson Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Header */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <div className="text-4xl">{getLessonIcon(lesson.lesson_type)}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm uppercase tracking-wide font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {lesson.lesson_type}
                    </span>
                    {isCompleted && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <FaCheckCircle /> Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold">{lesson.title}</h1>
                </div>
              </div>
            </div>

            {/* Lesson Content Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {lesson.lesson_type === "Theory" && (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {lesson.content}
                    </div>
                  </div>

                  {/* Progressive Code Builder */}
                  {algorithm?.name && codeLessons[algorithm.name] && (
                    <div className="mt-8">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          Build the Code Step-by-Step
                        </h3>
                        <p className="text-gray-600">
                          Follow along as we construct the {algorithm.name} algorithm together!
                        </p>
                      </div>
                      <ProgressiveCodeBuilder
                        steps={codeLessons[algorithm.name].steps}
                        language={codeLessons[algorithm.name].language}
                        onComplete={() => {
                          setPoints((prev) => prev + 200);
                          setCurrentXP((prev) => prev + 200);
                          const achievement = {
                            id: "code_master",
                            title: "Code Master",
                            description: `Built the complete ${algorithm.name} code!`,
                            icon: "💻",
                            unlocked: true,
                            unlockedAt: new Date().toISOString(),
                          };
                          setNewAchievement(achievement);
                          setUnlockedAchievements((prev) => [...prev, achievement]);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {lesson.lesson_type === "Visualization" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-gray-700">{lesson.content}</p>
                  </div>
                  {renderVisualization()}
                </div>
              )}

              {lesson.lesson_type === "Game" && (
                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                    <p className="text-gray-700">{lesson.content}</p>
                  </div>
                  <SortingGame algorithmName={algorithm?.name || ""} />
                </div>
              )}

              {lesson.lesson_type === "Quiz" && (
                <div className="space-y-6">
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                    <p className="text-gray-700">{lesson.content}</p>
                  </div>
                  <AlgorithmQuiz algorithmName={algorithm?.name || ""} />
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  previousLesson && navigate(`/lesson/${previousLesson.id}`)
                }
                disabled={!previousLesson}
                className={`${
                  previousLesson
                    ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                } px-6 py-3 rounded-lg transition font-medium flex items-center`}
              >
                <FaArrowLeft className="mr-2" />
                Previous
              </button>

              <button
                onClick={() => completeMutation.mutate()}
                disabled={isCompleted}
                className={`${
                  isCompleted
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 animate-pulse"
                } text-white px-8 py-3 rounded-lg transition font-medium flex items-center shadow-lg`}
              >
                <FaCheckCircle className="mr-2" />
                {isCompleted ? "Completed! +" + (lesson.lesson_type === "Quiz" ? 100 : lesson.lesson_type === "Game" ? 150 : lesson.lesson_type === "Visualization" ? 75 : 50) + " XP" : "Complete Lesson"}
              </button>

              <button
                onClick={() => nextLesson && navigate(`/lesson/${nextLesson.id}`)}
                disabled={!nextLesson}
                className={`${
                  nextLesson
                    ? "bg-primary-600 hover:bg-primary-700 text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                } px-6 py-3 rounded-lg transition font-medium flex items-center`}
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Level Display */}
            <LevelDisplay
              level={level}
              currentXP={currentXP}
              xpToNextLevel={xpToNextLevel}
            />

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaTrophy className="text-yellow-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {allAchievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    size="small"
                  />
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                {unlockedAchievements.length} / {allAchievements.length} Unlocked
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Learning Path
              </h3>
              <div className="space-y-2">
                {algorithm?.lessons.map((l, index) => (
                  <div
                    key={l.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      l.id === lesson.id
                        ? "bg-primary-100 border-2 border-primary-500"
                        : index < progress.current - 1
                        ? "bg-green-50 border border-green-200"
                        : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        l.id === lesson.id
                          ? "bg-primary-500 text-white"
                          : index < progress.current - 1
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {index < progress.current - 1 ? (
                        <FaCheckCircle />
                      ) : index > progress.current - 1 ? (
                        <FaLock />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {l.title}
                      </div>
                      <div className="text-xs text-gray-600">
                        {l.lesson_type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedLessonPage;
