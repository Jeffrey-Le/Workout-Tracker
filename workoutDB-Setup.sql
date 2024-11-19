-- Users table with additional fields for BMI calculation
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    age INT CHECK (age >= 0),
    gender VARCHAR(10),
    height DECIMAL(4, 2) CHECK (height >= 0), -- in centimeters
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workouts table with additional fields and flexible JSONB field for any additional workout details
CREATE TABLE IF NOT EXISTS workouts (
    workout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    workout_type VARCHAR(50) NOT NULL, -- e.g., run, swim, yoga, etc.
    duration INT CHECK (duration >= 0), -- in minutes
    distance DECIMAL(5, 2) CHECK (distance >= 0), -- in kilometers, can be NULL for workouts without distance moved
    calories_burned INT CHECK (calories_burned >= 0), -- optional field for tracking calories burned for each workout
    sets INT CHECK (sets >= 0), -- optional field for sets in a workout
    reps INT CHECK (reps >= 0), -- optional field for reps in a workout
    weight_used INT CHECK (weight_used >= 0), -- optional field for weight used in a workout
    workout_date DATE DEFAULT CURRENT_DATE,
    details JSONB, -- JSON column for workout-specific details
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BMI history table to track BMI changes over time
CREATE TABLE IF NOT EXISTS bmi_history (
    bmi_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    weight DECIMAL(5, 2) NOT NULL CHECK (weight >= 0), -- in kilograms
    height DECIMAL(4, 2) NOT NULL CHECK (height >= 0), -- height at the time of record
    bmi DECIMAL(4, 2) GENERATED ALWAYS AS (weight / ((height / 100) ^ 2)) STORED, -- Automatically calculated
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workout plans table for storing user-defined workout plans
CREATE TABLE IF NOT EXISTS plans (
    plan_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    plan_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reminders table for scheduling notifications
CREATE TABLE IF NOT EXISTS reminders (
    reminder_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    reminder_date TIMESTAMP,
    message TEXT
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_user_id ON workouts(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_type ON workouts(workout_type);
CREATE INDEX IF NOT EXISTS idx_plan_user_id ON plans(user_id);
CREATE INDEX IF NOT EXISTS idx_reminder_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_user_id_bmi ON bmi_history(user_id);
CREATE INDEX IF NOT EXISTS idx_date_workouts ON workouts(workout_date);
CREATE INDEX IF NOT EXISTS idx_recorded_at_bmi ON bmi_history(recorded_at);