import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

interface ArrayItem {
  value: number;
  color: string;
}

const BubbleSortVisualization: React.FC = () => {
  const [array, setArray] = useState<ArrayItem[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [currentStep, setCurrentStep] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const generateRandomArray = () => {
    const newArray: ArrayItem[] = [];
    for (let i = 0; i < 10; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 80) + 10,
        color: "#3b82f6",
      });
    }
    setArray(newArray);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsPaused(false);
  };

  useEffect(() => {
    generateRandomArray();
  }, []);

  useEffect(() => {
    if (!svgRef.current || array.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;
    const barWidth = width / array.length;

    const bars = svg
      .selectAll("rect")
      .data(array)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * barWidth)
      .attr("y", (d) => height - d.value * 3)
      .attr("width", barWidth - 5)
      .attr("height", (d) => d.value * 3)
      .attr("fill", (d) => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    svg
      .selectAll("text")
      .data(array)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * barWidth + barWidth / 2)
      .attr("y", (d) => height - d.value * 3 - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#1f2937")
      .attr("font-weight", "bold")
      .text((d) => d.value);
  }, [array]);

  const bubbleSort = async () => {
    setIsPlaying(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isPlaying) return;

        // Highlight comparing elements
        arr[j].color = "#ef4444";
        arr[j + 1].color = "#ef4444";
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));

        // Swap if needed
        if (arr[j].value > arr[j + 1].value) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }

        // Reset colors
        arr[j].color = "#3b82f6";
        arr[j + 1].color = "#3b82f6";
        setArray([...arr]);
      }
      // Mark sorted element
      arr[n - i - 1].color = "#10b981";
      setArray([...arr]);
    }

    arr[0].color = "#10b981";
    setArray([...arr]);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
        <svg ref={svgRef} width="600" height="300" className="mx-auto"></svg>
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={bubbleSort}
          disabled={isPlaying}
          className="btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPlaying ? "Sorting..." : "Start Sort"}
        </button>

        <button
          onClick={generateRandomArray}
          disabled={isPlaying}
          className="btn-secondary disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Generate New Array
        </button>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Speed:</label>
          <input
            type="range"
            min="100"
            max="1000"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-600">{speed}ms</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1">
          <li>Red bars are being compared</li>
          <li>Blue bars are unsorted</li>
          <li>Green bars are in their final sorted position</li>
        </ul>
      </div>
    </div>
  );
};

export default BubbleSortVisualization;
