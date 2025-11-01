-- Comprehensive Interview Algorithms Seed Data
-- This covers all major algorithms used in technical interviews

-- ============================================
-- SORTING ALGORITHMS (7 algorithms)
-- ============================================

-- 1. Bubble Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Bubble Sort',
    'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Named for the way smaller elements "bubble" to the top.',
    'Sorting',
    'Beginner',
    'O(n²)',
    'O(1)',
    'Educational purposes, small datasets, nearly sorted data'
);

-- 2. Selection Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Selection Sort',
    'Divides the input list into sorted and unsorted regions, repeatedly selecting the smallest element from unsorted region and moving it to the sorted region.',
    'Sorting',
    'Beginner',
    'O(n²)',
    'O(1)',
    'Small lists, minimal memory writes required'
);

-- 3. Insertion Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Insertion Sort',
    'Builds the final sorted array one item at a time by inserting each element into its correct position among the previously sorted elements.',
    'Sorting',
    'Beginner',
    'O(n²)',
    'O(1)',
    'Small datasets, nearly sorted arrays, online sorting'
);

-- 4. Merge Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Merge Sort',
    'A divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves.',
    'Sorting',
    'Intermediate',
    'O(n log n)',
    'O(n)',
    'Large datasets, stable sorting required, external sorting'
);

-- 5. Quick Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Quick Sort',
    'Selects a pivot element and partitions the array around it, recursively sorting the partitions. One of the fastest sorting algorithms in practice.',
    'Sorting',
    'Intermediate',
    'O(n log n) avg, O(n²) worst',
    'O(log n)',
    'General purpose sorting, cache-friendly operations'
);

-- 6. Heap Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Heap Sort',
    'Builds a max heap from the data and repeatedly extracts the maximum element to build the sorted array.',
    'Sorting',
    'Advanced',
    'O(n log n)',
    'O(1)',
    'Systems with memory constraints, priority scheduling'
);

-- 7. Counting Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Counting Sort',
    'A non-comparison based sorting algorithm that counts the occurrences of each unique element and uses arithmetic to determine positions.',
    'Sorting',
    'Intermediate',
    'O(n + k)',
    'O(k)',
    'Small range of integers, as subroutine in radix sort'
);

-- ============================================
-- SEARCHING ALGORITHMS (4 algorithms)
-- ============================================

-- 8. Linear Search
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Linear Search',
    'Sequentially checks each element of the list until a match is found or the whole list has been searched.',
    'Searching',
    'Beginner',
    'O(n)',
    'O(1)',
    'Unsorted arrays, small datasets, single search operations'
);

-- 9. Binary Search
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Binary Search',
    'Efficiently finds an element in a sorted array by repeatedly dividing the search interval in half.',
    'Searching',
    'Beginner',
    'O(log n)',
    'O(1)',
    'Sorted arrays, database indexing, finding boundaries'
);

-- 10. Jump Search
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Jump Search',
    'Searches a sorted array by jumping ahead by fixed steps and then performing linear search in the identified block.',
    'Searching',
    'Intermediate',
    'O(√n)',
    'O(1)',
    'Sorted arrays where jumping is cheaper than binary search'
);

-- 11. Interpolation Search
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Interpolation Search',
    'An improved variant of binary search for uniformly distributed sorted arrays. Uses position formula instead of middle element.',
    'Searching',
    'Intermediate',
    'O(log log n) avg, O(n) worst',
    'O(1)',
    'Uniformly distributed sorted data, large sorted arrays'
);

-- ============================================
-- ARRAY ALGORITHMS (8 algorithms)
-- ============================================

-- 12. Two Pointers
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Two Pointers',
    'Uses two pointers to iterate through a data structure in tandem, often from different positions to solve problems efficiently.',
    'Array',
    'Beginner',
    'O(n)',
    'O(1)',
    'Finding pairs, palindrome checking, merging sorted arrays'
);

-- 13. Sliding Window
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Sliding Window',
    'Maintains a subset of items as a window and slides it over the data structure to solve problems involving subarrays or substrings.',
    'Array',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Maximum sum subarray, longest substring, anagrams'
);

-- 14. Kadane''s Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Kadane''s Algorithm',
    'Finds the contiguous subarray with the largest sum within a one-dimensional array of numbers.',
    'Array',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Maximum subarray sum, stock profit problems'
);

-- 15. Dutch National Flag
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Dutch National Flag',
    'Efficiently sorts an array containing three distinct values by partitioning into three regions.',
    'Array',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Sorting arrays with 3 distinct values, partitioning'
);

-- 16. Moore''s Voting Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Moore''s Voting Algorithm',
    'Finds the majority element (appearing more than n/2 times) in an array in linear time and constant space.',
    'Array',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Finding majority element, voting systems'
);

-- 17. Prefix Sum
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Prefix Sum',
    'Precomputes cumulative sums to answer range sum queries in constant time.',
    'Array',
    'Beginner',
    'O(n) preprocessing, O(1) query',
    'O(n)',
    'Range sum queries, subarray sum problems'
);

-- 18. Binary Search on Answer
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Binary Search on Answer',
    'Applies binary search on the solution space rather than on an array to find optimal answers.',
    'Array',
    'Advanced',
    'O(n log m)',
    'O(1)',
    'Optimization problems, finding minimum/maximum values'
);

-- 19. Next Greater Element
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Next Greater Element',
    'Finds the next greater element for each element in an array using a stack-based approach.',
    'Array',
    'Intermediate',
    'O(n)',
    'O(n)',
    'Stock span, histogram problems, temperature problems'
);

-- ============================================
-- STRING ALGORITHMS (6 algorithms)
-- ============================================

-- 20. KMP Pattern Matching
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'KMP Pattern Matching',
    'Knuth-Morris-Pratt algorithm searches for occurrences of a pattern within a text using a failure function to avoid re-examining characters.',
    'String',
    'Advanced',
    'O(n + m)',
    'O(m)',
    'Text searching, substring search, pattern matching'
);

-- 21. Rabin-Karp Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Rabin-Karp Algorithm',
    'Uses hashing to find any one of a set of pattern strings in a text. Efficient for multiple pattern searching.',
    'String',
    'Advanced',
    'O(n + m) avg, O(nm) worst',
    'O(1)',
    'Plagiarism detection, multiple pattern search'
);

-- 22. Longest Common Subsequence
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Longest Common Subsequence',
    'Finds the longest subsequence common to two sequences using dynamic programming.',
    'String',
    'Intermediate',
    'O(mn)',
    'O(mn)',
    'DNA sequencing, file comparison, diff tools'
);

-- 23. Longest Palindromic Substring
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Longest Palindromic Substring',
    'Finds the longest substring that reads the same forwards and backwards.',
    'String',
    'Intermediate',
    'O(n²)',
    'O(1)',
    'Text analysis, pattern recognition'
);

-- 24. String Matching (Boyer-Moore)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Boyer-Moore Algorithm',
    'Efficient string-searching algorithm that skips sections of the text based on mismatches.',
    'String',
    'Advanced',
    'O(n/m) best, O(nm) worst',
    'O(m)',
    'Text editors, search engines, grep command'
);

-- 25. Anagram Detection
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Anagram Detection',
    'Determines if two strings are anagrams using character frequency counting.',
    'String',
    'Beginner',
    'O(n)',
    'O(1)',
    'Word games, cryptography, text analysis'
);

-- ============================================
-- LINKED LIST ALGORITHMS (5 algorithms)
-- ============================================

-- 26. Linked List Reversal
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Linked List Reversal',
    'Reverses the direction of pointers in a linked list iteratively or recursively.',
    'LinkedList',
    'Beginner',
    'O(n)',
    'O(1)',
    'Data structure manipulation, interview problems'
);

-- 27. Floyd''s Cycle Detection
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Floyd''s Cycle Detection',
    'Detects cycles in a linked list using two pointers moving at different speeds (tortoise and hare).',
    'LinkedList',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Cycle detection, finding loop start, duplicate finding'
);

-- 28. Merge Two Sorted Lists
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Merge Two Sorted Lists',
    'Merges two sorted linked lists into a single sorted linked list.',
    'LinkedList',
    'Beginner',
    'O(n + m)',
    'O(1)',
    'Merge sort on linked lists, combining sorted data'
);

-- 29. Find Middle Element
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Find Middle Element',
    'Finds the middle node of a linked list using slow and fast pointers.',
    'LinkedList',
    'Beginner',
    'O(n)',
    'O(1)',
    'List partitioning, palindrome checking'
);

-- 30. Remove N-th Node from End
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Remove N-th Node from End',
    'Removes the n-th node from the end of a linked list in one pass using two pointers.',
    'LinkedList',
    'Intermediate',
    'O(n)',
    'O(1)',
    'List manipulation, buffer implementations'
);

-- ============================================
-- STACK & QUEUE ALGORITHMS (4 algorithms)
-- ============================================

-- 31. Valid Parentheses
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Valid Parentheses',
    'Checks if parentheses/brackets are balanced using a stack.',
    'Stack',
    'Beginner',
    'O(n)',
    'O(n)',
    'Expression validation, compiler design, syntax checking'
);

-- 32. Min Stack
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Min Stack',
    'Implements a stack that supports push, pop, top, and retrieving minimum element in constant time.',
    'Stack',
    'Intermediate',
    'O(1)',
    'O(n)',
    'Tracking minimums, stock price problems'
);

-- 33. Sliding Window Maximum
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Sliding Window Maximum',
    'Finds the maximum element in each sliding window using a deque.',
    'Queue',
    'Advanced',
    'O(n)',
    'O(k)',
    'Data stream processing, window-based analytics'
);

-- 34. Implement Queue using Stacks
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Implement Queue using Stacks',
    'Implements a FIFO queue using two LIFO stacks.',
    'Stack',
    'Intermediate',
    'O(1) amortized',
    'O(n)',
    'Data structure design, understanding amortization'
);

-- ============================================
-- TREE ALGORITHMS (10 algorithms)
-- ============================================

-- 35. Binary Tree Traversal (Inorder)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Binary Tree Traversal',
    'Visits all nodes in a binary tree using inorder, preorder, or postorder traversal.',
    'Tree',
    'Beginner',
    'O(n)',
    'O(h)',
    'Expression tree evaluation, serialization'
);

-- 36. Binary Search Tree Operations
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'BST Operations',
    'Insert, delete, and search operations in a Binary Search Tree.',
    'Tree',
    'Intermediate',
    'O(log n) avg, O(n) worst',
    'O(h)',
    'Databases, symbol tables, priority queues'
);

-- 37. Lowest Common Ancestor
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Lowest Common Ancestor',
    'Finds the lowest common ancestor of two nodes in a binary tree.',
    'Tree',
    'Intermediate',
    'O(n)',
    'O(h)',
    'Finding relationships, range queries'
);

-- 38. Level Order Traversal
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Level Order Traversal',
    'Visits nodes level by level using BFS (Breadth-First Search).',
    'Tree',
    'Beginner',
    'O(n)',
    'O(w)',
    'Tree printing, finding shortest path in trees'
);

-- 39. Maximum Depth of Binary Tree
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Maximum Depth of Binary Tree',
    'Finds the maximum depth (height) of a binary tree.',
    'Tree',
    'Beginner',
    'O(n)',
    'O(h)',
    'Tree analysis, balance checking'
);

-- 40. Validate Binary Search Tree
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Validate BST',
    'Determines if a binary tree is a valid Binary Search Tree.',
    'Tree',
    'Intermediate',
    'O(n)',
    'O(h)',
    'Data validation, tree verification'
);

-- 41. Serialize and Deserialize Tree
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Serialize and Deserialize Tree',
    'Converts a tree to a string representation and reconstructs it back.',
    'Tree',
    'Advanced',
    'O(n)',
    'O(n)',
    'Persistence, network transmission, deep copy'
);

-- 42. Binary Tree Paths
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Binary Tree Paths',
    'Finds all root-to-leaf paths in a binary tree.',
    'Tree',
    'Intermediate',
    'O(n)',
    'O(h)',
    'Decision trees, path finding'
);

-- 43. Trie (Prefix Tree)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Trie (Prefix Tree)',
    'A tree structure for efficient string storage and retrieval based on prefixes.',
    'Trie',
    'Intermediate',
    'O(m)',
    'O(ALPHABET_SIZE * m * n)',
    'Autocomplete, spell checking, IP routing'
);

-- 44. AVL Tree
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'AVL Tree',
    'A self-balancing binary search tree where heights of child subtrees differ by at most one.',
    'Tree',
    'Advanced',
    'O(log n)',
    'O(n)',
    'Databases, memory management, ordered sets'
);

-- Continue in next part...
