-- ============================================
-- GRAPH ALGORITHMS (10 algorithms)
-- ============================================

-- 45. Breadth-First Search (BFS)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Breadth-First Search',
    'Explores all vertices at the present depth before moving to vertices at the next depth level.',
    'Graph',
    'Intermediate',
    'O(V + E)',
    'O(V)',
    'Shortest path in unweighted graphs, level-order traversal'
);

-- 46. Depth-First Search (DFS)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Depth-First Search',
    'Explores as far as possible along each branch before backtracking.',
    'Graph',
    'Intermediate',
    'O(V + E)',
    'O(V)',
    'Topological sorting, cycle detection, maze solving'
);

-- 47. Dijkstra''s Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Dijkstra''s Algorithm',
    'Finds the shortest path from a source to all other vertices in a weighted graph with non-negative edges.',
    'Graph',
    'Advanced',
    'O((V + E) log V)',
    'O(V)',
    'GPS navigation, network routing, social networks'
);

-- 48. Bellman-Ford Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Bellman-Ford Algorithm',
    'Computes shortest paths from a single source vertex to all vertices, can handle negative weights.',
    'Graph',
    'Advanced',
    'O(VE)',
    'O(V)',
    'Detecting negative cycles, routing protocols'
);

-- 49. Floyd-Warshall Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Floyd-Warshall Algorithm',
    'Finds shortest paths between all pairs of vertices in a weighted graph.',
    'Graph',
    'Advanced',
    'O(V³)',
    'O(V²)',
    'Finding transitive closure, road networks'
);

-- 50. Topological Sort
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Topological Sort',
    'Linear ordering of vertices in a directed acyclic graph (DAG) such that for every edge u→v, u comes before v.',
    'Graph',
    'Intermediate',
    'O(V + E)',
    'O(V)',
    'Task scheduling, course prerequisites, build systems'
);

-- 51. Union-Find (Disjoint Set)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Union-Find',
    'Data structure that tracks elements partitioned into disjoint sets with efficient union and find operations.',
    'Graph',
    'Intermediate',
    'O(α(n)) ≈ O(1)',
    'O(n)',
    'Kruskal''s MST, cycle detection, network connectivity'
);

-- 52. Kruskal''s Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Kruskal''s Algorithm',
    'Finds minimum spanning tree by sorting edges and adding them if they don''t form a cycle.',
    'Graph',
    'Advanced',
    'O(E log E)',
    'O(V)',
    'Network design, clustering, approximation algorithms'
);

-- 53. Prim''s Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Prim''s Algorithm',
    'Builds minimum spanning tree by growing it from a starting vertex, always adding the cheapest edge.',
    'Graph',
    'Advanced',
    'O(E log V)',
    'O(V)',
    'Network design, circuit design'
);

-- 54. Tarjan''s Algorithm
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Tarjan''s Algorithm',
    'Finds strongly connected components in a directed graph using DFS.',
    'Graph',
    'Advanced',
    'O(V + E)',
    'O(V)',
    'Finding SCCs, bridges, articulation points'
);

-- ============================================
-- DYNAMIC PROGRAMMING (12 algorithms)
-- ============================================

-- 55. Fibonacci Number
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Fibonacci Number',
    'Computes the nth Fibonacci number using dynamic programming or memoization.',
    'DynamicProgramming',
    'Beginner',
    'O(n)',
    'O(n) or O(1)',
    'Introduction to DP, recursion optimization'
);

-- 56. Climbing Stairs
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Climbing Stairs',
    'Counts distinct ways to climb n stairs when you can climb 1 or 2 steps at a time.',
    'DynamicProgramming',
    'Beginner',
    'O(n)',
    'O(1)',
    'Combinatorics, path counting'
);

-- 57. Coin Change
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Coin Change',
    'Finds the minimum number of coins needed to make a specific amount or counts the number of ways.',
    'DynamicProgramming',
    'Intermediate',
    'O(n * amount)',
    'O(amount)',
    'Currency exchange, making change, optimization'
);

-- 58. Knapsack Problem (0/1)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    '0/1 Knapsack',
    'Maximizes value of items in a knapsack with weight constraint, each item used at most once.',
    'DynamicProgramming',
    'Intermediate',
    'O(n * W)',
    'O(n * W)',
    'Resource allocation, budget optimization, cargo loading'
);

-- 59. Longest Increasing Subsequence
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Longest Increasing Subsequence',
    'Finds the length of the longest subsequence where elements are in increasing order.',
    'DynamicProgramming',
    'Intermediate',
    'O(n log n)',
    'O(n)',
    'Data analysis, patience sorting, version control'
);

-- 60. Edit Distance
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Edit Distance',
    'Computes minimum operations (insert, delete, replace) to convert one string to another.',
    'DynamicProgramming',
    'Advanced',
    'O(m * n)',
    'O(m * n)',
    'Spell correction, DNA analysis, plagiarism detection'
);

-- 61. Longest Common Subsequence (DP)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'LCS Dynamic Programming',
    'Finds the longest subsequence common to two sequences using bottom-up DP.',
    'DynamicProgramming',
    'Intermediate',
    'O(m * n)',
    'O(m * n)',
    'Diff algorithms, bioinformatics, file comparison'
);

-- 62. Matrix Chain Multiplication
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Matrix Chain Multiplication',
    'Finds the optimal order to multiply a chain of matrices to minimize scalar multiplications.',
    'DynamicProgramming',
    'Advanced',
    'O(n³)',
    'O(n²)',
    'Compiler optimization, graphics, scientific computing'
);

-- 63. Partition Equal Subset Sum
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Partition Equal Subset Sum',
    'Determines if array can be partitioned into two subsets with equal sum.',
    'DynamicProgramming',
    'Intermediate',
    'O(n * sum)',
    'O(sum)',
    'Load balancing, fair division problems'
);

-- 64. Word Break
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Word Break',
    'Determines if a string can be segmented into space-separated dictionary words.',
    'DynamicProgramming',
    'Intermediate',
    'O(n²)',
    'O(n)',
    'Natural language processing, text segmentation'
);

-- 65. House Robber
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'House Robber',
    'Maximizes amount robbed from houses arranged in a line/circle without robbing adjacent houses.',
    'DynamicProgramming',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Optimization with constraints, interval scheduling'
);

-- 66. Palindrome Partitioning
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Palindrome Partitioning',
    'Finds minimum cuts needed to partition string into palindromic substrings.',
    'DynamicProgramming',
    'Advanced',
    'O(n²)',
    'O(n²)',
    'Text processing, string optimization'
);

-- ============================================
-- GREEDY ALGORITHMS (6 algorithms)
-- ============================================

-- 67. Activity Selection
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Activity Selection',
    'Selects maximum number of non-overlapping activities from a set.',
    'Greedy',
    'Intermediate',
    'O(n log n)',
    'O(1)',
    'Scheduling, resource allocation, interval problems'
);

-- 68. Huffman Coding
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Huffman Coding',
    'Builds optimal prefix-free binary code for data compression based on frequency.',
    'Greedy',
    'Advanced',
    'O(n log n)',
    'O(n)',
    'Data compression, file encoding, ZIP algorithms'
);

-- 69. Fractional Knapsack
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Fractional Knapsack',
    'Maximizes value when items can be broken into fractions, greedy by value/weight ratio.',
    'Greedy',
    'Intermediate',
    'O(n log n)',
    'O(1)',
    'Resource allocation, continuous optimization'
);

-- 70. Job Sequencing
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Job Sequencing',
    'Schedules jobs with deadlines and profits to maximize total profit.',
    'Greedy',
    'Intermediate',
    'O(n² log n)',
    'O(n)',
    'Task scheduling, deadline management'
);

-- 71. Minimum Platforms
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Minimum Platforms',
    'Finds minimum number of platforms required for a railway station given arrival/departure times.',
    'Greedy',
    'Intermediate',
    'O(n log n)',
    'O(1)',
    'Resource allocation, meeting room scheduling'
);

-- 72. Jump Game
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Jump Game',
    'Determines if you can reach the end of array where each element represents maximum jump length.',
    'Greedy',
    'Intermediate',
    'O(n)',
    'O(1)',
    'Game AI, reachability problems'
);

-- ============================================
-- BACKTRACKING (5 algorithms)
-- ============================================

-- 73. N-Queens Problem
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'N-Queens Problem',
    'Places N chess queens on N×N board so no two queens attack each other.',
    'Backtracking',
    'Advanced',
    'O(N!)',
    'O(N²)',
    'Constraint satisfaction, puzzle solving'
);

-- 74. Sudoku Solver
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Sudoku Solver',
    'Solves a 9×9 Sudoku puzzle using backtracking and constraint propagation.',
    'Backtracking',
    'Advanced',
    'O(9^m)',
    'O(1)',
    'Puzzle games, constraint satisfaction'
);

-- 75. Generate Parentheses
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Generate Parentheses',
    'Generates all combinations of well-formed parentheses for n pairs.',
    'Backtracking',
    'Intermediate',
    'O(4^n / √n)',
    'O(n)',
    'Combinatorics, expression generation'
);

-- 76. Subset Sum
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Subset Sum',
    'Finds all subsets of a set that sum to a target value.',
    'Backtracking',
    'Intermediate',
    'O(2^n)',
    'O(n)',
    'Combinatorial optimization, partitioning'
);

-- 77. Permutations and Combinations
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Permutations and Combinations',
    'Generates all permutations or combinations of a set of elements.',
    'Backtracking',
    'Intermediate',
    'O(n!)',
    'O(n)',
    'Combinatorics, arrangement problems, testing'
);

-- ============================================
-- HASHING (4 algorithms)
-- ============================================

-- 78. Two Sum
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Two Sum',
    'Finds two numbers in an array that add up to a target sum using a hash map.',
    'Hashing',
    'Beginner',
    'O(n)',
    'O(n)',
    'Array searching, pair finding'
);

-- 79. Group Anagrams
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Group Anagrams',
    'Groups strings that are anagrams of each other using hash maps.',
    'Hashing',
    'Intermediate',
    'O(n * k log k)',
    'O(n * k)',
    'Text processing, word categorization'
);

-- 80. Subarray Sum Equals K
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Subarray Sum Equals K',
    'Counts number of continuous subarrays whose sum equals k using prefix sums and hashing.',
    'Hashing',
    'Intermediate',
    'O(n)',
    'O(n)',
    'Array analysis, sum problems'
);

-- 81. LRU Cache
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'LRU Cache',
    'Implements Least Recently Used cache with get and put operations in O(1) time.',
    'Hashing',
    'Advanced',
    'O(1)',
    'O(capacity)',
    'Caching systems, operating systems, databases'
);

-- ============================================
-- HEAP (3 algorithms)
-- ============================================

-- 82. Kth Largest Element
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Kth Largest Element',
    'Finds the kth largest element in an array using a min-heap.',
    'Heap',
    'Intermediate',
    'O(n log k)',
    'O(k)',
    'Top-k problems, statistics, data streams'
);

-- 83. Merge K Sorted Lists
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Merge K Sorted Lists',
    'Merges k sorted linked lists into one sorted list using a min-heap.',
    'Heap',
    'Advanced',
    'O(n log k)',
    'O(k)',
    'External sorting, database joins, log merging'
);

-- 84. Top K Frequent Elements
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Top K Frequent Elements',
    'Finds k most frequent elements in an array using heap or bucket sort.',
    'Heap',
    'Intermediate',
    'O(n log k)',
    'O(n)',
    'Trending topics, data analysis, frequency counting'
);

-- ============================================
-- BIT MANIPULATION (4 algorithms)
-- ============================================

-- 85. Single Number
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Single Number',
    'Finds the element that appears once while others appear twice using XOR.',
    'BitManipulation',
    'Beginner',
    'O(n)',
    'O(1)',
    'Finding unique elements, error detection'
);

-- 86. Counting Bits
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Counting Bits',
    'Counts number of 1s in binary representation for numbers 0 to n.',
    'BitManipulation',
    'Intermediate',
    'O(n)',
    'O(n)',
    'Population count, digital systems'
);

-- 87. Power of Two
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Power of Two',
    'Determines if a number is a power of two using bit manipulation.',
    'BitManipulation',
    'Beginner',
    'O(1)',
    'O(1)',
    'Binary checks, optimization'
);

-- 88. Bitwise AND of Range
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Bitwise AND of Range',
    'Finds bitwise AND of all numbers in a range [m, n].',
    'BitManipulation',
    'Intermediate',
    'O(log n)',
    'O(1)',
    'Number theory, optimization problems'
);

-- ============================================
-- MATH ALGORITHMS (7 algorithms)
-- ============================================

-- 89. Sieve of Eratosthenes
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Sieve of Eratosthenes',
    'Finds all prime numbers up to n by iteratively marking multiples of primes.',
    'Math',
    'Intermediate',
    'O(n log log n)',
    'O(n)',
    'Prime generation, number theory, cryptography'
);

-- 90. GCD and LCM
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'GCD and LCM',
    'Computes Greatest Common Divisor using Euclidean algorithm and Least Common Multiple.',
    'Math',
    'Beginner',
    'O(log min(a, b))',
    'O(1)',
    'Fraction simplification, modular arithmetic'
);

-- 91. Fast Exponentiation
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Fast Exponentiation',
    'Computes a^b efficiently using binary exponentiation.',
    'Math',
    'Intermediate',
    'O(log b)',
    'O(1)',
    'Cryptography, modular arithmetic, large computations'
);

-- 92. Pascal''s Triangle
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Pascal''s Triangle',
    'Generates Pascal''s triangle where each number is sum of two numbers above it.',
    'Math',
    'Beginner',
    'O(n²)',
    'O(n²)',
    'Combinatorics, binomial coefficients'
);

-- 93. Pow(x, n)
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Pow(x, n)',
    'Implements power function efficiently handling negative exponents.',
    'Math',
    'Intermediate',
    'O(log n)',
    'O(1)',
    'Mathematical computations, scientific calculations'
);

-- 94. Square Root
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Square Root',
    'Computes integer square root using binary search or Newton''s method.',
    'Math',
    'Intermediate',
    'O(log n)',
    'O(1)',
    'Numerical methods, graphics, physics'
);

-- 95. Happy Number
INSERT INTO algorithms (name, description, category, difficulty, time_complexity, space_complexity, use_cases)
VALUES (
    'Happy Number',
    'Determines if a number eventually reaches 1 when replaced by sum of squares of digits.',
    'Math',
    'Beginner',
    'O(log n)',
    'O(log n)',
    'Number theory, cycle detection'
);

-- Total: 95 comprehensive interview algorithms covering all major categories!
