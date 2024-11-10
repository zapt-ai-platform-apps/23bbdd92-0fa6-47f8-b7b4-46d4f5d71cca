# New App

Welcome to **New App**, an application built with SolidJS and Tailwind CSS.

## Features

- **User Authentication**: Sign in with your existing accounts using ZAPT's authentication system. Providers include email magic links, Google, Facebook, and Apple.
- **API Integration**: After signing in, users can trigger a call to the ZAPT API by clicking a button. The response from the API is displayed on the screen.
- **Responsive Design**: The app is responsive and works well on all screen sizes.
- **Progressive Web App**: Install the app on your device for a native-like experience.
- **Error Tracking**: Sentry error logging is integrated for both frontend and backend to monitor and fix issues.

## User Journey

1. **Sign In**
   - When the user opens the app, they are presented with a sign-in page.
   - The user clicks on "Sign in with ZAPT" and uses one of the available authentication methods (email magic link, Google, Facebook, or Apple) to sign in.
2. **Home Page**
   - After signing in, the user is redirected to the home page.
   - The home page displays the app name and a "Sign Out" button at the top.
3. **Calling the ZAPT API**
   - The user can click on the "Call ZAPT API" button to trigger an API call.
   - While the API call is in progress, the button displays "Calling API..." and is disabled to prevent multiple submissions.
   - Upon successful response, the API response is displayed below the button in a formatted JSON view.
4. **Sign Out**
   - The user can sign out at any time by clicking the "Sign Out" button.

## External API Services

- **ZAPT API**: Used to demonstrate calling an external API with user-provided data. The API requires an API key, which should be stored in environment variables.

## Environment Variables

The app requires the following environment variables:

- `VITE_PUBLIC_APP_ID`: Your ZAPT application ID.
- `VITE_PUBLIC_SENTRY_DSN`: Your Sentry Data Source Name for error logging.
- `VITE_PUBLIC_APP_ENV`: The application environment (e.g., development, production).
- `ZAPT_API_KEY`: API key for accessing the ZAPT API.

Make sure to set these variables in a `.env` file or your hosting platform's environment settings.

## Installation and Setup

1. **Clone the repository**.
2. **Install dependencies**: Run `npm install`.
3. **Create a `.env` file** and add the required environment variables.
4. **Run the app**: Use `npm run dev` to start the development server.
5. **Build the app**: Use `npm run build` to create a production build.

## Notes

- The app icon is located externally and is included in the app and the HTML file's tab icon.
- The app uses Progressier for PWA functionality.
- Sentry is used for error logging in both frontend and backend.