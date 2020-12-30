<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Amount, toCopper } from './models/finance';
  import { Operation, HistoryRecord } from './models/history';
  import { Writeable } from './models/util';

  const dispatch = createEventDispatcher();
  let form = resetForm();

  function resetForm(): Writeable<HistoryRecord> {
    return {
      description: '',
      operation: Operation.ADD,
      value: { ...Amount.ZERO },
    };
  }

  function addEntry(): void {
    if (toCopper(form.value) > 0) {
      dispatch('add', form);
      form = resetForm();
    }
  }
</script>

<label>
  <input type=radio bind:group={form.operation} value={Operation.ADD}>
  Add
</label>

<label>
  <input type=radio bind:group={form.operation} value={Operation.SUBTRACT}>
  Subtract
</label>

<div class="form-fields">
  CP <input bind:value={form.value.copper} type="number" min="0" step="1" />
  SP <input bind:value={form.value.silver} type="number" min="0" step="1" />
  GP <input bind:value={form.value.gold} type="number" min="0" step="1" />
  PP <input bind:value={form.value.platinum} type="number" min="0" step="1" />
</div>
<textarea bind:value={form.description} placeholder="Description"></textarea>
<button on:click={() => addEntry() }>{ form.operation }</button>

<style lang="scss">
  .form-fields input {
    width: 50px;
  }
</style>
