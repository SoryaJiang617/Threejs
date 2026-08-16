import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photosApiBaseUrl =process.env.REACT_APP_PHOTOS_API_BASE_URL;
const imageBaseUrl =process.env.REACT_APP_IMAGE_BASE_URL;
export const apiSlice = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({ baseUrl: photosApiBaseUrl }),
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

          url: `${imageBaseUrl}/seed/gallery-${photo.id}/600/400`,
          thumbnailUrl: `${imageBaseUrl}/seed/gallery-${photo.id}/160/107`,
        })),
    }),
  }),
});

export const { useGetPhotosQuery } = apiSlice;
// 公司原始 Gallery.js
// → 请求 JSONPlaceholder /photos
// → JSONPlaceholder 返回 photo 数据
// → 每条数据包含 url 和 thumbnailUrl