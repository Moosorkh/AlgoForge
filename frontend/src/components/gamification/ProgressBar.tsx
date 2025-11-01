import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  color = "bg-primary-500",
  showPercentage = true,
}) => {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium text-gray-600">
              {current}/{total} ({Math.round(percentage)}%)
            </span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
