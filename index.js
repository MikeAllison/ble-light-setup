import { DeviceTable } from './layouts/device-table.js';
import { ConfigWizard } from './layouts/config-wizard.js';
import { AppModal } from './layouts/app-modal.js';

class App {
  constructor() {}

  static init() {
    // Seed Data
    const deviceList = [
      { id: '123.456.789', name: 'Device-1', rssi: -19 },
      { id: '567.891.234', name: 'Device-5', rssi: -55 },
      { id: '234.567.891', name: 'Device-2', rssi: -28 },
      { id: '456.789.123', name: 'Device-4', rssi: -46 },
      { id: '345.678.912', name: 'Device-3', rssi: -37 }
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
