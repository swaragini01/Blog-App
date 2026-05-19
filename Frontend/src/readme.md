⚙️ Setup Instructions (Commands)
# 1. Clone the repository
git clone https://github.com/swaragini01/Blog-App.git

# 2. Navigate to frontend folder
cd Blog-App/Frontend

# 3. Install dependencies
npm install

# 4. Start the application
npm start
📦 Installed Modules & Their Use
1. react

👉 Core library used to build UI components.

2. react-dom

👉 Renders React components to the DOM.

3. react-router-dom

👉 Used for navigation between pages (routing).

4. axios

👉 Used to make API calls to backend.

5. redux / context api (if used)

👉 Manages global state (user, auth, posts).

6. tailwindcss / css

👉 Used for styling UI components.

7. react-icons (if used)

👉 Provides icons for UI.

🗂️ Frontend Structure (Typical)
Frontend/
│── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── BlogCard.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Article.jsx
│   │
│   ├── store/
│   │   ├── authStore.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│
│── public/
│── package.json
🧠 Features
User Registration & Login
View all blog posts
View single blog details
Create / Edit / Delete blogs (Author)
Comment on blogs
Like / Unlike posts
Responsive UI

👉 These are common blog frontend features where data is fetched dynamically from backend APIs.

🔗 Pages & Their Use
🏠 Home Page
Displays all blogs
Fetches data from backend
🔐 Login / Register Page
User authentication
Stores token for future requests
📝 Article Page
Displays full blog content
Shows comments and likes
👤 Profile Page (if available)
Displays user details
Shows user posts
🔄 API Integration
Uses Axios to connect with backend
Sends requests like:
GET → fetch blogs
POST → login/register
PUT → update blog
DELETE → delete blog

👉 Frontend communicates with backend APIs using HTTP methods.

🌐 Deployment

👉 You can deploy frontend using:

Vercel
Netlify

(If deployed, add your link here)

🧑‍💻 Tech Stack
React.js
JavaScript
CSS / Tailwind CSS
Axios
React Router

👉 React is commonly used for building dynamic UI in blog apps.

📌 How It Works
User opens frontend
React loads UI components
Axios calls backend APIs
Backend sends data
UI updates dynamically

deployment link: https://vercel.com/23eg112d59-1850s-projects/blog-app
Local:   http://localhost:5174/
