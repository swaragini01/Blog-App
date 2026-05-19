⚙️ Setup Instructions (Commands)
# 1. Clone the repository
git clone https://github.com/swaragini01/Blog-App.git

# 2. Navigate to backend folder
cd Blog-App/Backend

# 3. Install dependencies
npm install

# 4. Create .env file
touch .env

# Add the following variables
PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# 5. Run the server
npm start
# OR (if using nodemon)
npm run dev

Installed Modules & Their Use
1. express

👉 Web framework used to build APIs and handle routes.

2. mongoose

👉 Connects Node.js with MongoDB and helps create schemas/models.

3. dotenv

👉 Loads environment variables from .env file.

4. cors

👉 Enables cross-origin requests (frontend ↔ backend).

5. bcryptjs

👉 Hashes passwords securely before storing in DB.

6. jsonwebtoken (JWT)

👉 Used for authentication (login → token generation).

7. cookie-parser

👉 Parses cookies (used for authentication/session handling).

8. nodemon (dev dependency)

👉 Automatically restarts server during development.

🗂️ Backend Structure (Typical)
Backend/
│── models/
│   ├── userModel.js
│   ├── authorModel.js
│   ├── articleModel.js
│
│── routes/
│   ├── userRoutes.js
│   ├── authorRoutes.js
│   ├── adminRoutes.js
│
│── middlewares/
│   ├── verifyToken.js
│
│── server.js
│── package.json

🧠 Models Used
👤 User Model
username
email
password (hashed)
role (user / author / admin)
✍️ Author Model
authorId
articles
profile info
📝 Article Model
title
content
author
comments
likes
createdAt
🔗 API Methods & Their Use
👤 User APIs
Method	Endpoint	Description
POST	/register	Register new user
POST	/login	Login user and generate JWT
GET	/users	Get all users (admin)
GET	/user/:id	Get specific user
DELETE	/user/:id	Delete user

👉 Used for authentication and managing users.

✍️ Author APIs
Method	Endpoint	Description
POST	/article	Create blog post
GET	/articles	Get all articles
GET	/article/:id	Get single article
PUT	/article/:id	Update article
DELETE	/article/:id	Delete article

👉 Authors can manage blog content (CRUD operations).

💬 Additional Functionalities
Add comments on articles
Like / unlike posts
Role-based authorization (User / Author / Admin)
Token-based authentication (JWT)

👉 These are standard blog backend features where users interact with posts and admins control content.

🔐 Middleware
verifyToken Middleware
Checks if JWT token is valid
Protects private routes
Ensures only authorized users access APIs
🌐 Deployment

👉 Live Backend Logs:
View Deployment Logs

📌 Features
User Authentication (JWT)
Role-Based Authorization
Blog CRUD Operations
Comment & Like System
Secure Password Hashing
REST API Architecture
🧑‍💻 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Backend Deployment link  : https://dashboard.render.com/web/srv-d85b2eog4nts73fq5ca0/logs?r=1h
