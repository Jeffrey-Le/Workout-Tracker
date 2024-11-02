-- Here we create the user's table to store their general information for authentication/profiles/accounting

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Here we create the workout data table to track the relevant details for each user's workouts

CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    workout_type VARCHAR(50) NOT NULL,
    duration INT, -- in minutes
    calories_burned INT,
    workout_date DATE DEFAULT CURRENT_DATE,
    sets INT,
    reps INT,
    weight_used INT
);

-- Here we create tha table for storing the workout plans of each user
CREATE TABLE plans (
    workout_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    plan_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Here we create a table for reminding users for scheduling using notifications
CREATE TABLE reminders (
    reminder_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    reminder_date TIMESTAMP,
    message TEXT
);

-- Now we create indexes for querying faster
CREATE INDEX idx_user_id ON workouts(user_id);
CREATE INDEX idx_workout_type ON workouts(workout_type);
CREATE INDEX idx_plan_user_id ON plans(user_id);
CREATE INDEX idx_reminder_user_id ON reminders(user_id);

-- Now we need foreign keys to ensure every entry actually exists 
ALTER TABLE workouts ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE plans ADD CONSTRAINT fk_user_plan FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE reminders ADD CONSTRAINT fk_user_reminder FOREIGN KEY (user_id) REFERENCES users(user_id);