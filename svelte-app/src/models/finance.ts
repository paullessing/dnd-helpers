export type Currency = 'copper' | 'silver' | /*'electrum' |*/ 'gold' | 'platinum';
export const Currencies = [
  'copper' as const,
  'silver' as const,
  // 'electrum' as const,
  'gold' as const,
  'platinum' as const,
] as const;

export const Exchange: { [key in Currency]: { name: string, shortName: string, multiplier: number } } = {
  // Must be ascending
  copper:   { name: 'Copper',   shortName: 'cp', multiplier: 1 },
  silver:   { name: 'Silver',   shortName: 'sp', multiplier: 10 },
  // electrum: { name: 'Electrum', shortName: 'ep', multiplier: 50 },
  gold:     { name: 'Gold',     shortName: 'gp', multiplier: 100 },
  platinum: { name: 'Platinum', shortName: 'pp', multiplier: 1000 },
}

export type Amount = {
  [K in Currency]: number
};

export namespace Amount {
  export const ZERO: Readonly<Amount> = {
    copper: 0,
    silver: 0,
    // electrum: 0,
    gold: 0,
    platinum: 0,
  };
  Object.freeze(ZERO);

  export function add(a: Partial<Amount>, b: Partial<Amount>): Amount {
    return Currencies.reduce((acc, curr) => ({
      ...acc,
      [curr]: (a[curr] || 0) + (b[curr] || 0),
    }), ZERO);
  }

  export function subtract(base: Partial<Amount>, amountToSubtract: Partial<Amount>): Amount {
    let value: Amount = { ...ZERO, ...base };

    amountToSubtract = { ...ZERO, ...amountToSubtract };
    for (let i = 0; i < Currencies.length; i++) {
      const currency = Currencies[i];
      const diff = base[currency] - amountToSubtract[currency];
      if (diff >= 0) {
        value[currency] = diff;
      } else {
        const nextCurrency = Currencies[i+1];
        if (!nextCurrency) {
          value[currency] = diff;
          continue;
        }
        const coinsPerNextCurrencyUnit = Exchange[Currencies[i+1]].multiplier / Exchange[currency].multiplier;
        const requiredNextCurrencyAmount = Math.ceil(-diff / coinsPerNextCurrencyUnit);
        const leftoverFromNextCurrencyAmount = requiredNextCurrencyAmount * coinsPerNextCurrencyUnit + diff;
        value[currency] = leftoverFromNextCurrencyAmount;
        amountToSubtract[nextCurrency] += requiredNextCurrencyAmount; // carry-over
      }
    }

    return value;
  }
}

export function toCopper(wallet: Amount) {
  return Object.entries(Exchange).reduce(
    (acc, [currency, { multiplier }]) => acc + (wallet[currency] || 0) * multiplier,
    0
  );
}
