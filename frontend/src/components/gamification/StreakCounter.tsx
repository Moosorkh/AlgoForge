import React from "react";
import { FaFire } from "react-icons/fa";

interface StreakCounterProps {
  streak: number;
  showLabel?: boolean;
}

const StreakCounter: React.FC<StreakCounterProps> = ({
  streak,
  showLabel = true,
}) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-purple-500";
    if (streak >= 14) return "text-orange-500";
    if (streak >= 7) return "text-yellow-500";
    return "text-red-500";
  };

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "Legendary Streak!";
    if (streak >= 14) return "On Fire!";
    if (streak >= 7) return "Great Streak!";
    if (streak >= 3) return "Keep it up!";
    return "Start your streak!";
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaFire
            className={`text-4xl ${getStreakColor(streak)} ${
              streak > 0 ? "animate-pulse" : ""
            }`}
          />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">{streak}</span>
              {showLabel && (
                <span className="text-sm text-gray-600">day streak</span>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {getStreakMessage(streak)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
