-- Drop existing tables if updating
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS algorithms CASCADE;

-- Create algorithms table with expanded categories
CREATE TABLE IF NOT EXISTS algorithms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) CHECK (category IN (
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
        'BitManipulation'
    )) NOT NULL,
    main_category VARCHAR(50) DEFAULT 'Algorithms',
    difficulty VARCHAR(50) CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
    time_complexity VARCHAR(50),
    space_complexity VARCHAR(50),
    use_cases TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    algorithm_id INT REFERENCES algorithms(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    lesson_type VARCHAR(50) CHECK (lesson_type IN ('Theory', 'Visualization', 'Game', 'Quiz', 'Code')) NOT NULL,
    order_index INT NOT NULL,
    code_snippet TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    algorithm_id INT REFERENCES algorithms(id) ON DELETE CASCADE,
    lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
    status VARCHAR(50) CHECK (status IN ('Not Started', 'In Progress', 'Completed')) DEFAULT 'Not Started',
    score INT DEFAULT 0,
    last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, lesson_id)
);

-- Create indexes for better performance
CREATE INDEX idx_algorithms_category ON algorithms(category);
CREATE INDEX idx_algorithms_difficulty ON algorithms(difficulty);
CREATE INDEX idx_lessons_algorithm_id ON lessons(algorithm_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_algorithm_id ON user_progress(algorithm_id);
CREATE INDEX idx_user_progress_status ON user_progress(status);
