# CBC Three.js Programming Test

This is a simple test to verify your familiarity with Three.js and React, it should only take you a couple of hours.

This is a simple art gallery application with a 3D virtual art gallery scene.

## Requirements

- Node.js 22
- npm 10

This project was tested with Node.js 22.13.1 and npm 10.9.2.

## Setup

1. Run `npm install`.
2. Copy `.env.sample` and rename the copy to `.env`.
3. Check the API URLs in `.env`.
4. Run `npm start`.
5. Open [http://localhost:3000](http://localhost:3000).

The environment variables are:

- `REACT_APP_PHOTOS_API_BASE_URL` - base URL for the photo data API.
- `REACT_APP_IMAGE_BASE_URL` - base URL for the displayed images.

## Tasks

1. Rewrite image fetching to use RTK
2. Display the actual images and their names in the gallery list
3. Display the images in the 3D art gallery by rendering them in frames on the walls
4. Add the `adjustable_leg.glb` 3D model as a sculpture on top of the cylinder
5. Add a button to move the camera to show the sculpture, then slowly rotate the room around so you can see it from all sides
6. Add code to zoom to a particular image when it's clicked in the list
7. Spend an hour improving the appearance, animations, and look and feel of the app - show off your skills and flair!

## Implementation Notes

- I used RTK Query to fetch the photo data and handle loading and error states.
- I built the 3D scene with React Three Fiber and Drei.
- The images keep their original aspect ratio and are displayed in frames around the wall.
- The sculpture is loaded with `useGLTF`. I used `Box3` to calculate its size and place it on the cylinder.
- An artwork can be selected from the list or directly from the 3D scene, and the camera moves to its related frame.
- The sculpture button moves the camera to the sculpture and starts a slow orbit.
- The camera can also move back to the main gallery view.
- I added lighting, shadows, loading feedback, error handling, and hover and selected styles.
- Automatic rotation is disabled when the user has enabled `prefers-reduced-motion`.

### Image Source Note

The API still returns the photo data, but the original `via.placeholder.com` image URLs did not work during development. I kept the original URLs in `originalUrl` and `originalThumbnailUrl`, and used Picsum URLs to display the images.

The photo ID is used as the Picsum seed, so each item keeps the same image. Separate full-size and thumbnail dimensions are used to balance image quality and loading size.

### Controls

- Click an artwork in the list or in the 3D scene to select and view it.
- Click **View Sculpture** to focus on the sculpture.
- Click **Back to Gallery** to return to the main view.
- Drag inside the 3D view to rotate the camera.
- Use the mouse wheel to zoom.

Once you're done:

1. Delete the `node_modules` directory
2. Create a zip file of the entire directory, including the .git file
3. Send it back to us

## Available Scripts

### `npm start`

Starts the app in development mode.

### `npm test -- --watchAll=false`

Runs the unit tests once.

### `npm run build`

Creates an optimized production build.

## Tests

The unit tests cover the artwork angle calculation used to connect a selected list item with its position in the circular 3D gallery.

## Possible Improvements

- Replace the demo photo service with a production image API or CDN.
- Add integration tests for the camera transitions.
- Add lazy loading if the gallery needs to display a much larger number of artworks.