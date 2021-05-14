class DeviceTable extends HTMLTableElement {
  constructor() {
    super();

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
}

customElements.define('device-table', DeviceTable, { extends: 'table' });

export const deviceTable = new DeviceTable();
