export class DeviceTable extends HTMLTableElement {
  constructor(renderHook) {
    super();

    this.renderHook = document.getElementById(renderHook);

    this.setAttribute(
      'class',
      'ui very compact sortable celled inverted definition table'
    );
    this.innerHTML = `
      <thead class="full-width">
        <tr class="center aligned">
          <th class="four wide">ID</th>
          <th class="four wide">Name</th>
          <th class="four wide ascending">RSSI</th>
          <th class="four wide"></th>
        </tr>
      </thead>
      <tbody>
        <!-- POPULATE TABLE ROWS -->
      </tbody>
      <tfoot class="full-width">
        <tr>
          <th colspan="3"></th>
          <th class="center aligned" colspan="1">
            <button
              class="ui green labeled icon button"
              id="nearby-devices-refresh-btn"
            >
              <i class="sync icon"></i>Update
            </button>
          </th>
        </tr>
      </tfoot>
    `;
  }

  init() {
    this.renderHook.append(this);
  }

  refresh(deviceList) {
    const tbody = this.tBodies[0];

    tbody.innerHTML = null;

    deviceList.forEach(device => {
      tbody.innerHTML += `
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
      `;
    });

    // Add event listener to Device-Table > Flash buttons
    const flashBtns = this.querySelectorAll('.flash-device-btn');
    $('.flash-device-btn').on('click', event => {
      // TODO: Push flashing to device
      alert(`Flashing Light: ${event.target.dataset.deviceId}`);
    });
  }
}

customElements.define('device-table', DeviceTable, { extends: 'table' });
