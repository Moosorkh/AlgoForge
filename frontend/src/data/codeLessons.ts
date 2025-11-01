import { CodeLesson } from "../types";

export const codeLessons: Record<string, CodeLesson> = {
  "Bubble Sort": {
    lessonId: 1,
    algorithmName: "Bubble Sort",
    language: "javascript",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: "Setup Function & Variables",
        explanation:
          "First, we create the bubbleSort function that takes an array as input. We'll need the array length for our loops.",
        code: `function bubbleSort(arr) {
  const n = arr.length;
}`,
        highlight: [1, 2],
      },
      {
        id: 2,
        stepNumber: 2,
        title: "Outer Loop - Passes",
        explanation:
          "The outer loop controls how many passes we make through the array. We need n-1 passes because the largest element 'bubbles up' to its position in each pass.",
        code: `  // Outer loop for each pass
  for (let i = 0; i < n - 1; i++) {

  }`,
        highlight: [2],
      },
      {
        id: 3,
        stepNumber: 3,
        title: "Inner Loop - Comparisons",
        explanation:
          "The inner loop compares adjacent elements. We use 'n - i - 1' because the last i elements are already sorted after i passes.",
        code: `    // Inner loop for comparisons
    for (let j = 0; j < n - i - 1; j++) {

    }`,
        highlight: [2],
      },
      {
        id: 4,
        stepNumber: 4,
        title: "Compare & Swap",
        explanation:
          "If the current element is greater than the next element, we swap them. This 'bubbles' the larger element toward the end of the array.",
        code: `      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }`,
        highlight: [2, 3, 4, 5, 6],
      },
      {
        id: 5,
        stepNumber: 5,
        title: "Return Sorted Array",
        explanation:
          "Finally, we return the sorted array. The array is modified in place, but we return it for convenience.",
        code: `  return arr;`,
        highlight: [1],
      },
    ],
    finalCode: `function bubbleSort(arr) {
  const n = arr.length;

  // Outer loop for each pass
  for (let i = 0; i < n - 1; i++) {
    // Inner loop for comparisons
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`,
  },

  "Binary Search": {
    lessonId: 2,
    algorithmName: "Binary Search",
    language: "javascript",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: "Function Setup",
        explanation:
          "Create the binarySearch function that takes a sorted array and the target value we're searching for.",
        code: `function binarySearch(arr, target) {

}`,
        highlight: [1],
      },
      {
        id: 2,
        stepNumber: 2,
        title: "Initialize Pointers",
        explanation:
          "Set up two pointers: 'left' starts at the beginning and 'right' at the end of the array. These define our search space.",
        code: `  let left = 0;
  let right = arr.length - 1;`,
        highlight: [1, 2],
      },
      {
        id: 3,
        stepNumber: 3,
        title: "Search Loop",
        explanation:
          "Keep searching while the left pointer is less than or equal to the right pointer. When they cross, the element doesn't exist.",
        code: `  while (left <= right) {

  }`,
        highlight: [1],
      },
      {
        id: 4,
        stepNumber: 4,
        title: "Calculate Middle",
        explanation:
          "Find the middle index by averaging left and right pointers. We use Math.floor to ensure we get an integer index.",
        code: `    const mid = Math.floor((left + right) / 2);`,
        highlight: [1],
      },
      {
        id: 5,
        stepNumber: 5,
        title: "Check Middle Element",
        explanation:
          "If the middle element equals our target, we found it! Return the index immediately.",
        code: `    if (arr[mid] === target) {
      return mid; // Found it!
    }`,
        highlight: [1, 2],
      },
      {
        id: 6,
        stepNumber: 6,
        title: "Adjust Search Space",
        explanation:
          "If target is less than middle, search the left half. Otherwise, search the right half. This halves the search space each time!",
        code: `    else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }`,
        highlight: [1, 2, 3, 4],
      },
      {
        id: 7,
        stepNumber: 7,
        title: "Return Not Found",
        explanation:
          "If we exit the loop without finding the target, return -1 to indicate the element is not in the array.",
        code: `  return -1; // Not found`,
        highlight: [1],
      },
    ],
    finalCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found it!
    }
    else if (arr[mid] < target) {
      left = mid + 1; // Search right half
    } else {
      right = mid - 1; // Search left half
    }
  }

  return -1; // Not found
}`,
  },

  "Quick Sort": {
    lessonId: 3,
    algorithmName: "Quick Sort",
    language: "javascript",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        title: "Main Function",
        explanation:
          "Create the quickSort function with base case: if array has 1 or fewer elements, it's already sorted!",
        code: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
}`,
        highlight: [2, 3],
      },
      {
        id: 2,
        stepNumber: 2,
        title: "Choose Pivot",
        explanation:
          "Select a pivot element. We'll use the middle element for better average performance.",
        code: `  const pivot = arr[Math.floor(arr.length / 2)];`,
        highlight: [1],
      },
      {
        id: 3,
        stepNumber: 3,
        title: "Partition Arrays",
        explanation:
          "Create three arrays: elements less than pivot, equal to pivot, and greater than pivot.",
        code: `  const left = [];
  const middle = [];
  const right = [];`,
        highlight: [1, 2, 3],
      },
      {
        id: 4,
        stepNumber: 4,
        title: "Sort Elements",
        explanation:
          "Distribute each element into the appropriate array based on comparison with pivot.",
        code: `  for (const element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element === pivot) {
      middle.push(element);
    } else {
      right.push(element);
    }
  }`,
        highlight: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        id: 5,
        stepNumber: 5,
        title: "Recursive Combine",
        explanation:
          "Recursively sort left and right arrays, then concatenate: sorted left + middle + sorted right.",
        code: `  return [...quickSort(left), ...middle, ...quickSort(right)];`,
        highlight: [1],
      },
    ],
    finalCode: `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const middle = [];
  const right = [];

  for (const element of arr) {
    if (element < pivot) {
      left.push(element);
    } else if (element === pivot) {
      middle.push(element);
    } else {
      right.push(element);
    }
  }

  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
  },
};
