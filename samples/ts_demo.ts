function playSound1(filename: string) {
  try {
    const audio = new Audio(`resources/${filename}`);
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {
    // Ignore audio errors
  }
}


class Radio1 {
  stations: string[];
  volume: number = 0.5;
  loop: boolean = true;

  constructor(stations: string[]) {
    this.stations = stations;
    this.volume = 0.5;
    this.loop = true;
  }

  play(station: string) {
    console.log(`Playing station: ${station}`);
  }
}

type Point1 = {
  x: number;
  y: number;
};

interface Shape1 {
  area(): number;
  perimeter(): number;
}
