<script lang="ts">
  import HistoryEntry from './HistoryEntry.svelte';
  import { Amount } from './models/finance';
  import { Operation, History } from './models/history';

  type Writeable<T> = { -readonly [P in keyof T]: T[P] };

  let operation: Operation = Operation.ADD;
  let value: Writeable<Amount> = { ...Amount.ZERO };

  let history = History.create(Amount.ZERO);

  function addEntry(): void {
    history = history.addEntry(operation, value);
    value = { ...Amount.ZERO };
    console.log(history);
  }

  $: wallet = history.getTotal();

</script>

<main>
  <h1>Currency Calculator</h1>

  <label>
    <input type=radio bind:group={operation} value={Operation.ADD}>
    Add
  </label>

  <label>
    <input type=radio bind:group={operation} value={Operation.SUBTRACT}>
    Subtract
  </label>

  <div>
    CP <input bind:value={value.copper} type="number" min="0" step="1" />
    SP <input bind:value={value.silver} type="number" min="0" step="1" />
    GP <input bind:value={value.gold} type="number" min="0" step="1" />
    PP <input bind:value={value.platinum} type="number" min="0" step="1" />
  </div>
  <button on:click={() => addEntry() }>{ operation }</button>
  <ul>
    {#each history.records as record}
    <li>
      <HistoryEntry record="{record}" />
    </li>
    {/each}
  </ul>
  <div>
    CP <input bind:value={wallet.copper} type="number" disabled />
    SP <input bind:value={wallet.silver} type="number" disabled />
    GP <input bind:value={wallet.gold} type="number" disabled />
    PP <input bind:value={wallet.platinum} type="number" disabled />
  </div>
</main>

<style lang="scss">
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		h1 {
			color: #ff3e00;
			text-transform: uppercase;
			font-size: 4em;
			font-weight: 100;
		}

    div input {
      width: 50px;
    }

		@media (min-width: 640px) {
			max-width: none;
		}
	}
</style>
