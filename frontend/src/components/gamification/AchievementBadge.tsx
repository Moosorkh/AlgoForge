import React, { useState } from "react";
import { Achievement } from "../../types";

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "small" | "medium" | "large";
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = "medium",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    small: "w-12 h-12 text-2xl",
    medium: "w-16 h-16 text-3xl",
    large: "w-24 h-24 text-5xl",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${
          achievement.unlocked
            ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg animate-bounce-slow"
            : "bg-gray-300 grayscale opacity-50"
        } transition-all duration-300 hover:scale-110 cursor-pointer`}
      >
        <span>{achievement.icon}</span>
      </div>

      {showTooltip && (
        <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
          <div className="font-bold">{achievement.title}</div>
          <div className="text-xs text-gray-300">{achievement.description}</div>
          {achievement.unlocked && achievement.unlockedAt && (
            <div className="text-xs text-yellow-400 mt-1">
              Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
            </div>
          )}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
