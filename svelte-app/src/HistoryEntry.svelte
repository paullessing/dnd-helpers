<script lang="ts">
  import { Operation, HistoryRecord } from './models/history';
  import { Currencies, Exchange } from './models/finance';

  export let record: HistoryRecord;
</script>

{ record.operation === Operation.ADD ? 'Add' : 'Subtract' }: {
  Currencies
    .filter((currency) => record.value[currency] > 0)
    .map((currency) => `${record.value[currency]} ${Exchange[currency].shortName}` ).join(', ') }
