-- Add main_category column to algorithms table
ALTER TABLE algorithms 
ADD COLUMN main_category VARCHAR(50) DEFAULT 'Algorithms';

-- Update existing records
UPDATE algorithms SET main_category = 'Algorithms';

-- Modify category constraint to allow more categories
ALTER TABLE algorithms 
MODIFY COLUMN category VARCHAR(50) NOT NULL;
