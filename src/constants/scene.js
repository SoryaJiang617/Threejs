export const ROOM_RADIUS = 10;
export const ROOM_HEIGHT = 10;
export const ROOM_CENTER_Y = ROOM_HEIGHT / 2;

export const ARTWORK_WALL_OFFSET = 0.6;
export const ARTWORK_RADIUS = ROOM_RADIUS - ARTWORK_WALL_OFFSET;

export const ARTWORK_CENTER_Y = 3;
export const ARTWORK_HEIGHT = 1.6;

export const FRAME_COLORS = {
  default: "#4a2c1d",
  hovered: "#8b5e3c",
  selected: "#d4a853",
};

export const FRAME_SCALES = {
  default: 1,
  hovered: 1.04,
  selected: 1.08,
};

export const PEDESTAL_RADIUS = 1;
export const PEDESTAL_HEIGHT = 4;
export const PEDESTAL_CENTER_Y = PEDESTAL_HEIGHT / 2; 
export const SCULPTURE_DISPLAY_HEIGHT = 1.5;
export const SCULPTURE_BASE_Y = PEDESTAL_HEIGHT;
export const SCULPTURE_CENTER_Y = SCULPTURE_BASE_Y + SCULPTURE_DISPLAY_HEIGHT / 2;//4 + 1.5 / 2= 4.75

export const ARTWORK_VIEW_DISTANCE = 2.4;
export const ARTWORK_CAMERA_RADIUS =ARTWORK_RADIUS - ARTWORK_VIEW_DISTANCE;//9.4 - 2.4 = 7
export const GALLERY_CAMERA_POSITION = [0,ROOM_CENTER_Y,8,];
export const SCULPTURE_CAMERA_POSITION = [4,ROOM_CENTER_Y,4,];
export const CAMERA_MOVE_SPEED = 2.5;
export const CAMERA_ARRIVAL_THRESHOLD = 0.05;