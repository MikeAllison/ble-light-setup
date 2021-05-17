export class DeviceConnectForm extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
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
    `;
  }

  init() {
    return this.innerHTML;
  }
}

customElements.define('device-connect-form', DeviceConnectForm);
