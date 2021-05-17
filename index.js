import { DeviceTable } from './layouts/device-table.js';
import { ConfigWizard } from './layouts/config-wizard.js';
import { AppModal } from './layouts/app-modal.js';
import { BLELight } from './components/ble-devices.js';

class App {
  constructor() {}

  static init() {
    // Seed Data
    const deviceList = [
      new BLELight('123.456.789', 'Device-1', -19),
      new BLELight('567.891.234', 'Device-5', -55),
      new BLELight('234.567.891', 'Device-2', -28),
      new BLELight('456.789.123', 'Device-4', -46),
      new BLELight('345.678.912', 'Device-3', -37)
    ];

    const deviceTable = new DeviceTable('nearby-devices-section');
    deviceTable.init();
    $('table').tablesort();

    const configWizard = new ConfigWizard('device-settings-section');
    configWizard.init();
    $('#device-id-dropdown').dropdown();

    deviceTable.refreshBtn.addEventListener('click', () => {
      deviceTable.refresh(deviceList);
      configWizard.render(deviceList);
    });

    const appModal = new AppModal('app-modal');
    appModal.init();
  }
}

App.init();
