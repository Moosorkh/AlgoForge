-- MySQL Schema for AlgoForge
-- Drop existing tables if updating
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS algorithms;

-- Create algorithms table with expanded categories
CREATE TABLE IF NOT EXISTS algorithms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    main_category VARCHAR(50) DEFAULT 'Algorithms',
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    use_cases TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (category IN (
        'Sorting',
        'Searching',
        'Array',
        'String',
        'LinkedList',
        'Stack',
        'Queue',
        'Tree',
        'Graph',
        'DynamicProgramming',
        'Greedy',
        'Backtracking',
        'Hashing',
        'Heap',
        'Trie',
        'Math',
        'BitManipulation',
        'React',
        'Angular',
        'Vue',
        'Frontend'
    ))
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    algorithm_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    lesson_type ENUM('Theory', 'Visualization', 'Game', 'Quiz', 'Code') NOT NULL,
    order_index INT NOT NULL,
    code_snippet TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (algorithm_id) REFERENCES algorithms(id) ON DELETE CASCADE
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    algorithm_id INT NOT NULL,
    lesson_id INT NOT NULL,
    status ENUM('Not Started', 'In Progress', 'Completed') DEFAULT 'Not Started',
    score INT DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_lesson (user_id, lesson_id),
    FOREIGN KEY (algorithm_id) REFERENCES algorithms(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_algorithms_category ON algorithms(category);
CREATE INDEX idx_algorithms_main_category ON algorithms(main_category);
CREATE INDEX idx_algorithms_difficulty ON algorithms(difficulty);
CREATE INDEX idx_lessons_algorithm_id ON lessons(algorithm_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_algorithm_id ON user_progress(algorithm_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
