export class DeviceTestForm extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
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
    `;
  }

  init() {
    return this.innerHTML;
  }
}

customElements.define('device-test-form', DeviceTestForm);
