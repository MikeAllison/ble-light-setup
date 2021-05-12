class BLEDevice {
  constructor(id, name, rssiVal) {
    this.id = id;
    this.name = name;
    this.rssiVal = rssiVal;
  }
}

export class BLELight extends BLEDevice {
  constructor() {
    this.intensity;
    this.maxIntensity;
    this.powerOnIntensity;
  }
}
