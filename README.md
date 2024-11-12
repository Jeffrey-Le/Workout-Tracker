

---

### README: Database Setup Instructions


---



#### Step 1: Install Cloud SQL Auth Proxy

1. Download the Cloud SQL Auth Proxy from [Google's release page](https://cloud.google.com/sql/docs/postgres/connect-auth-proxy#install).
2. Place the downloaded file in an easily accessible directory and make it executable:
   ```bash
   chmod +x cloud_sql_proxy
   ```

#### Step 2: Start the Proxy

Run the following command to start the proxy. Replace `PROJECT_ID`, `REGION`, and `INSTANCE_NAME` with the specific details for our instance:
```bash
./cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:5432
```

This command will securely forward the Google Cloud SQL instance to `localhost:5432` on your machine, allowing you to access the database as if it were running locally.

#### Step 3: Configure Your `.env` File

Ensure you have a `.env` file in the root of the project with the following database configuration:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workout_tracker_test
DB_USER=test_user
DB_PASSWORD=your_password
```

Replace `your_password` with the actual password for the `test_user` account.

#### Step 4: Connect to the Database

With the Cloud SQL Auth Proxy running, you can now connect to the database. 

- **Using `psql`**:
  ```bash
  psql -h localhost -U test_user -d workout_tracker_test
  ```

- **Through the API**: Ensure your backend API is set up to read database connection details from `.env`.

---

### Local Database Setup (Optional)


#### Step 1: Install PostgreSQL

1. Install PostgreSQL from [PostgreSQL's official site](https://www.postgresql.org/download/).
2. Ensure `psql` is available in your terminal.

#### Step 2: Create the Database

After installation, open `psql` and create a local database:

```sql
CREATE DATABASE workout_tracker_test;
```

#### Step 3: Run the Setup Script


```bash
psql -U postgres -d workout_tracker_test -f path/to/setup.sql
```

#### Step 4: Update Your `.env` File

Configure your `.env` file for local use:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workout_tracker_test
DB_USER=your_local_user
DB_PASSWORD=your_local_password
```

Replace `your_local_user` and `your_local_password` with your local PostgreSQL credentials.

---

### API Integration

For API calls, the backend code should read from the `.env` file for database connection settings. Ensure you install `dotenv` if it’s not already added to your project:

```bash
npm install dotenv
```

Configure your database connection in the backend code (e.g., in `db.js` or similar):

```javascript
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
```

This will allow the API to use the appropriate database configuration based on your environment.





---

Ask me any questions.
