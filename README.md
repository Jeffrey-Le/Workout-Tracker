README: Database Setup Instructions

Database Setup
Google Cloud Access
Step 1: Install Cloud SQL Auth Proxy
Download the Cloud SQL Auth Proxy from Google’s release page.
Place the downloaded file in an easily accessible directory and make it executable:
chmod +x cloud_sql_proxy


Step 2: Start the Proxy
Run the following command to start the proxy. Replace PROJECT_ID, REGION, and INSTANCE_NAME with the specific details for our instance:
./cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:5432

This command will securely forward the Google Cloud SQL instance to localhost:5432 on your machine, allowing you to access the database as if it were running locally.
Step 3: Configure Your .env File
Ensure you have a .env file in the root of the project with the following database configuration:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workout_tracker_test
DB_USER=test_user
DB_PASSWORD=your_password

Replace your_password with the actual password for the test_user account.
Step 4: Connect to the Database
With the Cloud SQL Auth Proxy running, you can now connect to the database.
Using psql:
psql -h localhost -U test_user -d workout_tracker_test


Through the API: Ensure your backend API is set up to read database connection details from .env.

Local Database Setup (Optional)
If you want to set up and test with a local PostgreSQL database:
Step 1: Install PostgreSQL
Install PostgreSQL from PostgreSQL’s official site.
Ensure psql is available in your terminal.
Step 2: Create the Database
After installation, open psql and create a local database:
CREATE DATABASE workout_tracker_test;

Step 3: Run the Setup Script
Use the provided sql.sql (or setup.sql) file to set up the schema on your local database:
psql -U postgres -d workout_tracker_test -f path/to/sql.sql

Step 4: Update Your .env File
Configure your .env file for local use:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workout_tracker_test
DB_USER=your_local_user
DB_PASSWORD=your_local_password

Replace your_local_user and your_local_password with your local PostgreSQL credentials.

API Integration
For API calls, the backend code should read from the .env file for database connection settings. Ensure you install dotenv if it’s not already added to your project:
npm install dotenv

Configure your database connection in the backend code (e.g., in db.js or similar):
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;


Let me know if you have any questions.
