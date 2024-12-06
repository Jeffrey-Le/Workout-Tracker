# Workout-Tracker
Workout Tracker App for CS35L UCLA.

## 1. Set up the server

Download and install Node.js from [Node.js Download Page](https://nodejs.org/en/download/prebuilt-installer/current)

Install the required packages:
```
npm install
npm install express --save
npm install jsonwebtoken
npm install cors
npm install bcryptjs
```

## 2. Set up the database

Install PostgreSQL: Download and install PostgreSQL from PostgreSQL Download Page.
```
https://www.postgresql.org/download/
```

If using homebrew, do the following on your shell to start PostgreSQL:
```
//Install postgreSQL through Homebrew
$ cd backend-revision
$ brew install postgresql@14

//Add PostgreSQL to your PATH
$ export PATH="/opt/homebrew/opt/postgresql@14/bin:$PATH"
$ export PGDATA="/opt/homebrew/var/postgresql@14"
$ source ~/.zshrc

//Create a new local database called "postgres"
$ brew services start postgresql@14
$ psql postgres
```

Create the user (e.g., 35LbsAdmin): 
```
// Run the following command in the psql shell terminal.
postgres=# CREATE USER "35LbsAdmin" WITH PASSWORD '35LbsA+';
CREATE ROLE
```
Create the database: Run the following command in the psql shell terminal.
```
postgres=# CREATE DATABASE workoutdb OWNER "35LbsAdmin";
CREATE DATABASE

postgres=# \l                                                                     List of databases
   Name    |   Owner    | Encoding | Locale Provider |          Collate           |           Ctype            | Locale | ICU Rules |   Access privileges
-----------+------------+----------+-----------------+----------------------------+----------------------------+--------+-----------+-----------------------
 postgres  | postgres   | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
 template0 | postgres   | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           | =c/postgres          +
           |            |          |                 |                            |                            |        |           | postgres=CTc/postgres
 template1 | postgres   | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           | =c/postgres          +
           |            |          |                 |                            |                            |        |           | postgres=CTc/postgres
 workoutdb | 35LbsAdmin | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
(4 rows)

```

Exit PostgreSQL Shell
```
postgres=# \q 
```

Run the SQL schema: Execute the provided workoutDB-Setup.sql file to create tables and indexes.
```
$ psql -U 35LbsAdmin -d workoutdb -f workoutDB-Setup.sql
Password for user 35LbsAdmin: 35LbsA+
psql:workoutDB-Setup.sql:1: NOTICE:  table "reminders" does not exist, skipping
DROP TABLE
psql:workoutDB-Setup.sql:2: NOTICE:  table "plans" does not exist, skipping
DROP TABLE
psql:workoutDB-Setup.sql:3: NOTICE:  table "bmi_history" does not exist, skipping
DROP TABLE
psql:workoutDB-Setup.sql:4: NOTICE:  table "workouts" does not exist, skipping
DROP TABLE
psql:workoutDB-Setup.sql:5: NOTICE:  table "users" does not exist, skipping

DROP TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
CREATE INDEX
```
Verify tables: After running the schema, connect to the database
```
$ psql -U 35LbsAdmin -d workoutdb
Password for user 35LbsAdmin: 35LbsA+
psql (17.1)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.
```

List the database after connected to the database
```
workoutdb=> \dt
             List of relations
 Schema |    Name     | Type  |   Owner
--------+-------------+-------+------------
 public | bmi_history | table | 35LbsAdmin
 public | plans       | table | 35LbsAdmin
 public | reminders   | table | 35LbsAdmin
 public | users       | table | 35LbsAdmin
 public | workouts    | table | 35LbsAdmin
(5 rows)
```

## 3. Set up test tool

Download Postman from [Postman Download Page](https://www.postman.com/downloads/)

## 4. Test Result

### 4.1 User Registration

1. **Run the server**:
   ```
   node app.js
   ```
   
2. **Check that the server is running** through the web browser:
   ```
   ipconfig
   ```
   - Find your IPv4 address, e.g., `192.168.0.1`
   - Go to: `http://192.168.0.1:3000`
   - You should see the following message: "Welcome to the Workout Tracker App!"

3. **Send a POST request in Postman** to create a new user:
   - URL: `http://192.168.0.1:3000/register`
   - Method: `POST`
   - Body (JSON):
     ```json
     {
       "username": "testuser",
       "password": "password123",
       "email": "123@ucla.edu"
     }
     ```

4. **Check the response**:
   - You should receive the following message:
     ```
     201 Created: "User registered successfully."
     ```

## 5. Set up the React Frontend

Clone the repository for the React frontend app.
Install React Dependencies:
 ```
npx create-react-app workout-track
npm install axios react-router-dom
npm install lucide-react
npm install react-chartjs-2 chart.js
npm install react-image-gallery
npm install react-datepicker
   ```

Run the React App: npm start
The app should be available at http://localhost:3001 by default.
Verify Connection with Backend:
- Ensure the backend server is running:

Check functionality in the browser (e.g., registering a user, logging workouts).
