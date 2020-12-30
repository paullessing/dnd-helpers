<script lang="ts">
  import HistoryTable from './HistoryTable.svelte';
  import RecordForm from './RecordForm.svelte';
  import { Amount } from './models/finance';
  import { History, HistoryRecord } from './models/history';

  let history = History.create(Amount.ZERO);

  function addRecord(event: CustomEvent<HistoryRecord>): void {
    history = history.add(event.detail);
    console.log(history);
  }

  $: wallet = history.getTotal();
</script>

<main>
  <h1>Currency Tracker</h1>

  <RecordForm on:add={addRecord} />

  <HistoryTable history="{history}" />
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		h1 {
			font-size: 4em;
			font-weight: 100;

      color: #58170D;
      font-family: MrEaves, serif;
      font-variant: small-caps;
		}

		@media (min-width: 640px) {
			max-width: none;
		}
	}
</style>
