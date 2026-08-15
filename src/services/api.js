import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      // limit default 20
      query: (limit = 20) => ({
        url: "photos",
        params: {
          _limit: limit,
         },
      }),

      transformResponse: (photos) =>
        photos.map((photo) => ({
          ...photo,

          originalUrl: photo.url,
          originalThumbnailUrl: photo.thumbnailUrl,

          url:`https://picsum.photos/seed/gallery-${photo.id}/600/400`,

          thumbnailUrl:`https://picsum.photos/seed/gallery-${photo.id}/160/107`,
        })),
    }),
  }),
});

export const { useGetPhotosQuery } = apiSlice;
