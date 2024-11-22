# Workout-Tracker API
This branch consists of the API implementation using Node, Express, and Knex as a query builder. It uses a class-based approach to build the models and controllers.

# Installation

### Clone the Repository
```
git clone https://github.com/Jeffrey-Le/Workout-Tracker.git
```

### Switch to correct branch
```
git checkout backend-api

cd backend
```

### Install Dependencies
##### Option 1:
```
npm install (while in the correct backend directory)
```

##### Option 2:
```
npm express knex dotenv bcrypt body-parser
(while in the correct backend directory)
```

### Ensure Database connection
##### Refer to the database-setup branch here (the .env section):

```
https://github.com/Jeffrey-Le/Workout-Tracker/tree/database-setup-imaan
```

# Usage
### GET Request
```
http://localhost:3000/api/users/<id>

http://localhost:3000/api/users/2 => Returns User with ID 2

http://localhost:3000/api/workouts/user/11 => Returns all workouts for user with ID 2
```

### POST Request
```
http://localhost:3000/api/workouts/add => Returns the newly added workout assuming correct credentials are passed into body

BODY:
{
    "workout_type": "Run",
    "duration": "60",
    ...
}
```

```
http://localhost:3000/api/bmi/add => Returns the newly added bmi history entry assuming correct credentials are passed into body

BODY:
{
    "weight": 140,
    "height": 60,
    ...
}
```

### PUT Request (Update)
```
http://localhost:3000/api/reminders/update => Returns the updated reminder entry assuming at least an id is passed into body

BODY:
{
    "id": 5,
    "reminder_date": 02/11/2035,
    "message": "Do this now."
}
```

### DELETE Request
```
http://localhost:3000/api/plans/delete/3 => Deletes the plan with ID 3 and returns it
```