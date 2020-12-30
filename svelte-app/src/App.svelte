<script lang="ts">
  import { Amount } from './models/finance';
  type Writeable<T> = { -readonly [P in keyof T]: T[P] };

  let wallet: Writeable<Amount> = { ...Amount.ZERO };

  let modifiedAmount: Writeable<Amount> = { ...Amount.ZERO };

  let resultWallet: Writeable<Amount> = { ...Amount.ZERO };
</script>

<main>
  <h1>Currency Calculator</h1>

  <div on:change={ () => resultWallet = Amount.subtract(wallet, modifiedAmount) }>
    CP <input bind:value={wallet.copper} type="number" min="0" step="1" />
    SP <input bind:value={wallet.silver} type="number" min="0" step="1" />
<!--    EP <input bind:value={wallet.electrum} type="number" min="0" step="1" />-->
    GP <input bind:value={wallet.gold} type="number" min="0" step="1" />
    PP <input bind:value={wallet.platinum} type="number" min="0" step="1" />
  </div>
  <div on:change={ () => resultWallet = Amount.subtract(wallet, modifiedAmount) }>
    CP <input bind:value={modifiedAmount.copper} type="number" min="0" step="1" />
    SP <input bind:value={modifiedAmount.silver} type="number" min="0" step="1" />
<!--    EP <input bind:value={modifiedAmount.electrum} type="number" step="1" />-->
    GP <input bind:value={modifiedAmount.gold} type="number" min="0" step="1" />
    PP <input bind:value={modifiedAmount.platinum} type="number" min="0" step="1" />
  </div>
  <div>
    CP <input bind:value={resultWallet.copper} type="number" disabled />
    SP <input bind:value={resultWallet.silver} type="number" disabled />
<!--    EP <input bind:value={resultWallet.electrum} type="number" disabled />-->
    GP <input bind:value={resultWallet.gold} type="number" disabled />
    PP <input bind:value={resultWallet.platinum} type="number" disabled />
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
