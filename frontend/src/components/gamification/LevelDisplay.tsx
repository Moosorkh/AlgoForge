import React from "react";
import { FaTrophy, FaMedal } from "react-icons/fa";
import ProgressBar from "./ProgressBar";

interface LevelDisplayProps {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

const LevelDisplay: React.FC<LevelDisplayProps> = ({
  level,
  currentXP,
  xpToNextLevel,
}) => {
  const getLevelTitle = (level: number) => {
    if (level < 5) return "Beginner";
    if (level < 10) return "Intermediate";
    if (level < 20) return "Advanced";
    if (level < 30) return "Expert";
    return "Master";
  };

  const getLevelColor = (level: number) => {
    if (level < 5) return "from-green-400 to-green-600";
    if (level < 10) return "from-blue-400 to-blue-600";
    if (level < 20) return "from-purple-400 to-purple-600";
    if (level < 30) return "from-orange-400 to-orange-600";
    return "from-yellow-400 to-yellow-600";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${getLevelColor(
              level
            )} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
          >
            {level}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Level {level}
            </h3>
            <p className="text-sm text-gray-600">{getLevelTitle(level)}</p>
          </div>
        </div>
        <FaTrophy className="text-4xl text-yellow-500" />
      </div>

      <ProgressBar
        current={currentXP}
        total={xpToNextLevel}
        label="Progress to Next Level"
        color="bg-gradient-to-r from-primary-500 to-blue-500"
      />

      <div className="mt-4 text-center text-sm text-gray-600">
        {xpToNextLevel - currentXP} XP needed for Level {level + 1}
      </div>
    </div>
  );
};

export default LevelDisplay;
