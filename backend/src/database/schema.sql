-- Create algorithms table

CREATE TABLE IF NOT EXISTS algorithms ( id SERIAL PRIMARY KEY,
                                                          name VARCHAR(100) NOT NULL,
                                                                            description TEXT, category VARCHAR(50) CHECK (category IN ('Sorting',
                                                                                                                                       'Searching')) NOT NULL,
                                                                                                                                                     difficulty VARCHAR(50) CHECK (difficulty IN ('Beginner',
                                                                                                                                                                                                  'Intermediate',
                                                                                                                                                                                                  'Advanced')) NOT NULL,
                                                                                                                                                                                                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Create lessons table

CREATE TABLE IF NOT EXISTS lessons
  ( id SERIAL PRIMARY KEY,
                      algorithm_id INT REFERENCES algorithms(id) ON DELETE CASCADE,
                                                                           title VARCHAR(150) NOT NULL,
                                                                                              content TEXT, lesson_type VARCHAR(50) CHECK (lesson_type IN ('Theory',
                                                                                                                                                           'Visualization',
                                                                                                                                                           'Game',
                                                                                                                                                           'Quiz')) NOT NULL,
                                                                                                                                                                    order_index INT NOT NULL,
                                                                                                                                                                                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Create user_progress table

CREATE TABLE IF NOT EXISTS user_progress
  ( id SERIAL PRIMARY KEY,
                      user_id INT NOT NULL,
                                  algorithm_id INT REFERENCES algorithms(id) ON DELETE CASCADE,
                                                                                       lesson_id INT REFERENCES lessons(id) ON DELETE CASCADE,
                                                                                                                                      status VARCHAR(50) CHECK (status IN ('Not Started',
                                                                                                                                                                           'In Progress',
                                                                                                                                                                           'Completed')) DEFAULT 'Not Started',
                                                                                                                                                                                                 last_accessed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                                                                                                                                                                                                                 UNIQUE(user_id, lesson_id));

-- Create indexes for better performance

CREATE INDEX idx_lessons_algorithm_id ON lessons(algorithm_id);


CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);


CREATE INDEX idx_user_progress_algorithm_id ON user_progress(algorithm_id);

