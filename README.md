# CBC Three.js Programming Test

This is a simple test to verify your familiarity with Three.js and React, it should only take you a couple of hours.

This is a simple art gallery application with a 3D virtual art gallery scene.

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
- Clicking an image moves the camera to the related frame.
- The sculpture button moves the camera to the sculpture and starts a slow orbit.
- The camera can also move back to the main gallery view.
- I added lighting, shadows, loading feedback, error handling, and hover and selected styles.
- Automatic rotation is disabled when the user has enabled `prefers-reduced-motion`.

### Image Source Note

The API still returns the photo data, but the original `via.placeholder.com` image URLs did not work during development. I kept the original URLs in `originalUrl` and `originalThumbnailUrl`, and used Picsum URLs to display the images.

### Controls

- Click an artwork in the list to view it in the 3D gallery.
- Click **View Sculpture** to focus on the sculpture.
- Click **Back to Gallery** to return to the main view.
- Drag inside the 3D view to rotate the camera.
- Use the mouse wheel to zoom.

Once you're done:

1. Delete the `node_modules` directory
2. Create a zip file of the entire directory, including the .git file
3. Send it back to us

Thanks!

## Application Environment

This application was built using Create React App, so all the usual scripts are available:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
