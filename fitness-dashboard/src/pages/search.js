import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './search.css';

const Search = ({ activities = [] }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [workoutType, setWorkoutType] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTypeChange = (e) => {
        setWorkoutType(e.target.value);
    };

    const filteredActivities = activities.filter(activity => {
        const matchesDate = selectedDate ? activity.date === selectedDate.toISOString().split('T')[0] : true;
        const matchesType = workoutType ? activity.type === workoutType : true;
        return matchesDate && matchesType;
    });


    return (
        <>
            <div className="header">
                <h1 className="header-text">
                    Search
                </h1>  
            </div>

            <div className="searchbar-row">
                    
                <div className="label-column1">
                    <label className="label">
                        By workout type
                    </label>
                </div>
                <div className="select-column">
                    <select
                        name="type"
                        value={workoutType}
                        onChange={(e) => setWorkoutType(e.target.value)}
                        className="select"
                    >
                        <option value="">Select Type</option>
                        <option value="Run">Run</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Yoga">Yoga</option>
                    </select>
                </div>    

                <div className="label-column">
                    <label className="label">
                        By date
                    </label>
                </div>
                <div className="select-column">
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="input"
                        dateFormat="MM/dd/yyyy"
                    />
                </div>
            </div>  
            
            <div className="results-container">
                <table class="list">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Workout</th>
                            <th>Duration</th>
                        </tr>
                    </thead>

                    <tbody class="search-result-list">
                        {filteredActivities.map((activity, index) => (
                            <tr key={index}>
                                <td>{activity.date}</td>
                                <td>{activity.type}</td>
                                <td>{activity.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Search;