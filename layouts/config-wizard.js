export class ConfigWizard extends HTMLElement {
  constructor(renderHook) {
    super();

    this.renderHook = document.getElementById(renderHook);

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
  }

  render(deviceList) {
    const deviceDropdownVals = document.getElementById(
      'device-dropdown-values'
    );

    deviceDropdownVals.innerHTML = null;

    // TODO: Sort values

    deviceList.forEach(device => {
      deviceDropdownVals.innerHTML += `
        <div class="item" data-value="${device.id}">${device.id}</div>
    `;
    });
  }
}

customElements.define('config-wizard', ConfigWizard);
