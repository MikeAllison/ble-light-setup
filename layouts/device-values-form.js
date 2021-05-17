export class DeviceValuesForm extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
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
    `;
  }

  init() {
    return this.innerHTML;
  }
}

customElements.define('device-values-form', DeviceValuesForm);
