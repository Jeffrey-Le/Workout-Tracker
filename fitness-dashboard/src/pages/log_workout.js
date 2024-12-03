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

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Disable form while loading
        setLoading(true);

        try {
            // API request to log workout
            const response = await fetch('http://localhost:5000/api/workouts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    
                    workoutType: workoutData.type,
                    duration: workoutData.duration,
                    distance: workoutData.distance,
                    calories: workoutData.calories,
                    notes: workoutData.notes,
                }),
            });
            

            if (!response.ok) {
                throw new Error('Failed to log workout');
            }

            const data = await response.json();
            console.log('Workout logged successfully:', data);

           
            alert('Workout logged successfully!');

            // Navigate back to the dashboard
            navigate('/');
        } catch (error) {
            console.error('Error logging workout:', error);
            alert('Failed to log workout. Please try again.');
        } finally {
            setLoading(false); // Re-enable form
        }
    };

    return (
        <>
            <div className="header">
                <h1 className="today-date-text">Today, 11th November 2024</h1>
                <h2 className="header-text">New Entry</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-row">
                        <div className="form-column">
                            <label className="label">Workout</label>
                            <select
                                name="type"
                                value={workoutData.type}
                                onChange={handleChange}
                                className="select"
                                disabled={loading} // Disable form while loading
                            >
                                <option value="">Select Type</option>
                                <option value="Run">Run</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Swimming">Swimming</option>
                                <option value="Yoga">Yoga</option>
                            </select>
                        </div>

                        <div className="form-column">
                            <label className="label">Time (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                value={workoutData.duration}
                                onChange={handleChange}
                                className="input"
                                disabled={loading} // Disable form while loading
                            />
                        </div>

                        <div className="form-column">
                            <label className="label">Distance (miles)</label>
                            <input
                                type="number"
                                step="0.1"
                                name="distance"
                                value={workoutData.distance}
                                onChange={handleChange}
                                className="input"
                                disabled={loading} // Disable form while loading
                            />
                        </div>
                    </div>

                    {/* Second row */}
                    <div className="form-row-description">
                        <label className="label">Description:</label>
                        <textarea
                            name="notes"
                            value={workoutData.notes}
                            onChange={handleChange}
                            className="input"
                            rows="4"
                            disabled={loading} // Disable form while loading
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-column">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => navigate('/')}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="form-column">
                            <button
                                type="submit"
                                className="create-button"
                                disabled={loading}
                            >
                                {loading ? 'Logging...' : 'Create'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LogWorkout;
