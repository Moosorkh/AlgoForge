import React, { useEffect, useState } from "react";
import { Achievement } from "../../types";
import { FaTrophy, FaTimes } from "react-icons/fa";

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({
  achievement,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className={`pointer-events-auto transform transition-all duration-300 ${
          isVisible
            ? "scale-100 opacity-100"
            : "scale-75 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl shadow-2xl p-1 max-w-md">
          <div className="bg-white rounded-xl p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl animate-bounce shadow-lg">
                  {achievement.icon}
                </div>
              </div>

              <div className="mb-2">
                <FaTrophy className="inline text-yellow-500 text-2xl mb-2" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Achievement Unlocked!
              </h2>

              <h3 className="text-2xl font-semibold text-primary-600 mb-2">
                {achievement.title}
              </h3>

              <p className="text-gray-600 mb-4">{achievement.description}</p>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-3 inline-block">
                <span className="text-lg font-bold text-orange-700">
                  +50 XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementPopup;
