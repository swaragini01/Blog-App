# MyBlog - MERN Blog Application

MyBlog is a full-stack blog application built with React, Vite, Express, MongoDB, and JWT authentication. The project supports user and author accounts, article publishing, article editing, soft deletion, reading articles, and adding comments.

## Features

- Register as a normal user or author
- Login and logout with JWT stored in an HTTP-only cookie
- Navbar changes based on login status
- Profile page shows welcome message, user role, and email address
- Authors can create articles
- Authors can view, edit, and delete their own articles
- Users can browse active articles
- Users can add comments to articles
- Protected backend routes based on user role
- MongoDB database using Mongoose models

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Zustand
- Axios
- React Hook Form
- React Hot Toast
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cookie-parser
- cors
- multer
- Cloudinary

## How To Run

### Backend

```powershell
cd Backend
npm install
npm.cmd start
Backend runs on:

http://localhost:5000
Health check:

http://localhost:5000/health
Frontend
cd Frontend
npm install
npm.cmd run dev
Frontend runs on:

http://localhost:5173
Environment Variables
Create .env inside the Backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
PORT=5000

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
Create .env inside the Frontend folder:

VITE_API_BASE_URL=http://localhost:5000
User Roles
User
A normal user can register, login, browse articles, read full articles, and add comments.

Author
An author can register, login, create articles, edit their own articles, delete their own articles, and view their published articles.

Admin
Admin route exists in the backend, but admin features are not fully implemented yet.

Main Pages
Route	Description
/	Home page
/register	Register as user or author
/login	Login page
/profile	User profile page
/articles	Browse articles
/author-profile	Author dashboard
/author-profile/articles	Author articles
/author-profile/write-article	Write new article
/article/:id	View full article
/edit-article	Edit article
Navbar
Before login, navbar shows:

Home
Register
Login
After login, navbar shows:

Home
Profile
Logout
API Endpoints
Common API
Base URL:

/common-api
Method	Endpoint	Description
POST	/login	Login user, author, or admin
GET	/logout	Logout user
GET	/check-auth	Check logged-in user
PUT	/change-password	Change password
GET	/articles/:id	Get one article
User API
Base URL:

/user-api
Method	Endpoint	Description
POST	/users	Register normal user
GET	/articles	Get all active articles
PUT	/articles	Add comment to article
Author API
Base URL:

/author-api
Method	Endpoint	Description
POST	/users	Register author
POST	/articles	Create article
GET	/articles/:authorId	Get author articles
PUT	/articles	Edit article
PATCH	/articles/:id/status	Delete or restore article
Database Models
User Model
Fields:

firstName
lastName
email
password
profileImageUrl
role
isActive
Roles:

USER
AUTHOR
ADMIN
Article Model
Fields:

author
title
category
content
comments
isArticleActive
Each comment contains:

user
comment
Project Flow
User registers as User or Author.
User logs in using email and password.
Backend verifies credentials and creates JWT token.
Token is stored in an HTTP-only cookie.
Profile page shows welcome message, role, and email.
Author can create, edit, and delete articles.
User can browse articles and add comments.
Logout clears the cookie.
Troubleshooting
Registration Failed
Check backend is running:

http://localhost:5000/health
If backend is not running:

cd Backend
npm.cmd start
Also check:

MongoDB URI is correct
Backend shows DB connection success
Frontend .env has VITE_API_BASE_URL=http://localhost:5000
You are opening frontend at http://localhost:5173
The email is not already registered
PowerShell npm Error
Use:

npm.cmd
instead of:

npm
Example:

npm.cmd run dev
Future Improvements
Admin dashboard
Search articles
Category filter
Article image upload
Edit comments
Delete comments
Pagination
Better frontend route protection
Unit and integration tests
