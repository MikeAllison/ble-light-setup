export class StepsHeader extends HTMLElement {
  constructor() {
    super();

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
    `;
  }

  init() {
    return this.innerHTML;
  }
}

customElements.define('steps-header', StepsHeader);
