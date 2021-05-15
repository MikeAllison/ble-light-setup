import { DeviceTable } from './layouts/device-table.js';
import { ConfigWizard } from './layouts/config-wizard.js';

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

class App {
  constructor() {}

  static init(renderHook) {
    this.renderHook = $(`#${renderHook}`);

    // Things the app needs

    // DeviceTable
    // .init() - Select from the DOM
    // this.updateBtn
    // .update(this.deviceList) - Updates TRs & initializes ConnectForm dropdown

    // DeviceWizard
    // .init() - Select from the DOM

    // ConnectForm
    // this.connectButton
    // .init(isActive: true) - Select form and connect button from from the DOM
    // .show()
    // .hide()
    // Connect button hides this & shows ConfigFrom

    // ConfigForm
    // .init(isActive: false) - Select form and back/save buttons from from the DOM
    // .show()
    // .hide()
    // Back button hides this and shows ConnectForm
    // Save button hides this and shows TestForm

    // TestForm
    // .init(isActive: false) - Select form and buttons (back, power-off, power-on, ???) from from the DOM
    // .show()
    // .hide()
    // Back button hides this and shows ConfigForm
  }
}

App.init('app');
