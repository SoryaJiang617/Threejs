export function calculateArtworkAngle(selectedPhotoIndex, artworkCount) {
  if (selectedPhotoIndex < 0 || artworkCount <= 0) {
    return null;
  }

  return (selectedPhotoIndex / artworkCount) * Math.PI * 2;
}