import React, { useEffect, useState } from "react";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then((response) => response.json())
      .then((json) => setPhotos(json));
  }, []);

  return (
    <div
      style={{
        flex: "auto",
        margin: 15,
      }}
    >
      <h2>Images</h2>
      <ul>
        {photos?.map((photo) => (
          <li>{photo.url}</li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
