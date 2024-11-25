-- Users table: stores information about app users, including credentials, height (used for BMI calculation), and profile details.
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY, -- Unique identifier for each user
    username VARCHAR(50) UNIQUE NOT NULL, -- Unique username for login
    email VARCHAR(100) UNIQUE NOT NULL, -- Unique email for communication/login
    password_hash VARCHAR(255) NOT NULL, -- Hashed password for secure storage
    age INT CHECK (age >= 0), -- Age of the user (must be non-negative)
    gender VARCHAR(10), -- Gender information (optional)
    height DECIMAL(4, 2) CHECK (height >= 0), -- Height in centimeters (used for BMI calculations)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of account creation
);

-- Workouts table: logs details of user workouts, including type, duration, and other metrics.
CREATE TABLE IF NOT EXISTS workouts (
    workout_id SERIAL PRIMARY KEY, -- Unique identifier for each workout
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Links workout to the user
    workout_type VARCHAR(50) NOT NULL, -- Type of workout (e.g., run, yoga)
    duration INT CHECK (duration >= 0), -- Duration in minutes
    distance DECIMAL(5, 2) CHECK (distance >= 0), -- Distance in kilometers
    calories_burned INT CHECK (calories_burned >= 0), -- Calories burned (optional)
    sets INT CHECK (sets >= 0), -- Number of sets (optional)
    reps INT CHECK (reps >= 0), -- Number of reps (optional)
    weight_used INT CHECK (weight_used >= 0), -- Weight used in workout (optional)
    workout_date DATE DEFAULT CURRENT_DATE, -- Date of the workout (default to current date)
    details JSONB, -- Additional details about the workout in JSON format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of workout log creation
);

-- BMI history table: tracks changes in users' BMI over time.
CREATE TABLE IF NOT EXISTS bmi_history (
    bmi_id SERIAL PRIMARY KEY, -- Unique identifier for each BMI entry
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Links BMI entry to the user
    weight DECIMAL(5, 2) NOT NULL CHECK (weight >= 0), -- User's weight in kilograms
    height DECIMAL(4, 2) NOT NULL CHECK (height >= 0), -- Height at the time of recording
    bmi DECIMAL(4, 2) GENERATED ALWAYS AS (weight / ((height / 100) ^ 2)) STORED, -- Auto-calculated BMI
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of BMI record
);

-- Plans table: stores workout plans created by users.
CREATE TABLE IF NOT EXISTS plans (
    plan_id SERIAL PRIMARY KEY, -- Unique identifier for each plan
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Links plan to the user
    plan_name VARCHAR(50) NOT NULL, -- Name of the workout plan
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp of plan creation
);

-- Reminders table: stores notifications/reminders for users.
CREATE TABLE IF NOT EXISTS reminders (
    reminder_id SERIAL PRIMARY KEY, -- Unique identifier for each reminder
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE, -- Links reminder to the user
    reminder_date TIMESTAMP, -- Date and time of the reminder
    message TEXT -- Reminder message
);

-- Indexes: optimize query performance.
CREATE INDEX IF NOT EXISTS idx_user_id ON workouts(user_id); -- Index for querying workouts by user_id
CREATE INDEX IF NOT EXISTS idx_workout_type ON workouts(workout_type); -- Index for querying workouts by type
CREATE INDEX IF NOT EXISTS idx_plan_user_id ON plans(user_id); -- Index for querying plans by user_id
CREATE INDEX IF NOT EXISTS idx_reminder_user_id ON reminders(user_id); -- Index for querying reminders by user_id
CREATE INDEX IF NOT EXISTS idx_user_id_bmi ON bmi_history(user_id); -- Index for querying BMI history by user_id
CREATE INDEX IF NOT EXISTS idx_date_workouts ON workouts(workout_date); -- Index for querying workouts by date
CREATE INDEX IF NOT EXISTS idx_recorded_at_bmi ON bmi_history(recorded_at); -- Index for querying BMI history by date
