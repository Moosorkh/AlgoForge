import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

const BinarySearchVisualization: React.FC = () => {
  const [array] = useState<number[]>([3, 7, 12, 19, 24, 31, 38, 45, 52, 67]);
  const [target, setTarget] = useState<number>(24);
  const [currentRange, setCurrentRange] = useState<{
    left: number;
    right: number;
    mid: number;
  } | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 200;
    const boxWidth = width / array.length;

    // Draw array boxes
    const boxes = svg.selectAll("g").data(array).enter().append("g");

    boxes
      .append("rect")
      .attr("x", (d, i) => i * boxWidth)
      .attr("y", 80)
      .attr("width", boxWidth - 5)
      .attr("height", 60)
      .attr("fill", (d, i) => {
        if (found === i) return "#10b981";
        if (currentRange && i >= currentRange.left && i <= currentRange.right) {
          if (i === currentRange.mid) return "#ef4444";
          return "#fbbf24";
        }
        return "#e5e7eb";
      })
      .attr("stroke", "#1f2937")
      .attr("stroke-width", 2);

    boxes
      .append("text")
      .attr("x", (d, i) => i * boxWidth + boxWidth / 2)
      .attr("y", 115)
      .attr("text-anchor", "middle")
      .attr("font-size", "18")
      .attr("font-weight", "bold")
      .attr("fill", "#1f2937")
      .text((d) => d);

    boxes
      .append("text")
      .attr("x", (d, i) => i * boxWidth + boxWidth / 2)
      .attr("y", 165)
      .attr("text-anchor", "middle")
      .attr("font-size", "12")
      .attr("fill", "#6b7280")
      .text((d, i) => i);
  }, [array, currentRange, found]);

  const binarySearch = async () => {
    setIsSearching(true);
    setFound(null);
    setCurrentRange(null);

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setCurrentRange({ left, right, mid });
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (array[mid] === target) {
        setFound(mid);
        setCurrentRange(null);
        setIsSearching(false);
        return;
      }

      if (array[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    setCurrentRange(null);
    setIsSearching(false);
  };

  const reset = () => {
    setCurrentRange(null);
    setFound(null);
    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <svg ref={svgRef} width="600" height="200" className="mx-auto"></svg>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Target:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            disabled={isSearching}
            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
          />
        </div>

        <button
          onClick={binarySearch}
          disabled={isSearching}
          className="btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSearching ? "Searching..." : "Start Search"}
        </button>

        <button
          onClick={reset}
          disabled={isSearching}
          className="btn-secondary disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>

      {found !== null && (
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-green-900 font-semibold">
            Target {target} found at index {found}!
          </p>
        </div>
      )}

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Yellow boxes show the current search range</li>
          <li>Red box is the middle element being checked</li>
          <li>Green box indicates the target has been found</li>
          <li>Gray boxes are outside the current search range</li>
        </ul>
      </div>
    </div>
  );
};

export default BinarySearchVisualization;
