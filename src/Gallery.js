import React from "react";

const Gallery = ({
  photos = [],
  isLoading,
  isError,
  selectedPhotoId,
  onSelect,
}) => {
  if (isLoading) {
    return <p className="flex h-full items-center justify-center text-sm text-neutral-400">Loading artworks...</p>;
  }

  if (isError) {
    return (
      <p className="flex h-full items-center justify-center px-4 text-center text-sm text-red-400">Unable to load artworks.</p>
    );
  }

  return (
    <aside className="h-full overflow-y-auto p-4">
      <h1 className="mb-5 text-xl font-bold tracking-tight text-white">
        Virtual Gallery
      </h1>

      <ul className="space-y-2">
        {photos.map((photo) => {
          const selected =
            photo.id === selectedPhotoId;

          return (
            <li key={photo.id}>
              <button
                type="button"
                onClick={() => onSelect(photo)}
                className={`
                  flex w-full items-center gap-3
                  rounded-xl border p-2 text-left
                  transition duration-200
                  ${
                    selected
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-neutral-800 bg-neutral-900 hover:border-neutral-600 hover:bg-neutral-800"
                  }
                `}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                />

                <span className="min-w-0">
                  <strong className="block truncate text-sm text-neutral-100">
                    {photo.title}
                  </strong>

                  <small className="text-neutral-400">Artwork {photo.id}</small>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Gallery;