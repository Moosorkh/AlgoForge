import React, { useState, useEffect } from "react";
import { FaStar, FaFire, FaTrophy } from "react-icons/fa";

interface PointsDisplayProps {
  points: number;
  showAnimation?: boolean;
  onAnimationComplete?: () => void;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({
  points,
  showAnimation = false,
  onAnimationComplete,
}) => {
  const [displayPoints, setDisplayPoints] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (showAnimation && points > displayPoints) {
      setIsAnimating(true);
      const increment = Math.ceil((points - displayPoints) / 20);
      const timer = setInterval(() => {
        setDisplayPoints((prev) => {
          if (prev + increment >= points) {
            clearInterval(timer);
            setIsAnimating(false);
            onAnimationComplete?.();
            return points;
          }
          return prev + increment;
        });
      }, 30);

      return () => clearInterval(timer);
    } else {
      setDisplayPoints(points);
    }
  }, [points, showAnimation]);

  return (
    <div
      className={`flex items-center gap-2 ${
        isAnimating ? "animate-pulse" : ""
      }`}
    >
      <FaStar className="text-yellow-500 text-2xl" />
      <span className="text-3xl font-bold text-gray-900">{displayPoints}</span>
      <span className="text-sm text-gray-600">points</span>
    </div>
  );
};

export default PointsDisplay;
