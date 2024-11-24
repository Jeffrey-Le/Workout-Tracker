
---

### README: Database Setup Instructions

---

### **Overview**
This folder contains all necessary files and instructions to set up and configure the PostgreSQL database for the Workout Tracker application. It includes:
- A `setup.sql` script to initialize the database schema.
- An example `.env` file for secure environment variable management.
- Detailed instructions for connecting to the database locally or via Google Cloud SQL.

---

### **Step 1: Install Cloud SQL Auth Proxy**

1. Download the Cloud SQL Auth Proxy from [Google's release page](https://cloud.google.com/sql/docs/postgres/connect-auth-proxy#install).
2. Place the downloaded file in an easily accessible directory and make it executable:
   ```bash
   chmod +x cloud_sql_proxy
   ```

---

### **Step 2: Start the Proxy**

Run the following command to start the proxy. Replace `PROJECT_ID`, `REGION`, and `INSTANCE_NAME` with the specific details for our Google Cloud SQL instance:

```bash
./cloud_sql_proxy -instances=PROJECT_ID:REGION:INSTANCE_NAME=tcp:5432
```

This command will securely forward the Google Cloud SQL instance to `localhost:5432` on your machine, allowing you to access the database as if it were running locally.

---

### **Step 3: Configure Your `.env` File**

Ensure you have a `.env` file in the root of the project with the following database configuration:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workout_tracker_test
DB_USER=test_user
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
```

- Replace `your_password` with the actual password for the `test_user` account.
- Replace `your_jwt_secret` with a secure secret key for JWT authentication.

**Important Notes:**
- Never commit your `.env` file to version control. Use `.gitignore` to keep it secure.
- The `JWT_SECRET` and `JWT_EXPIRATION` are used for token-based authentication in your backend API.

---

### **Step 4: Connect to the Database**

With the Cloud SQL Auth Proxy running, you can now connect to the database:

- **Using `psql`**:
  ```bash
  psql -h localhost -U test_user -d workout_tracker_test
  ```

- **Using the Backend API**:
  Ensure your backend API is set up to read database connection details from `.env`. 

**TIP:** The database name is case-sensitive. However, uppercase database names are converted to lowercase when creating them.

---

### **Local Database Setup (Optional)**

If you’re not using Google Cloud SQL, you can set up the database locally:

#### **Step 1: Install PostgreSQL**
1. Download and install PostgreSQL from [PostgreSQL's official site](https://www.postgresql.org/download/).
2. Ensure `psql` is available in your terminal.

#### **Step 2: Create the Database**
Open `psql` and create a new database:
```sql
CREATE DATABASE workout_tracker_test;
```

#### **Step 3: Run the Setup Script**
Run the setup script to initialize the schema:
```bash
psql -U postgres -d workout_tracker_test -f backend/setup.sql
```

#### **Step 4: Configure Your `.env` File**
Fill in your `.env` file with the appropriate credentials:
```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workout_tracker_test
DB_USER=your_local_user
DB_PASSWORD=your_local_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1h
```

---

### **API Integration**

For API calls, the backend code reads configuration from the `.env` file. Ensure `dotenv` is installed in your backend project:
```bash
npm install dotenv
```

Configure your database connection in your backend code (e.g., `db.js`):
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


---

### **Folder Structure**

- **`setup.sql`**: Contains SQL commands to initialize the database schema.
- External folder:
- **`.env.example`**: Example environment variables for database and JWT configuration.
- **`.gitignore`**: Ensures sensitive files (like `.env`) are not committed to the repository.

---

### **Support and Troubleshooting**

- **Cannot Connect to the Database**:
  - Verify the Cloud SQL Auth Proxy is running if using Google Cloud SQL.
  - Check that your `.env` file contains the correct credentials.

- **Database Errors in Backend**:
  - Ensure the database schema has been initialized using `setup.sql`.

- **Environment Variables Not Working**:
  - Ensure you’ve installed `dotenv` and properly loaded the `.env` file in your backend code.

---

### **Contributing**

1. Clone the repository and switch to the `database-setup-imaan` branch:
   ```bash
   git checkout database-setup-imaan
   ```
2. Make your changes and ensure they don’t break the existing setup.
3. Push your changes to a feature branch and create a pull request.


---

### **Contact**

For questions or issues, you can reach out to me at imaansoltan@gmail.com

---

