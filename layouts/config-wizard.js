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

    this.innerHTML = `
      <div class="ui three top attached steps">
        <div class="active step" id="device-connect-step">
          <i class="lightbulb icon"></i>
          <div class="content">
            <div class="title">Connect</div>
            <div class="description">Connect to a device</div>
          </div>
        </div>
        <div class="disabled step" id="device-values-step">
          <i class="sliders horizontal icon"></i>
          <div class="content">
            <div class="title">Set Values</div>
            <div class="description">Set the device's values</div>
          </div>
        </div>
        <div class="disabled step" id="device-test-step">
          <i class="power off icon"></i>
          <div class="content">
            <div class="title">Test</div>
            <div class="description">Test power-on/off</div>
          </div>
        </div>
      </div>
      <!-- START FORMS PANEL -->
      <div class="ui attached segment">
        <!-- START CONNECT FORM -->
        <div class="ui form" id="device-connect-form">
          <div class="centered">
            <div class="field">
              <label>Device ID</label>
              <div class="ui selection dropdown" id="device-id-dropdown">
                <input type="hidden" />
                <i class="dropdown icon"></i>
                <div class="default text">Select Device ID</div>
                <div class="menu" id="device-dropdown-values">
                  <!-- POPULATE VALUE -->
                </div>
              </div>
              <div
                class="ui disabled green labeled icon button"
                id="device-connect-btn"
              >
                <i class="wifi icon"></i>
                Connect
              </div>
            </div>
          </div>
        </div>
        <!-- END CONNECT FORM -->
        <!-- START VALUES FORM -->
        <div class="ui hidden form" id="device-values-form">
          <div class="centered">
            <div class="ui green statistic device-id-heading">
              <div class="label">Device ID</div>
              <div class="value">
                <!-- POPULATE VALUE -->
              </div>
            </div>
          </div>
          <div class="ui divider"></div>
          <div class="one field">
            <label
              for="device-intensity-range"
              id="device-intensity-label"
            ></label>
            <input
              type="range"
              id="device-intensity-range"
              name="device-intensity"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          <div class="two fields">
            <div class="field">
              <label>Max Intensity</label>
              <input
                type="number"
                id="device-intensity-max"
                placeholder=""
                min="0"
                max="100"
                step="1.0"
              />
            </div>
            <div class="field">
              <label>Power-On Intensity</label>
              <input
                type="number"
                id="device-intensity-power-on"
                placeholder=""
                min="0"
                max="100"
                step="1.0"
              />
            </div>
          </div>
          <div class="two fields">
            <div class="field">
              <div
                class="ui grey basic right floated labeled icon button"
                id="device-values-back-btn"
              >
                <i class="history icon"></i>
                Back
              </div>
            </div>
            <div class="field">
              <div
                class="ui green labeled icon button"
                id="device-values-save-btn"
              >
                <i class="save outline icon"></i>
                Save
              </div>
            </div>
          </div>
        </div>
        <!-- END VALUES FORM -->
        <!-- START TEST FORM -->
        <div class="ui hidden form" id="device-test-form">
          <div class="centered">
            <div class="ui green statistic device-id-heading">
              <div class="label">Device ID</div>
              <div class="value">
                <!-- POPULATE VALUE -->
              </div>
            </div>
          </div>
          <div class="ui divider"></div>
          <div class="centered">
            <div
              class="ui green statistic"
              id="device-test-intensity-heading"
            >
              <div class="label">Current Intensity</div>
              <div class="value">
                <!-- POPULATE VALUE -->
              </div>
            </div>
          </div>
          <div class="ui divider"></div>
          <div class="centered">
            <div
              class="ui grey basic labeled icon button"
              id="device-test-back-btn"
            >
              <i class="history icon"></i>
              Back
            </div>
            <div
              class="ui black labeled icon button"
              id="device-test-power-off-btn"
            >
              <i class="lightbulb outline icon"></i>
              Power-Off
            </div>
            <div
              class="ui green labeled icon button"
              id="device-test-power-on-btn"
            >
              <i class="lightbulb icon"></i>
              Power-On
            </div>
            <a
              href="/"
              class="ui green basic labeled icon button"
              id="device-test-reset-btn"
            >
              <i class="redo alternate icon"></i>
              Start Over
            </a>
          </div>
        </div>
        <!-- END TEST FORM -->
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
