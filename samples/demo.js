function playSound(filename) {
  try {
    const audio = new Audio(`resources/${filename}`);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    // Ignore audio errors
  }
}


class Radio {
  constructor(stations) {
    this.stations = stations;
    this.audio.volume = 0.5;
    this.audio.loop = true;
  }

  play(station) {
    console.log(`Playing station: ${station}`);
  }
}
