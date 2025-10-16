function playSound(filename) {
  try {
    const audio = new Audio(`resources/${filename}`);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    // Ignore audio errors
  }
}
