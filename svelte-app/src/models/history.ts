import { Amount } from './finance';

export enum Operation {
  ADD = 'add',
  SUBTRACT = 'subtract',
}

export interface Record {
  readonly operation: Operation;
  readonly value: Amount;
}

export class History {
  private constructor(
    readonly start: Amount,
    readonly records: Record[],
  ) {}

  public static create(initialAmount: Amount): History {
    return new History(initialAmount, [])
  }

  public addEntry(operation: Operation, value: Amount): History {
    return new History(
      this.start,
      [...this.records, { operation, value }],
    );
  }

  public getTotal(): Amount {
    return this.records.reduce((acc, curr) =>
        curr.operation === 'add' ?
          Amount.add(acc, curr.value) :
          Amount.subtract(acc, curr.value),
      this.start);
  }
}
