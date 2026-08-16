export const ROOM_RADIUS = 10;
export const ROOM_HEIGHT = 10;
export const ROOM_CENTER_Y = ROOM_HEIGHT / 2;

export const ARTWORK_WALL_OFFSET = 0.6;
export const ARTWORK_RADIUS = ROOM_RADIUS - ARTWORK_WALL_OFFSET;

export const ARTWORK_CENTER_Y = 3;//选中画框的显示高度接近 2，将中心设为 y=3 后，画框大约位于 y=2 到 y=4，并让画框顶部与高度为 4 的中央展台对齐。
export const ARTWORK_HEIGHT = 1.6;//根据 20 幅画、9.4 的排列半径、1.5 的图片比例以及选中时 1.08 的缩放，1.6 是一个接近最大值、同时仍能保留画框间距的安全高度

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
export const PEDESTAL_HEIGHT = 4;//公司 starter code 给的 CylinderGeometry 参数
export const PEDESTAL_CENTER_Y = PEDESTAL_HEIGHT / 2; //让展台底部刚好位于地面 y=0
export const SCULPTURE_DISPLAY_HEIGHT = 1.5;//我们为 GLB 模型选择的标准显示高度，根据模型自身宽高比例，把高度标准化为 1.5 后，模型宽度约 0.97、深度约 0.83，能够合理地放在直径为 2 的展台上。
export const SCULPTURE_BASE_Y = PEDESTAL_HEIGHT;//雕塑底部应该位于展台顶部
export const SCULPTURE_CENTER_Y = SCULPTURE_BASE_Y + SCULPTURE_DISPLAY_HEIGHT / 2;//4 + 1.5 / 2= 4.75

export const ARTWORK_VIEW_DISTANCE = 2.4;//画框选中后的高度接近 2。R3F 默认相机 FOV 是 75°，相机距离画作 2.4 时，画框会占据视野高度的大约一半，能看清又不会贴得太近。
export const ARTWORK_CAMERA_RADIUS =ARTWORK_RADIUS - ARTWORK_VIEW_DISTANCE;//9.4 - 2.4 = 7
export const GALLERY_CAMERA_POSITION = [0,ROOM_CENTER_Y,8,];//y = 5→ 位于高度为 10 的房间中心；z = 8→ 位于半径为 10 的房间内部，并与墙保持 2 的距离
export const SCULPTURE_CAMERA_POSITION = [4,ROOM_CENTER_Y,4,];//y = 5 → 房间高度是 10，相机先放在房间中间高度。展台 4 + 雕塑 1.5 = 总高 5.5 → 相机与展示物保持大约 5.5 的水平距离。需要 45° 斜视角 → X 和 Z 距离必须相等，假设都为 a。√(a² + a²) = 5.5a = 5.5 ÷ √2 ≈ 3.89 3.89 取方便调整的整数 4 → 得到 x=4、z=4。
export const CAMERA_MOVE_SPEED = 2.5;//e^-2.5 ≈ 0.082，也就是相机大约完成：1 - 0.082 = 91.8%，2.5 表示大约一秒完成大部分过渡，速度平滑但不会太慢
export const CAMERA_ARRIVAL_THRESHOLD = 0.05;//这个值只占房间半径的：0.05 / 10 = 0.005 = 0.5%，视觉上已经无法明显看出差距。

// 20 幅画 + 半径 9.4→ 每幅画横向空间约 2.94
// 画作高度 1.6→ 画框宽度 2.65→ 选中宽度约 2.86→ 不超过 2.94
// 图片本身高度 1.6→包含画框后的整体高度 1.85→选中并放大后的整体高度 2→画框中心y 3→选中画框范围y 2～4→展台顶部y 4→ 顶部与展台顶部 y=4 对齐→ 相机也在 y=3 正面观察

// 宽度 0.094，高度 0.145，深度 0.080。缩放比例= 1.5 / 0.145≈ 10.34
// 宽度 = 0.094 × 10.34 ≈ 0.97，高度 = 1.5，深度 = 0.080 × 10.34 ≈ 0.83。半径 1 × 2 = 直径 2