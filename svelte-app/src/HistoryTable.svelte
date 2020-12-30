<script lang="ts">
  import { History, Operation } from './models/history';
  import { Currencies, Exchange } from './models/finance';

  export let history: History;

  function getOperationClass(operation: Operation): string {
    switch (operation) {
      case Operation.ADD: return 'positive';
      case Operation.SUBTRACT: return 'negative';
      default: throw new Error('Unexpected operation ' + operation);
    }
  }

  $: total = history.getTotal();

</script>

<table>
  <thead>
  <tr>
    <td>
      CP: {total.copper}, SP: {total.silver}, GP: {total.gold}, PP: {total.platinum}
    </td>
  </tr>
  </thead>
  <tbody>
  {#each history.records as record, i}
    <tr class="table-row--{getOperationClass(record.operation)}">
      <td colspan="4">
          { Currencies
        .filter((currency) => record.value[currency] > 0)
        .map((currency) => `${record.value[currency]} ${Exchange[currency].shortName}` ).join(', ')}</td>
    </tr>
  {/each}
  </tbody>
</table>

<style lang="scss">
  .table-row--positive {
    color: black;
  }
  .table-row--negative {
    color: red;
  }
</style>
