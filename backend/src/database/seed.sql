-- Insert sample algorithms

INSERT INTO algorithms (name, description, category, difficulty)
VALUES ('Bubble Sort',
        'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
        'Sorting',
        'Beginner'), ('Selection Sort',
                      'Divides the input list into two parts: a sorted portion and an unsorted portion, and repeatedly selects the smallest element from the unsorted portion.',
                      'Sorting',
                      'Beginner'), ('Insertion Sort',
                                    'Builds the final sorted array one item at a time by inserting elements into their correct position.',
                                    'Sorting',
                                    'Beginner'), ('Merge Sort',
                                                  'A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
                                                  'Sorting',
                                                  'Intermediate'), ('Quick Sort',
                                                                    'A divide-and-conquer algorithm that picks a pivot element and partitions the array around it.',
                                                                    'Sorting',
                                                                    'Intermediate'), ('Counting Sort',
                                                                                      'A non-comparison based sorting algorithm that counts the number of objects having distinct key values.',
                                                                                      'Sorting',
                                                                                      'Advanced'), ('Binary Search',
                                                                                                    'An efficient algorithm for finding an item from a sorted list by repeatedly dividing the search interval in half.',
                                                                                                    'Searching',
                                                                                                    'Beginner'), ('Linear Search',
                                                                                                                  'A simple search algorithm that checks every element in the list sequentially until the target is found.',
                                                                                                                  'Searching',
                                                                                                                  'Beginner');

-- Insert sample lessons for Bubble Sort (id: 1)

INSERT INTO lessons (algorithm_id, title, content, lesson_type, order_index)
VALUES (1,
        'Introduction to Bubble Sort',
        'Bubble Sort is one of the simplest sorting algorithms. It works by repeatedly swapping adjacent elements if they are in the wrong order. The algorithm gets its name because smaller elements "bubble" to the top of the list.',
        'Theory',
        1), (1,
             'Bubble Sort Visualization',
             'Watch how Bubble Sort compares and swaps elements step by step.',
             'Visualization',
             2), (1,
                  'Bubble Sort Practice',
                  'Try sorting elements yourself using the Bubble Sort technique!',
                  'Game',
                  3), (1,
                       'Bubble Sort Quiz',
                       'Test your understanding of Bubble Sort with this quick quiz.',
                       'Quiz',
                       4);

-- Insert sample lessons for Binary Search (id: 7)

INSERT INTO lessons (algorithm_id, title, content, lesson_type, order_index)
VALUES (7,
        'Introduction to Binary Search',
        'Binary Search is an efficient algorithm for finding an item in a sorted list. It works by repeatedly dividing the search interval in half.',
        'Theory',
        1), (7,
             'Binary Search Visualization',
             'See how Binary Search quickly narrows down the search space.',
             'Visualization',
             2), (7,
                  'Binary Search Game',
                  'Guess the target number by selecting the midpoint at each step!',
                  'Game',
                  3), (7,
                       'Binary Search Quiz',
                       'Test your knowledge of Binary Search.',
                       'Quiz',
                       4);

-- Insert sample lessons for Merge Sort (id: 4)

INSERT INTO lessons (algorithm_id, title, content, lesson_type, order_index)
VALUES (4,
        'Introduction to Merge Sort',
        'Merge Sort is a divide-and-conquer algorithm that splits an array in half, recursively sorts each half, and then merges them back together.',
        'Theory',
        1), (4,
             'Merge Sort Visualization',
             'Watch how arrays are divided and merged back in sorted order.',
             'Visualization',
             2), (4,
                  'Merge Sort Challenge',
                  'Practice merging sorted subarrays!',
                  'Game',
                  3), (4,
                       'Merge Sort Quiz',
                       'Test your understanding of the merge process.',
                       'Quiz',
                       4);

-- Insert sample lessons for Quick Sort (id: 5)

INSERT INTO lessons (algorithm_id, title, content, lesson_type, order_index)
VALUES (5,
        'Introduction to Quick Sort',
        'Quick Sort picks a pivot element and partitions the array so that elements smaller than the pivot are on the left and larger ones are on the right.',
        'Theory',
        1), (5,
             'Quick Sort Visualization',
             'See how partitioning works with different pivot choices.',
             'Visualization',
             2), (5,
                  'Quick Sort Game',
                  'Choose pivots and partition the array yourself!',
                  'Game',
                  3), (5,
                       'Quick Sort Quiz',
                       'Test your pivot selection and partitioning skills.',
                       'Quiz',
                       4);

