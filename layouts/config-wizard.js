import { StepsHeader } from './steps-header.js';
import { DeviceConnectForm } from './device-connect-form.js';
import { DeviceValuesForm } from './device-values-form.js';
import { DeviceTestForm } from './device-test-form.js';

export class ConfigWizard extends HTMLElement {
  constructor(renderHook) {
    super();

    this.renderHook = document.getElementById(renderHook);

    this.selectedDevice = {
      id: null,
      intensity: 50.0,
      maxIntensity: 50.0,
      powerOnIntensity: 50.0
    };

    const stepsHeader = new StepsHeader();
    const deviceConnectForm = new DeviceConnectForm();
    const deviceValuesForm = new DeviceValuesForm();
    const deviceTestForm = new DeviceTestForm();

    this.innerHTML = `
      ${stepsHeader.init()}
      <div class="ui attached segment">
        ${deviceConnectForm.init()}
        ${deviceValuesForm.init()}
        ${deviceTestForm.init()}
      </div>
    `;
  }

  init() {
    this.renderHook.append(this);

    // Connect Form Elements
    this.deviceIdDropdown = document.getElementById('device-id-dropdown');
    this.deviceConnectBtn = document.getElementById('device-connect-btn');

    // Set Values Form Elements
    this.deviceIntensityLabel = document.getElementById(
      'device-intensity-label'
    );
    this.deviceIntensityRange = document.getElementById(
      'device-intensity-range'
    );
    this.deviceIntensityMax = document.getElementById('device-intensity-max');
    this.deviceIntensityPowerOn = document.getElementById(
      'device-intensity-power-on'
    );
    this.deviceTestPowerOnBtn = document.getElementById(
      'device-test-power-on-btn'
    );
    this.deviceTestPowerOffBtn = document.getElementById(
      'device-test-power-off-btn'
    );

    // Set Values > Max & Power On Intensity Label/Inputs
    this.deviceIntensityLabel.innerText = `Intensity: ${this.selectedDevice.intensity.toFixed(
      1
    )}`;
    this.deviceIntensityMax.value = this.selectedDevice.maxIntensity.toFixed(1);
    this.deviceIntensityPowerOn.value =
      this.selectedDevice.powerOnIntensity.toFixed(1);

    // Set Values > Slider
    this.deviceIntensityRange.addEventListener('input', () => {
      this.selectedDevice.intensity = +this.deviceIntensityRange.value;
      console.log(
        `Setting device Intensity To: ${this.selectedDevice.intensity}`
      );

      this.deviceIntensityLabel.innerText = `Intensity: ${this.selectedDevice.intensity.toFixed(
        1
      )}`;
      this.deviceIntensityMax.value = this.selectedDevice.intensity.toFixed(1);
      this.deviceIntensityPowerOn.value =
        this.selectedDevice.intensity.toFixed(1);
    });

    // Enable 'Connect' button after selecting a device
    this.deviceIdDropdown.addEventListener('click', () => {
      if ($('#device-id-dropdown .item').hasClass('selected')) {
        $('#device-connect-btn').removeClass('disabled');
      }
    });

    // Connect > Connect Button
    this.deviceConnectBtn.addEventListener('click', () => {
      this.selectedDevice.id = $('#device-id-dropdown > input').val();

      // Test > Power Off Button
      this.deviceTestPowerOffBtn.addEventListener('click', () => {
        const poweringOff = setInterval(() => {
          this.selectedDevice.intensity -= 0.1;

          if (this.selectedDevice.intensity <= 0) {
            this.selectedDevice.intensity = 0;
            clearInterval(poweringOff);
          }

          $('#device-test-intensity-heading > .value').text(
            this.selectedDevice.intensity.toFixed(1)
          );

          if (this.selectedDevice.intensity === 0) {
            $('.ui.mini.modal > .content').text('Device has powered OFF');
            $('.ui.mini.modal').modal('show');
          }
        }, 5);
      });

      // Test > Power On Button
      this.deviceTestPowerOnBtn.addEventListener('click', () => {
        const poweringOn = setInterval(() => {
          this.selectedDevice.intensity += 0.1;

          if (
            this.selectedDevice.intensity >=
            this.selectedDevice.powerOnIntensity
          ) {
            this.selectedDevice.intensity =
              this.selectedDevice.powerOnIntensity;
            clearInterval(poweringOn);
          }

          $('#device-test-intensity-heading > .value').text(
            this.selectedDevice.intensity.toFixed(1)
          );

          if (
            this.selectedDevice.intensity ===
            this.selectedDevice.powerOnIntensity
          ) {
            $('.ui.mini.modal > .content').text('Device has powered ON');
            $('.ui.mini.modal').modal('show');
          }
        }, 5);
      });

      $('#device-connect-step').removeClass('active');
      $('#device-connect-form').addClass('hidden');

      $('.device-id-heading > .value').text(this.selectedDevice.id);

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
      this.selectedDevice.maxIntensity = +this.deviceIntensityMax.value;
      this.selectedDevice.powerOnIntensity = +this.deviceIntensityPowerOn.value;

      $('#device-values-step').removeClass('active');
      $('#device-values-form').addClass('hidden');

      $('#device-test-intensity-heading > .value').text(
        this.selectedDevice.intensity
      );

      $('#device-test-back-btn').on('click', () => {
        $('#device-test-step').removeClass('active').addClass('disabled');
        $('#device-test-form').addClass('hidden');
        $('#device-values-step').addClass('active');
        $('#device-values-form').removeClass('hidden');
      });

      $('#device-test-step').removeClass('disabled').addClass('active');
      $('#device-test-form').removeClass('hidden');
    });
  }

  render(deviceList) {
    const deviceDropdownVals = document.getElementById(
      'device-dropdown-values'
    );

    deviceDropdownVals.innerHTML = null;

    deviceList.sort((a, b) => {
      let idA = a.id,
        idB = b.id;

      if (idA < idB) {
        return -1;
      }
      if (idA > idB) {
        return 1;
      }
      return 0;
    });

    deviceList.forEach(device => {
      deviceDropdownVals.innerHTML += `
        <div class="item" data-value="${device.id}">${device.id}</div>
    `;
    });
  }
}

customElements.define('config-wizard', ConfigWizard);
