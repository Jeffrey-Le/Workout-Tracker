import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './log_workout.css';

const LogWorkout = () => {
    const navigate = useNavigate();
    const [workoutData, setWorkoutData] = useState({
        type: '',
        duration: '',
        distance: '',
        calories: '',
        notes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically save the workout data
        console.log('Workout logged:', workoutData);
        // Navigate back to dashboard after submission
        navigate('/');
    };

    return (
        <>
            <div className="header">
                <h1 className="today-date-text">
                    Today, 11th November 2024
                </h1>
                
                <h2 className="header-text">
                    New Entry
                </h2>
                
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-row">
                        <div className="form-column">
                            <label className="label">
                                Workout
                            </label>
                            <select
                                name="type"
                                value={workoutData.type}
                                onChange={handleChange}
                                className="select"
                            >
                                <option value="">Select Type</option>
                                <option value="Run">Run</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Swimming">Yoga</option>
                            </select>
                        </div>

                        <div className="form-column">
                            <label className="label">
                                Time (minutes)
                            </label>
                            <input
                                type="number"
                                name="duration"
                                value={workoutData.duration}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>

                        <div className="form-column">
                            <label className="label">
                                Distance (miles)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="distance"
                                value={workoutData.distance}
                                onChange={handleChange}
                                className="input"
                            />
                        </div>
                    </div>

                    {/* second row */}
                    <div className="form-row-description">
                        <label className="label">
                            Descirption:
                        </label>
                        <textarea
                            name="notes"
                            value={workoutData.notes}
                            onChange={handleChange}
                            className="input"
                            rows="4" 
                        />
                    </div>

                    <div className="form-row">
                        
                    </div>



                    <div className="form-row">
                        <div className="form-column">
                            <button type="submit" className="cancel-button">
                                Cancel
                            </button>
                        </div>

                        <div className="form-column">
                        </div>

                        <div className="form-column">
                            <button type="submit" className="create-button">
                                Create
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default LogWorkout;
