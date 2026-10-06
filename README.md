# Nxt Watch

Nxt Watch is a responsive video streaming web application built using React.js. Users can log in, browse and search for videos, explore Trending and Gaming videos, watch video details, like or dislike videos, save videos, switch between light and dark themes, and securely log out.

## Features

- User authentication using JWT
- Protected routes
- Home page with video search
- Trending videos
- Gaming videos
- Video details page
- Like and Dislike functionality
- Save and Unsave videos
- Saved Videos page
- Light and Dark theme
- Logout confirmation popup
- Loading and failure states
- Retry functionality
- Responsive design
- Not Found page

## Technologies Used

- React.js
- React Router
- JavaScript
- Styled Components
- REST APIs
- JWT Authentication
- Cookies
- Local Storage
- React Player
- React Icons
- date-fns

## Pages

### Login

Users can log in using their username and password. After successful authentication, the JWT token is stored in cookies and the user is redirected to the Home page.

### Home

Users can browse videos, search for videos, and navigate to individual video details.

### Trending

Displays trending videos fetched from the API.

### Gaming

Displays gaming-related videos fetched from the API.

### Video Details

Displays the selected video using a video player along with channel information, views, published date, description, Like, Dislike, and Save options.

### Saved Videos

Displays videos saved by the user. Saved videos are stored in localStorage so they remain available after refreshing the page.

### Not Found

Displays a Not Found page when the user navigates to an invalid route.

## Authentication

JWT authentication is used to secure the application.

After successful login:

1. The JWT token is received from the API.
2. The token is stored in cookies.
3. Protected routes check for the presence of the JWT token.
4. Unauthenticated users are redirected to the Login page.

## API Integration

The application uses REST APIs to fetch:

- Login details
- Home videos
- Trending videos
- Gaming videos
- Video details

API requests handle the following states:

- Loading
- Success
- Failure
- Retry

## State Management

React hooks are used to manage component state and application behavior.

- `useState` — manages component state
- `useEffect` — handles API calls and side effects
- `useParams` — retrieves the video ID from the URL
- `useHistory` — handles navigation
- `useCallback` — memoizes the video details API function

## Challenges Faced

### Protected Routes

Implemented a reusable `ProtectedRoute` component to prevent unauthenticated users from accessing protected pages.

### API Handling

Handled loading, success, and failure states for API requests and provided a Retry option when requests fail.

### Saved Videos

Used `localStorage` to persist saved videos so that saved content remains available after refreshing the browser.

### Like and Dislike

Implemented mutually exclusive Like and Dislike states so that selecting one action updates the other appropriately.

### Theme Management

Managed the light and dark theme at the application level and passed the required theme information to child components.

### Video Player

Integrated `ReactPlayer` with the video URL received from the API to provide video playback functionality.

## Responsive Design

The application is responsive across different screen sizes.

Styled Components and CSS media queries are used to create layouts suitable for desktop, tablet, and mobile devices.

## How to Run

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate to the project directory

```bash
cd nxt-watch
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

### 5. Open the application

Open the application in your browser using the local development URL provided by the React development server.

## Demo Credentials

**Username:** `rahul`

**Password:** `rahul@2021`

## Project Structure

```text
nxt-watch/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

> The exact folder structure may vary depending on the project implementation.

## Conclusion

Nxt Watch demonstrates practical React development concepts including JWT authentication, protected routing, REST API integration, reusable components, state management, localStorage persistence, responsive design, theme management, and interactive video features.
