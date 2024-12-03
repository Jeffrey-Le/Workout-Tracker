import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './search.css';
import ApiService from '../services/api';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [workoutType, setWorkoutType] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check authentication on component mount
        if (!AuthService.isAuthenticated()) {
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTypeChange = (e) => {
        setWorkoutType(e.target.value);
    };

    const getDateQuery = (date) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    const fetchSearchResults = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const dateQuery = getDateQuery(selectedDate);
            const results = await ApiService.searchWorkouts(dateQuery, workoutType);
            setSearchResults(results);
        } catch (error) {
            setError('Failed to fetch workouts. Please try again.');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="header">
                <h1 className="header-text">Search</h1>
            </div>

            <div className="searchbar-row">
                {/* Your existing search form JSX */}
                <div className="label-column1">
                    <label className="label">By workout type</label>
                </div>
                <div className="select-column">
                    <select
                        name="type"
                        value={workoutType}
                        onChange={handleTypeChange}
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
                    <label className="label">By date</label>
                </div>
                <div className="select-column">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        className="input"
                        dateFormat="MM/dd/yyyy"
                    />
                </div>

                <div className="select-column">
                    <button
                        onClick={fetchSearchResults}
                        className="search-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="error-message" style={{ color: 'red', margin: '1rem 0' }}>
                    {error}
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
                        {searchResults.length > 0 ? (
                            searchResults.map((workout) => (
                                <tr key={workout.workout_id}>
                                    <td>{new Date(workout.workout_date).toLocaleDateString()}</td>
                                    <td>{workout.workout_type}</td>
                                    <td>{workout.duration} minutes</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: 'center' }}>
                                    {isLoading ? 'Loading...' : 'No workouts found'}
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






// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import './search.css';



// const Search = () => {
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [workoutType, setWorkoutType] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     const handleDateChange = (date) => {
//         setSelectedDate(date);
//         console.log('Selected Date:', date ? date.toISOString().split('T')[0] : 'None');
//     };

//     const handleTypeChange = (e) => {
//         setWorkoutType(e.target.value);
//         console.log('Selected Workout Type:', e.target.value || 'None');
//     };

//     const getDateQuery = (date) => {
//         if (!date) return '';
//         const dateStr = date.toISOString().split('T')[0];
//         // You could optionally just send year or year-month
//         return dateStr;
//       };


//     // monitor changes to the selectedDate and workoutType
//     // useEffect(() => {
//     //     console.log('Current state:', {
//     //         date: selectedDate ? selectedDate.toISOString().split('T')[0] : 'None',
//     //         workoutType: workoutType || 'None',
//     //     });

//     //     }, [selectedDate, workoutType]);

//     /* features to edit a workout after searching

//     const styles = {
//         clickableRow: {
//             cursor: 'pointer',
//             '&:hover': {
//                 backgroundColor: '#f5f5f5'
//             }
//         },
//         detailPanel: {
//             padding: '20px',
//             backgroundColor: '#f9f9f9',
//             borderTop: '1px solid #ddd'
//         },
//         editableField: {
//             cursor: 'pointer',
//             '&:hover': {
//                 backgroundColor: '#e9e9e9'
//             }
//         }
//     };


//     const [selectedWorkout, setSelectedWorkout] = useState(null);  // Stores currently selected workout
//     const [isEditing, setIsEditing] = useState(false);            // Tracks if in edit mode
//     const [editedWorkout, setEditedWorkout] = useState(null);     // Stores temporary edits
    

//     // when a workout row is clicked and the user wants to edit it
//     const handleRowClick = (workout) => {
//         setSelectedWorkout(selectedWorkout?.workout_id === workout.workout_id ? null : workout);
//         setEditField(null);
//     }; // accordion toggle

//     // when a field (date/type) is clicked and being edited
//     const handleFieldEdit = (field, workout) => {
//         setEditField({ field, workoutId: workout.workout_id });
//     };

//     // after editing a field, save the changes
//     const handleFieldSave = (value) => {

// ////////////  TODO: Implement API call to save changes /////////
        
//         setSelectedWorkout(prev => ({
//             ...prev,
//             [editField.field]: value
//         }));
//         setEditField(null);
//     };

//     */



//     const fetchSearchResults = async () => {

//         try {
//             const dateQuery = getDateQuery(selectedDate);
//             const response = await fetch(
//                 `http://localhost:5000/workouts/search?date=${dateQuery}&type=${workoutType}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error('Failed to fetch search results');
//             }

//             const data = await response.json();
//             setSearchResults(data);
//         }

//         catch (error) {
//             console.error('Failed to fetch search results:', error);
//         }
//     }


//     /* Test data

//     const mockWorkouts = [
//         {
//             workout_id: 1,
//             workout_type: "Run",
//             workout_date: "2024-03-15",
//             duration: 30,
//             user_id: 1
//         },
//         {
//             workout_id: 2,
//             workout_type: "Cycling",
//             workout_date: "2024-03-14",
//             duration: 45,
//             user_id: 1
//         },
//         {
//             workout_id: 3,
//             workout_type: "Swimming",
//             workout_date: "2024-03-13",
//             duration: 60,
//             user_id: 1
//         },
//         {
//             workout_id: 4,
//             workout_type: "Run",
//             workout_date: "2024-03-12",
//             duration: 25,
//             user_id: 1
//         }
//     ];


//     useEffect(() => {
//         fetchSearchResults();
//     }, [selectedDate, workoutType]);

//     const fetchSearchResults = async () => {
//         try {
//             // Simulate API delay
//             await new Promise(resolve => setTimeout(resolve, 500));

//             let filteredResults = [...mockWorkouts];

//             // Filter by date if selected
//             if (selectedDate) {
//                 const dateStr = selectedDate.toISOString().split('T')[0];
//                 filteredResults = filteredResults.filter(
//                     workout => workout.workout_date === dateStr
//                 );
//             }

//             // Filter by workout type if selected
//             if (workoutType) {
//                 filteredResults = filteredResults.filter(
//                     workout => workout.workout_type === workoutType
//                 );
//             }

//             setSearchResults(filteredResults);
//         } catch (error) {
//             console.error('Error fetching results:', error);
//             setSearchResults([]);
//         }
//     };

//     */


//     return (
//         <>
//             <div className="header">
//                 <h1 className="header-text">
//                     Search
//                 </h1>
//             </div>

//             <div className="searchbar-row">

//                 <div className="label-column1">
//                     <label className="label">
//                         By workout type
//                     </label>
//                 </div>
//                 <div className="select-column">
//                     <select
//                         name="type"
//                         value={workoutType}
//                         onChange={handleTypeChange}
//                         className="select"
//                     >
//                         <option value="">Select Type</option>
//                         <option value="Run">Run</option>
//                         <option value="Cycling">Cycling</option>
//                         <option value="Swimming">Swimming</option>
//                         <option value="Yoga">Yoga</option>
//                     </select>
//                 </div>

//                 <div className="label-column">
//                     <label className="label">
//                         By date
//                     </label>
//                 </div>
//                 <div className="select-column">
//                     <DatePicker
//                         selected={selectedDate}
//                         onChange={handleDateChange}
//                         className="input"
//                         dateFormat="MM/dd/yyyy"
//                     />
//                 </div>

//                 <div className="select-column">
//                     <button
//                         onClick={fetchSearchResults}
//                         className="search-button"
//                     >
//                         Search
//                     </button>
//                 </div>
//             </div >

//             <div className="results-container">
//                 <table class="list">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Workout</th>
//                             <th>Duration</th>
//                         </tr>
//                     </thead>

//                     <tbody className="search-result-list">
//                         {searchResults.length > 0 ?
//                             (
//                                 // if there are search results, map over them
//                                 searchResults.map((workout, index) => (
//                                     <tr key={workout.workout_id || index}>
//                                         <td>{new Date(workout.workout_date).toLocaleDateString()}</td>
//                                         <td>{workout.workout_type}</td>
//                                         <td>{workout.duration} minutes</td>
//                                     </tr>
//                                 )
//                                 )

//                             )
//                             :
//                             (
//                                 <tr>
//                                     {/* otherwise  */}
//                                     <td colSpan="3" style={{ textAlign: 'center' }}>
//                                         No workouts found
//                                     </td>
//                                 </tr>
//                             )
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }

// export default Search;