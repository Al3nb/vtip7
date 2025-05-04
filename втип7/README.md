# Image Slideshow Application

A client-server application using Node.js and React.js that displays a slideshow of images. When clicking on an image, it cycles through a collection of 10 images one by one.

## Project Structure

```
project/
├── client/             # React frontend
│   ├── public/         # Public assets
│   └── src/            # React source code
│       ├── components/ # React components
│       └── ...         # Other React files
└── server/             # Node.js backend
    ├── public/         # Static files
    │   └── images/     # Image files
    └── server.js       # Server code
```

## Features

- Client-server architecture using Node.js and React.js
- Displays 1 of 10 images at a time
- Clicking on an image cycles to the next one
- Responsive design with custom CSS styling
- Data stored using JavaScript Map collection

## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

### Client Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the client:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## How it Works

- The server uses Express.js to serve the API and static files
- Images are stored in a Map collection on the server
- The client fetches images from the server API
- When a user clicks on an image, the component updates to show the next image in the sequence
- After the 10th image, it cycles back to the first image 