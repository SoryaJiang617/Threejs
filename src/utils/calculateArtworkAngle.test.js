import { calculateArtworkAngle } from "./calculateArtworkAngle";

describe("calculateArtworkAngle", () => {
  test("returns 0 for the first artwork", () => {
    expect(calculateArtworkAngle(0, 4)).toBe(0);
  });

  test("returns PI / 2 for the second artwork", () => {
    expect(calculateArtworkAngle(1, 4)).toBeCloseTo(Math.PI / 2);
  });

  test("returns null for invalid input", () => {
    expect(calculateArtworkAngle(-1, 4)).toBeNull();
    expect(calculateArtworkAngle(0, 0)).toBeNull();
  });
});
// index=0、count=4 → 第一幅画位于 0°。
// index=1、count=4 → 第二幅画位于一圈的 1/4，也就是 90°。
// 无效 index 或 count=0 → 不执行错误计算，返回 null。

// 其他 Jest 代码的作用：
// describe → 将同一个函数的测试组织在一起，不属于 AAA。
// test → 定义一个测试场景，不属于 AAA。
// expect → 开始 Assert。
// toBe → 检查是否严格相等。
// toBeCloseTo → 检查小数是否足够接近。
// toBeNull → 检查结果是否为 null。