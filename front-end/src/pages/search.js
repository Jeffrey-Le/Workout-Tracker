import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './search.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:5001';

const Search = () => {
    const navigate = useNavigate();
    const [searchDate, setSearchDate] = useState(null);
    const [workoutTypeFilter, setWorkoutTypeFilter] = useState('');
    const [workoutResults, setWorkoutResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handleDateChange = (date) => {
        setSearchDate(date);
    };

    const handleWorkoutTypeChange = (e) => {
        setWorkoutTypeFilter(e.target.value);
    };

    const fetchWorkouts = async () => {
        setLoading(true);
        setSearchError(null);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found.');
            }
            const response = await axios.get(`${apiUrl}/workouts/search`, {
                headers: { Authorization: token },
                params: {
					type: workoutTypeFilter,
                    date: searchDate ? searchDate.toISOString().split('T')[0] : undefined,
                },
            });
            setWorkoutResults(response.data);
        } catch (error) {
            setSearchError('Failed to fetch workouts. Please try again.');
            setWorkoutResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="header">
                <h1 className="header-text">Search</h1>
            </div>

            <div className="searchbar-row">
                <div className="label-column1">
                    <label className="label">By workout type</label>
                </div>
                <div className="select-column">
                    <select
                        name="type"
                        value={workoutTypeFilter}
                        onChange={handleWorkoutTypeChange}
                        className="select"
                    >
                        <option value="">Select Type</option>
                        <option value="Run">Run</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Wimming">Swimming</option>
                        <option value="Yoga">Yoga</option>
                    </select>
                </div>

                <div className="label-column">
                    <label className="label">By date</label>
                </div>
                <div className="select-column">
                    <DatePicker
                        selected={searchDate}
                        onChange={handleDateChange}
                        className="input"
                        dateFormat="MM/dd/yyyy"
                    />
                </div>

                <div className="select-column">
                    <button
                        onClick={fetchWorkouts}
                        className="search-button"
                        disabled={loading}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {searchError && (
                <div className="error-message" style={{ color: 'red', margin: '1rem 0' }}>
                    {searchError}
                </div>
            )}

            <div className="results-container">
                <table className="list">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workout</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody className="search-result-list">
                        {workoutResults.length > 0 ? (
                            workoutResults.map((workout) => (
                                <tr key={workout.workout_id}>
                                    <td>{new Date(workout.workout_date).toLocaleDateString()}</td>
                                    <td>{workout.workout_type}</td>
                                    <td>{workout.duration} minutes</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    {loading ? 'Loading...' : 'No workouts found'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Search;

