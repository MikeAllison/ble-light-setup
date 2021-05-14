import { deviceTable } from './layouts/device-table.js';

$('table').tablesort();
$('#device-id-dropdown').dropdown();

// Seed data
const deviceList = [
  { id: '123.456.789', name: 'Device-1', rssi: -19 },
  { id: '234.567.891', name: 'Device-2', rssi: -28 },
  { id: '345.678.912', name: 'Device-3', rssi: -37 },
  { id: '456.789.123', name: 'Device-4', rssi: -46 },
  { id: '567.891.234', name: 'Device-5', rssi: -55 }
];
let selectedDevice = {
  id: null,
  intensity: 50.0,
  maxIntensity: 50.0,
  powerOnIntensity: 50.0
};

const $deviceIntensityRange = $('#device-intensity-range');
const $deviceIntensityLabel = $('#device-intensity-label');
const $deviceTestPowerOnBtn = $('#device-test-power-on-btn');
const $deviceTestPowerOffBtn = $('#device-test-power-off-btn');

// Set Values > Max & Power On Intensity Label/Inputs
$deviceIntensityLabel.text(`Intensity: ${selectedDevice.intensity.toFixed(1)}`);
$('#device-intensity-max').val(selectedDevice.maxIntensity.toFixed(1));
$('#device-intensity-power-on').val(selectedDevice.powerOnIntensity.toFixed(1));

// Set Values > Slider
$deviceIntensityRange.on('input', () => {
  selectedDevice.intensity = +$('#device-intensity-range')[0].value;
  console.log(`Setting device Intensity To: ${selectedDevice.intensity}`);

  $deviceIntensityLabel.text(
    `Intensity: ${selectedDevice.intensity.toFixed(1)}`
  );
  $('#device-intensity-max').val(selectedDevice.intensity.toFixed(1));
  $('#device-intensity-power-on').val(selectedDevice.intensity.toFixed(1));
});

// Device-Table > Refresh Button
$('#nearby-devices-refresh-btn').on('click', () => {
  $('#device-table tbody > *').remove();
  $('#device-dropdown-values > *').remove();

  // TODO: Promise for connection

  // Append devices to Device-Table
  deviceList.forEach(device => {
    $('#device-table tbody').append(`
      <tr class="center aligned">
        <td>${device.id}</td>
        <td>${device.name}</td>
        <td>${device.rssi}</td>
        <td>
          <div class="ui inverted small green labeled icon button flash-device-btn" data-device-id="${device.id}">
          <i class="bolt icon"></i>
          Flash
          </div>
        </td>
      </tr>
    `);

    // Add device IDs to Device-ID-Dropdown
    $('#device-dropdown-values').append(`
      <div class="item" data-value="${device.id}">${device.id}</div>
    `);
  });

  // Add event listener to Device-Table > Flash buttons
  $('.flash-device-btn').on('click', event => {
    // TODO: Push flashing to device
    alert(`Flashing Light: ${event.target.dataset.deviceId}`);
  });
});

// Enable 'Connect' button after selecting a device
$('#device-id-dropdown').on('click', () => {
  if ($('#device-id-dropdown .item').hasClass('selected')) {
    $('#device-connect-btn').removeClass('disabled');
  }
});

// Connect > Connect Button
$('#device-connect-btn').on('click', () => {
  selectedDevice.id = $('#device-id-dropdown > input').val();

  // Test > Power Off Button
  $deviceTestPowerOffBtn.on('click', () => {
    const poweringOff = setInterval(() => {
      selectedDevice.intensity -= 0.1;

      if (selectedDevice.intensity <= 0) {
        selectedDevice.intensity = 0;
        clearInterval(poweringOff);
      }

      $('#device-test-intensity-heading > .value').text(
        selectedDevice.intensity.toFixed(1)
      );

      if (selectedDevice.intensity === 0) {
        alert(`Device with ID ${selectedDevice.id} has powered OFF`);
      }
    }, 5);
  });

  // Test > Power On Button
  $deviceTestPowerOnBtn.on('click', () => {
    const poweringOn = setInterval(() => {
      selectedDevice.intensity += 0.1;

      if (selectedDevice.intensity >= selectedDevice.powerOnIntensity) {
        selectedDevice.intensity = selectedDevice.powerOnIntensity;
        clearInterval(poweringOn);
      }

      $('#device-test-intensity-heading > .value').text(
        selectedDevice.intensity.toFixed(1)
      );

      if (selectedDevice.intensity === selectedDevice.powerOnIntensity) {
        alert(`Device with ID ${selectedDevice.id} has powered ON`);
      }
    }, 5);
  });

  $('#device-connect-step').removeClass('active');
  $('#device-connect-form').addClass('hidden');

  $('.device-id-heading > .value').text(selectedDevice.id);

  $('#device-values-back-btn').on('click', () => {
    $('#device-values-step').removeClass('active').addClass('disabled');
    $('#device-values-form').addClass('hidden');
    $('#device-connect-step').addClass('active');
    $('#device-connect-form').removeClass('hidden');
  });

  $('#device-values-step').removeClass('disabled').addClass('active');
  $('#device-values-form').removeClass('hidden');
});

// Set Values > Save
$('#device-values-save-btn').on('click', () => {
  selectedDevice.maxIntensity = +$('#device-intensity-max')[0].value;
  selectedDevice.powerOnIntensity = +$('#device-intensity-power-on')[0].value;

  $('#device-values-step').removeClass('active');
  $('#device-values-form').addClass('hidden');

  $('#device-test-intensity-heading > .value').text(selectedDevice.intensity);

  $('#device-test-back-btn').on('click', () => {
    $('#device-test-step').removeClass('active').addClass('disabled');
    $('#device-test-form').addClass('hidden');
    $('#device-values-step').addClass('active');
    $('#device-values-form').removeClass('hidden');
  });

  $('#device-test-step').removeClass('disabled').addClass('active');
  $('#device-test-form').removeClass('hidden');
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
