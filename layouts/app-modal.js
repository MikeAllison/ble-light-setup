export class AppModal extends HTMLElement {
  constructor(renderHook) {
    super();

    this.renderHook = document.getElementById(renderHook);

    this.innerHTML = `
      <div class="ui mini modal">
        <div class="header">
          Alert
        </div>
        <div class="content">
        </div>
        <div class="actions">
          <div class="ui positive right labeled icon button">
            OK
            <i class="checkmark icon"></i>
          </div>
        </div>
      </div>
    `;
  }

  init() {
    this.renderHook.append(this);
  }
}

customElements.define('app-modal', AppModal);
