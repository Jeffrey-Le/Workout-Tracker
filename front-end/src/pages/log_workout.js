import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './log_workout.css';

const apiUrl = 'http://localhost:5001';

const LogWorkout = () => {
    const navigate = useNavigate();
    const [workoutData, setWorkoutData] = useState({
        workoutType: '',
        duration: '',
        distance: '',
        calories: '0',
        notes: '',
    });

    const [workouts, setWorkouts] = useState([]); // State to store logged workouts
    const [loading, setLoading] = useState(false);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('No token found. Please log in again.');
                    return;
                }

                const response = await axios.get(`${apiUrl}/workouts`, {
                    headers: { Authorization: token },
                });
                setWorkouts(response.data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
                alert('Failed to fetch workouts. Please try again.');
            }
        };

        fetchWorkouts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorkoutData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!workoutData.distance) {
            alert('Distance is required for all workouts.');
            setLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('No token found. Please log in again.');
                setLoading(false);
                return;
            }

            const response = await axios.post(`${apiUrl}/workouts`, workoutData, {
                headers: { Authorization: token },
            });

            setWorkouts((prev) => [...prev, response.data]);

            alert('Workout logged successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error logging workout:', error);
            alert('Failed to log workout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="header">
                <h1 className="today-date-text">Today, {formattedDate}</h1>
                <h2 className="header-text">New Entry</h2>
            </div>

            <div className="form-container">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-row">
                        <div className="form-column">
                            <label className="label">Workout</label>
                            <select
                                name="workoutType"
                                value={workoutData.workoutType}
                                onChange={handleChange}
                                className="select"
                                disabled={loading}
                            >
                                <option value="">Select Type</option>
                                <option value="Run">Run</option>
                                <option value="Cycling">Cycling</option>
                                <option value="Swimming">Swimming</option>
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
                                disabled={loading}
                            />
                        </div>

                        <div className="form-column">
                            <label className="label">Distance (miles)</label>
                            <input
                                type="number"
                                name="distance"
                                value={workoutData.distance}
                                onChange={handleChange}
                                className="input"
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row-description">
                        <label className="label">Description:</label>
                        <textarea
                            name="notes"
                            value={workoutData.notes}
                            onChange={handleChange}
                            className="input"
                            rows="4"
                            disabled={loading}
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
