import { BLELight } from './App/BLEDevices.js';
import { DeviceTable } from './UI/DeviceTable.js';

$('table').tablesort();
$('#light-id-dropdown').dropdown();

// Seed data
let selectedLightId;

const $lightIntensityRange = $('#light-intensity-range');
const $lightIntensityLabel = $('#light-intensity-label');
// Set initial value for light intensity label
$lightIntensityLabel.text(`Intensity: ${$lightIntensityRange[0].value}`);
$('#light-intensity-max').val($lightIntensityRange[0].value);
$('#light-intensity-power-on').val($lightIntensityRange[0].value);
// Light intensity range event listener
$lightIntensityRange.on('input', () => {
  $lightIntensityLabel.text(`Intensity: ${$lightIntensityRange[0].value}`);
  // TODO: Push intensity to light
  console.log(`Setting Light Intensity To: ${$lightIntensityRange[0].value}`);

  $('#light-intensity-max').val($lightIntensityRange[0].value);
  $('#light-intensity-power-on').val($lightIntensityRange[0].value);
});

// Set table 'Refresh' buttton event listener
$('#nearby-lights-refresh-btn').on('click', () => {
  $('#light-table tbody > *').remove();
  $('#light-dropdown-values > *').remove();

  // Web Bluetooth API calls
  const options = { acceptAllDevices: true };
  navigator.bluetooth
    .requestDevice(options)
    .then(device => {
      console.dir(device);
      return device.gatt.connect();
    })
    .then(server => {
      console.dir(server);
      return server.getPrimaryServices();
    })
    .then(services => {
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(_ =>
          service.getCharacteristics().then(characteristics => {
            console.log('> Service: ' + service.uuid);
            characteristics.forEach(characteristic => {
              console.log(
                '>> Characteristic: ' +
                  characteristic.uuid +
                  ' ' +
                  getSupportedProperties(characteristic)
              );
            });
          })
        );
      });
      return queue;
    })
    .catch(error => {
      console.log(error);
    });

  // Append lights to light-table
  lights.forEach(light => {
    $('#light-table tbody').append(`
      <tr class="center aligned">
        <td>${light.id}</td>
        <td>${light.name}</td>
        <td>${light.rssi}</td>
        <td>
          <div class="ui inverted small green labeled icon button flash-light-btn" data-light-id="${light.id}">
          <i class="bolt icon"></i>
          Flash
          </div>
        </td>
      </tr>
    `);

    // Add light IDs to light-id-dropdown
    $('#light-dropdown-values').append(`
      <div class="item" data-value="${light.id}">${light.id}</div>
    `);
  });

  // Add event listener to 'Flash' buttons
  $('.flash-light-btn').on('click', event => {
    // TODO: Push flashing to light
    alert(`Flashing Light: ${event.target.dataset.lightId}`);
  });
});

// Enable 'Connect' button after selecting a light
$('#light-id-dropdown').on('click', () => {
  if ($('#light-id-dropdown .item').hasClass('selected')) {
    $('#light-connect-btn').removeClass('disabled');
  }
});

// 'Connect' button event handler
$('#light-connect-btn').on('click', () => {
  selectedLightId = $('#light-id-dropdown > input').val();
  $lightTestPowerOnBtn = $('#light-test-power-on-btn');
  $lightTestPowerOffBtn = $('#light-test-power-off-btn');

  $('#light-connect-step').removeClass('active');
  $('#light-connect-form').addClass('hidden');

  $('.light-id-heading > .value').text(selectedLightId);

  $('#light-values-back-btn').on('click', () => {
    $('#light-values-step').removeClass('active').addClass('disabled');
    $('#light-values-form').addClass('hidden');
    $('#light-connect-step').addClass('active');
    $('#light-connect-form').removeClass('hidden');
  });

  $('#light-values-step').removeClass('disabled').addClass('active');
  $('#light-values-form').removeClass('hidden');
});

// TODO: Push values to light
$('#light-values-save-btn').on('click', () => {
  $('#light-values-step').removeClass('active');
  $('#light-values-form').addClass('hidden');

  $('#light-test-intensity-heading > .value').text(
    $lightIntensityRange[0].value
  );

  $('#light-test-back-btn').on('click', () => {
    $('#light-test-step').removeClass('active').addClass('disabled');
    $('#light-test-form').addClass('hidden');
    $('#light-values-step').addClass('active');
    $('#light-values-form').removeClass('hidden');
    $lightTestPowerOnBtn.unbind();
    $lightTestPowerOffBtn.unbind();
  });

  // TODO: Handle Power-Off button click
  $lightTestPowerOnBtn.on('click', () => {
    alert(`Powering ON Light: ${selectedLightId}`);
  });

  // TODO: Handle Power-On buton click
  $lightTestPowerOffBtn.on('click', () => {
    alert(`Powering OFF Light: ${selectedLightId}`);
  });

  $('#light-test-step').removeClass('disabled').addClass('active');
  $('#light-test-form').removeClass('hidden');
});

class App {
  constructor() {
    this.deviceList = [
      { id: '123.456.789', name: 'Light-1', rssi: -19 },
      { id: '234.567.891', name: 'Light-2', rssi: -28 },
      { id: '345.678.912', name: 'Light-3', rssi: -37 },
      { id: '456.789.123', name: 'Light-4', rssi: -46 },
      { id: '567.891.234', name: 'Light-5', rssi: -55 }
    ];
    this.selectedDevice;
  }

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
