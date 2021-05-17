class BLEDevice {
  constructor(id, name, rssi) {
    this.id = id;
    this.name = name;
    this.rssi = rssi;
  }
}

export class BLELight extends BLEDevice {
  constructor(id, name, rssi) {
    super(id, name, rssi);

    this.intensity;
    this.maxIntensity;
    this.powerOnIntensity;
  }
}
