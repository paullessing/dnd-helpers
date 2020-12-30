import { Amount } from './finance';

export enum Operation {
  ADD = 'add',
  SUBTRACT = 'subtract',
}

export interface HistoryRecord {
  readonly operation: Operation;
  readonly value: Amount;
  readonly description: string;
}

export class History {
  private constructor(
    readonly start: Amount,
    readonly records: HistoryRecord[],
  ) {}

  public static create(initialAmount: Amount): History {
    return new History(initialAmount, [])
  }

  public add(record: HistoryRecord): History {
    return new History(
      this.start,
      [...this.records, record],
    );
  }

  public getTotal(index: number = this.records.length - 1): Amount {
    const records = index < 0 || index >= this.records.length - 1 ?
      this.records :
      this.records.slice(0, index + 1);

    console.log('SLICED?', index, this.records.length);

    return records.reduce((acc, curr) =>
        curr.operation === 'add' ?
          Amount.add(acc, curr.value) :
          Amount.subtract(acc, curr.value),
      this.start);
  }
}
