# Real-Time Location Sharing

## Problem Statement

The goal of this project is to create a real-time location-sharing application that allows users to share their current location with family members. Users can also set up geofences and receive notifications when family members enter or exit these geofences. The application includes user authentication, adding/removing family members, and geofencing features.

## Features

1. **User Authentication**: Users can register and log in to the application.
2. **Family Members Management**: Users can add family members, accept or decline family member requests, and remove family members.
3. **Real-Time Location Sharing**: Users can update their current location in real-time and view the locations of their family members.
4. **Geofencing**: Users can set up geofences and receive logs when family members enter or exit these geofences.
5. **Geofence Logs**: Logs of family members entering or exiting geofences are maintained and can be viewed by the user. Logs older than 7 days are automatically deleted.

## Requirements

-   Node.js
-   MongoDB
-   Java JDK
-   Gradle

## Project Structure

```bash
real-time-location-sharing/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── org/example/realtimelocationsharing/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   └── resources/
│   └── pom.xml
└── README.md
```

## Installation

### Backend

1. Unzip the project directory and go to server directory

    ```bash
    cd real-time-location-sharing/server
    ```

2. Build and run the backend

3. Make sure the backend is running on port 8080

### Frontend

1. Navigate to the client directory:

    ```bash
    cd ../client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the frontend:

    ```bash
    npm run start
    ```

## Usage

1. Register and Log in:
   - Open your browser and navigate to http://localhost:3000.
   - Register a new user or log in with existing credentials.
2. Add Family Members:
   - Go to the “Manage Members” section.
   - Add family members by entering their username and sending a request.
   - Accept or decline pending requests.
3. Share Location:
   - Your location is updated in real-time every 5 seconds.
   - View the locations of your family members on the home page.
4. Set Up Geofences:
   - Go to the “Geofencing” section.
   - Add a new geofence by entering the center coordinates (latitude, longitude) and radius (meters).
   - View and manage existing geofences.
5. View Geofence Logs:
   - Logs of family members entering or exiting geofences are available in the “Geofencing” section.
   - Logs older than 7 days are automatically deleted.

Acknowledgements

- React
- Spring Boot
- MongoDB
- Leaflet
- Material-UI
