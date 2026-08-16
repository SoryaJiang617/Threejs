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
