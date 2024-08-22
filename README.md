# Netflix MERN Clone

This is a Netflix clone application built with the MERN stack (MongoDB, Express.js, React, Node.js). It includes features such as authentication with Firebase, fetching movie data from TMDB (The Movie Database), and a responsive UI similar to Netflix.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-netflix-clone.git

2. Navigate to the project directory:

   ```bash
   cd netflix-mern
   
3. Install dependencies for both client and server:

   ```bash
    # For frontend
     cd client
     npm install
    # or
    yarn install

    # For backend
    cd ../api
    npm install
    # or
    yarn install

4. Create a new file named constants.js in the src/utils directory with the following content:
   
    ```bash
      export const API_KEY_MOVIE = "YOUR_API_KEY_MOVIE";
      export const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
      export const API_URL = "http://localhost:5000/api/";
      export const FIREBASE_API = "YOUR_FIREBASE_API_KEY";

5. Replace "YOUR_API_KEY_MOVIE" and "YOUR_FIREBASE_API_KEY" with your actual API keys.
6. Configure environment variables for the backend if needed. Create a .env file in the api directory and add your environment variables.
   
   ```bash
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret

7. Running the Application.
   Start the backend server: The backend should now be running at http://localhost:1000.

   ```bash
    cd api
    npm run start
    # or
    yarn start

8. Start the frontend development server: The frontend should now be running at http://localhost:3000.

   ```bash
    cd client
    npm run start
    # or
    yarn start
   
## Usage
 Once both the frontend and backend servers are running, you can access the application at http://localhost:3000. You should see a Netflix-like UI where you can browse movies, login, and perform other actions.

## Features

- **User authentication with Firebase**
- **Fetching and displaying movies from TMDB**
- **Responsive design with React and Tailwind CSS**
- **Dynamic content loading and routing**







